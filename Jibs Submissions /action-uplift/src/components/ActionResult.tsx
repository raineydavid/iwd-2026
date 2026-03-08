import { motion } from "framer-motion";
import { Action } from "@/data/actions";
import SocialShare from "./SocialShare";

interface ActionResultProps {
  action: Action;
  level: string;
  onReroll: () => void;
}

const ActionResult = ({ action, level, onReroll }: ActionResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="rounded-3xl bg-card border border-border p-8 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-5xl mb-4 block">{action.emoji}</span>
          <h3 className="font-serif text-2xl font-bold text-card-foreground mb-2">
            Your Action
          </h3>
          <p className="text-lg text-card-foreground leading-relaxed">
            {action.text}
          </p>
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <p className="text-sm text-muted-foreground text-center mb-4 font-semibold uppercase tracking-wider">
            Make it public — commit out loud
          </p>
          <SocialShare action={action} level={level} />
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onReroll}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            Get a different action →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionResult;
