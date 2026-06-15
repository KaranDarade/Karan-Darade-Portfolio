"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Pagination from "@/components/ui/Pagination";

const PER_PAGE = 6;

type SortKey = "newest" | "oldest";

export default function AllProjectsGrid({ projects }: { projects: Project[] }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let result = [...projects];

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    return result;
  }, [projects, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(page, Math.max(totalPages, 1));
  const displayed = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            All{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Every project I&apos;ve worked on, from concept to deployment.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as SortKey); setPage(1); }}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-card border border-card-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer dark:bg-slate-800 dark:border-slate-600"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>

        {displayed.length === 0 ? (
          <p className="text-center text-muted py-12">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </div>
        )}

        <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
