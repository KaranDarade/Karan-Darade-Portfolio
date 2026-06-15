"use client";

import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  githubUrl: string;
  deploymentUrl: string;
  imageUrl: string;
  index: number;
}

export default function ProjectCard({ title, slug, description, githubUrl, deploymentUrl, imageUrl, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative rounded-2xl bg-card border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <Link href={`/projects/${slug}`} className="block">
          <div className="relative aspect-video bg-accent overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-primary">
                      {title.charAt(0)}
                    </span>
                  </div>
                  <p className="text-xs text-muted">Preview</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        <div className="p-5">
          <Link href={`/projects/${slug}`}>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                "bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
              )}
            >
              <ExternalLink className="h-3 w-3" />
              View Deployment
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
                "bg-accent text-muted hover:text-foreground hover:bg-accent-hover border border-card-border transition-all duration-200"
              )}
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
