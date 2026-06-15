const KNOWN_TECH = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "Python",
  "Django", "Flask", "Tailwind CSS", "Bootstrap", "CSS3", "HTML5", "Sass", "SCSS",
  "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Prisma", "Drizzle ORM", "Redis",
  "Docker", "Kubernetes", "AWS", "Vercel", "Netlify", "Firebase", "Supabase",
  "Framer Motion", "GSAP", "Three.js", "WebGL", "jQuery", "Vue", "Angular",
  "Svelte", "Rust", "Go", "Java", "C#", "PHP", "Ruby", "Swift", "Kotlin",
  "Flutter", "React Native", "Expo", "NextAuth", "Clerk", "Stripe", "tRPC",
  "GraphQL", "REST", "WebSocket", "Socket.io", "JWT", "OAuth", "Playwright",
  "Jest", "Vitest", "Cypress", "MDX", "Shadcn/ui", "Radix UI", "Zustand",
  "Redux", "Zod", "React Hook Form", "TanStack Query", "SWR", "Axios",
  "ESLint", "Prettier", "Webpack", "Vite", "Turbopack", "Turborepo",
  "GitHub Actions", "CI/CD", "Drizzle", "Neon", "PlanetScale", "Cloudflare",
];

const BULLET_PATTERNS = [
  /[-*]\s+(.+)/g,
  /^\d+[.)]\s+(.+)/gm,
  /\[x\]\s+(.+)/g,
  /\[\s\]\s+(.+)/g,
  /###?\s+Features?:?\s*\n([\s\S]*?)(?=\n###|\n---|$)/i,
  /##?\s+Key Features:?\s*\n([\s\S]*?)(?=\n##|\n---|$)/i,
  /##?\s+What'?s? inside:?\s*\n([\s\S]*?)(?=\n##|\n---|$)/i,
];

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function generateDescription(readme: string, repoDescription: string): string {
  if (repoDescription && repoDescription.length > 20) {
    return repoDescription.length > 160
      ? repoDescription.slice(0, 157) + "..."
      : repoDescription;
  }

  const lines = readme
    .split("\n")
    .map((l) => l.replace(/^#+\s*/, "").replace(/[*_`]/g, "").trim())
    .filter((l) => l.length > 30 && l.length < 200);

  if (lines.length > 0) {
    const desc = lines[0];
    return desc.length > 160 ? desc.slice(0, 157) + "..." : desc;
  }

  return "A project built with modern web technologies.";
}

export function generateDetailedDescription(readme: string): string {
  let cleaned = readme
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const paragraphs = cleaned
    .split("\n\n")
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter((p) => p.length > 40);

  if (paragraphs.length === 0) return cleaned.slice(0, 500);

  const selected = paragraphs.slice(0, 4);
  return selected.join("\n\n").slice(0, 2000);
}

export function extractTechStack(languages: string[], readme: string): string[] {
  const mentioned = new Set<string>();

  for (const lang of languages) {
    mentioned.add(lang);
  }

  const readmeLower = readme.toLowerCase();
  for (const tech of KNOWN_TECH) {
    if (readmeLower.includes(tech.toLowerCase())) {
      mentioned.add(tech);
    }
  }

  return Array.from(mentioned).slice(0, 12);
}

export function extractFeatures(readme: string, techStack: string[]): string[] {
  const features = new Set<string>();

  for (const pattern of BULLET_PATTERNS) {
    let match: RegExpExecArray | null;
    const regex = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g");
    while ((match = regex.exec(readme)) !== null) {
      const text = match[1] || match[0];
      const cleaned = text
        .replace(/^[-*\s]+/, "")
        .replace(/\[[x ]\]\s*/i, "")
        .replace(/[*_`]/g, "")
        .trim();
      if (cleaned.length > 10 && cleaned.length < 150 && !/^\d/.test(cleaned)) {
        features.add(cleaned);
      }
    }
  }

  if (features.size === 0) {
    for (const tech of techStack) {
      features.add(`Built with ${tech}`);
    }
  }

  return Array.from(features).slice(0, 10);
}
