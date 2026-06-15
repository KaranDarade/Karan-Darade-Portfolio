import AllProjectsGrid from "./AllProjectsGrid";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <AllProjectsGrid projects={projects} />;
}
