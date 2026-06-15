"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminProjectActions({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check", { credentials: "include" })
      .then((r) => {
        if (r.ok) setAuthed(true);
      })
      .finally(() => setChecking(false));
  }, []);

  const handleDelete = async () => {
    if (!confirm(`Delete "${projectTitle}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      if (res.ok) window.location.href = "/";
    } catch {
      setDeleting(false);
    }
  };

  if (checking || !authed) return null;

  return (
    <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-card border border-card-border">
      <span className="text-xs font-medium text-muted uppercase tracking-wider mr-auto">Admin</span>
      <button
        onClick={() => router.push(`/admin/projects/${projectId}/edit`)}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px]",
          "bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        )}
      >
        <Pencil className="h-4 w-4" />
        Edit Project
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium min-h-[44px]",
          "bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        )}
      >
        {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        Delete
      </button>
    </div>
  );
}
