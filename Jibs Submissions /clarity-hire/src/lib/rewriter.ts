import type { AnalysisResult, Finding, TransparencyResult } from './analyzer';

interface RewriteEntry {
  original: string;
  suggestion: string;
  category: string;
}

export function generateSentenceRewrites(text: string, findings: Finding[]): RewriteEntry[] {
  const rewrites: RewriteEntry[] = [];
  const sorted = [...findings].sort((a, b) => a.startIndex - b.startIndex);

  for (const f of sorted) {
    const alt = f.alternatives[0] || f.matchedText;
    rewrites.push({
      original: f.matchedText,
      suggestion: alt,
      category: f.category,
    });
  }
  return rewrites;
}

export function generateFullRewrite(text: string, result: AnalysisResult): string {
  let rewritten = text;

  // Sort findings by position descending to replace from end
  const sorted = [...result.findings].sort((a, b) => b.startIndex - a.startIndex);

  for (const f of sorted) {
    const alt = f.alternatives[0] || f.matchedText;
    // Preserve original casing style
    let replacement = alt;
    if (f.matchedText[0] === f.matchedText[0].toUpperCase() && alt[0]) {
      replacement = alt[0].toUpperCase() + alt.slice(1);
    }
    rewritten = rewritten.slice(0, f.startIndex) + replacement + rewritten.slice(f.endIndex);
  }

  // Add transparency placeholders at end if missing
  const missingSignals = result.transparencyResults.filter(t => !t.found);
  if (missingSignals.length > 0) {
    rewritten += '\n\n---\n\n📋 Suggested additions:\n';
    for (const ms of missingSignals) {
      rewritten += `\n• [${getPlaceholder(ms)}]`;
    }
  }

  // Add nice-to-have suggestion if missing
  if (!result.hasNiceToHave && result.findings.some(f => f.category === 'requirement_inflation')) {
    rewritten += '\n\n💡 Consider separating requirements into "Required" and "Nice to Have" sections.';
  }

  return rewritten;
}

function getPlaceholder(tr: TransparencyResult): string {
  const map: Record<string, string> = {
    salary: 'Add salary or compensation range',
    remote: 'Add remote / hybrid / on-site expectations',
    flexibility: 'Add flexible work arrangements details',
    parental: 'Add parental leave or caregiver support information',
    learning: 'Add learning and development opportunities',
    dei_statement: 'Add equal opportunity or inclusive hiring statement',
    accommodations: 'Add accommodations or accessibility statement',
  };
  return map[tr.signal.id] || `Add ${tr.signal.label} information`;
}
