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
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-card-border bg-accent/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold tracking-tight mb-3">
              <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Karan Darade
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Full Stack Developer focused on building modern, performant digital experiences.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:daradekaran123@gmail.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                daradekaran123@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Phone className="h-4 w-4" />
                +91 9356539969
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4" />
                Maharashtra, India
              </div>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border border-card-border text-muted hover:text-foreground hover:border-primary/30 transition-all min-w-[44px] min-h-[44px]"
                    aria-label={link.label}
                  >
                    <link.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-card-border text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Karan Darade. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
