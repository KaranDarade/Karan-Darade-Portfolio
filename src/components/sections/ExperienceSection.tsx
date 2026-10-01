"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
import AnimatedSection from "@/components/providers/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

const experience = [
  {
    company: "Sachitech",
    role: "Frontend Developer Intern",
    period: "Feb 2026 – Jul 2026",
    location: "Nashik, Maharashtra",
    bullets: [
      "Developed web applications using React, JavaScript, and REST APIs while following structured workflows and collaborating with the development team.",
    ],
  },
  {
    company: "PlanetEyeFarm",
    role: "Blockchain Intern",
    period: "Sep 2025 – Nov 2025",
    location: "Nashik, Maharashtra",
    bullets: [
      "Researched blockchain applications for agricultural data and developed prototypes for recording and verifying farm data.",
      "Evaluated how on-chain verification and decentralized storage could improve the trust and traceability of farm records.",
    ],
  },
  {
    company: "Privan Sports Analyzer",
    role: "Sports Data Analyst",
    period: "Mar 2025 – Aug 2025",
    location: "Nashik, Maharashtra",
    bullets: [
      "Analyzed sports game footage using sports analysis software, tagging and coding key events, player actions, movements, and game situations according to defined guidelines.",
      "Reviewed and validated large volumes of sports data for accuracy and consistency, correcting errors while following established workflows and quality standards for timely completion.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <AnimatedSection id="experience" className="relative scroll-mt-16 py-20 sm:py-24">
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-secondary/[0.05] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow="Career"
          title="Professional"
          accent="Experience"
        />

        <ol className="relative space-y-5 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-card-border before:via-card-border before:to-transparent sm:before:left-[19px]">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="relative pl-11 sm:pl-14">
              <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-card-border bg-surface text-primary sm:h-10 sm:w-10">
                <Briefcase className="h-4 w-4" />
              </span>

              <div className="group rounded-2xl border border-card-border bg-card p-5 transition-colors duration-300 hover:border-primary/35 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      {job.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 sm:items-end">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-accent px-3 py-1 font-mono text-[11px] tracking-wide text-muted">
                      <Calendar className="h-3 w-3" />
                      {job.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </AnimatedSection>
  );
}
