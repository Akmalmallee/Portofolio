/**
 * Single source of truth for every piece of text on the site.
 * Kept separate from components so copy can be edited without touching UI code.
 */

export type ProjectStatus = "prototype" | "in progress" | "completed";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  title: string;
  category: "Web" | "Mobile" | "Creative Coding";
  summary: string;
  problem: string;
  goal: string;
  tech: string[];
  year: string;
  status: ProjectStatus;
  highlights: string[];
  image: ProjectImage;
  repoUrl: string | null;
  liveUrl: string | null;
};

export const profile = {
  name: "Akmal Syarief R.",
  initials: "AS",
  role: "Web Developer",
  disciplines: ["Web Development", "Mobile Development", "Creative Coding"],
  headline: "I build web, mobile, and interactive work that holds up under a second look.",
  summary: [
    "I am an Information Technology student at Universitas Bina Sarana Informatika, working across web applications, mobile apps, and interactive 3D experiments.",
    "I care about interfaces that stay readable, code that stays maintainable, and the reasoning behind why a thing is built the way it is.",
  ],
  email: "akmalsyarief1510@gmail.com",
  location: "Indonesia",
  availability: "Open to internship opportunities",
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "Akmalmallee",
    url: "https://github.com/Akmalmallee",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "malllagii",
    url: "https://www.instagram.com/malllagii/",
  },
] as const;

export const projects: Project[] = [
  {
    id: "rex-store",
    title: "Rex Store",
    category: "Web",
    summary:
      "A full fashion e-commerce build: storefront, cart and checkout for customers, and an analytics-backed admin panel for the shop.",
    problem:
      "Selling online needs more than a product grid. It needs a checkout that a person can finish, and an admin view that answers what actually sold.",
    goal:
      "Implement a complete Laravel commerce flow end to end, from catalogue to payment proof to invoice.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "Chart.js"],
    year: "2025",
    status: "prototype",
    highlights: [
      "Shop with search, category, price and size filters, plus sorting",
      "Cart, checkout with courier and payment selection, payment proof upload",
      "PDF invoices, order history with status tracking, wishlist",
      "Admin dashboard with revenue charts, product, order and coupon management",
      "Role based access with Laravel Breeze authentication",
    ],
    repoUrl: "https://github.com/Akmalmallee/Rex-Store",
    liveUrl: null,
    image: {
      src: "/images/projects/rex-store.webp",
      alt: "Preview of the Rex Store commerce interface",
      width: 1600,
      height: 893,
    },
  },
  {
    id: "ticket-booking-app",
    title: "Ticket Booking App",
    category: "Mobile",
    summary:
      "A cross-platform booking flow built in Flutter, focused on getting a person from browsing to a confirmed seat in few steps.",
    problem:
      "Booking flows fail when the interface hides the state the user needs: what is available, what is held, and what is confirmed.",
    goal:
      "Apply Flutter fundamentals to a real booking flow with clear state at every step.",
    tech: ["Flutter", "Dart", "SQLite"],
    year: "2025",
    status: "in progress",
    highlights: [
      "Cross platform build from a single Dart codebase",
      "Booking flow structured around availability, selection and confirmation",
      "Local persistence with SQLite for saved state",
    ],
    repoUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/ticket-booking-app.webp",
      alt: "Preview of the Ticket Booking App screens",
      width: 1600,
      height: 1195,
    },
  },
  {
    id: "capybara-experience",
    title: "Capybara Experience",
    category: "Creative Coding",
    summary:
      "An interactive 3D scene in Three.js, built to understand how a rendered space is composed rather than just displayed.",
    problem:
      "3D on the web is easy to copy and hard to reason about. Camera, light, and material each decide what a visitor notices.",
    goal:
      "Learn scene composition, camera behaviour and material response by building something you can move through.",
    tech: ["Three.js", "JavaScript"],
    year: "2025",
    status: "prototype",
    highlights: [
      "Real time rendering pipeline set up from scratch",
      "Camera and lighting tuned for a specific mood",
      "Pointer driven interaction inside the scene",
    ],
    repoUrl: null,
    liveUrl: null,
    image: {
      src: "/images/projects/capybara-experience.webp",
      alt: "Preview of the Capybara Experience 3D scene",
      width: 1600,
      height: 893,
    },
  },
];

export const skills = [
  {
    group: "Web",
    items: ["TypeScript", "React", "Tailwind CSS", "Laravel", "Node.js", "REST APIs"],
  },
  {
    group: "Mobile",
    items: ["Kotlin", "Jetpack Compose", "Flutter", "Dart", "SQLite"],
  },
  {
    group: "Creative Coding",
    items: ["Three.js", "React Three Fiber", "GLSL", "Generative Design"],
  },
];

export const education = {
  institution: "Universitas Bina Sarana Informatika",
  degree: "Information Technology",
  period: "2023 to present",
  location: "Indonesia",
};

export const focus = [
  "Web applications with a bias toward clarity and maintainability.",
  "Mobile interfaces that stay structured and easy to follow.",
  "Interactive 3D and creative coding as a way to widen technical range.",
  "Clean code habits applied to small, real problems.",
];

export const footer = {
  tagline: "Information Technology student crafting functional digital experiences.",
  copyright: "Akmal Syarief R. All rights reserved.",
};
