import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/projects";
import { getAuthStatus } from "@/lib/auth";
import { parseRepoUrl } from "@/lib/github";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: Props) {
  const isAuth = await getAuthStatus();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const data = await request.json();
    if (data.githubUrl && typeof data.githubUrl === "string") {
      const repo = parseRepoUrl(data.githubUrl);
      if (repo) {
        data.githubUrl = `https://github.com/${repo.owner}/${repo.repo}`;
      }
    }
    const updated = updateProject(id, data);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  const isAuth = await getAuthStatus();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteProject(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
