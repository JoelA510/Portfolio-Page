export type TechChip = { name: string; description: string };

export type Trait = {
  title: string;
  description: string;
};

export type ArchNode = { label: string; note?: string };
/** One row of the diagram; nodes in a layer sit side by side. */
export type ArchLayer = ArchNode[];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  /** One or two sentences, always shown. */
  summary: string;
  /** The longer account, behind the "Details" toggle. */
  description: string;
  tech: TechChip[];
  aiStack: TechChip[];
  /** One-line "Process:" summary of the AI → test → review loop. */
  remediation: string;
  /** Architecture, read top to bottom: each layer feeds the one below it. */
  architecture: ArchLayer[];
  /** Absent when the project has no public deployment to embed. */
  previewUrl?: string;
  /** Absent when the source repository isn't public. */
  githubUrl?: string;
  /** Absent when the project has no public deployment to link. */
  liveUrl?: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  /** Who acts at this step. */
  owner: "me" | "agent" | "automated";
};

export type ProcessRule = {
  /** What unstructured AI coding does. */
  instead: string;
  /** What these repositories require. */
  rule: string;
  /** Where the rule is written, so a reader can check it. */
  source: { label: string; href: string };
};

const TEMPLATE = "https://github.com/JoelA510/agent-ready-template/blob/main";

/** "How a change ships": the loop every project on this tab is built under. */
export const PROCESS_STEPS: ProcessStep[] = [
  { title: "Define", description: "The workflow, and how it fails.", owner: "me" },
  { title: "Plan", description: "Agreed before a large change.", owner: "me" },
  { title: "Build", description: "An agent writes the code under written rules.", owner: "agent" },
  { title: "Gates", description: "Types, lint, tests, build.", owner: "automated" },
  { title: "Review", description: "Adversarial, and separate from the author.", owner: "agent" },
  { title: "Merge", description: "I approve once every check is green.", owner: "me" },
];

export const PROCESS_RULES: ProcessRule[] = [
  {
    instead: "Prompt until it looks right",
    rule: "A written plan is agreed before a large change.",
    source: { label: "prompts/plan-change.md", href: `${TEMPLATE}/prompts/plan-change.md` },
  },
  {
    instead: "\u201cTests pass\u201d",
    rule: "A new check is shown failing on a planted defect before it is trusted.",
    source: { label: "AGENTS.md", href: `${TEMPLATE}/AGENTS.md` },
  },
  {
    instead: "\u201cIt works\u201d",
    rule: "Every claim is labeled statically reviewed, executed, or fully validated.",
    source: { label: "AGENTS.md", href: `${TEMPLATE}/AGENTS.md` },
  },
  {
    instead: "The author reviews its own work",
    rule: "A separate adversarial review before merge.",
    source: { label: "prompts/review.md", href: `${TEMPLATE}/prompts/review.md` },
  },
  {
    instead: "Rules live in a chat window",
    rule: "Rules live in the repository, in one file every agent reads.",
    source: { label: "ADR 0007", href: `${TEMPLATE}/docs/adr/0007-agents-md-with-claude-import.md` },
  },
  {
    instead: "Guess when unsure",
    rule: "A compliance value is never inferred, and a blank is never treated as zero.",
    source: {
      label: "FormWaypoint AGENTS.md",
      href: "https://github.com/JoelA510/FormWaypoint/blob/main/AGENTS.md",
    },
  },
];

