"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/lib/projects";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const res = await fetch("/api/projects");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      setAuth(true);

      const id = params.id as string;
      const projectRes = await fetch(`/api/projects/${id}`);
      if (projectRes.ok) {
        const data = await projectRes.json();
        setProject(data);
      }
      setLoading(false);
    };
    init();
  }, [router, params.id]);

  if (loading || auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth) return null;
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Project not found</p>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEditing />;
}
