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

const BUNDLED_PATH = path.join(process.cwd(), "src", "data", "projects.json");
const KEY = "__portfolio_data__";

function load(): Project[] {
  const g = globalThis as any;
  if (g[KEY]) return g[KEY] as Project[];

  const raw = fs.readFileSync(BUNDLED_PATH, "utf-8");
  g[KEY] = JSON.parse(raw) as Project[];
  return g[KEY];
}

export function getAllProjects(): Project[] {
  return load();
}

export function getFeaturedProjects(): Project[] {
  return load()
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return load().find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  return load().find((p) => p.id === id);
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const projects = load();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
  };
  projects.push(newProject);
  return newProject;
}

export function saveProjects(updated: Project[]): void {
  (globalThis as any)[KEY] = updated;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = load();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = load();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  (globalThis as any)[KEY] = filtered;
  return true;
}

export function getPaginatedProjects(
  page: number,
  perPage: number = 6,
  sort: "newest" | "oldest" = "newest"
): { projects: Project[]; total: number; totalPages: number } {
  const all = load();
  const sorted = [...all].sort((a, b) => {
    const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return sort === "oldest" ? -diff : diff;
  });
  const total = sorted.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const start = (page - 1) * perPage;
  const projects = sorted.slice(start, start + perPage);
  return { projects, total, totalPages };
}

export type SortKey = "newest" | "oldest";
