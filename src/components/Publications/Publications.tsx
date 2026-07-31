import { getMediumPosts, type MediumPost } from "@/lib/medium";
import PublicationsView from "./PublicationsView";

const FALLBACK_POSTS: MediumPost[] = [
  {
    title: "Building Resilient APIs with FastAPI and LangChain",
    link: "#",
    pubDate: "",
    year: "2026",
    excerpt:
      "Patterns for structuring AI-powered endpoints that stay maintainable as the prompt logic grows.",
  },
  {
    title: "Scaling React Apps: Lessons from Production",
    link: "#",
    pubDate: "",
    year: "2025",
    excerpt:
      "What actually moved the needle on performance across three years of shipping React at scale.",
  },
  {
    title: "Designing Motion Systems for the Web",
    link: "#",
    pubDate: "",
    year: "2024",
    excerpt:
      "A practical approach to building animation primitives that stay consistent across a product.",
  },
];

export default async function Publications() {
  const posts = (await getMediumPosts()) ?? FALLBACK_POSTS;
  return <PublicationsView posts={posts} />;
}
