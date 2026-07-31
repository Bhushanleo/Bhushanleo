import type { Metadata } from "next";
import ProjectsArchive from "@/components/ProjectsArchive/ProjectsArchive";

export const metadata: Metadata = {
  title: "Projects — Bhushan Gowda",
  description: "Selected projects by Bhushan Gowda, full-stack developer.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsArchive />
    </main>
  );
}
