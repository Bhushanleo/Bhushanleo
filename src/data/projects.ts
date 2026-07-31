export type Accent = "orange" | "blue" | "violet" | "teal";

export type Project = {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveDemo: string;
  accent: Accent;
  gradient: string;
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "cinematic-commerce",
    category: "E-Commerce",
    title: "Cinematic Commerce",
    subtitle: "Headless Storefront",
    description:
      "A headless storefront with motion-driven product reveals and a sub-second checkout flow, built for a direct-to-consumer apparel brand.",
    tags: ["Next.js", "Stripe", "Framer Motion"],
    liveDemo: "#",
    accent: "orange",
    gradient: "linear-gradient(135deg, #3a2210 0%, #7a3b12 55%, #ff8a3d 100%)",
  },
  {
    id: "02",
    slug: "realtime-ops-dashboard",
    category: "Platform",
    title: "Realtime Ops Dashboard",
    subtitle: "Infrastructure Monitoring",
    description:
      "Live infrastructure monitoring for distributed systems, streaming metrics at sub-second latency to on-call engineering teams.",
    tags: ["React", "WebSockets", "D3.js"],
    liveDemo: "#",
    accent: "blue",
    gradient: "linear-gradient(135deg, #0c1a2e 0%, #123a63 55%, #4fa8ff 100%)",
  },
  {
    id: "03",
    slug: "ai-content-studio",
    category: "AI / SaaS",
    title: "AI Content Studio",
    subtitle: "Generative Tooling",
    description:
      "Generative tooling for scriptwriters and video editors, built around a custom prompt pipeline and reusable content templates.",
    tags: ["Python", "FastAPI", "OpenAI"],
    liveDemo: "#",
    accent: "violet",
    gradient: "linear-gradient(135deg, #1c1030 0%, #43226e 55%, #b285ff 100%)",
  },
  {
    id: "04",
    slug: "motion-design-system",
    category: "Design System",
    title: "Motion Design System",
    subtitle: "Component Library",
    description:
      "A component library engineered for cinematic micro-interactions, shared across a full product suite by design and engineering.",
    tags: ["TypeScript", "GSAP", "Storybook"],
    liveDemo: "#",
    accent: "teal",
    gradient: "linear-gradient(135deg, #08201c 0%, #0f4a3f 55%, #3ddbc0 100%)",
  },
];
