import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      
      <div className="container relative z-10 px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-gold bg-secondary/50 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Career Intelligence</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            Your Career,{" "}
            <span className="text-gradient-gold italic">Elevated</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed font-light">
            We analyze your LinkedIn presence and resume, then deliver a personalized 
            30-60-90 day coaching plan — with weekly accountability emails to keep you on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="bg-gradient-gold text-primary-foreground font-semibold px-8 py-6 text-base glow-gold hover:opacity-90 transition-opacity"
            >
              Start Your Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-gold text-foreground px-8 py-6 text-base hover:bg-secondary"
            >
              See How It Works
            </Button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 max-w-2xl mx-auto grid grid-cols-3 gap-8 text-center"
        >
          {[
            { value: "2,400+", label: "Careers Coached" },
            { value: "89%", label: "Plan Completion Rate" },
            { value: "3.2x", label: "More Profile Views" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold font-display text-gradient-gold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
