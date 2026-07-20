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
const squadLogic = PROJECTS.find((p) => p.id === "squadlogic");

// Each of these jobs appears in two different domains' entries (once framed
// for that domain's focus) — a single shared constant means a date fix only
// has to happen once instead of drifting between the two copies.
const OMRON_PERIOD = "May 2025 – Present";
const XGSI_PERIOD = "Aug 2010 – May 2017";
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
    tagline:
      "Privacy-by-design civic tech app built for the nonprofit Love Never Fails: no PII collected, policy enforced at the database layer.",
    bullets: [
      "Implemented Supabase Row-Level Security policies and RLS-respecting RPCs/edge functions so the access boundary holds even against a malicious client.",
      "Anonymous session tokens and API quotas replace PII entirely; survivors and advocates use the app with zero signup and zero identity exposure.",
      "Defined a risk register for product and data risks (PII exposure, access rules) and tied each entry to a control and a monitoring signal.",
      "In production with roughly 30 accounts at last count: a small deployment, but one where a data leak would have real human consequences.",
    ],
    links: aiAdvocate
      ? [
          { label: "Source", url: aiAdvocate.githubUrl },
          ...(aiAdvocate.liveUrl ? [{ label: "Live site", url: aiAdvocate.liveUrl }] : []),
        ]
      : undefined,
  },
  {
    id: "cyber-squadlogic",
    kind: "project",
    org: "SquadLogic",
    role: "Full Stack Developer (Security Design)",
    period: "2026",
    tags: ["Supabase RLS", "Least Privilege", "Auth"],
    tagline: "The same least-privilege backend discipline, applied to a second deployed app.",
    bullets: [
      "Enforced Postgres Row-Level Security on the Supabase backend so roster and scheduling data access is scoped at the database layer rather than trusted to the client.",
      "Carried the access-control patterns proven in AI Advocate into a second production deployment.",
    ],
    links: squadLogic
      ? [
          { label: "Source", url: squadLogic.githubUrl },
          ...(squadLogic.liveUrl ? [{ label: "Live site", url: squadLogic.liveUrl }] : []),
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
    tags: ["Export Compliance", "HTSUS / ECCN", "Audit Evidence", "SQL"],
    tagline: "Export-compliance and risk workflows for global robotics shipments across APAC, EMEA, and LATAM.",
    bullets: [
      "Maintain and validate HTSUS, Schedule B, and ECCN export classifications, keeping audit-ready records behind every declaration.",
      "Lead remediation of an outdated JDE item database to current HTSUS codes, including Section 232 provisions: 689 items physically inspected, weighed, and reclassified to date.",
      "Maintain change logs and lookup tools (SQL and spreadsheets) across ~140,000 part numbers, so erroneous item-file edits are caught and reverted before they become customs holds.",
      "Mapped operational risks to SOPs and audit-ready evidence packets for global logistics.",
    ],
  },
];

export const CYBERSECURITY: Domain = {
  id: "cybersecurity",
  navLabel: "Cybersecurity",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Security-minded operator, translating risk into controls that hold.",
  heroLede:
    "The security work here is shipped and inspectable: Postgres row-level security enforced in two deployed apps, least-privilege APIs with zero PII collected, and export-compliance checks on international robotics shipments. I read the logs, map the risk to a control, and ship the fix, not just the finding.",
  certifications: [
    "CompTIA Security+",
    "ISC2 Certified in Cybersecurity (CC)",
    "Cybersecurity Pre-Apprenticeship (Salutatorian), ITBiz Tech Academy",
  ],
  workHeading: "Security & risk work",
  workLabel: `${cybersecurityEntries.length} roles & projects`,
  entries: cybersecurityEntries,
  traits: [
    {
      title: "Controls over check-boxes",
      description:
        "Every requirement maps to an actual control and an audit trail, not a policy document nobody reads.",
    },
    {
      title: "Least privilege by default",
      description:
        "Access starts locked down. Every exception is documented, time-boxed, and reviewed.",
    },
    {
      title: "Root cause, then remediation",
      description:
        "Every incident gets triaged to its actual cause before I call it closed, not just patched at the symptom.",
    },
  ],
  contactHeadline: "Looking for someone who treats access control as a first-class citizen?",
};

