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
  architecture: string;
};

export const PORTFOLIO = {
  name: "JOEL ABRAHAM",
  title: "AI-AUGMENTED SOFTWARE ENGINEER",
  manifesto:
    "I build production software by directing AI agents through rigorous constraints \u2014 architecture, schemas, and test suites I define up front. The agents ship the code; the design discipline is mine. The result is high-velocity engineering without the hallucination tax: systems that pass their tests, survive their audits, and hold up under real users.",
  email: "hire.joel.abraham@gmail.com",
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
    tagline: "Youth sports roster & scheduling platform",
    description:
      "Directed the modernization of a full-stack scheduling application utilizing AI coding assistants. Engineered robust prompt frameworks and repository context guidelines to steer AI outputs.",
    tech: [
      { name: "React 18", description: "UI library for scheduling dashboard" },
      { name: "Vite", description: "Fast frontend build tool" },
      { name: "TypeScript", description: "Static typing for robustness" },
      { name: "Supabase", description: "Managed backend and RLS enforcement" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Agent driving boilerplate generation" },
      { name: "Claude Code", description: "AI pairing for drafting roster algorithms" },
      { name: "GitHub Copilot", description: "Tactical inline code suggestions" },
    ],
    remediation:
      "1. AI generates roster algorithm \u2794 2. Automated unit tests verify distribution \u2794 3. AI refines balancing logic \u2794 4. Human review of edge cases.",
    previewUrl: "https://squadlogic.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/SquadLogic",
    liveUrl: "https://squadlogic.secureyour.tech/",
    architecture: `[USER INPUT] ---> [REACT 18 FRONTEND]
                        |
                        v
                [ALGORITHMIC ENGINE]
                (Roster Generation)
                        |
                        v
                [SUPABASE BACKEND]
                  (RLS Enforced)`,
  },
  {
    id: "planterplan",
    title: "PlanterPlan",
    tagline: "Agentic project management platform",
    description:
      "Orchestrated agentic AI models to rapidly architect and scale a React/TypeScript project management platform. Formulated comprehensive context rules and implemented strict BDD testing protocols via Playwright to autonomously verify AI-generated logic.",
    tech: [
      { name: "React", description: "Frontend framework for project management UI" },
      { name: "TypeScript", description: "Ensures safe state transitions" },
    ],
    aiStack: [
      { name: "Antigravity", description: "Autonomous architecture mapping" },
      { name: "Claude Code", description: "Complex unit test drafting" },
      { name: "Playwright BDD", description: "Automated verification of AI constraints" },
    ],
    remediation:
      "1. AI generates feature \u2794 2. Automated Playwright suite runs \u2794 3. AI analyzes test failures \u2794 4. Human review of the final patch.",
    previewUrl: "https://planterplan.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/PlanterPlan-Alpha",
    liveUrl: "https://planterplan.secureyour.tech",
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
  },
  {
    id: "ai-advocate",
    title: "AI Advocate",
    tagline: "Cross-platform accessibility app",
    description:
      "Cross-platform mobile/web application focusing on accessibility and AI interaction. Engineered a secure backend schema with granular Row Level Security (RLS) policies to ensure strict multi-tenant data privacy.",
    tech: [
      { name: "React Native", description: "Cross-platform mobile framework" },
      { name: "Expo", description: "React Native toolchain" },
      { name: "Supabase", description: "PostgreSQL-backed API and auth layer" },
      { name: "PostgreSQL", description: "Relational database for storing schemas" },
      { name: "Edge Functions", description: "Serverless backend logic execution" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Primary agentic development environment" },
      { name: "Claude Code", description: "AI assistant for security policy generation" },
      { name: "GitHub Copilot", description: "Inline context-aware auto-completion" },
    ],
    remediation:
      "1. AI generates RLS policies \u2794 2. Automated Supabase local tests run \u2794 3. AI analyzes permission leaks \u2794 4. Human review of final security patch.",
    previewUrl: "https://www.ai-advocate.org/",
    githubUrl: "https://github.com/JoelA510/AIAdvocate",
    liveUrl: "https://www.ai-advocate.org/",
    architecture: `[CLIENT (React Native)] ---> [API GATEWAY (Supabase)]
                                    |
                            +-------+-------+
                            |               |
                            v               v
                    [EDGE FUNCTIONS]  [POSTGRES DB]
                            |               |
                            v               v
                    [AI SERVICES]     [RLS POLICIES]`,
  },
  {
    id: "formwaypoint",
    title: "FormWaypoint",
    tagline: "Hybrid-search logistics monorepo",
    description:
      "Enterprise data processing monorepo. Implemented hybrid search (BM25 + vector) using ParadeDB to enable sub-second retrieval across large shipment and logistics datasets. Designed underlying data schemas and Zod validation layers.",
    tech: [
      { name: "Hono (Node.js)", description: "Fast, lightweight web framework for APIs" },
      { name: "Prisma", description: "Next-generation ORM" },
      { name: "ParadeDB", description: "Postgres extension for hybrid vector search" },
      { name: "Turborepo", description: "High-performance monorepo build system" },
      { name: "TypeScript", description: "Strict typing across full-stack packages" },
    ],
    aiStack: [
      { name: "Antigravity IDE", description: "Core scaffolding and monorepo setup" },
      { name: "Claude Code", description: "Schema analyzer and config optimizer" },
      { name: "Zod Validation", description: "AI-generated runtime type guards" },
    ],
    remediation:
      "1. AI generates Zod schemas & endpoints \u2794 2. Automated integration tests run \u2794 3. AI analyzes type mismatches \u2794 4. Human review of data validation layers.",
    previewUrl: "https://formwaypoint.secureyour.tech",
    githubUrl: "https://github.com/JoelA510/FormWaypoint",
    liveUrl: "https://formwaypoint.secureyour.tech",
    architecture: `[LOGISTICS DATA] ---> [HONO API (Node.js)]
                                |
                                v
                        [PRISMA ORM]
                                |
                                v
                        [PARADEDB]
                (Hybrid Search: BM25 + Vector)`,
  },
];
