"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { scrollToSection } from "@/components/providers/AnimatedSection";

const socialLinks = [
  { href: "https://github.com/KaranDarade", icon: GithubIcon, label: "GitHub" },
  { href: "https://www.linkedin.com/in/karan-darade-4a2392245/", icon: LinkedinIcon, label: "LinkedIn" },
  { href: "mailto:daradekaran123@gmail.com", icon: Mail, label: "Email" },
];

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-card-border bg-accent font-mono text-[11px] font-bold tracking-tight text-primary">
                KD
              </span>
              <span className="font-display text-base font-semibold tracking-tight">
                Karan Darade
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Full Stack Developer focused on building modern, performant digital experiences.
            </p>
          </div>

          <div>
            <h3 className="section-eyebrow mb-4 !text-muted">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-eyebrow mb-4 !text-muted">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:daradekaran123@gmail.com"
                className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                daradekaran123@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <Phone className="h-4 w-4" />
                +91 9356539969
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <MapPin className="h-4 w-4" />
                Maharashtra, India
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-card-border bg-card text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-card-border pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Karan Darade. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
