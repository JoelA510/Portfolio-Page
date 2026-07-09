import { PROJECTS } from "./portfolio";

export type EntryLink = { label: string; url: string };

export type Entry = {
  id: string;
  /** Drives the meta-column label: Employer / Organization / Project. */
  kind: "job" | "volunteer" | "project";
  org: string;
  role: string;
  location?: string;
  period: string;
  /** Meta-column focus tags, same role as a Project's tech/aiStack chips. */
  tags: string[];
  tagline: string;
  bullets: string[];
  links?: EntryLink[];
};

export type Trait = { title: string; description: string };

export type Domain = {
  id: string;
  /** Short label for the tab selector. */
  navLabel: string;
  heroStatus: string;
  heroTitle: string;
  heroLede: string;
  certifications?: string[];
  workHeading: string;
  workLabel: string;
  entries: Entry[];
  traits: Trait[];
  contactHeadline: string;
};

const aiAdvocate = PROJECTS.find((p) => p.id === "ai-advocate");
const formWaypoint = PROJECTS.find((p) => p.id === "formwaypoint");

export const CYBERSECURITY: Domain = {
  id: "cybersecurity",
  navLabel: "Cybersecurity",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Security-minded operator, translating risk into controls that hold.",
  heroLede:
    "Seven-plus years driving compliance, access control, and risk mapping across regulated logistics and software. I read the logs, map the risk to a control, and ship the fix — not just the finding.",
  certifications: [
    "CompTIA Security+",
    "ISC2 Certified in Cybersecurity (CC)",
    "Cybersecurity Pre-Apprenticeship — ITBiz Tech Academy",
  ],
  workHeading: "Security & risk work",
  workLabel: "3 roles & projects",
  entries: [
    {
      id: "cyber-ai-advocate",
      kind: "project",
      org: "AI Advocate",
      role: "Founder & Security Architect",
      period: "2023 – Present",
      tags: ["Supabase RLS", "Edge Functions", "Least Privilege", "PII Risk Register"],
      tagline: "Privacy-by-design civic tech app — no PII collected, policy enforced at the database layer.",
      bullets: [
        "Implemented Supabase Row-Level Security policies and RLS-respecting RPCs/edge functions so the access boundary holds even against a malicious client.",
        "Defined a risk register for product and data risks (PII exposure, access rules) and tied each entry to a control and a monitoring signal.",
        "Anonymous session tokens replace PII entirely — survivors and advocates use the app with zero signup and zero identity exposure.",
      ],
      links: aiAdvocate
        ? [
            { label: "Source", url: aiAdvocate.githubUrl },
            { label: "Live site", url: aiAdvocate.liveUrl },
          ]
        : undefined,
    },
    {
      id: "cyber-omron",
      kind: "job",
      org: "Omron Robotics & Safety Technologies",
      role: "Logistics Specialist II (Risk & Compliance Focus)",
      location: "Pleasanton, CA",
      period: "2022 – Present",
      tags: ["Compliance", "Risk Mapping", "Audit Evidence", "SQL"],
      tagline: "Led risk/compliance workflows for global shipments across APAC, EMEA, and LATAM.",
      bullets: [
        "Standardized shipping classifications and pre-clearance logic checks, cutting customs holds and reaching 99% compliance across regions.",
        "Mapped operational risks to SOPs and built audit-ready evidence packets, reducing reactive fixes and rework.",
        "Built real-time KRI/KPI dashboards in SQL to track defect rates and drive corrective action in weekly operations reviews.",
        "Partnered with vendors to triage incidents, document root cause, and track remediation to closure.",
      ],
    },
    {
      id: "cyber-pilgrim",
      kind: "job",
      org: "Pilgrim Learning Academy",
      role: "IT System Administrator (Access Control Focus)",
      location: "Castro Valley, CA",
      period: "Oct 2023 – Present",
      tags: ["Access Control", "SOPs", "Endpoint Security", "Automation"],
      tagline: "Standardized baseline access policies across a 12+ endpoint campus.",
      bullets: [
        "Engineered standardized naming conventions and baseline access controls (SOPs) for hardware lifecycle management.",
        "Documented joiner/mover/leaver procedures to cut access-related tickets and keep provisioning auditable.",
        "Automated device provisioning and recurring reporting in Python, improving audit readiness.",
      ],
    },
  ],
  traits: [
    {
      title: "Controls over check-boxes",
      description:
        "Every requirement maps to an actual control and an audit trail — not a policy document nobody reads.",
    },
    {
      title: "Least privilege by default",
      description:
        "Access starts locked down. Every exception is documented, time-boxed, and reviewed.",
    },
    {
      title: "Root cause, then remediation",
      description:
        "Every incident gets triaged to its actual cause before I call it closed — not just patched at the symptom.",
    },
  ],
  contactHeadline: "Looking for someone who treats access control as a first-class citizen?",
};

