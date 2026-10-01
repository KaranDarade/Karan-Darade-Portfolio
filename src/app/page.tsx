import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import SectionDivider from "@/components/effects/SectionDivider";
import { ScrollRestorer } from "@/components/providers/AnimatedSection";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <ScrollRestorer />
      <Hero />
      <SectionDivider />
      <ProjectsGrid projects={projects} />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <ContactSection />
    </>
  );
}