const itEntries: Entry[] = [
  {
    id: "it-omron",
    kind: "job",
    org: "Omron Robotics & Safety Technologies",
    role: "Logistics Specialist II (Systems & Triage Focus)",
    location: "Pleasanton, CA",
    period: OMRON_PERIOD,
    tags: ["JD Edwards ERP", "SQL", "Data Integrity", "Troubleshooting"],
    tagline: "Keeps a ~140,000-part JDE ERP item database honest while daily operations run on it.",
    bullets: [
      "Resolve daily JD Edwards ERP discrepancies where physical inventory and digital records diverge, keeping shipping, receiving, and audit workflows moving without escalation.",
      "Maintain change logs and lookup tools (SQL and spreadsheets) that catch erroneous item-file edits before they propagate into customs holds.",
    ],
  },
  {
    id: "it-xgsi",
    kind: "job",
    org: "Xpress Global Systems (XGSI)",
    role: "Operations Specialist (Systems & Automation Focus)",
    location: "Hayward, CA",
    period: XGSI_PERIOD,
    tags: ["IBM AS/400 CL", "WMS Rollout", "First-Line Support", "Automation"],
    tagline: "Self-taught AS/400 automation, a warehouse-wide WMS rollout, and first-line support, all from inside an ops role.",
    bullets: [
      "Acted as the office's informal first line of support: Windows desktops, AS/400 software (recording and distributing macros across the office; troubleshooting after system outages), label and office printers, and scanners.",
      "Taught myself IBM AS/400 Control Language and automated weekly reporting and data entry; a two-person, 16-person-hour manual process became a single 5-hour review.",
      "Wrote scan-log/WMS sync code that corporate IT deployed, performed the full-facility inventory intake behind the rollout, and trained the office staff on the new system.",
    ],
  },
  {
    id: "it-redwood",
    kind: "job",
    org: "Redwood Chapel Community Church",
    role: "Custodian / Facilities Technician (Systems Focus)",
    location: "Castro Valley, CA",
    period: REDWOOD_PERIOD,
    tags: ["Hikvision CCTV", "Baofeng Radios", "Physical Security"],
    tagline: "Ran the surveillance and communications systems across two multi-use campuses.",
    bullets: [
      "Configured and maintained campus surveillance (Hikvision) and communication systems (Baofeng) across two multi-use campuses.",
      "Standardized detailed maintenance checklists and built inventory trackers, ensuring operational readiness at both campuses.",
    ],
  },
];

export const IT: Domain = {
  id: "it",
  navLabel: "IT",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Systems-minded operator who automates the boring parts and documents everything.",
  heroLede:
    "My systems work was earned inside operations roles, not a help desk: self-taught AS/400 automation, a warehouse-wide WMS rollout, daily JDE ERP triage, and campus surveillance systems, backed by CompTIA A+, Security+, and a year of hands-on ITBiz cybersecurity labs. I write the script that kills the manual step, and the SOP that makes it repeatable.",
  certifications: ["CompTIA A+", "CompTIA Security+", "AWS Certified Cloud Practitioner"],
  workHeading: "Systems & support work",
  workLabel: `${itEntries.length} roles`,
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
        "Naming conventions, checklists, and asset trackers exist so whoever inherits the system isn't guessing.",
    },
  ],
  contactHeadline: "Need someone who troubleshoots systems end-to-end and documents the fix?",
};

const logisticsEntries: Entry[] = [
  {
    id: "logistics-omron",
    kind: "job",
    org: "Omron Robotics & Safety Technologies",
    role: "Logistics Specialist II",
    location: "Pleasanton, CA",
    period: OMRON_PERIOD,
    tags: ["Global Shipping", "HTSUS / Schedule B", "JD Edwards ERP", "Change Control"],
    tagline: "Remediating a ~140,000-part JDE item database to current HTS codes while keeping daily global shipments moving.",
    bullets: [
      "Physically inspected, weighed, and reclassified 689 items to current HTSUS codes (including Section 232 provisions) with batch corrections across the remainder; export holds are rare and typically resolved within hours.",
      "Flagged a Schedule B definition change affecting the top-shipped product line (safety scanners) on import of the updated aesexp.csv; every affected item was compliant before that morning's commercial invoices.",
      "Resolve daily JD Edwards ERP discrepancies where physical inventory and digital records diverge, keeping shipping, receiving, and audit workflows moving without escalation.",
      "Package and process outbound international shipments across FedEx, UPS, DHL, Nippon Express, and CEVA.",
    ],
  },
  {
    id: "logistics-xgsi",
    kind: "job",
    org: "Xpress Global Systems (XGSI)",
    role: "Operations Specialist",
    location: "Hayward, CA",
    period: XGSI_PERIOD,
    tags: ["WMS Integration", "IBM AS/400 CL", "Dispatch", "Warehouse Operations"],
    tagline: "Dispatch, customer service, and warehouse operations, plus the AS/400 automation and WMS rollout that modernized them.",
    bullets: [
      "Taught myself IBM AS/400 Control Language and automated weekly reporting and data entry; a two-person, 16-person-hour manual process became a single 5-hour review.",
      "Drove WMS adoption across the warehouse, expanding a system previously used for just 2 of ~100 storage customers into standard practice for inventory tracking.",
      "Dispatched drivers for daily pickups and resolved 200+ customer queries weekly (shipment lookups and clarifications).",
      "Ran hands-on warehouse operations: physical inventory management, spot checks, and loading tractor trailers and customer vehicles.",
    ],
  },
  {
    id: "logistics-cvsc",
    kind: "volunteer",
    org: "Castro Valley Soccer Club",
    role: "Recreational Program Director, Scheduling (Board Member)",
    period: "Jan 2025 – Present",
    tags: ["Scheduling", "Contingency Planning", "Process Standardization"],
    tagline: "Conflict-free season schedules for ~144 teams and ~1,400 players within tight field windows.",
    bullets: [
      "Build conflict-free season schedules with contingency plans for field closures and weather.",
      "Every season started on time, with zero field double-bookings and zero conflicts for sole coaches of multiple teams.",
    ],
  },
];