export const IT: Domain = {
  id: "it",
  navLabel: "IT",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "IT systems administrator who automates the boring parts and documents everything.",
  heroLede:
    "Over a decade keeping Windows, ChromeOS, Android, and cloud infrastructure patched, provisioned, and running — from a single-admin K-8 campus to cloud migrations. I write the script that saves the next setup 40% of the time, and the SOP that makes it repeatable.",
  certifications: ["CompTIA A+", "AWS Certified Cloud Practitioner"],
  workHeading: "Systems & support work",
  workLabel: "2 roles",
  entries: [
    {
      id: "it-pilgrim",
      kind: "job",
      org: "Pilgrim Learning Academy",
      role: "IT System Administrator",
      location: "Castro Valley, CA",
      period: "Oct 2023 – Present",
      tags: ["Endpoint Management", "Python Automation", "Networking", "Windows / ChromeOS / Android"],
      tagline: "Sole IT admin for a K-8 campus running 12+ multi-platform endpoints.",
      bullets: [
        "Developed Python-based provisioning scripts for 12+ endpoints (Windows, Android, ChromeOS), cutting administrative setup time by 40%.",
        "Configure and secure campus-wide network devices and printing infrastructure, maintaining high availability for educational operations.",
        "Diagnose network issues end-to-end to minimize downtime, and standardized asset naming and SOPs for hardware lifecycle management.",
      ],
    },
    {
      id: "it-brightworld",
      kind: "job",
      org: "Bright World Preschool",
      role: "IT Support Technician",
      location: "Castro Valley, CA",
      period: "June 2010 – May 2021",
      tags: ["End-user Support", "Cloud Migration", "VPN / Remote Access"],
      tagline: "End-user hardware and malware support, plus a migration to cloud infrastructure.",
      bullets: [
        "Provided end-user support for hardware failures and malware remediation across the organization.",
        "Migrated on-prem data to AWS and Google Cloud.",
        "Implemented VPN and remote-access solutions for distributed staff.",
      ],
    },
  ],
  traits: [
    {
      title: "Automate the repeatable, document the rest",
      description: "If I do it twice, it becomes a script. If I do it once, it becomes an SOP.",
    },
    {
      title: "Fix it so it doesn't come back",
      description: "Root-cause troubleshooting over band-aids, even under ticket-queue pressure.",
    },
    {
      title: "Plan for the next person",
      description:
        "Naming conventions, access baselines, and asset trackers exist so whoever inherits the system isn't guessing.",
    },
  ],
  contactHeadline: "Need an IT admin who automates the busywork and documents the rest?",
};

