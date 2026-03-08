export type CategoryId = 'gender_coded' | 'requirement_inflation' | 'exclusionary_seniority' | 'culture_burnout' | 'transparency' | 'clarity';

export interface LexiconEntry {
  term: string;
  regex?: RegExp;
  category: CategoryId;
  severity: number; // 1-5
  explanation: string;
  alternatives: string[];
}

export interface TransparencySignal {
  id: string;
  label: string;
  patterns: RegExp[];
  missingMessage: string;
  credit: number;
}

export const CATEGORY_META: Record<CategoryId, { label: string; maxScore: number; description: string; color: string }> = {
  gender_coded: { label: 'Language Inclusivity', maxScore: 30, description: 'Gender-coded or exclusionary wording', color: 'gender' },
  requirement_inflation: { label: 'Requirement Realism', maxScore: 20, description: 'Inflated or unrealistic requirements', color: 'requirements' },
  exclusionary_seniority: { label: 'Openness to Candidates', maxScore: 10, description: 'Rigid seniority or exclusionary phrasing', color: 'seniority' },
  culture_burnout: { label: 'Culture Clarity', maxScore: 15, description: 'Burnout signals and vague culture cues', color: 'culture' },
  transparency: { label: 'Transparency', maxScore: 20, description: 'Salary, benefits, and workplace clarity', color: 'transparency' },
  clarity: { label: 'Clarity & Accessibility', maxScore: 15, description: 'Jargon, vagueness, and readability', color: 'clarity' },
};

