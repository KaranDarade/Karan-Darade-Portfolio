"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "@/components/providers/AnimatedSection";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const goHome = () => {
    setMobileOpen(false);
    if (window.location.pathname === "/") {
      scrollToSection("home");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-card-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <button
            onClick={goHome}
            className="group flex items-center gap-2.5"
            aria-label="Karan Darade — home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-card-border bg-surface font-mono text-[11px] font-bold tracking-tight text-primary transition-colors group-hover:border-primary/40">
              KD
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Karan Darade
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200",
                  active === link.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {active === link.id && (
                  <span className="absolute inset-0 rounded-full border border-card-border bg-accent" />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="grid h-11 w-11 place-items-center rounded-full border border-card-border bg-accent text-foreground/70 transition-colors hover:text-foreground md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-card-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  "block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                  active === link.id
                    ? "bg-accent text-foreground"
                    : "text-muted hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
