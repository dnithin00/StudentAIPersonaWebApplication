/**
 * Official 18-question blueprint (6 categories × 3 questions).
 * API keys remain Q1–Q18 for BackendApi StudentQuizSubmissionDto.
 */
export const QUIZ_QUESTIONS = [
  {
    id: 'Q1',
    number: 1,
    category: 'Category 1: Technological Self-Efficacy (Knowledge)',
    text: 'I can explain how an AI algorithm learns from training data.',
  },
  {
    id: 'Q2',
    number: 2,
    category: 'Category 1: Technological Self-Efficacy (Knowledge)',
    text: 'I feel confident using AI tools to help me with my schoolwork.',
  },
  {
    id: 'Q3',
    number: 3,
    category: 'Category 1: Technological Self-Efficacy (Knowledge)',
    text: 'I understand the difference between generative AI (like ChatGPT) and other types of AI.',
  },
  {
    id: 'Q4',
    number: 4,
    category: 'Category 2: Perceived Utility (Usage)',
    text: 'I rely on AI tools regularly to solve problems in my daily coursework.',
  },
  {
    id: 'Q5',
    number: 5,
    category: 'Category 2: Perceived Utility (Usage)',
    text: 'I believe AI makes me more productive as a student.',
  },
  {
    id: 'Q6',
    number: 6,
    category: 'Category 2: Perceived Utility (Usage)',
    text: 'I find it difficult to complete my assignments without using AI.',
  },
  {
    id: 'Q7',
    number: 7,
    category: 'Category 3: Job Fear & Anxiety',
    text: 'I am worried that AI will replace human workers in my future career field.',
  },
  {
    id: 'Q8',
    number: 8,
    category: 'Category 3: Job Fear & Anxiety',
    text: 'I feel anxious about how AI will impact the global economy.',
  },
  {
    id: 'Q9',
    number: 9,
    category: 'Category 3: Job Fear & Anxiety',
    text: 'I feel pressured to change my future career plans because of the rise of AI.',
  },
  {
    id: 'Q10',
    number: 10,
    category: 'Category 4: Ethics & Cheating',
    text: 'I feel that using AI to complete academic work is a form of cheating.',
  },
  {
    id: 'Q11',
    number: 11,
    category: 'Category 4: Ethics & Cheating',
    text: 'I worry that AI systems are biased or unfair.',
  },
  {
    id: 'Q12',
    number: 12,
    category: 'Category 4: Ethics & Cheating',
    text: 'I think students who use AI have an unfair advantage over those who do not.',
  },
  {
    id: 'Q13',
    number: 13,
    category: 'Category 5: Opportunity & Future Imagination',
    text: 'I believe AI will create exciting new job opportunities for me in the future.',
  },
  {
    id: 'Q14',
    number: 14,
    category: 'Category 5: Opportunity & Future Imagination',
    text: 'I can easily imagine how I will use AI day-to-day in my future job.',
  },
  {
    id: 'Q15',
    number: 15,
    category: 'Category 5: Opportunity & Future Imagination',
    text: 'I view AI as a tool that will enhance my future career, rather than replace it.',
  },
  {
    id: 'Q16',
    number: 16,
    category: 'Category 6: Concrete Examples & Social Support',
    text: 'My teachers or parents actively talk to me about how AI will affect my future career.',
  },
  {
    id: 'Q17',
    number: 17,
    category: 'Category 6: Concrete Examples & Social Support',
    text: 'I have seen clear, real-world examples of how AI is used in the specific career I want to pursue.',
  },
  {
    id: 'Q18',
    number: 18,
    category: 'Category 6: Concrete Examples & Social Support',
    text: 'I have access to role models or professionals who use AI in their work.',
  },
]

export const LIKERT_LABELS = {
  1: 'Strongly Disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Agree',
}
