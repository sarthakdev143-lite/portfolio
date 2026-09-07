// lib/config.ts

export const SITE_CONFIG = {
    name: "Sarthak Parulekar",
    title: "Sarthak Parulekar • Full-Stack Engineer",
    description:
        "Full-Stack Engineer — Java/Spring Boot backends, Go microservices, React/Next.js frontends, and production AI/LLM integrations. Shipped systems across seven enterprise accounts.",
    // Single source of truth for metadataBase, sitemap, robots and OG tags.
    url: "https://sarthakdev.vercel.app",
    email: "sarthakdev143.official@gmail.com",
    location: "Indore, M.P., India",
    socials: {
        github: "https://github.com/sarthakdev143-lite",
        linkedin: "https://linkedin.com/in/sarthak-parulekar",
    },
    accent: "var(--color-brand)",
    marqueeText: "FULL STACK ENGINEER // SARTHAK PARULEKAR // ",
} as const;

export const EXPERIENCE_DATA = [
    {
        role: "Founding Engineer",
        company: "Augment Infotech",
        location: "On-site, Indore",
        period: "April 2026 — Present",
        techStack: [
            "Java", "Spring Boot", "Go", "React", "Next.js", "Blazor/.NET",
            "Python", "PostgreSQL", "Redis", "ScyllaDB", "Kubernetes/EKS", "AWS",
        ],
        highlights: [
            "Founding engineer in a zero-process startup — owning delivery end to end, across seven enterprise accounts and four timezones.",
        ],
        // One signature line per account — a caption, not a résumé bullet list.
        clients: [
            {
                name: "DX Kulture",
                role: "Backend",
                signature: "OpenRTB auction engine, targeting, pacing and fraud detection on a Go + Java real-time ad exchange.",
            },
            {
                name: "Samsung SDS",
                role: "Full-Stack",
                signature: "Live Korean ↔ English translation and AI email drafting, embedded inside Outlook.",
            },
            {
                name: "American College of Radiology",
                role: "AI Integration",
                signature: "A Copilot Studio agent automating clinical workflows across their M365 estate.",
            },
            {
                name: "HPE · Zensar · Sutherland · Veltris",
                role: "Backend",
                signature: "Spring Boot API modules with JWT/OAuth2 auth and RBAC, under C2C/C2H engagements.",
            },
        ],
    },
    {
        role: "Frontend Developer Intern",
        company: "RavWolf",
        location: "Remote",
        period: "October 2025 — March 2026",
        techStack: ["React", "Next.js", "Python", "REST APIs", "NLP", "Git"],
        highlights: [
            "Built React UI components and integrated Python backend APIs in an early-stage AI product startup.",
            "Contributed to NLP feature development and REST API integration across the full stack.",
        ],
    },
];