export const LOGISTICS: Domain = {
  id: "logistics",
  navLabel: "Logistics",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Logistics operator who turns warehouse chaos into auditable process.",
  heroLede:
    "Fourteen years bridging physical operations and the systems that track them — from IBM AS/400 automation on a barcode-scanner fleet to real-time compliance dashboards for a global robotics supply chain. I've been the person keeping shipments moving and the numbers honest.",
  workHeading: "Logistics & operations work",
  workLabel: "4 roles & projects",
  entries: [
    {
      id: "logistics-omron",
      kind: "job",
      org: "Omron Robotics & Safety Technologies",
      role: "Logistics Specialist II",
      location: "Pleasanton, CA",
      period: "2022 – Present",
      tags: ["Global Shipping", "Compliance", "SQL Dashboards", "Vendor Coordination"],
      tagline: "Standardized international shipping classifications and cut customs holds to a 99% compliance rate.",
      bullets: [
        "Standardized shipping classifications across APAC/EMEA/LATAM and built pre-clearance logic checks that reduced customs holds.",
        "Built real-time KRI/KPI dashboards in SQL to track defect rates and drive corrective action in weekly operations reviews.",
        "Partnered with engineering and vendors to triage shipping exceptions and track root-cause remediation to closure.",
        "Manages the exception tracker end-to-end for the AMR fleet's global shipments.",
      ],
    },
    {
      id: "logistics-xgsi",
      kind: "job",
      org: "Xpress Global Systems (XGSI)",
      role: "Operations Specialist",
      location: "Hayward, CA",
      period: "Aug 2010 – May 2017",
      tags: ["IBM AS/400 CL", "Legacy Automation", "Fleet Hardware", "Customer Service"],
      tagline: "Automated reporting on IBM AS/400 and kept a 24/7 scanner fleet running for seven years.",
      bullets: [
        "Mastered IBM AS/400 Control Language to automate manual reporting and data entry, cutting monthly processing time by 37.5%.",
        "Maintained 24/7 reliability for handheld barcode scanners and terminal equipment in a high-volume logistics environment.",
        "Coordinated with drivers and customers and resolved 200+ service queries weekly.",
      ],
    },
    {
      id: "logistics-formwaypoint",
      kind: "project",
      org: "FormWaypoint",
      role: "Backend / Platform Engineer",
      period: "2026",
      tags: ["Shipping Document Conversion", "Hybrid Search", "Domain-Driven Design"],
      tagline: "Logistics teams convert shipping document formats and search shipment archives in sub-second time.",
      bullets: [
        "Rebuilt a legacy logistics platform into a high-performance monorepo (Hono + Prisma + ParadeDB) with hybrid BM25 + vector search over shipment data.",
        "Kept OCR and field-prediction isolated in a separate Python service so the core API stays cleanly typed end-to-end.",
      ],
      links: formWaypoint
        ? [
            { label: "Source", url: formWaypoint.githubUrl },
            { label: "Live site", url: formWaypoint.liveUrl },
          ]
        : undefined,
    },
    {
      id: "logistics-cvsc",
      kind: "volunteer",
      org: "Castro Valley Soccer Club",
      role: "Director of Scheduling (Board Member)",
      period: "2021 – Present",
      tags: ["Scheduling", "Contingency Planning", "Process Standardization"],
      tagline: "Orchestrated conflict-free schedules for ~1,400 players across 130 teams.",
      bullets: [
        "Built conflict-free schedules with contingency plans for field closures and weather.",
        "Standardized intake and change-control processes, and ran season retrospectives.",
      ],
    },
  ],
  traits: [
    {
      title: "Compliance is a process, not a scramble",
      description:
        "Pre-clearance checks and standardized classifications happen before the shipment moves, not after it's held.",
    },
    {
      title: "Metrics drive the fix",
      description:
        "Every KRI/KPI dashboard exists to change a decision in the next ops review, not to look good in a slide.",
    },
    {
      title: "The fleet doesn't stop for me",
      description:
        "Whether it's an AS/400 terminal or an AMR shipment, uptime is the job — I triage and keep it moving.",
    },
  ],
  contactHeadline: "Need someone who turns messy shipping data into a clean, auditable process?",
};

export const MAINTENANCE: Domain = {
  id: "maintenance",
  navLabel: "Building Maintenance",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Facilities technician who keeps buildings, security systems, and the paperwork honest.",
  heroLede:
    "Nine years maintaining a multi-use campus — electrical fixtures, plumbing, security hardware, and the preventive-maintenance schedules that keep a small fix from becoming an emergency work order.",
  workHeading: "Facilities & maintenance work",
  workLabel: "1 role · since 2017",
  entries: [
    {
      id: "maintenance-redwood",
      kind: "job",
      org: "Redwood Chapel Community Church",
      role: "Custodian / Facilities Technician",
      location: "Castro Valley, CA",
      period: "Feb 2017 – Present",
      tags: ["Electrical", "Plumbing", "Security Hardware", "Preventive Maintenance"],
      tagline: "Hands-on repairs and security systems across multi-use campus facilities.",
      bullets: [
        "Executed hands-on repairs for building infrastructure — electrical fixtures (switches, outlets, 120V/240V lighting) and plumbing components.",
        "Configured and maintained campus surveillance (Hikvision CCTV) and communication systems (Baofeng radios), coordinating vendors for complex high-voltage work.",
        "Standardized daily/weekly preventive-maintenance checklists and built an inventory tracker, reducing reactive fixes and stockouts.",
        "Triaged work requests with clear priorities and SLAs across a multi-campus facility footprint.",
      ],
    },
  ],
  traits: [
    {
      title: "Preventive over reactive",
      description:
        "Standardized PM checklists catch the small failure before it becomes an emergency work order.",
    },
    {
      title: "Safety-first on live systems",
      description:
        "Electrical, plumbing, and security hardware get the same access-control mindset as any production system.",
    },
    {
      title: "The building doesn't know it's after hours",
      description:
        "Vendor coordination, inventory tracking, and triage happen on whatever schedule keeps the campus safe and running.",
    },
  ],
  contactHeadline: "Need someone who keeps the building running and the maintenance log honest?",
};

