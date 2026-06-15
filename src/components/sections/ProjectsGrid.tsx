"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Pagination from "@/components/ui/Pagination";
import AnimatedSection from "@/components/providers/AnimatedSection";

const PER_PAGE = 6;

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  const displayed = projects.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <AnimatedSection id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            A selection of projects I&apos;ve built, spanning web apps, design systems, and full-stack platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.id} {...project} index={i} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </AnimatedSection>
  );
}
