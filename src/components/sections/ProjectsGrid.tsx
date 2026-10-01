"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedSection from "@/components/providers/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ProjectsGrid({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        if (data.length > 0) setProjects(data);
      })
      .catch(() => {});
  }, []);

  return (
    <AnimatedSection id="projects" className="relative scroll-mt-16 py-20 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-primary/[0.05] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-16 left-0 h-64 w-64 rounded-full bg-secondary/[0.05] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Work"
          title="Pinned"
          accent="Projects"
          description="A curated selection of my best work — hand-picked to showcase what I do."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-5">
          <a
            href="/admin/projects"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-6 py-3 text-sm font-medium text-muted transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
            Customize Pinned Projects
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
