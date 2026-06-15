"use client";

import AnimatedSection from "@/components/providers/AnimatedSection";

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="py-20 sm:py-28 bg-accent/30 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-violet-400/20" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-fuchsia-400/15" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            About
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Who{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              I Am
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute -left-8 top-0 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent hidden sm:block" />
          <div className="absolute -right-8 top-0 w-px h-full bg-gradient-to-b from-primary/20 via-transparent to-transparent hidden sm:block" />
          <p className="text-lg text-muted leading-relaxed">
            I&apos;m a developer from Maharashtra, India, passionate about building
            modern, performant digital experiences. I enjoy working across the
            various stacks — from crafting web apps, android apps, etc. Building
            projects is an opportunity to learn something new and push creative boundaries.
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-10 flex-wrap">
          {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Prisma", "Framer Motion"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-card border border-card-border text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
