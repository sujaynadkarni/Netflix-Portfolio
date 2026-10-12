/*
 * Placeholder content for the Netflix-style portfolio template.
 * Replace every value here (or run generate.py) with your own information.
 */
window.SITE_DATA = {
  meta: {
    name: "Your Name",
    logoText: "YOUR NAME",
    resume: "#",
    linkedin: "https://www.linkedin.com/in/your-handle",
    badge: "ORIGINAL",
    skillRepo: "https://github.com/your-username/netflix-portfolio-skill"
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
      id: "visitor",
      label: "Visitor",
      emoji: "🙂",
      color: "#E50914",
      heroBio: "This is placeholder bio text. Describe who you are, what you do, and why it matters — tailored to whoever is viewing this profile."
    }
  ],

  topPicksRow: [
    { title: "Experience", route: "professional", icon: "💼" },
    { title: "Skills", route: "skills", icon: "🛠️" },
    { title: "Projects", route: "projects", icon: "🎬" },
    { title: "Contact Me", route: "hire-me", icon: "📨" }
  ],

  continueWatchingRow: [
    { title: "Latest Project", route: "projects", icon: "🚀" },
    { title: "Resume", route: "professional", icon: "📄" },
    { title: "Get In Touch", route: "hire-me", icon: "✉️" }
  ],

  skills: [
    {
      category: "Example Category",
      items: [
        { name: "Skill One", icon: "⚙️", blurb: "Short description of this skill." },
        { name: "Skill Two", icon: "✨", blurb: "Short description of this skill." }
      ]
    }
  ],

  projects: [
    {
      name: "Example Project",
      blurb: "One line describing what it does and the impact it had.",
      link: "#",
      icon: "🎬",
      tags: ["Tag1", "Tag2"]
    }
  ],

  experience: [
    {
      role: "Job Title",
      company: "Company Name",
      dates: "2022 — Present",
      highlight: "One line describing a concrete result or responsibility."
    }
  ],

  contacts: [
    { label: "Email", sub: "you@example.com", href: "mailto:you@example.com", icon: "📧" },
    { label: "LinkedIn", sub: "linkedin.com/in/your-handle", href: "https://www.linkedin.com/in/your-handle", icon: "💼" },
    { label: "GitHub", sub: "github.com/your-username", href: "https://github.com/your-username", icon: "💻" },
    { label: "Resume", sub: "Download / view", href: "#", icon: "📄" }
  ]
};
