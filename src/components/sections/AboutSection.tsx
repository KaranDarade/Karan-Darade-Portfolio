"use client";

import AnimatedSection from "@/components/providers/AnimatedSection";
import FloatingParticles from "@/components/effects/FloatingParticles";
import SectionHeading from "@/components/ui/SectionHeading";

const techStack = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Prisma", "Framer Motion"];

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="relative scroll-mt-16 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 rounded-full bg-primary/[0.05] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="left" eyebrow="About" title="Who" accent="I Am" />

        <div className="relative overflow-hidden rounded-2xl border border-card-border bg-surface/50 p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
          <FloatingParticles count={12} />
          <div className="relative z-10 max-w-3xl">
            <p className="text-[15px] leading-[1.9] text-muted sm:text-base">
              I&apos;m a Computer Engineering graduate passionate about building software and exploring emerging technologies. My interests span web development, artificial intelligence, machine learning, data analytics, and creating data-driven solutions that solve real-world problems. I enjoy working across different domains—from developing modern web applications and software systems to experimenting with AI-powered tools and analytical projects. Every project is an opportunity to learn, innovate, and push my technical and creative boundaries while building impactful digital products.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="section-eyebrow mb-4">Stack</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-card-border bg-accent px-3.5 py-1.5 font-mono text-xs tracking-wide text-muted transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
