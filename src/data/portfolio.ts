export type TechChip = { name: string; description: string };

export type Trait = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: TechChip[];
  aiStack: TechChip[];
  /** One-line "Process:" summary of the AI → test → review loop. */
  remediation: string;
  /** ASCII architecture diagram, rendered in a <pre>. */
  architecture: string;
  /** Absent when the project has no public deployment to embed. */
  previewUrl?: string;
  /** Absent when the source repository isn't public. */
  githubUrl?: string;
  /** Absent when the project has no public deployment to link. */
  liveUrl?: string;
};

export const PORTFOLIO = {
  name: "Joel Abraham",
  email: "hire.joel.abraham@gmail.com",
  github: "https://github.com/JoelA510",
  linkedin: "https://linkedin.com/in/joel-abraham-cv",
  // "How I work" — three commitments.
  traits: [
    {
      title: "Architecture first",
      description:
        "Secure system design, scalable data models, and API blueprints come before any code is generated. The plan is the product; the code follows it.",
    },
    {
      title: "Directed, not delegated",
      description:
        "AI toolchains are steered through test-driven constraints and precise prompts. The agents execute; they don't decide.",
    },
    {
      title: "Verified before shipped",
      description:
        "BDD frameworks and end-to-end Playwright suites catch AI mistakes early, and every change still ends with a human review.",
    },
  ] satisfies Trait[],
};

