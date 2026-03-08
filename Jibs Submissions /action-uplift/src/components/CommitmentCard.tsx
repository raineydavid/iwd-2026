import { motion } from "framer-motion";
import { levelLabels } from "@/data/actions";

interface CommitmentCardProps {
  level: string;
  isSelected: boolean;
  onClick: () => void;
}

const CommitmentCard = ({ level, isSelected, onClick }: CommitmentCardProps) => {
  const { label, description, icon } = levelLabels[level];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={`relative w-full rounded-2xl p-6 text-left transition-colors duration-300 border-2 ${
        isSelected
          ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "border-border bg-card text-card-foreground hover:border-primary/40"
      }`}
    >
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className="font-serif text-2xl font-bold mb-1">{label}</h3>
      <p className={`text-sm ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
        {description}
      </p>
    </motion.button>
  );
};

export default CommitmentCard;
