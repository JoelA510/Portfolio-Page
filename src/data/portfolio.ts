export type TechChip = { name: string; description: string };

export type Trait = {
  title: string;
  description: string;
  glyph: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: TechChip[];
  aiStack: TechChip[];
  remediation: string;
  previewUrl: string;
  githubUrl: string;
  liveUrl: string;
};

export const PORTFOLIO = {
  name: "JOEL ABRAHAM",
  title: "TECHNICAL OPERATIONS & SYSTEMS AUTOMATION",
  manifesto:
    "I build practical software for operational workflows: logistics documents, scheduling systems, compliance data, reporting, and secure multi-tenant applications. My work combines hands-on operations experience with SQL, Python, TypeScript, Supabase, and AI-assisted development under strict architecture, schema, and test constraints.",  email: "hire.joel.abraham@gmail.com",
  github: "https://github.com/JoelA510",
  linkedin: "https://linkedin.com/in/joel-abraham-cv",
  traits: [
    {
      title: "Architecture First",
      description:
        "Prioritizing secure system design, scalable data models, and API blueprints before generating code.",
      glyph: "\u25E3",
    },
    {
      title: "Agentic Orchestration",
      description:
        "Mastery of steering complex LLM toolchains via test-driven constraints and precise prompt engineering.",
      glyph: "\u25CE",
    },
    {
      title: "Rigorous Validation",
      description:
        "Enforcing quality through BDD frameworks and E2E Playwright suites to catch AI hallucinations early.",
      glyph: "\u25C8",
    },
  ] satisfies Trait[],
};

export const PROJECTS: Project[] = [
  {
    id: "squadlogic",
    title: "SquadLogic",
    tagline: "Youth sports league logistics",
    description:
      "Turns a season's worth of registration data into balanced rosters and conflict-free schedules — replacing the spreadsheet juggling that league admins usually do by hand. Built end-to-end with AI agents working under a tight repo-context contract; every roster algorithm change ships with the unit tests that prove it.",
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
      "1. AI generates roster algorithm \u2794 2. Vitest unit suite checks distribution invariants \u2794 3. AI refines balancing logic against failures \u2794 4. Human review of edge cases before merge.",
    previewUrl: "https://squadlogic.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/SquadLogic",
    liveUrl: "https://squadlogic.secureyour.tech/",
  },
  {
    id: "planterplan",
    title: "PlanterPlan",
    tagline: "Multi-phase workflow tool for church planters",
    description:
      "Walks church planters through the full multi-phase workflow of launching a new congregation — discernment, core team, public launch — with Gantt views, drag-to-reorder tasks, and progress tracking. The whole codebase is intentionally machine-readable: a `repo-context.yaml` map plus per-agent context files (CLAUDE.md, .gemini/) let an agent join cold and ship correctly.",
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
      "1. AI generates feature against the repo-context map \u2794 2. Playwright BDD specs run \u2794 3. AI reads failures + revises \u2794 4. Human review of the final patch.",
    previewUrl: "https://planterplan.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/PlanterPlan-Alpha",
    liveUrl: "https://planterplan.secureyour.tech",
  },
  {
    id: "ai-advocate",
    title: "AI Advocate",
    tagline: "Plain-language California legislation tracker",
    description:
      "Survivors, allies, and advocates tracking California legislation get AI-generated bilingual bill summaries, their representatives' voting records, and one-tap outreach tools — all without signup. Privacy-by-design: no PII collected; anonymous tokens map only to Supabase session IDs. Every write goes through RLS-respecting RPCs or edge functions, so the policy boundary holds even if a client is malicious.",
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
      "1. AI drafts RLS policies + RPCs \u2794 2. Local Supabase test suite runs \u2794 3. AI analyzes permission leaks \u2794 4. Human review before policy ships.",
    previewUrl: "https://www.ai-advocate.org/",
    githubUrl: "https://github.com/JoelA510/AIAdvocate",
    liveUrl: "https://www.ai-advocate.org/",
  },
  {
    id: "formwaypoint",
    title: "FormWaypoint",
    tagline: "Shipping-document conversion + hybrid search",
    description:
      "Logistics teams convert between shipping document formats (Commercial Invoice → Shipper's Letter of Intention, etc.) and search large shipment archives in sub-second time. Hybrid BM25 + vector retrieval lives in ParadeDB; OCR and field prediction run as a separate Python FastAPI service so the API stays cleanly Hono. Domain-driven vertical slices keep each shipment type contained.",
    tech: [
      { name: "React 19 + TanStack Router", description: "Frontend with type-safe routing" },
      { name: "Hono (Node 24)", description: "API in domain-driven vertical slices" },
      { name: "Prisma 7", description: "ORM (with raw SQL for hybrid search)" },
      { name: "Postgres (Neon) + ParadeDB", description: "BM25 + vector hybrid search" },
      { name: "Python 3.14 FastAPI", description: "OCR + field-prediction service" },
      { name: "Turborepo + pnpm", description: "Monorepo build orchestration" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Monorepo scaffolding + cross-package edits" },
      { name: "Claude Code", description: "Schema design + raw-SQL search query authoring" },
      { name: "Zod", description: "AI-generated runtime type guards at every boundary" },
    ],
    remediation:
      "1. AI drafts Zod schemas + endpoints \u2794 2. Integration tests run against Neon + ParadeDB \u2794 3. AI analyzes type + retrieval mismatches \u2794 4. Human review of validation layers before merge.",
    previewUrl: "https://formwaypoint.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/FormWaypoint",
    liveUrl: "https://formwaypoint.secureyour.tech",
  },
];
