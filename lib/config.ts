// lib/config.ts

export const SITE_CONFIG = {
    name: "Sarthak Parulekar",
    title: "Sarthak Parulekar • Creative Software Engineer",
    description: "Crafting high-performance web applications and fluid interactive physics interfaces.",
    email: "sarthakdev143.official@gmail.com",
    socials: {
        github: "https://github.com/sarthakdev143-lite",
        linkedin: "https://linkedin.com/in/sarthak-parulekar",
    },
    accent: "var(--color-brand)",
    marqueeText: "INGENIOUS BUILDER // SARTHAK PARULEKAR // ",
} as const;

export const EXPERIENCE_DATA = [
    {
        role: "Contractor / Freelancer",
        company: "Global Tech Solutions & Remote Startups",
        location: "Remote / International",
        period: "June 2024 — Present",
        techStack: ["React/Next.js", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "CI/CD Pipelines"],
        highlights: [
            "Architected and deployed production-ready web applications for international clients across North America, Europe, and APAC, ensuring seamless cross-border delivery.",
            "Managed end-to-end project life cycles, from initial scope definition and technical architecture to final deployment, performance tuning, and ongoing support.",
            "Established robust communication pipelines across asynchronous, multicultural remote teams using modern collaboration ecosystems, maintaining a 100% on-time milestone milestone delivery rate."
        ]
    },
    {
        role: "Full Stack Developer",
        company: "Augment Infotech Private Limited",
        location: "Indore",
        period: "March 2026 — Present",
        techStack: ["React/Next.js", "Spring Boot", "Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "CI/CD Pipelines"],
        highlights: [
            "Developing and deploying production systems serving international and domestic clients.",
            "Debugging and optimizing AI-generated code.",
            "Mentoring and managing junior devs and interns while overseeing code reviews and Git workflows.",
        ],
    },
    {
        role: "Frontend Developer Intern",
        company: "Ravwolf Private Limited",
        location: "Indore",
        period: "October 2025 — March 2026",
        techStack: ["Next.js", "Tailwind CSS", "API Integrations", "Git"],
        highlights: [
            "Built and maintained responsive UI components using Next.js and Tailwind CSS.",
            "Implemented API integrations, reusable components, and optimized page architectures.",
            "Collaborated with design and product teams to improve user experience and performance.",
        ],
    },
    {
        role: "Head Boy | Student Leader",
        company: "Little Wonders Convent School",
        location: "Indore, Madhya Pradesh",
        period: "2025 — 2026",
        techStack: ["Leadership", "Event Coordination", "Peer Mentorship"],
        highlights: [
            "Elected by peers and faculty to represent the student body and lead key school initiatives.",
            "Led school assemblies and student councils, coordinating directly with teachers and administration.",
            "Organized student-led events and supported peer mentorship and conflict resolution.",
        ],
    },
];

export const PROJECTS = [
    {
        id: "01",
        title: "INTERVIEW HACKER",
        tagline: "CONTEXT INJECTION ENGINE",
        desc: "A raw context injection utility and real-time browser assistant. Built to intercept, analyze, and stream intelligent contextual overlays over live web frames without affecting DOM footprints.",
        tech: ["Chrome Extension API", "React", "TypeScript", "Tailwind CSS"],
        link: "https://github.com/sarthakdev143-lite/interview-hacker",
        accent: "var(--color-brand)",
    },
    {
        id: "02",
        title: "YOUTUBE AUTOMATION",
        tagline: "HEADLESS CONTENT PIPELINE",
        desc: "An automated, bulk content generation and deployment matrix. Coordinates headless video asset processing, metadata optimization cascades, and automated publishing pipelines to completely eliminate manual rendering constraints.",
        tech: ["Node.js", "FFmpeg Engine", "Puppeteer", "Next.js"],
        link: "https://github.com/sarthakdev143-lite/ultimate-youtube-automation",
        accent: "#ffffff",
    },
];

export const HERO_PANELS = {
    panel1: {
        tag: "[ CORE ]",
        meta: "01 // STACK",
        title: "FULL STACK ENGINEER",
        desc: "I engineer experiences from API contracts to pixel-perfect motion, shipped to production and built to last.",
        stack: ["React/Next.js", "Spring Boot", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL", "Redis", "Docker", "AWS", "Git"],
    },
    panel2: {
        tag: "[ MISSION ]",
        meta: "02 // CORE",
        headline: "Worked with 2 startups",
        subtext: "Not just functional, but obsessively crafted. Every pixel, every interaction, every millisecond.",
    },
    panel3: {
        tag: "[ CURRENT STATUS ]",
        title: "SHIPPING_\nIN PROD",
        desc: "Full Stack Dev based in Indore, India building for international & domestic clients.",
    },
    panel4: {
        tag: "[ OPEN TO COLLABORATE ]",
        cta: "PING ME_",
    },
} as const;