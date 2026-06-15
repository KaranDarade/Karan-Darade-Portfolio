"use client";

import { Code2, Palette, Server, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/providers/AnimatedSection";

const highlights = [
  {
    icon: Code2,
    label: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    icon: Server,
    label: "Backend",
    description: "Node.js, Express, PostgreSQL, Prisma",
  },
  {
    icon: Palette,
    label: "Design",
    description: "UI/UX, Framer Motion, Responsive Design",
  },
  {
    icon: Sparkles,
    label: "Creative",
    description: "WebGL, Animations, Interactive Experiences",
  },
];

export default function AboutSection() {
  return (
    <AnimatedSection id="about" className="py-20 sm:py-28 bg-accent/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted leading-relaxed">
            I&apos;m a developer from Maharashtra, India, passionate about building
            modern, performant web experiences. I enjoy working across the stack
            — from crafting pixel-perfect UIs with React and Tailwind CSS to
            designing robust APIs with Node.js and PostgreSQL. Every project is
            an opportunity to learn something new and push creative boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <div
              key={item.label}
              className="group p-6 rounded-2xl bg-card border border-card-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{item.label}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
