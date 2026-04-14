import type {
  Certification,
  ExperienceItem,
  Profile,
  Project,
  Testimonial,
} from "../types/site";

export const profile: Profile = {
  name: "Michael Fung",
  fullName: "Fung Chak Sum",
  role: "System Engineer and Developer",
  location: "North York, Toronto",
  intro:
    "I build dependable systems and practical digital products across cloud infrastructure, internal tools, and interactive experiences.",
  summary:
    "My background spans system engineering, web development, and game production. I enjoy turning ambiguous requirements into structured delivery plans, collaborating across teams, and shipping work that is both stable and useful.",
  portrait: "/assets/img/profile-img.jpg",
  availability: "Open to engineering roles and cross-functional product work.",
  highlights: [
    { label: "Current focus", value: "Cloud delivery and systems integration" },
    { label: "Degree", value: "B.Eng. in Information Engineering, CUHK" },
    { label: "Strength", value: "Bridging technical execution and client needs" },
  ],
  contactLinks: [
    { label: "Email", href: "mailto:chaksumfung@gmail.com", icon: "mail" },
    { label: "GitHub", href: "https://github.com/mic1g", icon: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/cs-fung/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/_micro_fung/",
      icon: "instagram",
    },
  ],
};

export const strengths = [
  {
    title: "Systems that hold up in real work",
    description:
      "I work comfortably across cloud platforms, infrastructure delivery, and implementation details that need to be reliable after handoff.",
  },
  {
    title: "Clear coordination across teams",
    description:
      "I am used to translating business needs into concrete workstreams and helping teams move with a shared plan.",
  },
  {
    title: "Builder mindset",
    description:
      "From internal tools to interactive project work, I enjoy taking ownership of the path from idea to a usable result.",
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: "System Engineer",
    company: "Lenovo PCCW Solutions Limited",
    period: "Jul 2023 - Present",
    location: "Kowloon, Hong Kong",
    summary:
      "Delivering cloud and infrastructure solutions while coordinating implementation work across projects and on-site teams.",
    bullets: [
      "Delivered AWS and Azure solutions as a solution integrator for production-facing projects.",
      "Coordinated work across a seven-member cloud and infrastructure team to keep project execution moving.",
      "Supported large-scale client engagements and on-site delivery for multi-stakeholder environments.",
      "Balanced technical implementation with project constraints, communication, and operational support.",
    ],
  },
  {
    title: "Game Development Intern",
    company: "CUHK CINTEC",
    period: "Jun 2022 - Oct 2022",
    location: "Sha Tin, Hong Kong",
    summary:
      "Worked on exhibition-ready game experiences and supporting systems for research promotion projects.",
    bullets: [
      "Delivered 13 mini-games in Unity within three months for a public-facing exhibition environment.",
      "Built supporting database workflows for project tracking and data analysis.",
      "Helped maintain web content and presentation assets around the exhibition experience.",
      "Prepared game concepts and proposals for clients and account managers under tight timelines.",
    ],
  },
  {
    title: "SAP Web Development Intern",
    company: "AVNET",
    period: "Jun 2021 - Aug 2021",
    location: "Kowloon, Hong Kong",
    summary:
      "Supported business-facing technical work with exposure to web development, data platforms, and Microsoft tooling.",
    bullets: [
      "Translated business requirements into implementation-ready development tasks.",
      "Worked with Azure cloud services, including exposure to Azure Synapse.",
      "Applied database and SQL fundamentals to day-to-day project work.",
      "Used Microsoft development tools and C# in a practical delivery setting.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Engineering in Information Engineering",
  school: "The Chinese University of Hong Kong",
  period: "2019 - 2023",
  description:
    "Studied software development, data structures, systems thinking, and interdisciplinary technical problem solving.",
};

export const skillGroups = [
  {
    title: "Cloud and Infrastructure",
    items: ["AWS", "Azure", "Systems Integration", "Infrastructure Delivery"],
  },
  {
    title: "Development",
    items: ["TypeScript", "React", "HTML/CSS", "C#", "ASP.NET", "Python"],
  },
  {
    title: "Data and Automation",
    items: ["SQL", "Power BI", "Power Automate", "Workflow Design"],
  },
  {
    title: "Ways of Working",
    items: ["Stakeholder Communication", "Project Coordination", "Kanban Planning", "Team Collaboration"],
  },
];

export const projects: Project[] = [
  {
    slug: "spf-runner",
    title: "SPF Runner",
    category: "Interactive exhibit game",
    role: "Project manager and concept lead",
    stack: ["Unity", "Game Design", "Project Coordination"],
    summary:
      "A public-facing Unity game created to help communicate research concepts in a playful, accessible way.",
    challenge:
      "The experience had to be engaging for exhibition visitors while still supporting the communication goals of a research-focused client.",
    impact:
      "I shaped the concept, organized delivery through a Kanban workflow, and helped align design and development contributions into one polished outcome.",
    image: "/assets/img/portfolio/Runner/Runner-gameplay.png",
    gallery: [
      "/assets/img/portfolio/Runner/Runner-index.png",
      "/assets/img/portfolio/Runner/Runner-gameplay.png",
      "/assets/img/portfolio/Runner/Runner-lose.png",
    ],
    links: [
      { label: "Gameplay", href: "http://ihost-cintec.cintec.cuhk.edu.hk:8081" },
      {
        label: "Project Page",
        href: "https://exhibition.cintec.cuhk.edu.hk/projects/eco-uv-filters-using-engineered-hollow-spheres/",
      },
    ],
  },
  {
    slug: "typhoon-simulator",
    title: "Typhoon Simulator",
    category: "Interactive simulation",
    role: "Game and experience contributor",
    stack: ["Unity", "Interactive Design", "Exhibition Delivery"],
    summary:
      "A simulation project designed to make scientific and environmental ideas easier to experience through interaction.",
    challenge:
      "The project needed to remain intuitive for a broad audience while still giving the client a meaningful way to present complex content.",
    impact:
      "The result supported a large public exhibition and helped turn technical subject matter into something more memorable and approachable.",
    image: "/assets/img/portfolio/typhoon/gameplay.png",
    gallery: [
      "/assets/img/portfolio/typhoon/index.png",
      "/assets/img/portfolio/typhoon/gameplay.png",
      "/assets/img/portfolio/typhoon/success.png",
      "/assets/img/portfolio/typhoon/fail.png",
    ],
    links: [],
  },
  {
    slug: "hydrogel",
    title: "Hydrogel Experience",
    category: "Research communication game",
    role: "Interactive project contributor",
    stack: ["Unity", "Visual Communication", "Team Delivery"],
    summary:
      "A mini-game built to support research storytelling and audience engagement in a public-facing setting.",
    challenge:
      "The experience had to feel lightweight and fun without losing the clarity of the message it was meant to communicate.",
    impact:
      "I helped deliver a presentation layer that made the research easier for visitors to understand and interact with.",
    image: "/assets/img/portfolio/hydrogel/gameplay.png",
    gallery: [
      "/assets/img/portfolio/hydrogel/index.png",
      "/assets/img/portfolio/hydrogel/gameplay.png",
      "/assets/img/portfolio/hydrogel/success.png",
    ],
    links: [],
  },
  {
    slug: "energy-trading",
    title: "Social Optimal Energy Trading",
    category: "Academic tool and analysis",
    role: "Developer and analyst",
    stack: ["MATLAB", "Optimization", "Data Visualization"],
    summary:
      "An academic project exploring energy trading outcomes through modeling, interface design, and data presentation.",
    challenge:
      "The work required balancing technical correctness with a format that could still communicate clearly through visuals and a compact interface.",
    impact:
      "I packaged the model, interface, and supporting visuals into a clearer presentation of the project’s findings.",
    image: "/assets/img/portfolio/MATLAB/app-interface.png",
    gallery: [
      "/assets/img/portfolio/MATLAB/app-interface.png",
      "/assets/img/portfolio/MATLAB/pdgraph.png",
      "/assets/img/portfolio/MATLAB/poster.png",
    ],
    links: [
      {
        label: "Academic Poster",
        href: "/assets/img/portfolio/MATLAB/academic%20poster.pdf",
      },
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Certification",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/043cb456-8a90-4a71-a8b8-98373e4b1b85/linked_in_profile",
    image: "/assets/img/certificate-pic/awsLogo.png",
  },
  {
    name: "Azure Certification",
    issuer: "Microsoft",
    link: "https://learn.microsoft.com/zh-tw/users/ChakSumFung-5694/credentials/4CCB20F69C558DC",
    image: "/assets/img/certificate-pic/azureLogo.png",
  },
  {
    name: "Google Data Analytics",
    issuer: "Google / Coursera",
    link: "https://www.credly.com/badges/bd1204b0-6d25-4ead-a621-55af5cef4c5e/linked_in_profile",
    image: "/assets/img/certificate-pic/courseraLogo.png",
  },
  {
    name: "Alibaba Cloud Certification",
    issuer: "Alibaba Cloud",
    link: "https://edu.alibabacloud.com/certification/acp_cloudcomputing",
    image: "/assets/img/certificate-pic/alibabaCloudLogo.png",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Michael brings structure to busy projects and keeps the team moving with clear communication and thoughtful coordination.",
    name: "Chris Lee Siu Hin",
    title: "Development Lead and Founder of People Hunt",
  },
  {
    quote:
      "He learns new tools quickly, delivers professionally, and regularly contributes ideas that improve how the work gets done.",
    name: "Margaret Ng Yu Yan",
    title: "Assurance Manager",
  },
  {
    quote:
      "He takes initiative, organizes shared work well, and creates momentum when a project needs both ownership and teamwork.",
    name: "Enoch Tang Yee Noh",
    title: "Schoolmate and collaborator",
  },
];
