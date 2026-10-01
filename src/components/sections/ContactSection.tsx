"use client";

import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import AnimatedSection from "@/components/providers/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

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
    <AnimatedSection id="contact" className="relative scroll-mt-16 py-20 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-primary/[0.05] blur-[110px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-secondary/[0.05] blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's"
          accent="Connect"
          description="Have a project in mind or just want to say hi? Reach out through any of the channels below."
        />

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {contactInfo.map((item) => {
              const Wrapper = item.href ? "a" : "div";
              const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {};

              return (
                <Wrapper
                  key={item.label}
                  {...wrapperProps}
                  className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card p-5 transition-colors duration-200 hover:border-primary/35"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-card-border bg-accent text-primary transition-colors group-hover:border-primary/30">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{item.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">{item.value}</p>
                  </div>
                  {item.href && <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-primary" />}
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
                className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card p-5 transition-colors duration-200 hover:border-primary/35"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-card-border bg-accent text-primary transition-colors group-hover:border-primary/30">
                  <link.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{link.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">{link.username}</p>
                </div>
                <span className="rounded-full border border-card-border bg-accent px-2 py-0.5 font-mono text-[10px] text-muted">{link.stats}</span>
              </a>
            ))}

            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 p-5">
              <Mail className="mb-3 h-5 w-5 text-primary" />
              <p className="text-sm text-muted">Prefer email?</p>
              <a
                href="mailto:daradekaran123@gmail.com"
                className="mt-1 inline-block break-all text-sm font-semibold text-gradient hover:opacity-80"
              >
                daradekaran123@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
