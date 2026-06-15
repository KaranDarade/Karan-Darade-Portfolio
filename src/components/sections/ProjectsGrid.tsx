"use client";

import { Settings } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import AnimatedSection from "@/components/providers/AnimatedSection";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <AnimatedSection id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="flex justify-center mt-10">
          <a
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-card-border bg-card text-sm text-muted hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Settings className="h-4 w-4" />
            Customize Pinned Projects
          </a>
        </div>

        <div className="text-center mt-6">
          <a
            href="/projects"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            View all projects &rarr;
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
