import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import {
  HeroSection,
  AboutSection,
  TrainersSection,
  ServicesSection,
  ExperienceSection,
  TestimonialsSection,
  PricingSection,
  ContactSection,
  Footer
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <LoadingScreen />
      <Navbar />

      {/* pb-20 on mobile to clear the sticky CTA bar; none on desktop */}
      <main className="pb-20 lg:pb-0">
        <HeroSection />
        <AboutSection />
        <TrainersSection />
        <ServicesSection />
        <ExperienceSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
