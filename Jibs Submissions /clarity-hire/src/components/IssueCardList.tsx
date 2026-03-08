import { motion } from 'framer-motion';
import type { Finding, TransparencyResult } from '@/lib/analyzer';
import { CATEGORY_META, type CategoryId } from '@/lib/lexicon';
import { AlertTriangle, Lightbulb, Eye } from 'lucide-react';

interface Props {
  findings: Finding[];
  transparencyResults: TransparencyResult[];
}

const SEVERITY_LABELS: Record<number, string> = {
  1: 'Low',
  2: 'Moderate',
  3: 'Notable',
  4: 'Significant',
  5: 'High',
};

const IssueCardList = ({ findings, transparencyResults }: Props) => {
  const missingTransparency = transparencyResults.filter(t => !t.found);

  if (findings.length === 0 && missingTransparency.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card border border-border rounded-2xl p-8 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <p className="text-foreground font-display font-semibold mb-1">Looking great!</p>
        <p className="text-sm text-muted-foreground font-body">No significant issues detected in your job description.</p>
      </motion.div>
    );
  }

  // Group findings by category
  const grouped: Record<string, Finding[]> = {};
  for (const f of findings) {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-display font-semibold text-foreground">What We Found</h3>
      <p className="text-sm text-muted-foreground font-body -mt-2">
        These are signals that may unintentionally narrow your applicant pool. Hover over any flagged phrase above for quick alternatives.
      </p>

      {Object.entries(grouped).map(([catId, catFindings]) => (
        <motion.div
          key={catId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <h4 className="text-sm font-semibold text-foreground font-body flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-score-fair" />
              {CATEGORY_META[catId as CategoryId].label}
              <span className="text-xs font-normal text-muted-foreground">
                ({catFindings.length} {catFindings.length === 1 ? 'item' : 'items'})
              </span>
            </h4>
          </div>
          <div className="divide-y divide-border">
            {catFindings.map((f, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <code className="text-sm font-semibold text-foreground bg-muted px-2 py-0.5 rounded font-body">
                    "{f.matchedText}"
                  </code>
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-body">
                    {SEVERITY_LABELS[f.severity] || 'Moderate'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-2">
                  {f.explanation}
                </p>
                {f.alternatives.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-primary font-medium font-body">Consider:</span>
                    {f.alternatives.map((alt, j) => (
                      <span key={j} className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-md font-body">
                        {alt}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {missingTransparency.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="px-5 py-3 border-b border-border bg-muted/30">
            <h4 className="text-sm font-semibold text-foreground font-body flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-primary" />
              Transparency Opportunities
              <span className="text-xs font-normal text-muted-foreground">
                ({missingTransparency.length} suggestions)
              </span>
            </h4>
          </div>
          <div className="divide-y divide-border">
            {missingTransparency.map((tr, i) => (
              <div key={i} className="px-5 py-3.5">
                <p className="text-sm font-medium text-foreground font-body mb-1">{tr.signal.label}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{tr.signal.missingMessage}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IssueCardList;
