import { motion } from 'framer-motion';
import type { CategoryScore } from '@/lib/analyzer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface Props {
  categories: CategoryScore[];
}

const CategoryBreakdown = ({ categories }: Props) => {
  const getBarColor = (score: number, max: number) => {
    const pct = (score / max) * 100;
    if (pct >= 85) return 'bg-score-strong';
    if (pct >= 70) return 'bg-score-good';
    if (pct >= 50) return 'bg-score-fair';
    return 'bg-score-poor';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-display font-semibold text-foreground mb-5">Category Breakdown</h3>
      <div className="space-y-4">
        {categories.map((cat, i) => {
          const pct = Math.round((cat.score / cat.maxScore) * 100);
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground font-body">{cat.label}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3.5 h-3.5 text-muted-foreground/50" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] text-xs">
                      {cat.description}
                    </TooltipContent>
                  </Tooltip>
                  {cat.findingCount > 0 && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {cat.findingCount} {cat.findingCount === 1 ? 'issue' : 'issues'}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-muted-foreground font-body">
                  {cat.score}/{cat.maxScore}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getBarColor(cat.score, cat.maxScore)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryBreakdown;
