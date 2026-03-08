import { motion } from "framer-motion";
import { Brain, Target, TrendingUp, Shield, Zap, Users } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Profile Audit", desc: "Deep analysis of your LinkedIn headline, summary, experience, skills, and endorsements." },
  { icon: Target, title: "Resume Alignment", desc: "We cross-reference your resume with your LinkedIn to find gaps and inconsistencies." },
  { icon: TrendingUp, title: "30-60-90 Plan", desc: "A structured roadmap with weekly milestones tailored to your career goals." },
  { icon: Shield, title: "Privacy First", desc: "Your data is encrypted and never shared. We only use it to coach you." },
  { icon: Zap, title: "Actionable Tips", desc: "No fluff — every recommendation is specific, measurable, and immediately actionable." },
  { icon: Users, title: "Email Coaching", desc: "Weekly check-ins that adapt to your progress and keep you accountable." },
];

const Features = () => (
  <section className="py-24">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Everything You <span className="text-gradient-gold italic">Need</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          A complete career coaching experience, powered by AI
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-elevated rounded-xl p-6 hover:border-primary/30 transition-colors"
          >
            <f.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold font-display mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
