"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, LogOut, Pin, GripVertical, AlertCircle } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const MAX_PINNED = 6;

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const authRes = await fetch("/api/auth/check");
      if (cancelled) return;
      if (!authRes.ok) {
        setAuth(false);
        router.push("/admin/login");
        return;
      }
      setAuth(true);

      const data = await fetch("/api/projects").then((r) => r.json());
      if (!cancelled) setProjects(data);
      if (!cancelled) setLoading(false);
    }

    init();
    return () => { cancelled = true; };
  }, [router]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const togglePinned = async (project: Project) => {
    const pinned = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

    if (!project.featured && pinned.length >= MAX_PINNED) {
      const oldest = pinned[pinned.length - 1];
      await fetch(`/api/projects/${oldest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: false, order: 0 }),
      });
      setProjects(projects.map((p) =>
        p.id === oldest.id ? { ...p, featured: false, order: 0 } : p
      ));

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: true, order: oldest.order }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: true, order: oldest.order } : p
          )
        );
      }
      return;
    }

    const newOrder = project.featured ? 0 : pinned.length;
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !project.featured, order: newOrder }),
    });
    if (res.ok) {
      setProjects(projects.map((p) =>
        p.id === project.id ? { ...p, featured: !p.featured, order: newOrder } : p
      ));
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...projects];
    const featured = updated.filter((p) => p.featured).sort((a, b) => a.order - b.order);
    if (dragIndex < featured.length && index >= featured.length) return;
    if (dragIndex >= featured.length) return;

    const [moved] = featured.splice(dragIndex, 1);
    featured.splice(index, 0, moved);
    const reordered = featured.map((p, i) => ({ ...p, order: i }));
    // update order in the original list
    for (const rp of reordered) {
      const idx = updated.findIndex((p) => p.id === rp.id);
      if (idx !== -1) updated[idx] = rp;
    }
    setProjects([...updated]);
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    setDragIndex(null);
    const featured = projects.filter((p) => p.featured);
    const orderedIds = featured.sort((a, b) => a.order - b.order).map((p) => p.id);
    await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds }),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth) return null;

  const pinned = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
  const unpinned = projects.filter((p) => !p.featured);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Manage Projects</h1>
            <p className="text-sm text-muted mt-1">
              <span className={cn(pinned.length === MAX_PINNED ? "text-amber-500" : "text-muted")}>
                {pinned.length}/{MAX_PINNED} pinned
              </span>
              {" · "}{projects.length} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/projects/new")}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors min-h-[44px]"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
            <button
              onClick={handleLogout}
              className="p-3 rounded-xl border border-card-border text-muted hover:text-foreground transition-colors min-w-[44px] min-h-[44px]"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {pinned.length === MAX_PINNED ? (
          <div className="flex items-center gap-2 px-4 py-2.5 mb-6 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-600 dark:text-violet-400">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            Front page is full. Pinning a new project will auto-unpin the last one.
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            Pin {MAX_PINNED - pinned.length} more project{MAX_PINNED - pinned.length !== 1 ? "s" : ""} to fill the front page
          </div>
        )}

        <div className="space-y-3">
          <p className="text-xs font-medium text-muted uppercase tracking-wider px-4">
            Pinned Projects ({pinned.length}/{MAX_PINNED}) &middot; drag to reorder
          </p>
          {pinned.map((project, i) => (
            <div
              key={project.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border transition-all duration-200",
                dragIndex === i ? "opacity-50 border-primary/30" : "hover:border-primary/20"
              )}
            >
              <GripVertical className="h-5 w-5 text-muted/40 cursor-grab active:cursor-grabbing flex-shrink-0" />
              <span className="text-xs text-muted w-5 text-right flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{project.title}</p>
                <p className="text-xs text-muted">{project.slug}</p>
              </div>
              <button
                onClick={() => togglePinned(project)}
                className="p-2.5 rounded-lg hover:bg-amber-500/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title={project.featured ? "Unpin" : "Pin"}
              >
                <Pin className={cn("h-4 w-4", project.featured ? "text-amber-500 fill-amber-500" : "text-muted")} />
              </button>
              <button
                onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                className="p-2.5 rounded-lg hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Edit"
              >
                <Pencil className="h-4 w-4 text-muted hover:text-primary" />
              </button>
              <button
                onClick={() => handleDelete(project.id, project.title)}
                className="p-2.5 rounded-lg hover:bg-red-500/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-muted hover:text-red-500" />
              </button>
            </div>
          ))}

          {pinned.length === 0 && (
            <div className="p-6 rounded-xl bg-card border border-dashed border-card-border text-center">
              <p className="text-sm text-muted">No projects pinned yet. Pin projects below to show them on the front page.</p>
            </div>
          )}

          {unpinned.length > 0 && (
            <>
              <p className="text-xs font-medium text-muted uppercase tracking-wider px-4 pt-6">
                Available Projects
              </p>
              {unpinned.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border"
                >
                  <div className="w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{project.title}</p>
                    <p className="text-xs text-muted">{project.slug}</p>
                  </div>
                  <button
                    onClick={() => togglePinned(project)}
                    className="p-2.5 rounded-lg hover:bg-amber-500/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="Pin"
                  >
                    <Pin className="h-4 w-4 text-muted hover:text-amber-500" />
                  </button>
                  <button
                    onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                    className="p-2.5 rounded-lg hover:bg-primary/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4 text-muted hover:text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-2.5 rounded-lg hover:bg-red-500/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-muted hover:text-red-500" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
