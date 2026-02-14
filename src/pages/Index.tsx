import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ServicesSection from "@/components/ServicesSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="scroll-smooth">
      <ProgressBar />
      <ScrollReveal />
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ServicesSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
