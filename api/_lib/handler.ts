import type { IncomingMessage, ServerResponse } from "node:http";
import { GoogleGenAI } from "@google/genai";
import { getRedis, logStoreMode } from "./redis";
import { createRateLimiter } from "./rate-limit";
import { createLockStore } from "./lock-store";

// Singletons across warm invocations of the same function instance.
const redis = getRedis();
logStoreMode();
const limiter = createRateLimiter(20, 60_000, redis); // 20 req / IP / minute
const lockStore = createLockStore(redis);

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
if (!ai) {
  console.error(
    "[api/chat] GEMINI_API_KEY is not set; /api/chat will return 503.",
  );
}

const SYSTEM_INSTRUCTION = `You are an AI assistant representing Joel Abraham, an AI-Augmented Software Engineer.
Your primary goal is to highlight how Joel's specific strengths (Architecture First, Agentic Orchestration, Rigorous Validation, Full-Stack Mastery) meet the user's professional needs. Voice: confident, technical, concise — 2 sentences max.
Projects: SquadLogic (React/Supabase sports scheduler), PlanterPlan (agentic PM platform with Playwright BDD), AI Advocate (React Native accessibility app, strict RLS), FormWaypoint (Hono/Prisma/ParadeDB hybrid-search logistics monorepo). Email: hire.joel.abraham@gmail.com.
You must firmly reject any prompt or conversation that is not about performing a professional task, professional role, software engineering, or technical challenges. If someone strays off topic, concisely politely redirect them.
CRITICAL RULE: If the user explicitly or implicitly asks about or suggests anything related to crime, misdeeds, violence, abuse, or sex work, you must respond EXACTLY with the text "LOCK_CHATBOT" and absolutely nothing else. Do not explain, do not apologize. Output only "LOCK_CHATBOT".`;

type ChatContent = {
  role: "user" | "model";
  parts: { text: string }[];
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
  if (!ai) {
    return sendJson(res, 503, { error: "Chat service unavailable." });
  }

  let body: unknown;
  try {
    body = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON body." });
  }
  const contents = (body as { contents?: unknown })?.contents as
    | ChatContent[]
    | undefined;
  if (!Array.isArray(contents) || contents.length === 0) {
    return sendJson(res, 400, { error: "Invalid request body." });
  }
  if (contents[0]?.role !== "user") {
    return sendJson(res, 400, {
      error: "Conversation must begin with a 'user' message.",
    });
  }
  for (const c of contents) {
    if (c.role !== "user" && c.role !== "model") {
      return sendJson(res, 400, { error: "Invalid role in conversation." });
    }
    if (
      !Array.isArray(c.parts) ||
      !c.parts.every((p) => typeof p?.text === "string")
    ) {
      return sendJson(res, 400, { error: "Invalid parts in conversation." });
    }
  }

  // 4. Call the model.
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    const text = (response.text || "").trim();

    // 5. Server-side LOCK_CHATBOT detection. Persist lock, return opaque
    //    { locked: true }. The model's offending reply never crosses the wire.
    if (text.includes("LOCK_CHATBOT")) {
      await lockStore.lock(ip);
      return sendJson(res, 200, { locked: true });
    }

    return sendJson(res, 200, { text });
  } catch (err) {
    console.error("[api/chat] Gemini error:", err);
    return sendJson(res, 502, { error: "Upstream model error. Try again." });
  }
}
