import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, Calendar, Hash } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import AdminProjectActions from "@/components/admin/AdminProjectActions";
import ProjectPreviewImage from "./ProjectPreviewImage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Karan Darade`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="relative overflow-hidden pb-24 pt-28">
      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-0 h-72 w-72 rounded-full bg-secondary/[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <AdminProjectActions projectId={project.id} projectTitle={project.title} />
        </div>

        <p className="section-eyebrow mb-4">Project</p>

        <div className="mb-8">
          <h1 className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {project.description}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </div>
          <span className="text-muted/40">·</span>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            <Hash className="h-3.5 w-3.5" />
            {project.techStack.length} technologies
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          <a
            href={project.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
              "bg-primary text-white transition-colors duration-200 hover:bg-primary-hover"
            )}
          >
            <ExternalLink className="h-4 w-4" />
            View Deployment
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
              "border border-card-border bg-card text-foreground transition-colors duration-200 hover:border-primary/40"
            )}
          >
            <GithubIcon className="h-4 w-4" />
            Visit GitHub Repo
          </a>
        </div>

        <ProjectPreviewImage imageUrl={project.imageUrl || ""} title={project.title} />

        <div className="mb-8 rounded-2xl border border-card-border bg-card p-6 sm:p-8">
          <h2 className="font-display mb-4 text-xl font-semibold tracking-tight text-foreground">Overview</h2>
          <p className="whitespace-pre-line text-[15px] leading-[1.85] text-muted">
            {project.detailedDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-card-border bg-card p-6">
            <h2 className="font-display mb-4 text-lg font-semibold tracking-tight text-foreground">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 font-mono text-[11px] tracking-wide text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-card-border bg-card p-6">
            <h2 className="font-display mb-4 text-lg font-semibold tracking-tight text-foreground">Key Features</h2>
            <ul className="space-y-2.5">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
