import AboutSection from "@/components/AboutSection";
import CodingStatsSection from "@/components/CodingStatsSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/NewsletterSection";
import PageLoader from "@/components/PageLoader";
import ProgressBar from "@/components/ProgressBar";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import UserReportsSection from "@/components/UserReportsSection";

const Index = () => {
  return (
    <div className="scroll-smooth lg:cursor-none">
      <PageLoader />
      <CustomCursor />
      <ProgressBar />
      <ScrollReveal />
      <ScrollToTop />
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CodingStatsSection />
      <UserReportsSection />
      <ServicesSection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
