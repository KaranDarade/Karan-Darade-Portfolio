"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedSection from "@/components/providers/AnimatedSection";

export default function ProjectsGrid({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);

  useEffect(() => {
    fetch("/api/projects?featured=true")
      .then((r) => r.json())
      .then((data: Project[]) => {
        if (data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  return (
    <AnimatedSection id="projects" className="py-20 sm:py-28 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-20 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-60 h-60 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-32 left-12 w-3 h-3 border border-violet-400/20 rotate-45 animate-drift" />
      <div className="absolute top-1/2 right-16 w-2 h-2 rounded-full bg-fuchsia-400/25 animate-pulse-soft" />
      <div className="absolute bottom-28 left-1/4 w-4 h-4 border border-primary/10 rounded-full animate-float-delayed" />
      <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-violet-400/10 rotate-12 animate-drift" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-40 right-1/3 w-4 h-4 border-2 border-fuchsia-500/10 rotate-45 animate-float-delayed" style={{ animationDelay: "1s" }} />
      <div className="absolute top-16 right-1/4 w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-pulse-soft" style={{ animationDelay: "0.5s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pinned{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            A curated selection of my best work — hand-picked to showcase what I do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-12">
          <a
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-card-border bg-card text-sm text-muted hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Settings className="h-4 w-4" />
            Customize Pinned Projects
          </a>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            View all projects &rarr;
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
