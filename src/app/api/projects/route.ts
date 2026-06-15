import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, getFeaturedProjects, getPaginatedProjects, addProject } from "@/lib/projects";
import { getAuthStatus } from "@/lib/auth";
import { parseRepoUrl, getRepoInfo, getRepoLanguages, getRepoReadme } from "@/lib/github";
import { generateSlug, generateDescription, generateDetailedDescription, extractTechStack, extractFeatures } from "@/lib/autoGenerate";
import { captureScreenshot } from "@/lib/screenshot";
import type { SortKey } from "@/lib/projects";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");
  const sort = (searchParams.get("sort") || "newest") as SortKey;
  const featured = searchParams.get("featured");

  if (featured === "true") {
    return NextResponse.json(getFeaturedProjects());
  }

  if (page && perPage) {
    const result = getPaginatedProjects(parseInt(page), parseInt(perPage), sort);
    return NextResponse.json(result);
  }

  const projects = getAllProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const isAuth = await getAuthStatus();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (data.autoGenerate) {
      const { title, githubUrl, deploymentUrl } = data;
      if (!title || !githubUrl || !deploymentUrl) {
        return NextResponse.json({ error: "Title, GitHub URL, and Deployment URL are required" }, { status: 400 });
      }

      const repo = parseRepoUrl(githubUrl);
      if (!repo) {
        return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
      }

      const cleanGithubUrl = `https://github.com/${repo.owner}/${repo.repo}`;

      const slug = generateSlug(title);

      let repoInfo = { description: "", topics: [] as string[] };
      let languages: string[] = [];
      let readme = "";

      try {
        [repoInfo, languages, readme] = await Promise.all([
          getRepoInfo(repo.owner, repo.repo),
          getRepoLanguages(repo.owner, repo.repo),
          getRepoReadme(repo.owner, repo.repo).catch(() => ""),
        ]);
      } catch {
        // proceed with partial data if GitHub fetch fails
      }

      const description = generateDescription(readme, repoInfo.description);
      const detailedDescription = generateDetailedDescription(readme);
      const techStack = extractTechStack(languages, readme);
      const features = extractFeatures(readme, techStack);

      let imageUrl = "";
      try {
        imageUrl = await captureScreenshot(deploymentUrl, slug, title);
      } catch {
        // screenshot may fail, continue without it
      }

      const project = addProject({
        title,
        slug,
        description,
        detailedDescription,
        techStack,
        features,
        githubUrl: cleanGithubUrl,
        deploymentUrl,
        imageUrl,
        featured: false,
        order: 0,
      });

      return NextResponse.json(project, { status: 201 });
    }

    if (data.githubUrl && typeof data.githubUrl === "string") {
      const repo = parseRepoUrl(data.githubUrl);
      if (repo) {
        data.githubUrl = `https://github.com/${repo.owner}/${repo.repo}`;
      }
    }
    const project = addProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
