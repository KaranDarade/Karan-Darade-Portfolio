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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-20 left-8 w-2 h-2 rounded-full bg-violet-400/30 animate-pulse-soft" />
      <div className="absolute top-1/3 right-12 w-3 h-3 border border-primary/15 rounded-full animate-drift" />
      <div className="absolute bottom-1/3 left-16 w-4 h-4 border border-fuchsia-500/15 rotate-45 animate-float-delayed" />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-fuchsia-400/20 rounded-full animate-pulse-soft" style={{ animationDelay: "1.5s" }} />

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
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariant}
                className="inline-block mr-[0.3em]"
              >
                {i === 3 ? (
                  <span className="font-['Bricolage_Grotesque',_system-ui] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent italic font-black tracking-wide">
                    {word.split("").map((char, j) => (
                      <motion.span
                        key={j}
                        variants={letterVariant}
                        className="inline-block"
                      >
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted mb-8 font-light"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4, ease: "backOut" }}
              className="inline-block"
            >
              {tagline}
            </motion.span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-8"
          >
            {heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-card-border bg-card text-foreground text-sm font-medium hover:border-primary/30 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Get in Touch
              <ExternalLink className="h-4 w-4" />
            </button>
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
            <div className="gradient-border relative w-full h-full rounded-full overflow-hidden">
              <div className="absolute inset-0 rounded-full bg-card">
                <Image
                  src="/avatar.jpg"
                  alt="Karan Darade"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
            <a
              href="/resume.pdf"
              download
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-rose-500/20 backdrop-blur-xl rounded-full px-5 py-2 border border-primary/20 shadow-lg shadow-primary/5 text-xs font-semibold text-foreground hover:from-violet-500/30 hover:via-fuchsia-500/30 hover:to-rose-500/30 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-card-border/50 bg-accent/30 py-2.5">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          <div className="flex gap-16">
            {marqueeItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-3 text-sm text-muted/50 font-light tracking-wide">
                {item}
              </span>
            ))}
          </div>
          <div className="flex gap-16" aria-hidden="true">
            {marqueeItems.map((item) => (
              <span key={`dup-${item}`} className="inline-flex items-center gap-3 text-sm text-muted/50 font-light tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => scrollToSection("projects")}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted hover:text-foreground transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
