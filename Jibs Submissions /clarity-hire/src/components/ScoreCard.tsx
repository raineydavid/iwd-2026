import { motion } from 'framer-motion';

interface Props {
  score: number;
  label: string;
}

const ScoreCard = ({ score, label }: Props) => {
  const getScoreColor = () => {
    if (score >= 85) return 'text-score-strong';
    if (score >= 70) return 'text-score-good';
    if (score >= 50) return 'text-score-fair';
    return 'text-score-poor';
  };

  const getBadgeClass = () => {
    if (score >= 85) return 'score-badge-strong';
    if (score >= 70) return 'score-badge-good';
    if (score >= 50) return 'score-badge-fair';
    return 'score-badge-poor';
  };

  const getTrackColor = () => {
    if (score >= 85) return 'bg-score-strong';
    if (score >= 70) return 'bg-score-good';
    if (score >= 50) return 'bg-score-fair';
    return 'bg-score-poor';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center"
    >
      <p className="text-sm font-medium text-muted-foreground mb-3 font-body uppercase tracking-wider">Overall Score</p>
      <div className="flex items-baseline justify-center gap-1 mb-3">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-6xl font-display font-bold ${getScoreColor()}`}
        >
          {score}
        </motion.span>
        <span className="text-2xl text-muted-foreground font-display">/100</span>
      </div>
      <div className="w-full max-w-xs mx-auto h-2 rounded-full bg-muted mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${getTrackColor()}`}
        />
      </div>
      <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium font-body ${getBadgeClass()}`}>
        {label}
      </span>
    </motion.div>
  );
};

export default ScoreCard;