// `diagram` drives a code-drawn schematic (components/ProjectSchematic.tsx) so each
// project SHOWS its architecture instead of only describing it. Copy is deliberately
// written fresh here — it is not the résumé text verbatim.
export const PROJECTS = [
    {
        id: "01",
        title: "WINGMAN",
        tagline: "IT ANSWERS BEFORE YOU DO",
        hook: "It hears the interview through your own system audio and has the answer forming before the question ends.",
        desc: "It listens to the interview through your own system audio and has a reply forming before the question finishes. A voice-activity gate wakes Whisper, Whisper feeds the model, and the answer streams into a floating overlay your screen-share can't see.",
        tech: ["Electron", "React 18", "TypeScript", "Python", "Flask", "SQLite", "Groq Whisper", "WASAPI"],
        link: "https://github.com/sarthakdev143-lite/interview-hacker",
        accent: "var(--color-brand)",
        diagram: {
            kind: "pipeline",
            caption: "~800ms to first token",
            nodes: [
                { label: "SYSTEM AUDIO", sub: "WASAPI" },
                { label: "VAD", sub: "gate" },
                { label: "WHISPER", sub: "STT" },
                { label: "LLM", sub: "answer" },
                { label: "OVERLAY", sub: "streamed" },
            ],
        },
    },
    {
        id: "02",
        title: "SHADOW",
        tagline: "A LANGUAGE MODEL, NOTHING BORROWED",
        hook: "A 2.2M-parameter language model, architected and trained from scratch — no HuggingFace anywhere.",
        desc: "2.2 million parameters, all hand-written. Multi-head self-attention, causal masking, pre-norm blocks and tied embeddings — built in raw PyTorch with no HuggingFace anywhere, then trained on a 3.7M-character corpus on nothing but a CPU.",
        tech: ["Python", "PyTorch", "Transformer", "CPU-trained"],
        link: "https://github.com/sarthakdev143-lite/shadow-poem-generator",
        accent: "var(--color-brand)",
        diagram: {
            kind: "stack",
            caption: "2.2M params · from scratch",
            nodes: [
                { label: "TOKEN + POS EMBED" },
                { label: "MULTI-HEAD ATTENTION", sub: "causal" },
                { label: "PRE-NORM · GELU FFN" },
                { label: "TIED OUTPUT HEAD" },
            ],
        },
    },
    {
        id: "03",
        title: "TOOFAN EXPRESS",
        tagline: "A NEWSROOM THAT NEVER SLEEPS",
        hook: "A crew of AI agents runs an entire newspaper end to end, and reflows the page live as stories change.",
        desc: "A crew of AI agents runs an entire newspaper on its own — one gathers the news, one writes it, one edits, and a constraint solver lays out the page. A finished edition falls out the other end and reflows live as stories change.",
        tech: ["Python", "FastAPI", "CrewAI", "Next.js", "PostgreSQL", "OR-Tools"],
        link: "https://github.com/sarthakdev143-lite/toofan-express",
        accent: "var(--color-brand)",
        diagram: {
            kind: "fanout",
            caption: "multi-agent · live reflow",
            source: { label: "NEWS FEEDS" },
            agents: [
                { label: "AGGREGATE" },
                { label: "WRITE" },
                { label: "COPY-EDIT" },
            ],
            sink: { label: "OR-TOOLS LAYOUT" },
            out: { label: "EDITION" },
        },
    },
    {
        id: "04",
        title: "SEEKCODE",
        tagline: "A CHAT LLM, GIVEN HANDS",
        hook: "Turns an ordinary chat model into a coding agent that parses the repo, plans, refactors, tests and commits.",
        desc: "It turns an ordinary chat model into a coding agent that actually touches the repo. It parses the tree, walks the dependency graph, plans a change, renames safely, runs the tests, and commits — driving a web UI as its zero-cost backend.",
        tech: ["Node.js", "TypeScript", "Playwright", "tree-sitter", "Redis"],
        link: "https://github.com/sarthakdev143-lite/seekcode",
        accent: "var(--color-brand)",
        diagram: {
            kind: "graph",
            caption: "AST → plan → commit",
            nodes: [
                { label: "PARSE", sub: "tree-sitter" },
                { label: "DEP GRAPH" },
                { label: "PLAN" },
                { label: "REFACTOR" },
                { label: "TEST" },
                { label: "COMMIT" },
            ],
        },
    },
    {
        id: "05",
        title: "DOOMSCROLLER",
        tagline: "IT FEEDS THE ALGORITHM WHILE YOU SLEEP",
        hook: "Finds, scores, cuts and ships three short-form videos to YouTube a day — entirely on its own.",
        desc: "A hands-off content engine: it finds rising short-form clips, scores them for velocity, cuts them with FFmpeg, writes the metadata with an LLM, and ships three a day to YouTube — all on a scheduler that just keeps running.",
        tech: ["Python", "FastAPI", "APScheduler", "Playwright", "FFmpeg", "MongoDB"],
        link: "https://github.com/sarthakdev143-lite/doomscroller",
        accent: "var(--color-brand)",
        diagram: {
            kind: "loop",
            caption: "3 uploads / day · autonomous",
            nodes: [
                { label: "SCRAPE" },
                { label: "SCORE" },
                { label: "FFMPEG" },
                { label: "METADATA" },
                { label: "UPLOAD" },
            ],
        },
    },
    {
        id: "06",
        title: "SENTINEL C2",
        tagline: "WINDOWS, STUDIED FROM THE INSIDE",
        hook: "A red-team implant that treats Windows as its subject, phoning home over an encrypted channel.",
        desc: "A red-team implant for authorised testing that treats the OS as its subject. It resolves WinHTTP at runtime, XORs its own strings at compile time, wraps every session in AES-256-GCM with HMAC, and phones home over a channel that needs no server of its own.",
        tech: ["Nim", "WinHTTP", "AES-256-GCM", "HMAC-SHA256", "Win32"],
        link: "https://github.com/sarthakdev143-lite/sentinel",
        accent: "var(--color-brand)",
        diagram: {
            kind: "secure",
            caption: "AES-256-GCM · HMAC-SHA256",
            left: { label: "IMPLANT", sub: "target host" },
            right: { label: "OPERATOR", sub: "async channel" },
            tunnel: "ENCRYPTED SESSION",
        },
    },
];