export const LOGISTICS: Domain = {
  id: "logistics",
  navLabel: "Logistics",
  heroStatus: "Open to full-time roles and project work",
  heroTitle: "Logistics operator who turns warehouse chaos into auditable process.",
  heroLede:
    "From a warehouse floor in 2010 to a global robotics supply chain today: logistics is where I keep coming back. IBM AS/400 automation and a warehouse-wide WMS rollout on one end, HTSUS classification and change control for international shipments on the other. I've been the person keeping shipments moving and the numbers honest.",
  workHeading: "Logistics & operations work",
  workLabel: `${logisticsEntries.length} roles`,
  entries: logisticsEntries,
  traits: [
    {
      title: "Compliance is a process, not a scramble",
      description:
        "Classifications get validated and logged before the shipment moves, not after it's held at the border.",
    },
    {
      title: "Change control over tribal memory",
      description:
        "Every corrected weight and HTS code lands in a running log with lookup tools, so a bad edit gets caught and reverted instead of rediscovered at customs.",
    },
    {
      title: "The warehouse doesn't stop for me",
      description:
        "Whether it's an AS/400 workflow or a robotics shipment, the job is keeping it moving: I triage, fix, and follow through.",
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
      "Executed hands-on repairs for building infrastructure: electrical fixtures (switches, outlets, 120V/240V lighting) and plumbing components.",
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
    `${REDWOOD_TENURE} maintaining two multi-use campuses: electrical fixtures, plumbing, security hardware, and the preventive-maintenance schedules that keep a small fix from becoming an emergency work order.`,
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
      "Row-level security shipped in two deployed apps, risk registers, and export-classification compliance on global robotics shipments: controls that survive an audit.",
    focus: "Access control · risk mapping · RLS",
  },
  {
    tabId: "software",
    teaser: "Production software built by directing AI agents through constraints defined up front.",
    blurb:
      `${PROJECTS.length} apps (deployed production tools and a playable strategy-game prototype): architecture and test suites first, AI agents executing against them, human review before merge.`,
    focus: "React · TypeScript · Supabase · AI-directed delivery",
  },
  {
    tabId: "it",
    teaser: "CompTIA A+ and Security+ certified, with systems work earned inside operations roles.",
    blurb:
      "First-line desktop and printer support, self-taught AS/400 automation, a warehouse-wide WMS rollout, daily JDE ERP triage, and campus surveillance systems.",
    focus: "Systems troubleshooting · first-line support · automation",
  },
  {
    tabId: "logistics",
    teaser: "From AS/400 terminals to HTSUS classification for a global robotics supply chain.",
    blurb:
      "Warehouse floor to global supply chain: keeping shipments moving and the numbers honest through HTS classification, change control, and scheduling at scale.",
    focus: "Global shipping · trade compliance · SQL",
  },
  {
    tabId: "maintenance",
    teaser: "Electrical, plumbing, and security hardware, with a preventive-maintenance mindset.",
    blurb:
      `${REDWOOD_TENURE} of hands-on facility repairs and surveillance/comms systems management across two multi-use campuses.`,
    focus: "Electrical · plumbing · security hardware",
  },
];

export const HOME = {
  navLabel: "Home",
  heroStatus: "Open to full-time roles and project work",
  heroTitle:
    "Fifteen years keeping operations moving: warehouses, buildings, and the systems that track them.",
  heroLede:
    "I've moved between warehouse floors, ERP terminals, security consoles, and AI-directed software delivery, always the person who turns a mess into a documented, auditable process. Pick a focus below, or read the whole story across every tab.",
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
        "Customs hold, security policy, or a leaking faucet: I trace back to why it happened before I close it out.",
    },
    {
      title: "Comfortable at both ends of the stack",
      description:
        "Physical plant to cloud infrastructure: I move between them without needing a translator.",
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
