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
    <div className="pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-20 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-60 h-60 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-12 w-3 h-3 border border-violet-400/20 rotate-45 animate-drift pointer-events-none" />
      <div className="absolute bottom-24 left-1/4 w-4 h-4 border-2 border-fuchsia-500/10 rounded-full animate-float-delayed pointer-events-none" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-12 w-2 h-2 rounded-full bg-fuchsia-400/20 animate-pulse-soft pointer-events-none" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <AdminProjectActions projectId={project.id} projectTitle={project.title} />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </div>
          <span className="text-muted/40">·</span>
          <div className="flex items-center gap-2 text-xs text-muted">
            <Hash className="h-3.5 w-3.5" />
            {project.techStack.length} technologies
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={project.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium",
              "bg-primary text-white hover:bg-primary-hover transition-all duration-200 hover:scale-105"
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
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium",
              "bg-card border border-card-border text-foreground hover:border-primary/30 transition-all duration-200 hover:scale-105"
            )}
          >
            <GithubIcon className="h-4 w-4" />
            Visit GitHub Repo
          </a>
        </div>

        {project.imageUrl ? (
          <ProjectPreviewImage imageUrl={project.imageUrl} title={project.title} />
        ) : null}

        <div className="prose prose-sm dark:prose-invert max-w-none mb-12">
          <div className="p-6 rounded-2xl bg-card border border-card-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Overview</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {project.detailedDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-card-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-card-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
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
