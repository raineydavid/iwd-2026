import { LEXICON, TRANSPARENCY_SIGNALS, CATEGORY_META, type CategoryId, type LexiconEntry, type TransparencySignal } from './lexicon';

export interface Finding {
  term: string;
  matchedText: string;
  startIndex: number;
  endIndex: number;
  category: CategoryId;
  severity: number;
  explanation: string;
  alternatives: string[];
}

export interface TransparencyResult {
  signal: TransparencySignal;
  found: boolean;
}

export interface CategoryScore {
  id: CategoryId;
  label: string;
  score: number;
  maxScore: number;
  description: string;
  color: string;
  findingCount: number;
}

export interface AnalysisResult {
  findings: Finding[];
  transparencyResults: TransparencyResult[];
  categoryScores: CategoryScore[];
  overallScore: number;
  scoreLabel: string;
  hasNiceToHave: boolean;
  requirementBulletCount: number;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findMatches(text: string, entry: LexiconEntry): Finding[] {
  const findings: Finding[] = [];
  const regex = entry.regex || new RegExp(`\\b${escapeRegex(entry.term)}\\b`, 'gi');
  // Reset lastIndex for global regexes
  regex.lastIndex = 0;

  let match: RegExpExecArray | null;
  const seen = new Set<string>();
  
  while ((match = regex.exec(text)) !== null) {
    const key = `${match.index}-${match[0]}`;
    if (seen.has(key)) break;
    seen.add(key);
    
    findings.push({
      term: entry.term,
      matchedText: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      category: entry.category,
      severity: entry.severity,
      explanation: entry.explanation,
      alternatives: entry.alternatives,
    });
  }
  return findings;
}

function checkTransparency(text: string): TransparencyResult[] {
  return TRANSPARENCY_SIGNALS.map(signal => ({
    signal,
    found: signal.patterns.some(p => p.test(text)),
  }));
}

function countRequirementBullets(text: string): number {
  const lines = text.split('\n');
  let count = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (/^[-•*]\s/.test(trimmed) || /^\d+[\.\)]\s/.test(trimmed)) {
      count++;
    }
  }
  return count;
}

function checkNiceToHave(text: string): boolean {
  return /nice[ -]to[ -]have|preferred|bonus|plus|ideally/i.test(text);
}

export function analyzeJobDescription(text: string): AnalysisResult {
  if (!text.trim()) {
    return {
      findings: [],
      transparencyResults: [],
      categoryScores: Object.entries(CATEGORY_META).map(([id, meta]) => ({
        id: id as CategoryId,
        ...meta,
        score: meta.maxScore,
        findingCount: 0,
      })),
      overallScore: 100,
      scoreLabel: 'Strong',
      hasNiceToHave: false,
      requirementBulletCount: 0,
    };
  }

  // Find all lexicon matches
  let allFindings: Finding[] = [];
  for (const entry of LEXICON) {
    allFindings.push(...findMatches(text, entry));
  }

  // Remove overlapping findings (keep higher severity)
  allFindings.sort((a, b) => a.startIndex - b.startIndex || b.severity - a.severity);
  const deduped: Finding[] = [];
  let lastEnd = -1;
  for (const f of allFindings) {
    if (f.startIndex >= lastEnd) {
      deduped.push(f);
      lastEnd = f.endIndex;
    }
  }
  allFindings = deduped;

  const transparencyResults = checkTransparency(text);
  const hasNiceToHave = checkNiceToHave(text);
  const requirementBulletCount = countRequirementBullets(text);

  // Compute category scores
  const categoryPenalties: Record<CategoryId, number> = {
    gender_coded: 0,
    requirement_inflation: 0,
    exclusionary_seniority: 0,
    culture_burnout: 0,
    transparency: 0,
    clarity: 0,
  };

  for (const f of allFindings) {
    categoryPenalties[f.category] += f.severity * 2;
  }

  // Requirement inflation extras
  if (requirementBulletCount > 12) {
    categoryPenalties.requirement_inflation += Math.min((requirementBulletCount - 12) * 1.5, 10);
  }
  if (!hasNiceToHave && allFindings.some(f => f.category === 'requirement_inflation')) {
    categoryPenalties.requirement_inflation += 4;
  }

  // Transparency penalties for missing signals
  for (const tr of transparencyResults) {
    if (!tr.found) {
      categoryPenalties.transparency += tr.signal.credit * 0.8;
    }
  }

  // Clarity: check sentence length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 35);
  if (longSentences.length > 0) {
    categoryPenalties.clarity += longSentences.length * 2;
  }

  const categoryScores: CategoryScore[] = Object.entries(CATEGORY_META).map(([id, meta]) => {
    const penalty = Math.min(categoryPenalties[id as CategoryId], meta.maxScore);
    return {
      id: id as CategoryId,
      ...meta,
      score: Math.max(0, Math.round(meta.maxScore - penalty)),
      findingCount: allFindings.filter(f => f.category === id).length + 
        (id === 'transparency' ? transparencyResults.filter(t => !t.found).length : 0),
    };
  });

  // Positive credits
  let bonus = 0;
  if (transparencyResults.find(t => t.signal.id === 'salary')?.found) bonus += 3;
  if (transparencyResults.find(t => t.signal.id === 'flexibility')?.found) bonus += 2;
  if (transparencyResults.find(t => t.signal.id === 'dei_statement')?.found) bonus += 2;
  if (transparencyResults.find(t => t.signal.id === 'accommodations')?.found) bonus += 2;
  if (hasNiceToHave) bonus += 2;

  const rawScore = categoryScores.reduce((sum, c) => sum + c.score, 0);
  const overallScore = Math.max(0, Math.min(100, rawScore + bonus));

  let scoreLabel: string;
  if (overallScore >= 85) scoreLabel = 'Strong';
  else if (overallScore >= 70) scoreLabel = 'Good with room to improve';
  else if (overallScore >= 50) scoreLabel = 'Likely narrowing your applicant pool';
  else scoreLabel = 'Needs revision';

  return {
    findings: allFindings,
    transparencyResults,
    categoryScores,
    overallScore,
    scoreLabel,
    hasNiceToHave,
    requirementBulletCount,
  };
}
