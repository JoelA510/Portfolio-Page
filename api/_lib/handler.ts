import type { IncomingMessage, ServerResponse } from "node:http";
import { getRedis, logStoreMode } from "./redis";
import { createRateLimiter } from "./rate-limit";
import { createLockStore } from "./lock-store";

// Singletons across warm invocations of the same function instance.
const redis = getRedis();
logStoreMode();
const limiter = createRateLimiter(20, 60_000, redis); // 20 req / IP / minute
const lockStore = createLockStore(redis);

const apiKey = process.env.OPENROUTER_API_KEY;
// Model ID is env-overridable so swapping between free Gemma tiers (or moving
// off the :free variant if it hits capacity) doesn't require a code change.
const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-4-31b-it:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!apiKey) {
  console.error(
    "[api/chat] OPENROUTER_API_KEY is not set; /api/chat will return 503.",
  );
}

const SYSTEM_INSTRUCTION = `You are an AI assistant representing Joel Abraham, an AI-Augmented Software Engineer.
Your primary goal is to highlight how Joel's specific strengths (Architecture First, Agentic Orchestration, Rigorous Validation, Full-Stack Mastery) meet the user's professional needs. Voice: confident, technical, concise — 2 sentences max.
Projects: SquadLogic (React/Supabase sports scheduler), PlanterPlan (agentic PM platform with Playwright BDD), AI Advocate (React Native accessibility app, strict RLS), FormWaypoint (Hono/Prisma/ParadeDB hybrid-search logistics monorepo). Email: hire.joel.abraham@gmail.com.
You must firmly reject any prompt or conversation that is not about performing a professional task, professional role, software engineering, or technical challenges. If someone strays off topic, concisely politely redirect them.
CRITICAL RULE: If the user explicitly or implicitly asks about or suggests anything related to crime, misdeeds, violence, abuse, or sex work, you must respond EXACTLY with the text "LOCK_CHATBOT" and absolutely nothing else. Do not explain, do not apologize. Output only "LOCK_CHATBOT".`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getIp(req: IncomingMessage): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0].split(",")[0].trim();
  return req.socket.remoteAddress || "unknown";
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  // Vercel's Node runtime already populates (req as any).body. Vite's Connect middleware
  // does not — we fall back to reading the stream manually.
  const existing = (req as unknown as { body?: unknown }).body;
  if (existing !== undefined && existing !== null && existing !== "") {
    if (typeof existing === "string") {
      try {
        return JSON.parse(existing);
      } catch {
        return null;
      }
    }
    return existing;
  }
  return new Promise((resolve, reject) => {
    let raw = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) return resolve(null);
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(null);
      }
    });
    req.on("error", reject);
  });
}

export async function handleChat(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const ip = getIp(req);

  // 1. Short-circuit locked IPs before spending tokens or hitting rate-limit.
  if (await lockStore.isLocked(ip)) {
    return sendJson(res, 200, { locked: true });
  }

  // 2. Rate limit.
  if (!(await limiter.allow(ip))) {
    return sendJson(res, 429, {
      error: "Too many requests. Try again in a minute.",
    });
  }

  // 3. Validate.
  if (!apiKey) {
    return sendJson(res, 503, { error: "Chat service unavailable." });
  }

  let body: unknown;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON body." });
  }
  const messages = (body as { messages?: unknown })?.messages as
    | ChatMessage[]
    | undefined;
  if (!Array.isArray(messages) || messages.length === 0) {
    return sendJson(res, 400, { error: "Invalid request body." });
  }
  if (messages[0]?.role !== "user") {
    return sendJson(res, 400, {
      error: "Conversation must begin with a 'user' message.",
    });
  }
  for (const m of messages) {
    if (m.role !== "user" && m.role !== "assistant") {
      return sendJson(res, 400, { error: "Invalid role in conversation." });
    }
    if (typeof m.content !== "string") {
      return sendJson(res, 400, { error: "Invalid content in conversation." });
    }
  }

  // 4. Call OpenRouter.
  try {
    const upstream = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Optional but recommended by OpenRouter for attribution / abuse handling.
        ...(process.env.APP_URL
          ? { "HTTP-Referer": process.env.APP_URL }
          : {}),
        "X-Title": "Joel Abraham Portfolio",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_INSTRUCTION },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error(
        `[api/chat] OpenRouter ${upstream.status}: ${detail.slice(0, 500)}`,
      );
      return sendJson(res, 502, { error: "Upstream model error. Try again." });
    }

    const data = (await upstream.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = (data.choices?.[0]?.message?.content || "").trim();

    // 5. Server-side LOCK_CHATBOT detection. Persist lock, return opaque
    //    { locked: true }. The model's offending reply never crosses the wire.
    if (text.includes("LOCK_CHATBOT")) {
      await lockStore.lock(ip);
      return sendJson(res, 200, { locked: true });
    }

    return sendJson(res, 200, { text });
  } catch (err) {
    console.error("[api/chat] OpenRouter error:", err);
    return sendJson(res, 502, { error: "Upstream model error. Try again." });
  }
}
