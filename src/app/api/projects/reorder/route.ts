import { NextResponse } from "next/server";
import { getAllProjects, saveProjects } from "@/lib/projects";
import { getAuthStatus } from "@/lib/auth";

export async function PUT(request: Request) {
  const isAuth = await getAuthStatus();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderedIds } = await request.json();
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "orderedIds must be an array" }, { status: 400 });
    }

    const projects = getAllProjects();
    const updated = projects.map((p) => {
      const idx = orderedIds.indexOf(p.id);
      if (idx !== -1) {
        return { ...p, order: idx, featured: true };
      }
      return p;
    });

    saveProjects(updated);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
