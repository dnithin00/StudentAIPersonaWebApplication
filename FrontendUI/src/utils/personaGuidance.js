const DEFAULT_GUIDANCE = {
  state:
    'This student\'s score pattern does not map cleanly to a single research cluster. Review their category scores for mixed signals—high utility with high job fear, or strong ethics with low opportunity, may indicate transitional attitudes toward AI.',
  careerInfluence:
    'Their career imagination may be internally conflicted: they may simultaneously see AI as useful and threatening, or as ethically problematic yet unavoidable. Expect inconsistent planning behaviors until underlying dimensions are addressed.',
  advice:
    'Review this student\'s category scores below and tailor support to their highest and lowest dimensions. Prioritize the lowest-scoring category with targeted instruction or mentoring.',
}

const PERSONA_GUIDANCE = {
  'The Confident Pioneer': {
    state:
      'Students in this cluster report high technological self-efficacy and strong perceived utility, with comparatively low job-related anxiety. Psychologically, they tend to experience AI as a mastered tool rather than a threat—confident, exploratory, and willing to experiment in academic settings.',
    careerInfluence:
      'AI tends to expand rather than constrain their career imagination. They often envision futures where AI amplifies their professional impact, opens new roles, and rewards those who learn to collaborate with intelligent systems early.',
    advice:
      'Provide advanced, domain-specific projects to push their existing self-efficacy.',
  },
  'The Anxious Dependent': {
    state:
      'This profile reflects heavy reliance on AI alongside low confidence in how it works and elevated anxiety about economic disruption. Students may feel competent only when a tool is available, creating a dependency loop rooted in fear rather than mastery.',
    careerInfluence:
      'Career imagination is often dominated by threat narratives—automation, displacement, and pressure to change paths—while still depending on AI for day-to-day academic survival. They may struggle to picture a stable future that includes both AI and their chosen field.',
    advice:
      'Build Self-Efficacy by explicitly teaching how AI algorithms work (training data, rules) to demystify the technology.',
  },
  'The Skeptical Traditionalist': {
    state:
      'Students here show lower perceived utility but heightened ethical concern. They often value established academic norms, question whether AI use is fair, and may resist adoption until trust and relevance are demonstrated in their own context.',
    careerInfluence:
      'AI may be framed as a risk to integrity or professional identity rather than an opportunity. Career imagination stays cautious until they see credible, field-specific proof that AI supports—not undermines—the work they want to do.',
    advice:
      'Provide Concrete Examples and Social Support showing real-world AI use in non-tech fields.',
  },
}

export function getInterventionGuidance(persona) {
  return PERSONA_GUIDANCE[persona] ?? DEFAULT_GUIDANCE
}

export const SCORE_CATEGORIES = [
  { key: 'knowledgeScore', label: 'Knowledge' },
  { key: 'utilityScore', label: 'Utility' },
  { key: 'jobFearScore', label: 'Job Fear' },
  { key: 'ethicsScore', label: 'Ethics' },
  { key: 'opportunityScore', label: 'Opportunity' },
  { key: 'concreteExamplesScore', label: 'Concrete Examples' },
]
