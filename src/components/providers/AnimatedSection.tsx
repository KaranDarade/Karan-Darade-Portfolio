"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

const HEADER_OFFSET = 64;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  } else {
    sessionStorage.setItem("scrollTo", id);
    window.location.href = "/";
  }
}

export function ScrollRestorer() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const id = sessionStorage.getItem("scrollTo");
    if (id) {
      sessionStorage.removeItem("scrollTo");
      const tryScroll = (retries = 0) => {
        if (retries > 30) return;
        if (document.getElementById(id)) {
          scrollToSection(id);
        } else {
          setTimeout(() => tryScroll(retries + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 300);
    }
  }, []);

  return null;
}

export default function AnimatedSection({ children, className, id, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
