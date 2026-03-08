import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import ScoreCard from '@/components/ScoreCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import HighlightedTextViewer from '@/components/HighlightedTextViewer';
import IssueCardList from '@/components/IssueCardList';
import FullRewritePanel from '@/components/FullRewritePanel';
import { analyzeJobDescription, type AnalysisResult } from '@/lib/analyzer';
import { generateFullRewrite } from '@/lib/rewriter';
import { Shield } from 'lucide-react';

const Index = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = useCallback((text: string) => {
    setIsAnalyzing(true);
    // Small delay for perceived processing
    setTimeout(() => {
      const analysis = analyzeJobDescription(text);
      const rewrite = generateFullRewrite(text, analysis);
      setResult(analysis);
      setOriginalText(text);
      setRewrittenText(rewrite);
      setIsAnalyzing(false);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero section */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3 leading-tight">
              Write job posts that<br className="hidden sm:block" /> reach more candidates
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              Improve your job description with clearer, more inclusive language that can help widen your candidate pool.
              This tool checks for patterns that research suggests may reduce application diversity.
            </p>
          </motion.div>
        )}

        {/* Input */}
        <div className={result ? 'mb-8' : 'max-w-3xl mx-auto'}>
          <JobDescriptionInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 mt-8"
            >
              {/* Score + Categories row */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <ScoreCard score={result.overallScore} label={result.scoreLabel} />
                </div>
                <div className="lg:col-span-3">
                  <CategoryBreakdown categories={result.categoryScores} />
                </div>
              </div>

              {/* Highlighted text */}
              {result.findings.length > 0 && (
                <HighlightedTextViewer text={originalText} findings={result.findings} />
              )}

              {/* Issue cards */}
              <IssueCardList
                findings={result.findings}
                transparencyResults={result.transparencyResults}
              />

              {/* Full rewrite */}
              <FullRewritePanel
                originalText={originalText}
                rewrittenText={rewrittenText}
              />

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center font-body py-4 max-w-2xl mx-auto leading-relaxed">
                This tool provides best-effort screening based on research-informed heuristics. 
                It does not make legal claims or guarantee hiring outcomes. 
                Findings represent patterns that may affect applicant diversity — not definitive judgments about your intent or values.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