export const DOMAINS: Domain[] = [CYBERSECURITY, IT, LOGISTICS, MAINTENANCE];

export type HomeTrait = Trait;

export const HOME = {
  navLabel: "Home",
  heroStatus: "Open to full-time roles and project work",
  heroTitle:
    "Fourteen years bridging code, infrastructure, and the physical systems that keep organizations running.",
  heroLede:
    "I've moved between warehouse floors, IT closets, security consoles, and AI-directed software delivery — always the person who turns a mess into a documented, auditable process. Pick a focus below, or read the whole story across every tab.",
  workHeading: "Explore my work",
  workLabel: "5 focus areas",
  traits: [
    {
      title: "Documented, not tribal knowledge",
      description:
        "SOPs, checklists, and schemas exist before I call anything done, so the next person isn't guessing.",
    },
    {
      title: "Root cause over quick fix",
      description:
        "Customs hold, security policy, or a leaking faucet — I trace back to why it happened before I close it out.",
    },
    {
      title: "Comfortable at both ends of the stack",
      description:
        "Physical plant to cloud infrastructure — I move between them without needing a translator.",
    },
  ] satisfies Trait[],
  contactHeadline: "Not sure which hat fits the role you're hiring for?",
};

export type TabId = "home" | "cybersecurity" | "software" | "it" | "logistics" | "maintenance";

export type HubCard = {
  tabId: TabId;
  name: string;
  teaser: string;
  blurb: string;
  focus: string;
};

export type TabMeta = { id: TabId; navLabel: string };

export const TABS: TabMeta[] = [
  { id: "home", navLabel: HOME.navLabel },
  { id: "cybersecurity", navLabel: CYBERSECURITY.navLabel },
  { id: "software", navLabel: "Software Engineering" },
  { id: "it", navLabel: IT.navLabel },
  { id: "logistics", navLabel: LOGISTICS.navLabel },
  { id: "maintenance", navLabel: MAINTENANCE.navLabel },
];

export const TAB_IDS: TabId[] = TABS.map((t) => t.id);

export function getDomain(id: TabId): Domain | undefined {
  return DOMAINS.find((d) => d.id === id);
}

export const HUB_CARDS: HubCard[] = [
  {
    tabId: "cybersecurity",
    name: "Cybersecurity",
    teaser: "Security+, ISC2 CC, and access control that holds under a hostile client.",
    blurb:
      "Row-level security, risk registers, and pre-clearance compliance checks — translating risk into controls that survive an audit.",
    focus: "Access control · risk mapping · RLS",
  },
  {
    tabId: "software",
    name: "Software Engineering",
    teaser: "Production software built by directing AI agents through constraints defined up front.",
    blurb:
      "Four shipped, deployed apps — architecture and test suites first, AI agents executing against them, human review before merge.",
    focus: "React · TypeScript · Supabase · AI-directed delivery",
  },
  {
    tabId: "it",
    name: "IT",
    teaser: "CompTIA A+, AWS Certified Cloud Practitioner, and a decade of endpoint administration.",
    blurb:
      "Provisioning automation, network administration, and cloud migrations across Windows, ChromeOS, and Android fleets.",
    focus: "Endpoint management · automation · cloud",
  },
  {
    tabId: "logistics",
    name: "Logistics",
    teaser: "From AS/400 terminals to a global robotics supply chain's compliance dashboards.",
    blurb:
      "Fourteen years keeping shipments moving and the numbers honest — classification standardization, exception tracking, and scheduling at scale.",
    focus: "Global shipping · compliance · SQL dashboards",
  },
  {
    tabId: "maintenance",
    name: "Building Maintenance",
    teaser: "Electrical, plumbing, and security hardware — with a preventive-maintenance mindset.",
    blurb:
      "Nine years of hands-on facility repairs and surveillance/comms systems management across a multi-use campus.",
    focus: "Electrical · plumbing · security hardware",
  },
];
