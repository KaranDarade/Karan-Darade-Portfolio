import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects();

  return (
    <>
      <Hero />
      <ProjectsGrid projects={projects} />
      <AboutSection />
      <ContactSection />
    </>
  );
}
