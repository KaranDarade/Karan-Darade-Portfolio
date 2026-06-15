"use client";

import { Code2, Palette, Server, Sparkles, Users, Award, FolderGit2, Coffee } from "lucide-react";
import AnimatedSection from "@/components/providers/AnimatedSection";

const highlights = [
  { icon: Code2, label: "Frontend", description: "React, Next.js, TypeScript, Tailwind CSS" },
  { icon: Server, label: "Backend", description: "Node.js, Express, PostgreSQL, Prisma" },
  { icon: Palette, label: "Design", description: "UI/UX, Framer Motion, Responsive Design" },
  { icon: Sparkles, label: "Creative", description: "WebGL, Animations, Interactive Experiences" },
];

const stats = [
  { icon: FolderGit2, value: "7+", label: "Projects Built" },
  { icon: Users, value: "3+", label: "Happy Clients" },
  { icon: Award, value: "2+", label: "Years Coding" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

const skillLevels = [
  { name: "React / Next.js", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Node.js / Express", level: 85 },
  { name: "PostgreSQL / Prisma", level: 80 },
  { name: "Framer Motion", level: 82 },
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-card border border-card-border text-center hover:border-primary/20 transition-all duration-300"
            >
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold font-['Bricolage_Grotesque',_system-ui]">{stat.value}</p>
              <p className="text-xs text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-card border border-card-border">
            <h3 className="font-semibold mb-6">Tech Proficiency</h3>
            <div className="space-y-4">
              {skillLevels.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-accent overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="group p-5 rounded-2xl bg-card border border-card-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
