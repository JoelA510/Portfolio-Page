import { PROJECTS } from "./portfolio";
import type { Trait } from "./portfolio";

export type { Trait };

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

export type TabId = "home" | "cybersecurity" | "software" | "it" | "logistics" | "maintenance";

export type Domain = {
  id: Exclude<TabId, "home" | "software">;
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

// Each of these jobs appears in two different domains' entries (once framed
// for that domain's focus) — a single shared constant means a date fix only
// has to happen once instead of drifting between the two copies.
const OMRON_PERIOD = "May 2025 – Present";
const PILGRIM_PERIOD = "Oct 2023 – Apr 2025";
const REDWOOD_PERIOD = "Feb 2017 – Mar 2025";
const REDWOOD_TENURE = "Eight years";
const REDWOOD_YEARS_RANGE = "2017 – 2025";

const cybersecurityEntries: Entry[] = [
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
    period: OMRON_PERIOD,
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
    period: PILGRIM_PERIOD,
    tags: ["Access Control", "SOPs", "Endpoint Security", "Automation"],
    tagline: "Standardized baseline access policies across a 12+ endpoint campus.",
    bullets: [
      "Engineered standardized naming conventions and baseline access controls (SOPs) for hardware lifecycle management.",
      "Documented joiner/mover/leaver procedures to cut access-related tickets and keep provisioning auditable.",
      "Automated device provisioning and recurring reporting in Python, improving audit readiness.",
    ],
  },
];

export const CYBERSECURITY: Domain = {
  id: "cybersecurity",
  navLabel: "Cybersecurity",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Security-minded operator, translating risk into controls that hold.",
  heroLede:
    "Cert-backed and hands-on with risk and access-control work across logistics and software — Postgres row-level security that holds even against a malicious client, and pre-clearance checks that keep international shipments compliant. I read the logs, map the risk to a control, and ship the fix — not just the finding.",
  certifications: [
    "CompTIA Security+",
    "ISC2 Certified in Cybersecurity (CC)",
    "Cybersecurity Pre-Apprenticeship — ITBiz Tech Academy",
  ],
  workHeading: "Security & risk work",
  workLabel: `${cybersecurityEntries.length} roles & projects`,
  entries: cybersecurityEntries,
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

const itEntries: Entry[] = [
  {
    id: "it-pilgrim",
    kind: "job",
    org: "Pilgrim Learning Academy",
    role: "IT System Administrator",
    location: "Castro Valley, CA",
    period: PILGRIM_PERIOD,
    tags: ["Endpoint Management", "Python Automation", "Networking", "Windows / ChromeOS / Android"],
    tagline: "Sole IT admin for a K-8 campus running 12+ multi-platform endpoints.",
    bullets: [
      "Developed Python-based provisioning scripts for 12+ endpoints (Windows, Android, ChromeOS), cutting administrative setup time by 40%.",
      "Configured and secured campus-wide network devices and printing infrastructure, maintaining high availability for educational operations.",
      "Diagnosed network issues end-to-end to minimize downtime, and standardized asset naming and SOPs for hardware lifecycle management.",
    ],
  },
];

export const IT: Domain = {
  id: "it",
  navLabel: "IT",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "IT systems administrator who automates the boring parts and documents everything.",
  heroLede:
    "Hands-on endpoint and network administration across Windows, ChromeOS, and Android — most recently as the sole IT admin for a K-8 campus. I write the script that saves the next setup 40% of the time, and the SOP that makes it repeatable.",
  certifications: ["CompTIA A+"],
  workHeading: "Systems & support work",
  workLabel: `${itEntries.length} role${itEntries.length === 1 ? "" : "s"} · ${PILGRIM_PERIOD}`,
  entries: itEntries,
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

const logisticsEntries: Entry[] = [
  {
    id: "logistics-omron",
    kind: "job",
    org: "Omron Robotics & Safety Technologies",
    role: "Logistics Specialist II",
    location: "Pleasanton, CA",
    period: OMRON_PERIOD,
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
    tags: ["WMS Integration", "IBM AS/400 CL", "Dispatch", "Warehouse Operations"],
    tagline: "Dispatch, customer service, and warehouse operations — plus the AS/400 automation and WMS rollout that modernized them.",
    bullets: [
      "Taught myself IBM AS/400 Control Language and automated manual reporting and data entry, cutting monthly processing time by 37.5%.",
      "Drove WMS adoption across the warehouse — expanding a system previously used for just 2 of ~100 storage customers into standard practice for inventory tracking.",
      "Dispatched drivers for daily pickups and resolved 200+ customer queries weekly (shipment lookups and clarifications).",
      "Ran hands-on warehouse operations: physical inventory management, spot checks, and loading tractor trailers and customer vehicles.",
    ],
  },
  {
    id: "logistics-cvsc",
    kind: "volunteer",
    org: "Castro Valley Soccer Club",
    role: "Director of Scheduling (Board Member)",
    period: "2025 – Present",
    tags: ["Scheduling", "Contingency Planning", "Process Standardization"],
    tagline: "Orchestrated conflict-free schedules for ~1,400 players across 130 teams.",
    bullets: [
      "Built conflict-free schedules with contingency plans for field closures and weather.",
      "Standardized intake and change-control processes, and ran season retrospectives.",
    ],
  },
];

export const LOGISTICS: Domain = {
  id: "logistics",
  navLabel: "Logistics",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Logistics operator who turns warehouse chaos into auditable process.",
  heroLede:
    "From a warehouse floor in 2010 to a global robotics supply chain today — logistics is where I keep coming back. IBM AS/400 automation and a warehouse-wide WMS rollout on one end, real-time compliance dashboards for international shipments on the other. I've been the person keeping shipments moving and the numbers honest.",
  workHeading: "Logistics & operations work",
  workLabel: `${logisticsEntries.length} roles`,
  entries: logisticsEntries,
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
      title: "The warehouse doesn't stop for me",
      description:
        "Whether it's an AS/400 workflow or an AMR shipment, the job is keeping it moving — I triage, fix, and follow through.",
    },
  ],
  contactHeadline: "Need someone who turns messy shipping data into a clean, auditable process?",
};

