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
  location: "Hong Kong",
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
    title: "Assistant Analyst Programmer",
    company: "Occupational Deafness Compensation Board (ODCB)",
    period: "May 2026 - Present",
    location: "Hong Kong",
    summary:
      "Public-sector IT role supporting AI chatbot integration, UAT, vendor coordination, procurement follow-up, and digital service delivery across public-facing and internal systems.",
    bullets: [
      "Supported the integration of an AI chatbot into the organization's public website, with focus on controlled responses, legally compliant scope boundaries, and safe handling of out-of-scope user queries.",
      "Reviewed and refined chatbot behavior through prompt design, tone control, response testing, and business-scope validation.",
      "Coordinated with vendors on the implementation of a DeepSeek API-powered chatbot solution, including requirement clarification, service scope review, and delivery follow-up.",
      "Built an internal AI chatbot proof-of-concept using Gemini API, LiveKit, and Vercel to demonstrate AI-enabled service interaction and real-time web deployment capabilities.",
      "Participated in UAT for public website, internal portal, and case management system functions, covering test case preparation, test execution, issue reporting, and result tracking.",
      "Used Excel and vendor portal tools to manage UAT records, report defects, track vendor responses, and consolidate testing feedback.",
      "Assisted in translating business and operational requirements into implementation-ready items for vendors and technical stakeholders.",
      "Supported procurement-related coordination, including vendor communication, service requirement review, quotation/service scope discussion, and implementation follow-up.",
    ],
  },
  {
    title: "Career Transition & Independent Technical Projects",
    period: "Oct 2025 - Apr 2026",
    location: "Hong Kong",
    summary:
      "Returned to Hong Kong and focused on job search, technical upskilling, and independent software projects related to cloud, automation, trading systems, and personal productivity applications.",
    bullets: [
      "Built independent technical projects using AI-assisted development workflows, including a calorie tracking iOS app and a personal budget planning tool.",
      "Explored algorithmic trading concepts through personal projects involving market data, trading logic, and automation workflows.",
      "Practiced modern software development workflows, including requirement planning, prompt engineering, debugging, and iterative feature development.",
      "Strengthened practical knowledge in cloud, data, and application development while preparing for technical roles in Hong Kong.",
      "Continued professional development through cloud and data analytics certification study.",
    ],
  },
  {
    title: "Technology Sales Associate / Team Member",
    company: "Canada Computers & Electronics",
    period: "Oct 2024 - Oct 2025",
    location: "Toronto, Canada",
    summary:
      "Customer-facing technology sales role during a Canadian working holiday, advising customers on computer hardware, PC components, and practical technology purchasing decisions.",
    bullets: [
      "Provided customer consultation on PC components, peripherals, electronics, and system compatibility based on use case, budget, and performance requirements.",
      "Developed practical knowledge of computer hardware, including CPUs, GPUs, motherboards, RAM, storage, power supplies, cooling, and PC assembly considerations.",
      "Applied pre-sales communication skills by identifying customer needs, explaining technical trade-offs, and recommending suitable products.",
      "Supported upselling and cross-selling opportunities by matching customers with relevant upgrades, accessories, warranties, and complementary products.",
      "Built confidence in English-language customer communication, objection handling, and consultative selling in a fast-paced retail technology environment.",
      "Strengthened commercial awareness by balancing technical recommendations with pricing, availability, customer priorities, and sales targets.",
    ],
  },
  {
    title: "Relocation Preparation & Professional Development",
    period: "Jul 2024 - Oct 2024",
    location: "Hong Kong / Canada",
    summary:
      "Prepared for relocation to Canada under the Hong Kong Stream B open work permit pathway while continuing technical learning and career planning.",
    bullets: [
      "Managed relocation preparation, work permit planning, job market research, and transition planning for overseas work experience in Canada.",
      "Continued self-study in cloud computing, data analytics, and software development to prepare for future technical roles.",
      "Researched technology, IT support, and customer-facing opportunities to build international work experience and communication capability.",
    ],
  },
  {
    title: "System Engineer",
    company: "Lenovo PCCW Solutions Limited",
    period: "Jul 2023 - Jun 2024",
    location: "Kowloon, Hong Kong",
    summary:
      "Supported cloud, infrastructure, and enterprise system delivery for client-facing projects across healthcare, transportation/payment, and cloud POS environments, with exposure to AWS, Azure, data platforms, and Level 2 production support.",
    bullets: [
      "Supported enterprise cloud and infrastructure implementation work across production-facing client projects, including healthcare, transportation/payment, and cloud POS-related environments.",
      "Assisted with AWS-related infrastructure components, including S3, virtual machine-based compute, auto scaling, virtual networking, and load balancing concepts.",
      "Worked with Azure and data platform technologies, including Azure Databricks, Azure Data Lake, Azure Data Factory, and Microsoft Fabric-related environments.",
      "Provided Level 2 support for incidents, urgent failures, and operational issues, coordinating troubleshooting and escalation across internal teams and vendors.",
      "Supported infrastructure environments involving VMware, Active Directory, Microsoft 365, networking, and general system administration tasks.",
      "Coordinated implementation and support activities across a cloud and infrastructure team to keep project execution and incident response moving.",
      "Worked with on-site teams, internal engineers, vendors, and client stakeholders in multi-party enterprise delivery environments.",
      "Assisted with deployment, configuration, troubleshooting, documentation, and post-implementation support for client-facing systems.",
      "Balanced technical execution with issue follow-up, project constraints, operational support, and stakeholder communication.",
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
    title: "Cloud & Infrastructure",
    items: [
      "AWS S3",
      "EC2/VM Compute",
      "Auto Scaling",
      "Load Balancing",
      "VPC/Virtual Networking",
      "Azure",
      "VMware",
      "Active Directory",
      "Microsoft 365",
      "Networking Fundamentals",
    ],
  },
  {
    title: "Data & Analytics",
    items: [
      "Azure Databricks",
      "Azure Data Lake",
      "Azure Data Factory",
      "Microsoft Fabric",
      "SQL",
      "Google Data Analytics",
      "Google Advanced Data Analytics",
    ],
  },
  {
    title: "AI & Application Development",
    items: [
      "DeepSeek API",
      "Gemini API",
      "LiveKit",
      "Vercel",
      "AI Chatbot Integration",
      "Prompt Design",
      "Scope Control",
      "Response Testing",
    ],
  },
  {
    title: "Testing & Delivery",
    items: [
      "UAT",
      "Test Case Preparation",
      "Defect Reporting",
      "Vendor Portal",
      "Excel Tracking",
      "Requirement Clarification",
      "Procurement Coordination",
    ],
  },
  {
    title: "Business & Communication",
    items: [
      "Vendor Coordination",
      "Stakeholder Communication",
      "Public-Sector IT Support",
      "Technical Documentation",
      "Pre-sales Communication",
      "Customer Consultation",
    ],
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
    name: "Microsoft Certified: Fabric Data Engineer Associate (DP-700)",
    issuer: "Microsoft",
    status: "Completed / Current",
    earnedOn: "July 10, 2026",
    expiresOn: "July 11, 2027",
    link: "https://learn.microsoft.com/zh-tw/users/ChakSumFung-5694/credentials/440037B78284D935",
    image: "/assets/img/certificate-pic/azureLogo.png",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    issuer: "Microsoft",
    status: "Completed / Current",
    image: "/assets/img/certificate-pic/azureLogo.png",
  },
  {
    name: "Microsoft Certified: Azure Solutions Architect Expert (AZ-305)",
    issuer: "Microsoft",
    status: "Completed / Current",
    link: "https://learn.microsoft.com/zh-tw/users/ChakSumFung-5694/credentials/4CCB20F69C558DC",
    image: "/assets/img/certificate-pic/azureLogo.png",
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    status: "Completed / Current",
    link: "https://www.credly.com/badges/043cb456-8a90-4a71-a8b8-98373e4b1b85/linked_in_profile",
    image: "/assets/img/certificate-pic/awsLogo.png",
  },
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    status: "Completed / Current",
    link: "https://www.credly.com/badges/bd1204b0-6d25-4ead-a621-55af5cef4c5e/linked_in_profile",
    image: "/assets/img/certificate-pic/courseraLogo.png",
  },
  {
    name: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    status: "Completed / Current",
    image: "/assets/img/certificate-pic/dataAnalyticsLogo.png",
  },
  {
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    status: "Planned",
    image: "/assets/img/certificate-pic/awsLogo.png",
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