export const PORTFOLIO = {
  name: "Joel Abraham",
  email: "hire.joel.abraham@gmail.com",
  github: "https://github.com/JoelA510",
  linkedin: "https://linkedin.com/in/joel-abraham-cv",
  /** Shown in the footer. Change it when the content is next revised. */
  contentUpdated: "November 2026",
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
    summary:
      "Turns a commercial invoice and packing list into a completed carrier form without the shipment ever leaving the machine. It checks every figure against the totals printed on the document, and leaves a value blank before it will guess one.",
    description:
      "Turns a combined commercial invoice and packing list into a completed carrier Shipper's Letter of Instruction without the shipment ever leaving the machine: the CIPL is parsed locally, the carrier's real blank form is filled locally, and there is no backend to send anything to. Three CIPL formats and two carrier adapters (Nippon Express, CEVA) ship today; FedEx and UPS get keying sheets ordered the way Ship Manager and WorldShip prompt, because a mismatched import map fails silently. Every Schedule B number is validated against the Census Bureau AES concordance, and every quantity, weight, and value has to sum back to the totals printed on the source before a form is generated. It also classifies lithium batteries for air and prepares a Shipper's Declaration for Dangerous Goods for a qualified person to check and sign; that output is marked unverified until someone does. What it refuses to do is the design: it never assigns EAR99 because no ECCN appeared, never converts an HTSUS number into a Schedule B number, and never treats a blank field as zero. Over a thousand tests hold that line, and the suites that replay six real shipments take their expected values from the SLIs a person filed by hand; it also ships as a Windows desktop build, where the desktop shell refreshes the Census dataset a browser is not allowed to fetch.",
    tech: [
      { name: "React 19", description: "Review and output UI" },
      { name: "TypeScript", description: "Strict types across the domain layer, no escape hatches" },
      { name: "Vite 8", description: "Build + dev server" },
      { name: "pdfjs-dist", description: "Position-aware CIPL text extraction, no OCR" },
      { name: "pdf-lib", description: "Fills the carrier's real blank form, unsigned" },
      { name: "IndexedDB", description: "The only store; nothing is uploaded" },
      { name: "Tauri 2", description: "Windows desktop shell + Census dataset refresh" },
    ],
    aiStack: [
      { name: "AGENTS.md", description: "Always-on operating and project rules every coding agent reads first" },
      { name: "Agent Skills", description: "Named workflows for planning, root-causing, review, and pre-PR checks" },
      { name: "CI on every PR", description: "Typecheck, lint, tests, and build, plus the desktop shell's own checks on Windows" },
      { name: "Vitest", description: "1,000+ test regression suite gating every change" },
    ],
    remediation:
      "AI works against always-on rules that forbid inferring any compliance value → the suite replays six real shipments against the SLIs filed for them → a failure is read as a rule violation, not a test to relax → one check command (typecheck, lint, tests, build) is the single gate, run identically in CI and by me before merge.",
    architecture: [
      [{ label: "Invoice and packing list", note: "PDF or workbook" }],
      [{ label: "Format registry", note: "Detects the layout, picks its parser" }],
      [{ label: "Reconciler", note: "Figures must sum back to the printed totals" }],
      [{ label: "Schedule B check", note: "Census AES concordance" }, { label: "Item library", note: "Weights and codes" }],
      [{ label: "Carrier adapter", note: "Nippon Express, CEVA, keying sheets" }],
      [{ label: "Filled form", note: "Unsigned, for a person to review" }],
    ],
    githubUrl: "https://github.com/JoelA510/FormWaypoint",
  },
  {
    id: "squadlogic",
    title: "SquadLogic",
    tagline: "Youth sports league scheduling",
    summary:
      "Turns a league's registration export into balanced teams and conflict-aware practice and game schedules. It is an administrator's tool: coaches and families never sign in.",
    description:
      "Replaces the spreadsheet juggling that league admins usually do by hand. A published game is pinned, so regenerating the schedule never moves it, and a game that cannot be placed is flagged with a reason instead of being dropped. Every scheduling change is run against an anonymized full-season regression set before it merges. Built with AI agents working under written rules in the repository; backend access is scoped with Postgres row-level security, and the app stores no birthdates or guardian contacts.",
    tech: [
      { name: "React 19", description: "Scheduling dashboard UI" },
      { name: "Vite 8", description: "Frontend build" },
      { name: "TypeScript", description: "Strict types across the app" },
      { name: "Tailwind 4", description: "Styling on top of a custom design system" },
      { name: "Supabase", description: "Postgres + Edge Functions + Auth" },
      { name: "Vercel", description: "Hosting" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Primary agent for boilerplate + scaffolding" },
      { name: "Claude Code", description: "Pairing on roster + scheduling logic" },
      { name: "GitHub Copilot", description: "Inline suggestions" },
      { name: "Vitest + Playwright BDD", description: "Behavioral specs that gate AI output" },
    ],
    remediation:
      "A plan is agreed before any change to the solver → the agent builds against it → the season regression set and six required checks run → an adversarial review → I approve the merge.",
    architecture: [
      [{ label: "Registration export" }],
      [{ label: "Import validation", note: "Keeps allowlisted columns only" }],
      [{ label: "Team generation", note: "Balanced rosters" }, { label: "Schedule generation", note: "Practices and games; published games stay pinned" }],
      [{ label: "Audited RPCs", note: "Every state change is logged" }],
      [{ label: "Postgres", note: "Row-level security on every table" }],
    ],
    previewUrl: "https://squadlogic.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/SquadLogic",
    liveUrl: "https://squadlogic.secureyour.tech/",
  },
  {
    id: "ai-advocate",
    title: "AI Advocate",
    tagline: "Plain-language California legislation tracker",
    summary:
      "Survivors, allies, and advocates get plain-language bill summaries in English and Spanish, their representatives' voting records, and outreach tools, all without signing up. Built for the nonprofit Love Never Fails.",
    description:
      "No name, email, or account is collected: what the app stores (saved bills, reactions, vote alerts, and a push token for users who allow notifications) is tied to an anonymous session. An address typed into representative lookup goes to a geocoding provider and is not tied to the session. Writes go through RLS-respecting RPCs or Edge Functions. Bill text and status come from the California Legislature's public data archive, with fallbacks. Its risks, controls, and open gaps are written down in a risk register in the repository. Roughly 30 accounts in use at last count.",
    tech: [
      { name: "Expo Router", description: "iOS, Android, and web from one codebase" },
      { name: "React Native Paper", description: "Accessible UI components" },
      { name: "i18next + Expo Speech", description: "Localization + TTS narration" },
      { name: "Supabase", description: "PostgREST + Edge Functions (Deno/TS) + RLS" },
      { name: "PostgreSQL", description: "pg_cron, pgvector, vault for secrets" },
      { name: "CA Legislature archive / LegiScan / OpenStates", description: "Bill text and status, with fallbacks; legislators and votes" },
    ],
    aiStack: [
      { name: "OpenAI gpt-4o-mini", description: "Bilingual plain-language bill summaries" },
      { name: "text-embedding-3-small", description: "Semantic search over bill text" },
      { name: "Antigravity IDE", description: "Primary agentic dev environment" },
      { name: "Claude Code", description: "RLS policy + edge function authoring" },
    ],
    remediation:
      "AI drafts RLS policies and RPCs → the local Supabase test suite runs → AI analyzes permission leaks → I review before any policy ships.",
    architecture: [
      [{ label: "CA Legislature archive", note: "Primary source" }, { label: "LegiScan", note: "Fallback" }, { label: "OpenStates", note: "Legislators and votes" }],
      [{ label: "Scheduled Edge Functions", note: "Ingest, refresh status, sync votes" }],
      [{ label: "Postgres", note: "Row-level security, pgvector" }, { label: "OpenAI", note: "Summaries and embeddings" }],
      [{ label: "RPCs and row-level security", note: "Every client read and write is checked" }],
      [{ label: "Expo app", note: "iOS, Android, web; anonymous sessions" }],
    ],
    previewUrl: "https://www.ai-advocate.org/",
    githubUrl: "https://github.com/JoelA510/AIAdvocate",
    liveUrl: "https://www.ai-advocate.org/",
  },
  {
    id: "agent-ready-template",
    title: "agent-ready-template",
    tagline: "The process the other projects are built under",
    summary:
      "A project template for AI-driven development: agents write most of the code, and the template supplies the prompts, checks, and standards that keep that work honest. A check counts only after it has been shown failing on a planted defect.",
    description:
      "One half is process: prompts, workflow skills for planning, root-causing, adversarial review and pre-merge checks, architecture decision records, and a catalog of standards that scores a repository. A script delivers them into other repositories and, on a re-run, updates only the files the target has not edited. The other half is an interface starter: design tokens and accessible React primitives in one Storybook. FormWaypoint and SquadLogic take their workflow from it. Its trial runs, including the ones where its own scorecard was wrong, are logged in the repository.",
    tech: [
      { name: "TypeScript", description: "Scripts, checks, and components" },
      { name: "React 19", description: "Accessible UI primitives" },
      { name: "Radix UI + Tailwind 4", description: "Headless primitives + design tokens" },
      { name: "Style Dictionary", description: "Compiles the design tokens" },
      { name: "Storybook", description: "Components and their rationale in one place" },
    ],
    aiStack: [
      { name: "AGENTS.md", description: "One rules file every coding agent reads" },
      { name: "Agent Skills", description: "Named workflows: plan, root-cause, review, pre-PR, verify" },
      { name: "Standards catalog", description: "Scored checks, grouped by stack" },
      { name: "Planted-defect tests", description: "Every check is proven able to fail" },
    ],
    remediation:
      "A gap found in one repository is proven failing there → generalized into a standard with a probe → the probe is tested against a planted defect → every repository is measured against it.",
    architecture: [
      [{ label: "Prompts" }, { label: "Workflow skills" }, { label: "Standards" }],
      [{ label: "Delivery script", note: "Updates only the files the target has not edited" }],
      [{ label: "Target repository" }],
      [{ label: "Conformance scorecard", note: "Each standard: pass, fail, or not applicable" }],
    ],
    githubUrl: "https://github.com/JoelA510/agent-ready-template",
    liveUrl: "https://joela510.github.io/agent-ready-template/",
  },
  {
    id: "helmets-clash",
    title: "Helmets Clash",
    tagline: "Turn-based hex-strategy game in the browser",
    summary:
      "A fantasy strategy prototype that runs in the browser: 2 to 4 seats (human or AI), four asymmetric factions, and hex maps generated from a seed.",
    description:
      "Cities, cards, autosave, and full replay support. The typed game core is decoupled from the React view layer, and every rules change lands through a living spec, ADRs, and a development log that AI agents read before touching code.",
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
    architecture: [
      [{ label: "Setup", note: "Seats, factions, map, seed" }],
      [{ label: "Typed game core", note: "Map generation, turn engine, combat, cities, cards" }],
      [{ label: "React UI", note: "Accessibility-checked" }, { label: "Autosave and replay", note: "Stored in the browser" }],
    ],
    githubUrl: "https://github.com/JoelA510/helmets-clash-web",
  },
];
