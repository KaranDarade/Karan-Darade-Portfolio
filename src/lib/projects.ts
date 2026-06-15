import fs from "fs";
import path from "path";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  deploymentUrl: string;
  imageUrl: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), "src", "data", "projects.json");

export function getAllProjects(): Project[] {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

export function getFeaturedProjects(): Project[] {
  const projects = getAllProjects();
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  const projects = getAllProjects();
  return projects.find((p) => p.id === id);
}

export function saveProjects(projects: Project[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), "utf-8");
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const projects = getAllProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getAllProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

export function getPaginatedProjects(page: number, perPage: number = 6): { projects: Project[]; total: number; totalPages: number } {
  const projects = getAllProjects();
  const total = projects.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const paginatedProjects = projects.slice(start, start + perPage);
  return { projects: paginatedProjects, total, totalPages };
}
