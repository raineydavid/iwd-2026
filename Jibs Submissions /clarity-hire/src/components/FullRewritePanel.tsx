import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  originalText: string;
  rewrittenText: string;
}

const FullRewritePanel = ({ originalText, rewrittenText }: Props) => {
  const [copied, setCopied] = useState(false);
  const [sideBySide, setSideBySide] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-foreground">Improved Job Description</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSideBySide(!sideBySide)}
            className="gap-2 text-xs font-body"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {sideBySide ? 'Single view' : 'Side by side'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2 text-xs font-body"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {sideBySide ? (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="p-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-body">Original</p>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/70 font-body max-h-[500px] overflow-y-auto">
              {originalText}
            </div>
          </div>
          <div className="p-5 bg-primary/[0.02]">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 font-body">Improved</p>
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-body max-h-[500px] overflow-y-auto">
              {rewrittenText}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-body max-h-[600px] overflow-y-auto">
            {rewrittenText}
          </div>
        </div>
      )}

      <div className="px-6 py-3 border-t border-border bg-muted/30">
        <p className="text-xs text-muted-foreground font-body">
          This rewrite replaces flagged terms with neutral alternatives and adds placeholder suggestions for missing information. No policies, compensation, or benefits have been invented.
        </p>
      </div>
    </motion.div>
  );
};

export default FullRewritePanel;
