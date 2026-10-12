/*
 * Sujay Nadkarni — portfolio content.
 * Projects and experience below are placeholders standing in until real
 * ones are swapped in. Update the TODOs before publishing.
 */
const TEACHING_ROW_ITEMS = [
  { title: "SQL Crash Course", type: "youtube", playlistId: "PLrJjaHxyva3X6SLlYQKhuxFS1gBtmx2cY", icon: "▶️" },
  { title: "Learn Analytics in 10 Days", type: "youtube", playlistId: "PLrJjaHxyva3XOp0uxQrwiZ7oIgzXhjYP0", icon: "▶️" },
  { title: "Salesforce Certifications", type: "youtube", playlistId: "PLrJjaHxyva3U8UUO6uyK8yyDdPneJKU5x", icon: "▶️" },
  { title: "Learn to Code in 2026", type: "youtube", videoId: "emQmHlnLIWQ", icon: "🎬" },
  { title: "What Is RAG? Explained", type: "youtube", videoId: "NEHeEpkG69Q", startSeconds: 58, icon: "🎬" }
];

window.SITE_DATA = {
  meta: {
    name: "Sujay Nadkarni",
    logoText: "SUJAY NADKARNI",
    resume: "#", // TODO: drop in the real resume link
    linkedin: "https://www.linkedin.com/in/sujaynadkarni",
    badge: "ORIGINAL",
    skillRepo: "https://github.com/your-username/netflix-portfolio-skill" // TODO: update once pushed
  },

  nav: [
    { label: "Home", route: "home" },
    { label: "Professional", route: "professional" },
    { label: "Skills", route: "skills" },
    { label: "Projects", route: "projects" },
    { label: "Hire Me", route: "hire-me" }
  ],

  personas: [
    {
      id: "hiring-manager",
      label: "Hiring Manager",
      emoji: "🧑‍💼",
      color: "#E50914",
      heroBio: "Sujay Nadkarni is a Director of Technical Architecture at Salesforce with 15+ years of experience. He's on a mission to teach people to write code — for free.",
      extraRow: { title: "Teaching & Open Source", items: TEACHING_ROW_ITEMS },
      continueWatchingRow: [
        { title: "Claude Generates Datasets in Minutes", type: "youtube", videoId: "TcNtY83JH_U", icon: "🎬" },
        { title: "Build Your Agents in Under 5 Minutes", type: "youtube", videoId: "CTIhUvxofb4", icon: "🎬" },
        { title: "How to Create Flowcharts Using AI", type: "youtube", videoId: "Eg77iM-DaAA", icon: "🎬" },
        { title: "1-Hour SOQL Crash Course", type: "youtube", videoId: "W-N5hI9NmPE", icon: "🎬" }
      ]
    },
    {
      id: "recruiter",
      label: "Recruiter",
      emoji: "📋",
      color: "#2196d9",
      heroBio: "Director of Technical Architecture at Salesforce, 15+ years of experience. Resume and LinkedIn are one click below.",
      extraRow: { title: "Teaching & Open Source", items: TEACHING_ROW_ITEMS }
    },
    {
      id: "social",
      label: "Social Media Follower",
      emoji: "📱",
      color: "#e8a33d",
      heroBio: "Hey, I'm Sujay 👋 Director of Technical Architecture at Salesforce, 15+ years in. On a mission to teach people to write code — for free.",
      heroActions: [
        { label: "Instagram", href: "https://instagram.com/your-handle", icon: "📸", style: "primary" }, // TODO: add real handle
        { label: "YouTube", href: "https://youtube.com/@thenadcoder", icon: "▶️", style: "secondary" },
        { label: "Substack", href: "https://your-substack.substack.com", icon: "✍️", style: "secondary" } // TODO: add real substack
      ],
      topPicksRow: [
        { title: "SQL Crash Course", type: "youtube", playlistId: "PLrJjaHxyva3X6SLlYQKhuxFS1gBtmx2cY", icon: "▶️" },
        { title: "Learn Analytics in 10 Days", type: "youtube", playlistId: "PLrJjaHxyva3XOp0uxQrwiZ7oIgzXhjYP0", icon: "▶️" },
        { title: "Salesforce Certifications", type: "youtube", playlistId: "PLrJjaHxyva3U8UUO6uyK8yyDdPneJKU5x", icon: "▶️" },
        { title: "About Me", route: "professional", icon: "💼" }
      ],
      continueWatchingRow: [
        { title: "Learn to Code in 2026", type: "youtube", videoId: "emQmHlnLIWQ", icon: "🎬" },
        { title: "What Is RAG? Explained", type: "youtube", videoId: "NEHeEpkG69Q", startSeconds: 58, icon: "🎬" },
        { title: "Say Hi", route: "hire-me", icon: "✉️" }
      ]
    }
  ],

  topPicksRow: [
    { title: "Experience", route: "professional", icon: "💼", image: "assets/posters/experience.png" },
    { title: "Skills", route: "skills", icon: "🛠️", image: "assets/posters/skills.png" },
    { title: "Projects", route: "projects", icon: "🎬", image: "assets/posters/projects.png" },
    { title: "Contact Me", route: "hire-me", icon: "📨" }
  ],

  continueWatchingRow: [
    { title: "AutoFlow", route: "projects", icon: "🤖" },
    { title: "PulseBoard", route: "projects", icon: "📊" },
    { title: "Resume", route: "professional", icon: "📄" },
    { title: "Get In Touch", route: "hire-me", icon: "✉️" }
  ],

  skills: [
    {
      category: "Languages & Data",
      items: [
        {
          name: "Python",
          icon: "🐍",
          bullets: [
            "Scripting and automation for recurring operational workflows",
            "Lightweight data pipelines feeding dashboards and reports",
            "AI/LLM integration glue code connecting tools together"
          ]
        },
        {
          name: "SQL",
          icon: "🗄️",
          bullets: [
            "Query design and performance tuning across relational data",
            "Data modeling for reporting and analytics layers",
            "Scheduled queries powering automated reports"
          ]
        }
      ]
    },
    {
      category: "AI & Automation",
      items: [
        {
          name: "AI / LLM Tooling",
          icon: "✨",
          bullets: [
            "Prompt workflows for triage, drafting, and summarization",
            "AI-assisted anomaly detection in analytics pipelines",
            "Evaluating and piloting new AI tooling for team adoption"
          ]
        },
        {
          name: "Automations",
          icon: "⚙️",
          bullets: [
            "End-to-end workflow automation across business tools",
            "Replacing manual handoffs with event-driven triggers",
            "Monitoring and alerting for automated processes"
          ]
        }
      ]
    },
    {
      category: "Business Systems",
      items: [
        {
          name: "Salesforce",
          icon: "☁️",
          bullets: [
            "Admin, flows, and declarative process automation",
            "CRM data architecture and integration design",
            "Rollout and adoption across sales and support orgs"
          ]
        }
      ]
    },
    {
      category: "Analytics & Design",
      items: [
        {
          name: "Analytics",
          icon: "📈",
          bullets: [
            "Executive dashboarding and KPI framework design",
            "Reporting pipelines and metrics governance",
            "Translating raw data into decision-ready insights"
          ]
        },
        {
          name: "Figma",
          icon: "🎨",
          bullets: [
            "Prototyping internal tools and product concepts",
            "Design-to-engineering handoff and component systems",
            "Workshop facilitation for requirements gathering"
          ]
        }
      ]
    }
  ],

  projects: [
    {
      name: "AutoFlow",
      blurb: "Python + LLM-powered bot that auto-triages Salesforce cases and drafts first-pass responses.",
      bullets: [
        "Cut average case response time significantly by auto-drafting replies",
        "Routes cases by priority using a lightweight classification model",
        "Deployed as a scheduled job with full audit logging"
      ],
      link: "#",
      icon: "🤖",
      tags: ["Python", "AI", "Salesforce"]
    },
    {
      name: "PulseBoard",
      blurb: "Real-time analytics dashboard tracking product usage and churn signals from SQL sources.",
      bullets: [
        "Consolidates usage data from multiple sources into one view",
        "Surfaces churn-risk accounts before renewal conversations",
        "Used weekly by product and customer success teams"
      ],
      link: "#",
      icon: "📊",
      tags: ["SQL", "Analytics"]
    },
    {
      name: "FigOps",
      blurb: "A Figma plugin that syncs design tokens straight into a component library repo.",
      bullets: [
        "Eliminates manual copy-paste between design and code",
        "Keeps design tokens version-controlled alongside components",
        "Adopted by the design team for every new component"
      ],
      link: "#",
      icon: "🎨",
      tags: ["Figma", "Automations"]
    },
    {
      name: "ReportBot",
      blurb: "Slack bot that auto-generates weekly KPI reports from scheduled SQL queries.",
      bullets: [
        "Delivers formatted KPI summaries to Slack every Monday morning",
        "Flags metrics that cross defined thresholds automatically",
        "Removed a recurring manual reporting task from the team's plate"
      ],
      link: "#",
      icon: "📨",
      tags: ["Automations", "SQL"]
    },
    {
      name: "ChurnLens",
      blurb: "Lightweight churn-prediction model surfaced in a self-serve dashboard for CS teams.",
      bullets: [
        "Scores accounts on churn risk using historical usage patterns",
        "Self-serve dashboard lets CS teams explore risk factors directly",
        "Informed proactive outreach that improved retention conversations"
      ],
      link: "#",
      icon: "🔍",
      tags: ["Python", "Analytics"]
    }
  ],

  experience: [
    {
      role: "Director, Product & Automation Strategy",
      company: "Lumen Digital",
      dates: "2023 — Present",
      bullets: [
        "Lead a cross-functional team driving AI-powered automation across product, sales, and support, replacing 40+ manual workflows with self-service systems",
        "Own the roadmap for an internal automation platform built on Python and Salesforce, now used by 6 departments company-wide",
        "Partner directly with the executive team on analytics strategy, shaping the KPI framework used in every quarterly business review",
        "Grew the automation practice from 2 to 9 people, mentoring analysts and engineers into senior roles"
      ]
    },
    {
      role: "Senior Architect, Business Systems",
      company: "Northwind Analytics",
      dates: "2021 — 2023",
      bullets: [
        "Designed the architecture for a Salesforce and SQL data layer powering real-time executive dashboards for 200+ stakeholders",
        "Led the automation of the weekly reporting pipeline, cutting manual reporting effort by roughly 15 hours per week",
        "Introduced AI-assisted anomaly detection into analytics workflows, surfacing revenue-impacting issues days earlier",
        "Set the technical standards for automation and integrations that were adopted company-wide"
      ]
    },
    {
      role: "Consultant, Product & Data Systems",
      company: "Argent Consulting Group",
      dates: "2020 — 2021",
      bullets: [
        "Advised mid-market clients on CRM automation strategy, implementing Salesforce workflows that cut case handling time by double digits",
        "Built client-facing analytics dashboards translating raw SQL data into decision-ready insights",
        "Delivered Figma prototypes for internal tools, bridging client requirements and engineering build",
        "Ran discovery workshops that shaped automation roadmaps for 10+ client engagements"
      ]
    },
    {
      role: "Software Developer Intern",
      company: "Beacon & Co",
      dates: "2019 — 2020",
      bullets: [
        "Built internal Python scripts to automate recurring data-cleanup tasks, saving the team hours each week",
        "Wrote SQL queries and lightweight reporting tools used by the analytics team",
        "Prototyped UI concepts in Figma for an internal tools redesign",
        "Shadowed senior engineers on CRM integration work, gaining hands-on Salesforce exposure"
      ]
    }
  ],

  contacts: [
    { label: "Email", sub: "nadkarni.sujay@gmail.com", href: "mailto:nadkarni.sujay@gmail.com", icon: "📧" },
    { label: "LinkedIn", sub: "linkedin.com/in/sujaynadkarni", href: "https://www.linkedin.com/in/sujaynadkarni", icon: "💼" },
    { label: "GitHub", sub: "github.com/your-username", href: "https://github.com/your-username", icon: "💻" }, // TODO: confirm handle
    { label: "Resume", sub: "Download / view", href: "#", icon: "📄" } // TODO: add resume link
  ]
};