export const PROJECTS: Project[] = [
  {
    id: "formwaypoint",
    title: "FormWaypoint",
    tagline: "Commercial invoice to carrier SLI, entirely on your own machine",
    description:
      "Turns a combined commercial invoice and packing list into a completed carrier Shipper's Letter of Instruction without the shipment ever leaving the machine: the CIPL is parsed locally, the carrier's real blank form is filled locally, and there is no backend to send anything to. Two CIPL formats and two carrier adapters (Nippon Express, CEVA) ship today; FedEx and UPS get keying sheets ordered the way Ship Manager and WorldShip prompt, because a mismatched import map fails silently. Every Schedule B number is validated against the Census Bureau AES concordance, and every quantity, weight, and value has to sum back to the totals printed on the source before a form is generated. What it refuses to do is the design: it never assigns EAR99 because no ECCN appeared, never converts an HTSUS number into a Schedule B number, and never treats a blank field as zero. 322 tests hold that line against five real shipments, with the expected values taken from the SLIs a person filed by hand; it also ships as a Windows desktop build, where a Rust shell refreshes the Census dataset a browser is not allowed to fetch.",
    tech: [
      { name: "React 19", description: "Review and output UI" },
      { name: "TypeScript", description: "Strict types across the domain layer, no escape hatches" },
      { name: "Vite 8", description: "Build + dev server" },
      { name: "pdfjs-dist", description: "Position-aware CIPL text extraction, no OCR" },
      { name: "pdf-lib", description: "Fills the carrier's real blank form, unsigned" },
      { name: "IndexedDB", description: "The only store; nothing is uploaded" },
      { name: "Tauri 2 (Rust)", description: "Windows desktop shell + Census dataset refresh" },
    ],
    aiStack: [
      { name: ".agent/ rules", description: "Always-on operating, security, and architecture rules agents read first" },
      { name: ".agent/ workflows", description: "Named procedures for features, refactors, debugging, and pre-PR review" },
      { name: "Codex review bot", description: "Scoped review checklist posted on every pull request" },
      { name: "Vitest", description: "322-test regression suite gating every change" },
    ],
    remediation:
      "AI works against always-on rules that forbid inferring any compliance value → the suite replays five real shipments against the SLIs filed for them → a failure is read as a rule violation, not a test to relax → one check command (typecheck, lint, tests, build) is the single gate, run identically in CI and by me before merge.",
    architecture: `[CIPL PDF] ---> [TEXT + COORDINATES]
                        |
                        v
                [FORMAT REGISTRY]
                (detect -> parser)
                        |
                        v
                  [RECONCILER]
        (USD set · line join · grouping
          totals must sum back)
                |               |
                v               v
        [SCHEDULE B]      [ITEM LIBRARY]
        (Census AES)      (weights · codes)
                |               |
                +-------+-------+
                        v
                [CARRIER ADAPTER]
        (Nippon · CEVA · keying sheets)
                        |
                        v
              [FILLED PDF, UNSIGNED]`,
    githubUrl: "https://github.com/JoelA510/FormWaypoint",
  },
  {
    id: "squadlogic",
    title: "SquadLogic",
    tagline: "Youth sports league logistics",
    description:
      "Turns a season's worth of registration data into balanced rosters and conflict-free schedules, replacing the spreadsheet juggling that league admins usually do by hand. Built end-to-end with AI agents working under a tight repo-context contract; every roster algorithm change ships with the unit tests that prove it. Backend access is scoped with Postgres row-level security.",
    tech: [
      { name: "React 19", description: "Scheduling dashboard UI" },
      { name: "Vite 6", description: "Frontend build" },
      { name: "TypeScript", description: "Strict types across the app" },
      { name: "Tailwind 4", description: "Styling on top of a custom design system" },
      { name: "Supabase", description: "Postgres + Edge Functions + Auth + Storage" },
      { name: "Vercel", description: "Hosting" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Primary agent for boilerplate + scaffolding" },
      { name: "Claude Code", description: "Pairing on roster + scheduling logic" },
      { name: "GitHub Copilot", description: "Inline suggestions" },
      { name: "Vitest + Playwright BDD", description: "Behavioral specs that gate AI output" },
    ],
    remediation:
      "AI generates the roster algorithm → the Vitest suite checks distribution invariants → AI refines the balancing logic against failures → I review the edge cases before merge.",
    architecture: `[USER INPUT] ---> [REACT 19 FRONTEND]
                        |
                        v
                [ALGORITHMIC ENGINE]
                (Roster Generation)
                        |
                        v
                [SUPABASE BACKEND]
                  (RLS Enforced)`,
    previewUrl: "https://squadlogic.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/SquadLogic",
    liveUrl: "https://squadlogic.secureyour.tech/",
  },
  {
    id: "launch-planner",
    title: "Phased Launch Planner",
    tagline: "Multi-phase workflow tool for volunteer-led org launches",
    description:
      "Walks a volunteer-led organizing team through the full multi-phase workflow of standing up a new local chapter (early planning, core team formation, public launch) with Gantt views, drag-to-reorder tasks, and progress tracking. The whole codebase is intentionally machine-readable: a `repo-context.yaml` map plus per-agent context files (CLAUDE.md, .gemini/) let an agent join cold and ship correctly.",
    tech: [
      { name: "React 19", description: "App shell + routing" },
      { name: "TypeScript", description: "Strict mode end-to-end" },
      { name: "Tailwind 4 + Radix UI", description: "Headless primitives + tokens" },
      { name: "TanStack Query", description: "Server state + caching" },
      { name: "react-hook-form + Zod", description: "Forms validated against Zod schemas" },
      { name: "Supabase", description: "Postgres backend with RLS" },
      { name: "Vercel", description: "Hosting" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Architecture mapping + scaffolding" },
      { name: "Claude Code", description: "Feature drafting + refactors" },
      { name: "repo-context.yaml", description: "Machine-readable repo map agents read first" },
      { name: "Playwright BDD", description: "Behavioral spec gate for every AI-generated feature" },
    ],
    remediation:
      "AI generates a feature against the repo-context map → the Playwright BDD specs run → AI reads the failures and revises → I review the final patch.",
    architecture: `[AI AGENTS] <---> [REPO CONTEXT (.agent/rules)]
                        |
                        v
                [CODE GENERATION]
                        |
                        v
                [PLAYWRIGHT BDD SUITE]
                        | (Fail)
                        +---> [AI REMEDIATION LOOP]
                        | (Pass)
                        v
                [HUMAN SECURITY AUDIT]`,
    // Client engagement: the deployment and repository stay private, so this
    // row is intentionally link-free (no Source, Live site, or embed).
  },
  {
    id: "ai-advocate",
    title: "AI Advocate",
    tagline: "Plain-language California legislation tracker",
    description:
      "Survivors, allies, and advocates tracking California legislation get AI-generated bilingual bill summaries, their representatives' voting records, and one-tap outreach tools, all without signup. Privacy-by-design: no PII collected; anonymous tokens map only to Supabase session IDs. Every write goes through RLS-respecting RPCs or edge functions, so the policy boundary holds even if a client is malicious. Built for the nonprofit Love Never Fails; roughly 30 accounts in use at last count.",
    tech: [
      { name: "Expo Router", description: "iOS, Android, and web from one codebase" },
      { name: "React Native Paper", description: "Accessible UI components" },
      { name: "i18next + Expo Speech", description: "Localization + TTS narration" },
      { name: "Supabase", description: "PostgREST + Edge Functions (Deno/TS) + RLS" },
      { name: "PostgreSQL", description: "pg_cron, pgvector, vault for secrets" },
      { name: "OpenStates / LegiScan / LocationIQ", description: "Legislator + bill + address data" },
    ],
    aiStack: [
      { name: "OpenAI gpt-4o-mini", description: "Bilingual plain-language bill summaries" },
      { name: "text-embedding-3-small", description: "Semantic search over bill text" },
      { name: "Antigravity IDE", description: "Primary agentic dev environment" },
      { name: "Claude Code", description: "RLS policy + edge function authoring" },
    ],
    remediation:
      "AI drafts RLS policies and RPCs → the local Supabase test suite runs → AI analyzes permission leaks → I review before any policy ships.",
    architecture: `[CLIENT (React Native)] ---> [API GATEWAY (Supabase)]
                                    |
                            +-------+-------+
                            |               |
                            v               v
                    [EDGE FUNCTIONS]  [POSTGRES DB]
                            |               |
                            v               v
                    [AI SERVICES]     [RLS POLICIES]`,
    previewUrl: "https://www.ai-advocate.org/",
    githubUrl: "https://github.com/JoelA510/AIAdvocate",
    liveUrl: "https://www.ai-advocate.org/",
  },
  {
    id: "helmets-clash",
    title: "Helmets Clash",
    tagline: "Turn-based hex-strategy game in the browser",
    description:
      "A fantasy strategy prototype that runs entirely in the browser: 2–4 seats (human or AI), four asymmetric factions, procedurally generated hex maps with deterministic seeds, cities, cards, autosave, and full replay support. The typed game core is decoupled from the React view layer, and every rules change lands through a living spec, ADRs, and a development log that AI agents read before touching code.",
    tech: [
      { name: "React 19", description: "View layer over the game core" },
      { name: "TypeScript", description: "Typed domain logic end-to-end" },
      { name: "Vite", description: "Build + dev server" },
      { name: "Tailwind CSS", description: "UI styling" },
    ],
    aiStack: [
      { name: "OpenAI Codex", description: "Task-packet driven implementation" },
      { name: "dev-documentation/", description: "Living spec, roadmap, ADRs, and test plan agents read first" },
      { name: "Vitest + Playwright", description: "Unit/integration + E2E gates on every change" },
      { name: "axe-core", description: "Accessibility checks in the loop" },
    ],
    remediation:
      "Agents work from task packets against a living spec → every change ships with updated Vitest/Playwright coverage and a development-log entry → axe checks the UI → I review before merge.",
    architecture: `[SETUP FLOW] (seats · factions · map · seed)
                        |
                        v
                [TYPED GAME CORE]
        (hex map gen · turn engine · combat
          cities · cards · resources)
                |               |
                v               v
        [REACT 19 UI]   [AUTOSAVE + REPLAY]
        (a11y-checked)    (localStorage)`,
    githubUrl: "https://github.com/JoelA510/helmets-clash-web",
  },
];
