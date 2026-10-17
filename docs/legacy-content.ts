/*
 * SNAPSHOT of the previous site's src/data/content.ts, kept so no copy is lost
 * when the site was rebuilt. Not imported by the app. Reference only.
 */

export type ProjectStatus = "prototype" | "in progress" | "completed";

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem?: string;
  goal?: string;
  tech: string[];
  tags?: string[];
  year: string;
  status: ProjectStatus;
  featured: boolean;
  thumbnail?: string;
  screenshots?: string[];
  features?: string[];
  liveUrl?: string | null;
  repoUrl?: string | null;
  caseStudyUrl?: string;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  description?: string;
};

export type ExperienceType = "work" | "organization" | "certification" | "achievement" | "other";

export type ExperienceItem = {
  title: string;
  org: string;
  type: ExperienceType;
  period: string;
  location?: string;
  description?: string[];
  verified: boolean;
  link?: string | null;
};

export type TechStackCategory =
  | "Languages"
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "3D & Creative"
  | "Tools"
  | "Database"
  | "Other";

export type TechStackItem = {
  name: string;
  category: TechStackCategory;
};

export type ResumeConfig = {
  available: boolean;
  filePath?: string;
  label?: string;
  note?: string;
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  name: "Akmal Syarief R.",
  initials: "AS",
  role: "Information Technology Student",
  disciplines: ["Web Development", "Mobile Development", "Creative Coding"],
  headline:
    "An IT student building fast, thoughtful software across the web, mobile, and the interactive space.",
  summary: [
    "Akmal Syarief R. is an Information Technology student focused on developing practical applications across web, mobile, and interactive experiments. He enjoys building clear, maintainable interfaces and learning the reasoning behind solid engineering decisions.",
    "His current focus is to strengthen core development fundamentals, write readable code, and apply structured approaches to small projects while keeping usability and accessibility in mind.",
  ],
  email: "akmalsyarief1510@gmail.com",
  location: "Indonesia",
  availability: "Open to internship opportunities",
};

export const socials = [
  { id: "github", label: "GitHub", handle: "Akmallmallee", url: "https://github.com" },
  { id: "instagram", label: "Instagram", handle: "malllagii", url: "https://www.instagram.com/malllagii/" },
] as const;

export const skills = [
  {
    group: "Web",
    items: ["TypeScript", "React", "Tailwind CSS", "Node.js", "REST APIs"],
  },
  {
    group: "Mobile",
    items: ["Kotlin", "Jetpack Compose", "Flutter", "SQLite"],
  },
  {
    group: "Creative Coding",
    items: ["Three.js", "React Three Fiber", "GLSL", "Generative Design"],
  },
];

export const timeline = [
  {
    period: "2023 - present",
    title: "Information Technology",
    org: "Placeholder University",
    note: "Focus areas: software engineering, web and mobile development, creative coding electives.",
  },
];

export const projects: Project[] = [
  {
    id: "rex-fashion",
    title: "REX FASHION",
    category: "Web",
    summary: "Web application project built with Laravel as a candidate project study case.",
    problem: "The objective focuses on building a structured web application using Laravel framework.",
    goal: "Explore and implement core Laravel concepts in a focused web project.",
    tech: ["Laravel", "PHP", "MySQL"],
    tags: ["Laravel", "PHP"],
    year: "2025",
    status: "prototype",
    featured: true,
    thumbnail: asset("images/projects/rex-fashion.jpg"),
    screenshots: [asset("images/projects/rex-fashion.jpg")],
    features: ["Built with Laravel framework", "Structured web application approach"],
    liveUrl: null,
    repoUrl: null,
    caseStudyUrl: "/projects/rex-fashion",
  },
  {
    id: "ticket-booking-app",
    title: "TICKET BOOKING APP",
    category: "Mobile",
    summary: "Mobile application project built with Flutter as a candidate project study case.",
    problem: "Focused on implementing a ticket booking flow in a cross-platform mobile app.",
    goal: "Apply Flutter fundamentals to structure a booking-focused mobile interface.",
    tech: ["Flutter", "Dart"],
    tags: ["Flutter", "Mobile"],
    year: "2025",
    status: "in progress",
    featured: true,
    thumbnail: asset("images/projects/ticket-booking-app.jpg"),
    screenshots: [asset("images/projects/ticket-booking-app.jpg")],
    features: ["Built with Flutter framework", "Focused on booking flow structure"],
    liveUrl: null,
    repoUrl: null,
    caseStudyUrl: "/projects/ticket-booking-app",
  },
  {
    id: "capybara-experience",
    title: "CAPYBARA EXPERIENCE",
    category: "Creative Coding",
    summary: "Interactive 3D experience built with Three.js as a candidate project study case.",
    problem: "Exploring interactive 3D rendering and scene composition using Three.js.",
    goal: "Learn and apply Three.js fundamentals for an interactive web experience.",
    tech: ["Three.js", "JavaScript"],
    tags: ["Three.js", "3D"],
    year: "2025",
    status: "prototype",
    featured: true,
    thumbnail: asset("images/projects/capybara-experience.jpg"),
    screenshots: [asset("images/projects/capybara-experience.jpg")],
    features: ["Interactive 3D scene built with Three.js", "Focus on scene composition"],
    liveUrl: null,
    repoUrl: null,
    caseStudyUrl: "/projects/capybara-experience",
  },
];

export const education: Education[] = [
  {
    institution: "Universitas Bina Sarana Informatika",
    degree: "Information Technology",
    period: "2023 - present",
    location: "Indonesia",
    description: "[To be updated with verified details as they become available]",
  },
];

export const technicalFocus: string[] = [
  "Developing web applications with a focus on clarity and maintainability.",
  "Building mobile applications with structured, user-friendly interfaces.",
  "Exploring interactive 3D and creative coding experiments to broaden technical understanding.",
  "Applying logical thinking and clean code practices to learn and solve practical problems.",
];

export const techStack: TechStackItem[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "Dart", category: "Languages" },
  { name: "Kotlin", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Vite", category: "Frontend" },
  { name: "Laravel", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Jetpack Compose", category: "Mobile" },
  { name: "SQLite", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Three.js", category: "3D & Creative" },
  { name: "React Three Fiber", category: "3D & Creative" },
  { name: "GLSL", category: "3D & Creative" },
  { name: "Git", category: "Tools" },
  { name: "VS Code", category: "Tools" },
];

export const experience: ExperienceItem[] = [
  {
    title: "[To be added]",
    org: "[To be verified]",
    type: "other",
    period: "[TBD]",
    location: "Indonesia",
    description: ["No verified data available at this time."],
    verified: false,
    link: null,
  },
];

export const resume: ResumeConfig = {
  available: false,
  filePath: asset("resume.pdf"),
  label: "View Resume",
  note: "Resume/CV not yet available. Configure in src/data/content.ts when a verified PDF is ready.",
};

export const footer = {
  tagline: "Information Technology student crafting functional digital experiences.",
  copyright: "Akmal Syarief R. All rights reserved.",
};
