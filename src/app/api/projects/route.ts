import { NextResponse } from "next/server";
import { getAllProjects, addProject } from "@/lib/projects";
import { getAuthStatus } from "@/lib/auth";

export async function GET() {
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
    const project = addProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
