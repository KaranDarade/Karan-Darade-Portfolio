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

const CONTENT_HEADINGS = ["about", "overview", "description", "introduction", "what is", "what's this", "about the project", "project overview", "get started", "demo", "about this project"];

const SKIP_HEADINGS = ["installation", "setup", "usage", "contributing", "license", "changelog", "api", "api reference", "api documentation", "roadmap", "contact", "support", "acknowledgments", "credits", "authors", "contributors", "code of conduct", "security", "faq", "requirements", "prerequisites"];

const FEATURE_HEADINGS = ["features", "key features", "highlights", "capabilities", "what's included", "what you can do", "key highlights"];

function splitSections(readme: string): [string, string][] {
  const sections: [string, string][] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of readme.split("\n")) {
    const m = line.match(/^#{1,4}\s+(.+)/);
    if (m) {
      if (currentLines.length > 0) sections.push([currentHeading, currentLines.join("\n")]);
      currentHeading = m[1].trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) sections.push([currentHeading, currentLines.join("\n")]);
  return sections;
}

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/^[>|]\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractParagraphs(text: string): string[] {
  const clean = stripMarkdown(text);
  const raw = clean
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const joined: string[] = [];
  let buf = "";
  for (const line of raw) {
    if (line.endsWith(".") || line.endsWith("!") || line.endsWith("?") || line.length > 120) {
      buf += (buf ? " " : "") + line;
      joined.push(buf);
      buf = "";
    } else if (line.length < 15 && buf.length > 0) {
      buf += " " + line;
    } else if (line.length < 15) {
      // skip very short orphan lines
    } else {
      buf += (buf ? " " : "") + line;
    }
  }
  if (buf.length > 20) joined.push(buf);
  return joined.filter((p) => p.length > 30);
}

function extractSentences(text: string): string[] {
  const clean = stripMarkdown(text);
  const raw = clean
    .split("\n")
    .map((l) => l.trim())
    .join(" ")
    .replace(/\s+/g, " ");

  const sentences: string[] = [];
  const parts = raw.split(/(?<=[.!?])\s+/);
  for (const p of parts) {
    const s = p.trim();
    if (s.length > 15) sentences.push(s);
  }
  return sentences;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function generateDescription(readme: string, repoDescription: string): string {
  if (repoDescription && repoDescription.length > 20) {
    const desc = repoDescription.charAt(0).toUpperCase() + repoDescription.slice(1);
    return desc.length > 160 ? desc.slice(0, 157) + "..." : desc;
  }

  const sections = splitSections(readme);
  for (const [heading, content] of sections) {
    const h = heading.toLowerCase().trim();
    if (CONTENT_HEADINGS.some((t) => h.includes(t))) {
      const paras = extractParagraphs(content);
      if (paras.length > 0) {
        const first = paras[0];
        return first.length > 160 ? first.slice(0, 157) + "..." : first;
      }
    }
  }

  for (const [heading, content] of sections) {
    const h = heading.toLowerCase().trim();
    if (SKIP_HEADINGS.some((t) => h.includes(t))) continue;
    const paras = extractParagraphs(content);
    if (paras.length > 0) {
      const first = paras[0];
      return first.length > 160 ? first.slice(0, 157) + "..." : first;
    }
  }

  const lines = readme
    .split("\n")
    .map((l) => l.replace(/^#+\s*/, "").replace(/[*_`]/g, "").trim())
    .filter((l) => l.length > 30 && l.length < 200 && !l.startsWith("-") && !l.startsWith("*") && !l.match(/^\d+[.)]/));

  if (lines.length > 0) {
    const l = lines[0];
    return l.length > 160 ? l.slice(0, 157) + "..." : l;
  }

  return "A modern web application built with cutting-edge technologies.";
}

export function generateDetailedDescription(readme: string): string {
  const sections = splitSections(readme);

  for (const [heading, content] of sections) {
    const h = heading.toLowerCase().trim();
    if (CONTENT_HEADINGS.some((t) => h.includes(t))) {
      const sentences = extractSentences(content);
      if (sentences.length >= 2) {
        const grouped: string[] = [];
        const perPara = Math.min(4, Math.max(2, Math.ceil(sentences.length / 2)));
        for (let i = 0; i < sentences.length && grouped.length < 3; i += perPara) {
          grouped.push(sentences.slice(i, i + perPara).join(" "));
        }
        return grouped.join("\n\n").slice(0, 2000);
      }
    }
  }

  for (const [heading, content] of sections) {
    const h = heading.toLowerCase().trim();
    if (SKIP_HEADINGS.some((t) => h.includes(t))) continue;
    const sentences = extractSentences(content);
    if (sentences.length >= 2) {
      const grouped: string[] = [];
      const perPara = Math.min(4, Math.max(2, Math.ceil(sentences.length / 2)));
      for (let i = 0; i < sentences.length && grouped.length < 3; i += perPara) {
        grouped.push(sentences.slice(i, i + perPara).join(" "));
      }
      return grouped.join("\n\n").slice(0, 2000);
    }
  }

  const clean = stripMarkdown(readme);
  const sentences = clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  if (sentences.length >= 2) {
    const grouped: string[] = [];
    const perPara = Math.min(3, Math.max(1, Math.ceil(sentences.length / 2)));
    for (let i = 0; i < sentences.length && grouped.length < 2; i += perPara) {
      grouped.push(sentences.slice(i, i + perPara).join(" "));
    }
    return grouped.join("\n\n").slice(0, 2000);
  }

  return clean.slice(0, 500) || "A modern web application built with cutting-edge technologies.";
}

export function extractTechStack(languages: string[], readme: string): string[] {
  const mentioned = new Set<string>();
  for (const lang of languages) mentioned.add(lang);

  const readmeLower = readme.toLowerCase();
  for (const tech of KNOWN_TECH) {
    if (readmeLower.includes(tech.toLowerCase())) mentioned.add(tech);
  }

  return Array.from(mentioned).slice(0, 12);
}

export function extractFeatures(readme: string, techStack: string[]): string[] {
  const features = new Set<string>();
  const sections = splitSections(readme);

  for (const [heading, content] of sections) {
    const h = heading.toLowerCase().trim();
    if (FEATURE_HEADINGS.some((t) => h.includes(t))) {
      const lines = content.split("\n");
      for (const line of lines) {
        const match = line.match(/^[-*+]\s+(.+)/);
        if (match) {
          const cleaned = match[1]
            .replace(/^\[[x ]\]\s*/i, "")
            .replace(/[*_`]/g, "")
            .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
            .trim();
          if (cleaned.length > 10 && cleaned.length < 150) features.add(cleaned);
        }
        const numMatch = line.match(/^\d+[.)]\s+(.+)/);
        if (numMatch) {
          const cleaned = numMatch[1].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\(.*?\)/g, "$1").trim();
          if (cleaned.length > 10 && cleaned.length < 150) features.add(cleaned);
        }
      }
    }
  }

  if (features.size === 0) {
    const lines = readme.split("\n");
    for (const line of lines) {
      const match = line.match(/^[-*+]\s+(.+)/);
      if (match) {
        const cleaned = match[1]
          .replace(/^\[[x ]\]\s*/i, "")
          .replace(/[*_`]/g, "")
          .trim();
        if (cleaned.length > 10 && cleaned.length < 150 && !SKIP_HEADINGS.some((s) => cleaned.toLowerCase().includes(s))) {
          features.add(cleaned);
        }
      }
    }
  }

  if (features.size === 0) {
    for (const tech of techStack.slice(0, 5)) {
      features.add(`Built with ${tech}`);
    }
  }

  return Array.from(features).slice(0, 8);
}
