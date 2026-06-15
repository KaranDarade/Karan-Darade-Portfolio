import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/effects/SectionDivider";
import { ScrollRestorer } from "@/components/providers/AnimatedSection";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects();

  return (
    <>
      <ScrollRestorer />
      <Hero />
      <SectionDivider />
      <ProjectsGrid projects={projects} />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
