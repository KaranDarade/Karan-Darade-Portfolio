"use client";

import { ArrowDown, ExternalLink, Code2, Palette, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const marqueeItems = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "PostgreSQL", "Prisma", "WebGL", "Figma",
];

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-violet-400/30" />
      <div className="absolute top-2/3 right-20 w-3 h-3 rounded-full bg-fuchsia-400/20" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-violet-400/25" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-medium text-primary uppercase tracking-widest mb-4"
          >
            Welcome to my portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="font-['Bricolage_Grotesque',_system-ui] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent italic font-black tracking-wide">
              Karan Darade
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted mb-6 font-light"
          >
            Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
          >
            {[
              { icon: Code2, label: "Frontend" },
              { icon: Zap, label: "Backend" },
              { icon: Palette, label: "Design" },
              { icon: Sparkles, label: "Creative" },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-card border border-card-border text-muted">
                <item.icon className="h-3 w-3 text-primary" />
                {item.label}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all duration-200 hover:scale-105"
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-card-border bg-card text-foreground text-sm font-medium hover:border-primary/30 transition-all duration-200 hover:scale-105"
            >
              Get in Touch
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-rose-500/30 blur-3xl animate-glow" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-card-border bg-card">
              <Image
                src="/avatar.jpg"
                alt="Karan Darade"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary/10 backdrop-blur-xl rounded-full px-4 py-1.5 border border-primary/20">
              <span className="text-xs font-medium text-primary">Developer</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-card-border/50 bg-accent/30 py-3">
        <div className="marquee-track flex gap-12 whitespace-nowrap">
          <div className="flex gap-12 marquee-content">
            {marqueeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-3 text-sm text-muted/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-12 marquee-content" aria-hidden="true">
            {marqueeItems.map((item) => (
              <span key={`dup-${item}`} className="inline-flex items-center gap-3 text-sm text-muted/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={scrollToProjects}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
