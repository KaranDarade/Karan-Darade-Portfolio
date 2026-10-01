"use client";

import { useRef, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const GRADIENTS: [string, string][] = [
  ["#6366f1", "#a855f7"],
  ["#8b5cf6", "#ec4899"],
  ["#06b6d4", "#3b82f6"],
  ["#10b981", "#06b6d4"],
  ["#f59e0b", "#ef4444"],
  ["#8b5cf6", "#06b6d4"],
  ["#ec4899", "#f97316"],
  ["#a855f7", "#3b82f6"],
];

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  githubUrl: string;
  deploymentUrl: string;
  imageUrl: string;
  index: number;
  techStack?: string[];
  emphasis?: boolean;
}

export default function ProjectCard({
  title,
  slug,
  description,
  githubUrl,
  deploymentUrl,
  imageUrl,
  index,
  techStack,
  emphasis = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -5;
    const tiltY = (x - 0.5) * 5;
    cardRef.current.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  const gradientIndex = Math.abs(
    title.split("").reduce((h, c) => h + c.charCodeAt(0), 0)
  ) % GRADIENTS.length;
  const bgGradient = GRADIENTS[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/[0.07]"
        style={{ transition: "transform 0.2s ease-out, border-color 0.3s, box-shadow 0.3s" }}
      >
        <Link href={`/projects/${slug}`} className="block">
          <div className={cn("relative w-full overflow-hidden", emphasis ? "aspect-[16/10]" : "aspect-[16/10]")}>
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${bgGradient[0]}, ${bgGradient[1]})` }}
            >
              <span className="px-4 text-center text-2xl font-bold leading-tight tracking-tight text-white/90">
                {title}
              </span>
            </div>
            {imageUrl ? (
              imageUrl.startsWith("data:") || imageUrl.endsWith(".svg") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={title}
                  className="absolute inset-0 z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ) : (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="z-[1] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              )
            ) : null}
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-card via-card/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Link href={`/projects/${slug}`}>
            <h3
              className={cn(
                "font-display font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary",
                emphasis ? "text-xl sm:text-2xl" : "text-lg"
              )}
            >
              {title}
            </h3>
          </Link>
          <p className={cn("mt-2 text-sm leading-relaxed text-muted", emphasis ? "line-clamp-3" : "line-clamp-2")}>
            {description}
          </p>

          {techStack && techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {techStack.slice(0, emphasis ? 5 : 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-card-border bg-accent px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-primary-hover"
            >
              <ExternalLink className="h-3 w-3" />
              View Deployment
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-accent px-3.5 py-2 text-xs font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              <GithubIcon className="h-3 w-3" />
              GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
