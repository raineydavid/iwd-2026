import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center card-elevated rounded-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-gold opacity-[0.03]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to Transform Your <span className="text-gradient-gold italic">Career?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get your personalized assessment and start your 30-60-90 day plan today. No credit card required.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/onboarding")}
              className="bg-gradient-gold text-primary-foreground font-semibold px-8 py-6 text-base glow-gold hover:opacity-90 transition-opacity"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