const maintenanceEntries: Entry[] = [
  {
    id: "maintenance-redwood",
    kind: "job",
    org: "Redwood Chapel Community Church",
    role: "Custodian / Facilities Technician",
    location: "Castro Valley, CA",
    period: REDWOOD_PERIOD,
    tags: ["Electrical", "Plumbing", "Security Hardware", "Preventive Maintenance"],
    tagline: "Hands-on repairs and security systems across two multi-use campuses.",
    bullets: [
      "Executed hands-on repairs for building infrastructure — electrical fixtures (switches, outlets, 120V/240V lighting) and plumbing components.",
      "Configured and maintained campus surveillance (Hikvision CCTV) and communication systems (Baofeng radios), and coordinated vendors for hazardous-waste removal and elevator maintenance.",
      "Standardized daily/weekly preventive-maintenance checklists and built an inventory tracker covering both campuses, reducing reactive fixes and stockouts.",
      "Triaged work requests with clear priorities and SLAs across two campuses.",
    ],
  },
];

export const MAINTENANCE: Domain = {
  id: "maintenance",
  navLabel: "Building Maintenance",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Facilities technician who keeps buildings, security systems, and the paperwork honest.",
  heroLede:
    `${REDWOOD_TENURE} maintaining two multi-use campuses — electrical fixtures, plumbing, security hardware, and the preventive-maintenance schedules that keep a small fix from becoming an emergency work order.`,
  workHeading: "Facilities & maintenance work",
  workLabel: `${maintenanceEntries.length} role${maintenanceEntries.length === 1 ? "" : "s"} · ${REDWOOD_YEARS_RANGE}`,
  entries: maintenanceEntries,
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

export type HubCard = {
  tabId: TabId;
  teaser: string;
  blurb: string;
  focus: string;
};

export const HUB_CARDS: HubCard[] = [
  {
    tabId: "cybersecurity",
    teaser: "Security+, ISC2 CC, and access control that holds under a hostile client.",
    blurb:
      "Row-level security, risk registers, and pre-clearance compliance checks — translating risk into controls that survive an audit.",
    focus: "Access control · risk mapping · RLS",
  },
  {
    tabId: "software",
    teaser: "Production software built by directing AI agents through constraints defined up front.",
    blurb:
      `${PROJECTS.length} shipped, deployed apps — architecture and test suites first, AI agents executing against them, human review before merge.`,
    focus: "React · TypeScript · Supabase · AI-directed delivery",
  },
  {
    tabId: "it",
    teaser: "CompTIA A+ certified, with hands-on endpoint and network administration.",
    blurb:
      "Provisioning automation, network administration, and endpoint management across Windows, ChromeOS, and Android.",
    focus: "Endpoint management · automation · networking",
  },
  {
    tabId: "logistics",
    teaser: "From AS/400 terminals to a global robotics supply chain's compliance dashboards.",
    blurb:
      "Warehouse floor to global supply chain — keeping shipments moving and the numbers honest through classification standardization, exception tracking, and scheduling at scale.",
    focus: "Global shipping · compliance · SQL dashboards",
  },
  {
    tabId: "maintenance",
    teaser: "Electrical, plumbing, and security hardware — with a preventive-maintenance mindset.",
    blurb:
      `${REDWOOD_TENURE} of hands-on facility repairs and surveillance/comms systems management across two multi-use campuses.`,
    focus: "Electrical · plumbing · security hardware",
  },
];

export const HOME = {
  navLabel: "Home",
  heroStatus: "Open to full-time roles and project work",
  heroTitle:
    "Sixteen years bridging code, infrastructure, and the physical systems that keep organizations running.",
  heroLede:
    "I've moved between warehouse floors, IT closets, security consoles, and AI-directed software delivery — always the person who turns a mess into a documented, auditable process. Pick a focus below, or read the whole story across every tab.",
  workHeading: "Explore my work",
  workLabel: `${HUB_CARDS.length} focus area${HUB_CARDS.length === 1 ? "" : "s"}`,
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

export function getTabLabel(id: TabId): string {
  return TABS.find((t) => t.id === id)?.navLabel ?? id;
}
