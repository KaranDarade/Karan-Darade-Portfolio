"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowUpDown, Loader2 } from "lucide-react";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Pagination from "@/components/ui/Pagination";

const PER_PAGE = 6;
type SortKey = "newest" | "oldest";

interface PaginatedResponse {
  projects: Project[];
  total: number;
  totalPages: number;
}

interface AllProjectsGridProps {
  initialProjects?: Project[];
  initialTotal?: number;
  initialTotalPages?: number;
}

export default function AllProjectsGrid({
  initialProjects,
  initialTotal,
  initialTotalPages,
}: AllProjectsGridProps) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortKey>("newest");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PaginatedResponse>({
    projects: initialProjects || [],
    total: initialTotal || 0,
    totalPages: initialTotalPages || 0,
  });

  const fetchPage = useCallback(async (p: number, s: SortKey) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects?page=${p}&perPage=${PER_PAGE}&sort=${s}`);
      const json = await res.json();
      setData(json);
    } catch {
      // keep current data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1, sort);
  }, []);

  const handleSort = (s: SortKey) => {
    setSort(s);
    setPage(1);
    fetchPage(1, s);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchPage(p, sort);
  };

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-60 h-60 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-32 right-12 w-3 h-3 border border-violet-400/20 rotate-45 animate-drift" />
      <div className="absolute bottom-24 left-1/4 w-4 h-4 border-2 border-fuchsia-500/10 rounded-full animate-float-delayed" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-12 w-2 h-2 rounded-full bg-fuchsia-400/20 animate-pulse-soft" />
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 border border-primary/10 skew-x-12 animate-drift" style={{ animationDelay: "2s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
              onChange={(e) => handleSort(e.target.value as SortKey)}
              className="appearance-none pl-9 pr-8 py-2.5 rounded-xl bg-card border border-card-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors cursor-pointer dark:bg-slate-800 dark:border-slate-600"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        ) : data.projects.length === 0 ? (
          <p className="text-center text-muted py-12">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
