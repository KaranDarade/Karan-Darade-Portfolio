"use client";

import AnimatedSection from "@/components/providers/AnimatedSection";

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="py-20 sm:py-28 bg-accent/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted leading-relaxed">
            I&apos;m a developer from Maharashtra, India, passionate about building
            modern, performant digital experiences. I enjoy working across the
            various stacks — from crafting web apps, android apps, etc. Building
            projects is an opportunity to learn something new and push creative boundaries.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
