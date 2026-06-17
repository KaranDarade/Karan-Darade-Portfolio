"use client";

import { useRef } from "react";
import AnimatedSection from "@/components/providers/AnimatedSection";
import FloatingParticles from "@/components/effects/FloatingParticles";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedSection id="about" className="py-20 sm:py-28 bg-accent/30 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
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

        <div className="flex justify-center" ref={sectionRef}>
          <div className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md aspect-square sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-square">
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-amber-500/10 p-[1px]">
              <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-card/80 backdrop-blur-sm relative overflow-hidden">
                <FloatingParticles count={16} />

                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
                  <p className="text-sm sm:text-base md:text-lg leading-[1.8] text-muted text-center max-w-[200px] sm:max-w-xs md:max-w-sm font-[family-name:var(--font-serif)] italic tracking-wide">
                    I&apos;m a Computer Engineering graduate passionate about building software and exploring emerging technologies. My interests span web development, artificial intelligence, machine learning, data analytics, and creating data-driven solutions that solve real-world problems. I enjoy working across different domains—from developing modern web applications and software systems to experimenting with AI-powered tools and analytical projects. Every project is an opportunity to learn, innovate, and push my technical and creative boundaries while building impactful digital products.
                  </p>
                </div>

                <div className="absolute -top-1 -left-1 w-20 h-20 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-xl animate-pulse-soft pointer-events-none" />
                <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-gradient-to-tl from-fuchsia-500/20 to-transparent rounded-full blur-xl animate-pulse-soft pointer-events-none" style={{ animationDelay: "2s" }} />
              </div>
            </div>

            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-amber-500/20 blur-xl -z-10 animate-pulse-soft" />
          </div>
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
