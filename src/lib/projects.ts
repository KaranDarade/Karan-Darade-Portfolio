import fs from "fs";
import path from "path";
import os from "os";

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

const DATA_PATH = (() => {
  try {
    fs.accessSync(path.dirname(BUNDLED_PATH), fs.constants.W_OK);
    return BUNDLED_PATH;
  } catch {
    return path.join(os.tmpdir(), "portfolio-projects.json");
  }
})();

let cache: { data: Project[]; ts: number } | null = null;
const CACHE_TTL = 10_000;

function readProjects(): Project[] {
  const now = Date.now();
  if (cache && now - cache.ts < CACHE_TTL) return cache.data;
  const src = fs.existsSync(DATA_PATH) ? DATA_PATH : BUNDLED_PATH;
  const raw = fs.readFileSync(src, "utf-8");
  const data: Project[] = JSON.parse(raw);
  cache = { data, ts: now };
  return data;
}

function invalidateCache(updated?: Project[]) {
  if (updated) {
    cache = { data: updated, ts: Date.now() };
  } else {
    cache = null;
  }
}

export function getWritablePath(): string {
  return DATA_PATH;
}

export function getAllProjects(): Project[] {
  return readProjects();
}

export function getFeaturedProjects(): Project[] {
  const projects = readProjects();
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = readProjects();
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: string): Project | undefined {
  const projects = readProjects();
  return projects.find((p) => p.id === id);
}

export function saveProjects(projects: Project[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2), "utf-8");
  invalidateCache(projects);
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const projects = readProjects();
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
  const projects = readProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = readProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

export function getPaginatedProjects(
  page: number,
  perPage: number = 6,
  sort: "newest" | "oldest" = "newest"
): { projects: Project[]; total: number; totalPages: number } {
  const all = readProjects();

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
