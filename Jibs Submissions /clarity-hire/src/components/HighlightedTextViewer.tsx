import { motion } from 'framer-motion';
import type { Finding } from '@/lib/analyzer';
import type { CategoryId } from '@/lib/lexicon';
import { CATEGORY_META } from '@/lib/lexicon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Props {
  text: string;
  findings: Finding[];
}

const HIGHLIGHT_CLASSES: Record<CategoryId, string> = {
  gender_coded: 'bg-highlight-gender border-b-2 border-highlight-gender-border',
  requirement_inflation: 'bg-highlight-requirements border-b-2 border-highlight-requirements-border',
  exclusionary_seniority: 'bg-highlight-seniority border-b-2 border-highlight-seniority-border',
  culture_burnout: 'bg-highlight-culture border-b-2 border-highlight-culture-border',
  transparency: 'bg-highlight-transparency border-b-2 border-highlight-transparency-border',
  clarity: 'bg-highlight-clarity border-b-2 border-highlight-clarity-border',
};

const HighlightedTextViewer = ({ text, findings }: Props) => {
  const sorted = [...findings].sort((a, b) => a.startIndex - b.startIndex);

  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  sorted.forEach((f, i) => {
    if (f.startIndex > lastIndex) {
      segments.push(<span key={`t-${i}`}>{text.slice(lastIndex, f.startIndex)}</span>);
    }
    segments.push(
      <Tooltip key={`h-${i}`}>
        <TooltipTrigger asChild>
          <mark className={`${HIGHLIGHT_CLASSES[f.category]} rounded-sm px-0.5 cursor-help transition-all hover:opacity-80`}>
            {text.slice(f.startIndex, f.endIndex)}
          </mark>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[300px] text-xs leading-relaxed">
          <p className="font-semibold mb-1">{CATEGORY_META[f.category].label}</p>
          <p>{f.explanation}</p>
          {f.alternatives.length > 0 && (
            <p className="mt-1 text-primary">Try: {f.alternatives.join(', ')}</p>
          )}
        </TooltipContent>
      </Tooltip>
    );
    lastIndex = f.endIndex;
  });

  if (lastIndex < text.length) {
    segments.push(<span key="tail">{text.slice(lastIndex)}</span>);
  }

  // Legend
  const activeCategories = [...new Set(findings.map(f => f.category))];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      <h3 className="text-lg font-display font-semibold text-foreground mb-4">Highlighted Analysis</h3>

      {activeCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeCategories.map(cat => (
            <span
              key={cat}
              className={`${HIGHLIGHT_CLASSES[cat]} text-xs font-medium px-2.5 py-1 rounded-md font-body`}
            >
              {CATEGORY_META[cat].label}
            </span>
          ))}
        </div>
      )}

      <div className="whitespace-pre-wrap text-sm leading-relaxed font-body text-foreground/90 max-h-[500px] overflow-y-auto pr-2">
        {segments}
      </div>
    </motion.div>
  );
};

export default HighlightedTextViewer;
