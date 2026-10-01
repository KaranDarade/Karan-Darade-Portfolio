"use client";

import { ArrowDown, ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { scrollToSection } from "@/components/providers/AnimatedSection";

const marqueeItems = [
  "✦ Design", "✦ Build", "✦ Deploy", "✦ Repeat",
  "✦ Create", "✦ Innovate", "✦ Ship", "✦ Scale",
];

const headingWords = ["Hi,", "I'm", "Karan", "Darade"];
const tagline = "Software Developer & Technology Enthusiast";
const heroDescription = "Computer Engineering graduate passionate about building software, exploring AI and machine learning, analyzing data, and creating modern web applications. Continuously learning new technologies and developing solutions that solve real-world problems.";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] as const },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,var(--violet-glow),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />

      <div className="pointer-events-none absolute left-[8%] top-28 hidden h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse-soft lg:block" />
      <div className="pointer-events-none absolute right-[10%] top-1/3 hidden h-3 w-3 rotate-45 border border-primary/20 animate-drift lg:block" />
      <div className="pointer-events-none absolute bottom-1/3 left-[12%] hidden h-3 w-3 rounded-full border border-secondary/25 animate-float-delayed lg:block" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col-reverse items-center gap-14 px-4 py-20 sm:px-6 lg:flex-row lg:justify-between lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="section-eyebrow mb-5"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-display text-[2.6rem] leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-[3.75rem]"
          >
            {headingWords.map((word, i) => (
              <motion.span key={word} variants={wordVariant} className="mr-[0.28em] inline-block">
                {i === 3 ? (
                  <span className="text-gradient italic">
                    {word.split("").map((char, j) => (
                      <motion.span key={j} variants={letterVariant} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-5 font-mono text-sm tracking-wide text-primary sm:text-base"
          >
            {tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted lg:text-base"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-accent active:scale-95"
            >
              Get in Touch
              <ExternalLink className="h-4 w-4" />
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative h-56 w-56 animate-float sm:h-72 sm:w-72 lg:h-[21rem] lg:w-[21rem]">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--violet-glow),transparent_70%)] blur-2xl animate-glow" />
            <div className="absolute -inset-3 rounded-full border border-card-border" />
            <div className="gradient-border relative h-full w-full overflow-hidden rounded-full">
              <div className="absolute inset-0 rounded-full bg-card">
                <Image
                  src="/avatar.jpg"
                  alt="Karan Darade"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 336px"
                />
              </div>
            </div>
            <a
              href="https://drive.google.com/file/d/1tJ40H4v1OMwxZi8tGo4AyLW9bkaRDgnA/view"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-primary/25 bg-background/80 px-5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-primary/10 backdrop-blur-xl transition-all duration-200 hover:border-primary/50 hover:bg-background active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-card-border/60 bg-surface/40 py-3">
        <div className="marquee-track flex gap-14 whitespace-nowrap">
          <div className="flex gap-14">
            {marqueeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-3 font-mono text-xs tracking-wide text-muted/60">
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-14" aria-hidden="true">
            {marqueeItems.map((item) => (
              <span key={`dup-${item}`} className="inline-flex items-center gap-3 font-mono text-xs tracking-wide text-muted/60">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        onClick={() => scrollToSection("projects")}
        className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-foreground sm:block"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </motion.button>
    </section>
  );
}