export const LEXICON: LexiconEntry[] = [
  // Gender-coded terms
  { term: 'rockstar', category: 'gender_coded', severity: 3, explanation: 'This term can signal a narrow, individual-hero culture and may discourage collaborative candidates.', alternatives: ['experienced', 'high-performing', 'skilled'] },
  { term: 'ninja', category: 'gender_coded', severity: 3, explanation: 'Informal and culturally appropriative; may signal a bro-culture environment.', alternatives: ['specialist', 'expert', 'skilled professional'] },
  { term: 'dominate', category: 'gender_coded', severity: 3, explanation: 'Aggressive language that may discourage some applicants from applying.', alternatives: ['lead', 'excel in', 'drive results in'] },
  { term: 'aggressive', category: 'gender_coded', severity: 3, explanation: 'Research links this to masculine-coded language that can narrow your applicant pool.', alternatives: ['ambitious', 'proactive', 'driven'] },
  { term: 'competitive', category: 'gender_coded', severity: 2, explanation: 'May signal a zero-sum culture rather than collaborative environment.', alternatives: ['motivated', 'results-oriented', 'high-achieving'] },
  { term: 'relentless', category: 'gender_coded', severity: 2, explanation: 'May imply unsustainable intensity expectations.', alternatives: ['persistent', 'dedicated', 'committed'] },
  { term: 'fearless', category: 'gender_coded', severity: 2, explanation: 'Heroic language that may discourage thoughtful, risk-aware candidates.', alternatives: ['confident', 'decisive', 'willing to take on challenges'] },
  { term: 'battle-tested', category: 'gender_coded', severity: 2, explanation: 'Military metaphor that may feel exclusionary to some candidates.', alternatives: ['experienced', 'proven', 'seasoned'] },
  { term: 'killer instinct', category: 'gender_coded', severity: 4, explanation: 'Violent metaphor that signals aggressive culture.', alternatives: ['strong drive', 'results-focused mindset', 'determination'] },
  { term: 'crush', regex: /crush\s+(it|targets|goals|the competition)/gi, category: 'gender_coded', severity: 3, explanation: 'Aggressive language that may narrow your applicant pool.', alternatives: ['achieve', 'exceed', 'accomplish'] },
  { term: 'assertive self-starter', category: 'gender_coded', severity: 2, explanation: 'May discourage candidates who value collaboration over individual assertion.', alternatives: ['self-motivated', 'proactive', 'takes initiative'] },
  { term: 'manpower', category: 'gender_coded', severity: 3, explanation: 'Gendered term that excludes non-male candidates.', alternatives: ['workforce', 'team capacity', 'staffing'] },
  { term: 'chairman', category: 'gender_coded', severity: 3, explanation: 'Gendered title; consider using a neutral alternative.', alternatives: ['chairperson', 'chair', 'head'] },
  { term: 'guys', regex: /\b(you guys|the guys)\b/gi, category: 'gender_coded', severity: 2, explanation: 'Casually gendered; may feel exclusionary.', alternatives: ['team', 'everyone', 'folks'] },
  { term: 'hit the ground running', category: 'gender_coded', severity: 1, explanation: 'May imply lack of onboarding support.', alternatives: ['contribute early', 'ramp up effectively', 'get started quickly with support'] },
  { term: 'hustler', category: 'gender_coded', severity: 3, explanation: 'Can signal expectation of overwork and bro-culture.', alternatives: ['driven professional', 'motivated individual', 'energetic contributor'] },
  { term: 'hacker', regex: /\bhacker\b/gi, category: 'gender_coded', severity: 2, explanation: 'May feel exclusionary or signal narrow culture fit.', alternatives: ['developer', 'engineer', 'builder'] },
  { term: 'alpha', regex: /\balpha\b/gi, category: 'gender_coded', severity: 3, explanation: 'Dominance-oriented language that can discourage many candidates.', alternatives: ['leader', 'strong contributor', 'experienced professional'] },
  { term: 'balls', regex: /\bballs\b/gi, category: 'gender_coded', severity: 4, explanation: 'Gendered and crude; inappropriate for professional job descriptions.', alternatives: ['courage', 'confidence', 'boldness'] },
  { term: 'man up', category: 'gender_coded', severity: 4, explanation: 'Explicitly gendered and exclusionary.', alternatives: ['step up', 'take responsibility', 'rise to the challenge'] },
  { term: 'bro', regex: /\bbro(s)?\b/gi, category: 'gender_coded', severity: 3, explanation: 'Signals bro-culture that can feel unwelcoming.', alternatives: ['colleague', 'teammate', 'peer'] },
  { term: 'strong-willed', category: 'gender_coded', severity: 1, explanation: 'May signal preference for confrontational personalities.', alternatives: ['determined', 'committed', 'focused'] },
  { term: 'workaholic', category: 'gender_coded', severity: 3, explanation: 'Signals expectation of overwork.', alternatives: ['dedicated', 'passionate', 'committed'] },

  // Requirement inflation
  { term: 'must have', regex: /must\s+have/gi, category: 'requirement_inflation', severity: 2, explanation: 'Frequent use of "must have" can make requirements feel inflexible. Consider separating into required vs. preferred.', alternatives: ['ideally has', 'we value', 'experience with … is a plus'] },
  { term: 'required', regex: /\brequired\b/gi, category: 'requirement_inflation', severity: 1, explanation: 'Heavy use of "required" without a "nice to have" section may discourage qualified candidates with partial matches.', alternatives: ['preferred', 'valued', 'beneficial'] },
  { term: 'expert in', regex: /expert\s+in/gi, category: 'requirement_inflation', severity: 3, explanation: '"Expert" sets a very high bar; many qualified candidates may self-select out.', alternatives: ['strong experience with', 'proficiency in', 'deep familiarity with'] },
  { term: 'mandatory', category: 'requirement_inflation', severity: 2, explanation: 'Rigid language that may discourage otherwise strong candidates.', alternatives: ['important', 'strongly preferred', 'key requirement'] },
  { term: 'years of experience', regex: /(\d+)\+?\s*years?\s*(of\s+)?experience/gi, category: 'requirement_inflation', severity: 3, explanation: 'High years-of-experience requirements can screen out talented candidates with non-traditional backgrounds. Research shows women are less likely to apply when they don\'t meet all listed requirements.', alternatives: ['relevant experience in', 'demonstrated ability in', 'background in'] },
  { term: 'extensive experience', category: 'requirement_inflation', severity: 2, explanation: 'Vague and potentially inflated; consider specifying what "extensive" means in practice.', alternatives: ['solid experience', 'meaningful experience', 'hands-on experience'] },
  { term: 'deep expertise', category: 'requirement_inflation', severity: 2, explanation: 'May discourage generalists and career-changers.', alternatives: ['strong knowledge of', 'experience with', 'familiarity with'] },
  { term: 'master', regex: /\bmaster(y|ed)?\s+(of|in)\b/gi, category: 'requirement_inflation', severity: 2, explanation: 'Very high bar that may discourage strong candidates.', alternatives: ['proficiency in', 'strong skills in', 'solid understanding of'] },

  // Exclusionary seniority
  { term: 'only senior candidates', regex: /only\s+senior/gi, category: 'exclusionary_seniority', severity: 3, explanation: 'Explicitly excludes candidates who may have equivalent skills through different paths.', alternatives: ['experienced candidates', 'candidates with relevant background'] },
  { term: 'no juniors', regex: /no\s+juniors?/gi, category: 'exclusionary_seniority', severity: 4, explanation: 'Explicitly exclusionary; consider describing the skill level needed instead.', alternatives: ['looking for someone with experience in…', 'ideal for candidates who have worked on…'] },
  { term: 'elite', category: 'exclusionary_seniority', severity: 3, explanation: 'May feel exclusionary and signal an environment focused on pedigree over capability.', alternatives: ['talented', 'skilled', 'high-performing'] },
  { term: 'top 1%', regex: /top\s+\d+%/gi, category: 'exclusionary_seniority', severity: 4, explanation: 'Arbitrary ranking that may discourage many qualified candidates.', alternatives: ['highly skilled', 'experienced', 'strong'] },
  { term: 'world-class', category: 'exclusionary_seniority', severity: 2, explanation: 'Vague superlative that may feel intimidating.', alternatives: ['excellent', 'outstanding', 'high-quality'] },
  { term: 'exceptional', category: 'exclusionary_seniority', severity: 1, explanation: 'Sets a very high bar; consider whether "strong" conveys the same need.', alternatives: ['strong', 'skilled', 'capable'] },
  { term: 'proven superstar', category: 'exclusionary_seniority', severity: 3, explanation: 'Hero-culture language that may narrow your applicant pool.', alternatives: ['proven contributor', 'experienced professional', 'strong performer'] },
  { term: 'A-player', regex: /A[\-\s]player/gi, category: 'exclusionary_seniority', severity: 3, explanation: 'Ranking language that implies a rigid hierarchy of candidate quality.', alternatives: ['motivated professional', 'strong contributor', 'dedicated team member'] },
  { term: 'unicorn', category: 'exclusionary_seniority', severity: 3, explanation: 'Implies unrealistic expectations for a single candidate.', alternatives: ['versatile professional', 'well-rounded candidate', 'multi-skilled engineer'] },
  { term: 'guru', category: 'exclusionary_seniority', severity: 2, explanation: 'Informal and potentially culturally insensitive.', alternatives: ['expert', 'specialist', 'authority'] },
  { term: '10x', regex: /\b10x\b/gi, category: 'exclusionary_seniority', severity: 3, explanation: 'Mythologized productivity metric that may discourage applicants.', alternatives: ['highly productive', 'efficient', 'impactful'] },

  // Culture and burnout signals
  { term: 'work hard play hard', category: 'culture_burnout', severity: 3, explanation: 'Often signals long hours with drinking culture. May discourage parents, caregivers, and people in recovery.', alternatives: ['we value both impact and wellbeing', 'we celebrate achievements and respect boundaries'] },
  { term: 'fast-paced environment', category: 'culture_burnout', severity: 2, explanation: 'May imply chaotic or unsustainable working conditions. Consider being specific about what pace looks like.', alternatives: ['dynamic environment', 'evolving environment', 'environment where priorities shift'] },
  { term: 'wear many hats', category: 'culture_burnout', severity: 2, explanation: 'May signal under-resourcing or unclear role boundaries.', alternatives: ['collaborate across functions', 'contribute to varied projects', 'work across disciplines'] },
  { term: 'thrive under pressure', category: 'culture_burnout', severity: 3, explanation: 'May normalize stress as a job requirement.', alternatives: ['comfortable managing competing priorities', 'able to navigate ambiguity', 'effective in dynamic settings'] },
  { term: 'always on', category: 'culture_burnout', severity: 4, explanation: 'Signals expectation of constant availability, which may conflict with work-life balance.', alternatives: ['responsive during working hours', 'available for occasional time-sensitive needs'] },
  { term: 'high intensity', category: 'culture_burnout', severity: 2, explanation: 'May signal unsustainable expectations.', alternatives: ['high-impact', 'meaningful work', 'engaging challenges'] },
  { term: 'whatever it takes', category: 'culture_burnout', severity: 3, explanation: 'Implies boundary-less expectations.', alternatives: ['committed to outcomes', 'dedicated to results', 'focused on delivery'] },
  { term: 'sense of urgency', regex: /sense\s+of\s+urgency/gi, category: 'culture_burnout', severity: 2, explanation: 'May imply artificial urgency is constant.', alternatives: ['ability to prioritize effectively', 'comfort with shifting priorities'] },
  { term: 'startup mentality', category: 'culture_burnout', severity: 2, explanation: 'Can signal expectation of overwork without commensurate support or compensation.', alternatives: ['entrepreneurial mindset', 'ownership mentality', 'comfort with ambiguity'] },
  { term: 'no hand-holding', category: 'culture_burnout', severity: 3, explanation: 'May signal lack of mentorship or support, discouraging less experienced candidates.', alternatives: ['self-directed with support available', 'independent with collaborative team'] },
  { term: 'family', regex: /we('re| are) (a |like )?family/gi, category: 'culture_burnout', severity: 2, explanation: '"We\'re a family" can signal blurred professional boundaries.', alternatives: ['close-knit team', 'supportive team', 'collaborative culture'] },
  { term: 'grind', regex: /\bgrind(ing)?\b/gi, category: 'culture_burnout', severity: 3, explanation: 'Signals expectation of grueling work.', alternatives: ['dedicated effort', 'focused work', 'sustained contribution'] },
  { term: 'rockstar culture', category: 'culture_burnout', severity: 3, explanation: 'Combines hero-worship with potential burnout signals.', alternatives: ['collaborative culture', 'supportive team environment'] },
  { term: 'move fast and break things', category: 'culture_burnout', severity: 3, explanation: 'May signal lack of care for quality, stability, or thoughtfulness.', alternatives: ['iterate quickly and learn', 'move with purpose', 'ship and improve'] },

  // Clarity issues (detected differently - these are pattern-based)
  { term: 'etc.', regex: /\betc\.?\b/gi, category: 'clarity', severity: 1, explanation: 'Vague — consider listing specific items or removing.', alternatives: ['list specific items', 'and similar tools/skills'] },
  { term: 'and/or', category: 'clarity', severity: 1, explanation: 'Ambiguous — consider choosing one or clarifying the expectation.', alternatives: ['specify which is meant'] },
  { term: 'various', category: 'clarity', severity: 1, explanation: 'Vague — consider being specific about what "various" includes.', alternatives: ['specific examples', 'such as X, Y, and Z'] },
  { term: 'other duties as assigned', category: 'clarity', severity: 2, explanation: 'Vague catch-all that may create anxiety about undefined scope.', alternatives: ['contribute to team projects as needed', 'participate in cross-team initiatives'] },
  { term: 'as needed', regex: /as\s+needed/gi, category: 'clarity', severity: 1, explanation: 'May be vague — consider clarifying frequency or conditions.', alternatives: ['specify when or how often'] },
];

export const TRANSPARENCY_SIGNALS: TransparencySignal[] = [
  {
    id: 'salary',
    label: 'Salary Range',
    patterns: [/salary/i, /compensation/i, /pay\s+range/i, /\$\d/, /\d+k/i, /per\s+(year|annum|hour)/i],
    missingMessage: 'No salary or compensation range detected. Including pay transparency can significantly increase application rates, especially from underrepresented candidates.',
    credit: 5,
  },
  {
    id: 'remote',
    label: 'Work Location',
    patterns: [/remote/i, /hybrid/i, /on[\-\s]?site/i, /in[\-\s]?office/i, /work\s+from\s+home/i, /location[\s:]/i],
    missingMessage: 'No clear work location expectations found. Specifying remote, hybrid, or on-site helps candidates self-select.',
    credit: 3,
  },
  {
    id: 'flexibility',
    label: 'Flexible Work',
    patterns: [/flexib/i, /part[\-\s]?time/i, /hours?\s+flexibility/i, /async/i],
    missingMessage: 'No mention of flexible work arrangements. This can broaden your pool, especially for caregivers.',
    credit: 2,
  },
  {
    id: 'parental',
    label: 'Parental / Caregiver Support',
    patterns: [/parental\s+leave/i, /maternity/i, /paternity/i, /caregiv/i, /family\s+leave/i, /childcare/i],
    missingMessage: 'No mention of parental leave or caregiver support.',
    credit: 2,
  },
  {
    id: 'learning',
    label: 'Learning & Development',
    patterns: [/learn/i, /development\s+(budget|fund|opportunit)/i, /training/i, /conference/i, /growth/i, /mentor/i],
    missingMessage: 'No mention of learning and development opportunities.',
    credit: 2,
  },
  {
    id: 'dei_statement',
    label: 'Inclusive / EEO Statement',
    patterns: [/equal\s+opportunity/i, /eeo/i, /diversity/i, /inclusi/i, /regardless\s+of/i, /welcome\s+candidates/i, /encourage.*(apply|application)/i],
    missingMessage: 'No equal opportunity or inclusive hiring statement found. Consider adding one.',
    credit: 3,
  },
  {
    id: 'accommodations',
    label: 'Accommodations',
    patterns: [/accommodat/i, /accessib/i, /disabilit/i, /ada\b/i],
    missingMessage: 'No mention of accommodations or accessibility for candidates with disabilities.',
    credit: 3,
  },
];

export const SAMPLE_JD = `Senior Software Engineer — Growth Team

About Us
We're a fast-paced, high-intensity startup disrupting the fintech space. We work hard and play hard. If you can't handle the heat, this isn't the place for you.

What We're Looking For
We need a rockstar engineer who can dominate complex distributed systems. You should be a self-starter with killer instinct who thrives under pressure and wears many hats. No hand-holding here — we move fast and break things.

Requirements
- Must have 10+ years of experience in backend development
- Expert in Python, Go, Java, Rust, and C++
- Must have deep expertise in Kubernetes, Docker, Terraform, AWS, GCP, and Azure
- Expert in machine learning, NLP, and computer vision
- Must have mastery of React, Angular, Vue, and Svelte
- Required: PhD or Master's degree in Computer Science
- Must be an aggressive self-starter
- Must have extensive experience with microservices, event-driven architecture, CQRS, and DDD
- Expert in SQL, NoSQL, graph databases, and time-series databases
- Required: 5+ years of experience leading engineering teams

We're looking for A-players only. Top 1% talent. No juniors.

Culture
We're like a family here. We expect a sense of urgency at all times and a whatever-it-takes attitude. Our team has a grind mentality — when deadlines hit, we deliver, no excuses.

Other duties as assigned. Etc.`;
