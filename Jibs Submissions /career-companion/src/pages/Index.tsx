import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Features />
    <CTA />
    <footer className="py-8 border-t border-border text-center text-sm text-muted-foreground">
      © 2026 Ascend. AI Career Coaching.
    </footer>
  </div>
);

export default Index;
