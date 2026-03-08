import { motion } from "framer-motion";
import { Upload, BarChart3, CalendarCheck, Mail } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Connect & Upload",
    description: "Share your LinkedIn profile URL and upload your resume. We handle the rest.",
  },
  {
    icon: BarChart3,
    title: "Deep Analysis",
    description: "Our AI reviews your profile completeness, headline strength, experience narratives, and resume alignment.",
  },
  {
    icon: CalendarCheck,
    title: "Your 30-60-90 Plan",
    description: "Receive a personalized action plan with specific weekly tasks to transform your professional presence.",
  },
  {
    icon: Mail,
    title: "Ongoing Coaching",
    description: "Weekly email check-ins track your progress, celebrate wins, and adjust your plan as you grow.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-navy">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient-gold italic">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            From assessment to action in four simple steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-elevated rounded-xl p-8 group hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-gold flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-sm font-medium text-primary mb-2">Step {i + 1}</div>
              <h3 className="text-xl font-bold font-display mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
