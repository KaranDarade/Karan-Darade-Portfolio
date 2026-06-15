"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/check").then((res) => {
      if (res.status === 401) {
        router.push("/admin/login");
      } else {
        setAuth(true);
      }
    });
  }, [router]);

  if (auth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!auth) return null;

  return <ProjectForm autoMode />;
}
