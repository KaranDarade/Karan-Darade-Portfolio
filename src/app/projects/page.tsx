import AllProjectsGrid from "./AllProjectsGrid";
import { getPaginatedProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const { projects, total, totalPages } = getPaginatedProjects(1, 6, "newest");

  return (
    <AllProjectsGrid
      initialProjects={projects}
      initialTotal={total}
      initialTotalPages={totalPages}
    />
  );
}