export const SKILLS = [
    { category: "Languages", items: ["Java", "Go", "Python", "TypeScript", "JavaScript", "Node.js", "Nim"] },
    {
        category: "Backend",
        items: [
            "Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "Maven",
            "REST API Design", "JWT", "OAuth2", "RBAC", "Microservices", "FastAPI", "Flask",
        ],
    },
    {
        category: "Frontend",
        items: ["React 18/19", "Next.js (App Router)", "TypeScript", "Blazor", ".NET", "Tailwind CSS", "Electron", "Vite"],
    },
    {
        category: "AI / ML",
        items: [
            "LLM Integration", "Multi-Agent Systems (CrewAI)", "RAG", "Groq API",
            "Whisper STT", "PyTorch", "Transformers (from scratch)", "AWS Bedrock", "Copilot Studio",
        ],
    },
    {
        category: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ScyllaDB", "SQLite", "Schema Design", "Query Optimisation"],
    },
    {
        category: "Cloud & DevOps",
        items: [
            "AWS (EKS · Kinesis · SQS · S3 · Aurora)", "Kubernetes", "Docker",
            "GitHub Actions", "CI/CD", "Prometheus", "Grafana", "Loki", "Linux",
        ],
    },
    {
        category: "Security",
        items: ["AES-256-GCM", "HMAC-SHA256", "Windows Internals", "IPC Security", "Penetration Testing"],
    },
];

export const EDUCATION = [
    {
        degree: "B.Tech — IoT & Cybersecurity",
        institution: "Patel College of Science and Technology, Indore",
        period: "2026 — 2030",
        note: "Pursuing",
    },
    {
        degree: "Class XII — ISC Board",
        institution: "Little Wonders Convent School, Indore",
        period: "2026",
        note: "84%",
    },
];

export const ACHIEVEMENTS = [
    "Head Boy, Little Wonders Convent School (2025–26) — elected by peers and faculty to lead the student council, manage school events and assemblies, and represent the student body, while concurrently running a software engineering internship and shipping production side projects.",
    "1st Place — Debate & Extempore (inter-school, multiple occasions).",
    "1st Place — Mono-acting, Singing, and Dancing at school-level creative competitions.",
];

export const HERO_PANELS = {
    panel1: {
        tag: "[ CORE ]",
        meta: "01 // STACK",
        title: "FULL STACK ENGINEER",
        desc: "I engineer experiences from API contracts to pixel-perfect motion, shipped to production and built to last.",
        stack: [
            "Java", "Spring Boot", "Go", "React/Next.js", "TypeScript",
            "Python", "FastAPI", "PostgreSQL", "Redis", "Kubernetes", "AWS", "Docker",
        ],
    },
    panel2: {
        tag: "[ MISSION ]",
        meta: "02 // CORE",
        headline: "Two startups,\nreal projects",
        subtext: "Founding engineer — Building production software across a stack of real client projects.",
    },
    panel3: {
        tag: "[ CURRENT STATUS ]",
        title: "SHIPPING_\nIN PROD",
        desc: "Founding Engineer in Indore, India — building production systems for enterprise clients worldwide.",
    },
    panel4: {
        tag: "[ OPEN TO COLLABORATE ]",
        cta: "PING ME_",
    },
} as const;
