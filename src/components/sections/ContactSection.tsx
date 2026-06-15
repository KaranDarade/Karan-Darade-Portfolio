"use client";

import { Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import AnimatedSection from "@/components/providers/AnimatedSection";

const contactInfo = [
  { icon: Mail, label: "Email", value: "daradekaran123@gmail.com", href: "mailto:daradekaran123@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9356539969" },
  { icon: MapPin, label: "Location", value: "Maharashtra, India" },
];

const socialLinks = [
  { href: "https://github.com/KaranDarade", icon: GithubIcon, label: "GitHub", username: "@KaranDarade", stats: "7+ repos" },
  { href: "https://www.linkedin.com/in/karan-darade-4a2392245/", icon: LinkedinIcon, label: "LinkedIn", username: "Karan Darade", stats: "Connect" },
];

export default function ContactSection() {
  return (
    <AnimatedSection id="contact" className="py-20 sm:py-28 relative overflow-hidden scroll-mt-16">
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-16 right-12 w-3 h-3 border border-violet-400/20 rotate-45 animate-drift" />
      <div className="absolute bottom-24 left-1/4 w-4 h-4 border-2 border-fuchsia-500/10 rounded-full animate-float-delayed" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-fuchsia-400/20 animate-pulse-soft" />
      <div className="absolute bottom-1/3 left-12 w-4 h-4 border border-primary/10 skew-x-12 animate-drift" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-violet-400/15 rotate-45 animate-float-delayed" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 rounded-full bg-violet-400/20 animate-pulse-soft" style={{ animationDelay: "1.8s" }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((item) => {
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {};

              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-fuchsia-500/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.value}</p>
                  </div>
                  {item.href && <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />}
                </Wrapper>
              );
            })}
          </div>

          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-500/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-fuchsia-500/20 transition-colors">
                  <link.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">{link.label}</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.username}</p>
                </div>
                <span className="text-[10px] text-muted bg-accent px-2 py-0.5 rounded-full">{link.stats}</span>
              </a>
            ))}

            <div className="gradient-border rounded-xl mt-4">
              <div className="p-5 rounded-xl bg-card">
                <Send className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm text-muted mb-1">Prefer email?</p>
                <a
                  href="mailto:daradekaran123@gmail.com"
                  className="text-base font-semibold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  daradekaran123@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
