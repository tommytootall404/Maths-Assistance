import type { AnswerSpec, ModuleId } from '../types/lesson';

export interface DiagnosticQuestion {
  id: string;
  moduleId: ModuleId;
  topic: string;
  prompt: string;
  answer: AnswerSpec;
  /** Lesson to suggest starting at if this question is answered wrong. Questions for a
   * module are ordered easiest-topic-first, matching lesson order, so the first wrong
   * answer in a module points at where to begin. */
  suggestedLessonId: string;
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'd1',
    moduleId: 'logs-exponentials',
    topic: 'Laws of indices',
    prompt: 'What is $2^3$?',
    answer: { type: 'numeric', value: 8 },
    suggestedLessonId: 'what-is-a-log',
  },
  {
    id: 'd2',
    moduleId: 'logs-exponentials',
    topic: 'What a logarithm means',
    prompt: 'Find $\\log_2(8)$.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'what-is-a-log',
  },
  {
    id: 'd3',
    moduleId: 'logs-exponentials',
    topic: 'Laws of logarithms',
    prompt: 'Write $\\log_2(4) + \\log_2(2)$ as a single number.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'laws-of-logs',
  },
  {
    id: 'd4',
    moduleId: 'logs-exponentials',
    topic: 'e and the natural log',
    prompt: 'Evaluate $\\ln(e^3)$.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'e-and-natural-log',
  },
  {
    id: 'd5',
    moduleId: 'logs-exponentials',
    topic: 'Solving exponential equations',
    prompt: 'Solve $\\log_2(x) = 4$ for $x$.',
    answer: { type: 'numeric', value: 16 },
    suggestedLessonId: 'solving-exponential-equations',
  },
  {
    id: 'd6',
    moduleId: 'logs-exponentials',
    topic: 'Engineering applications',
    prompt: 'A capacitor discharges as $V = V_0 e^{-t/RC}$, with $V_0 = 10\\text{ V}$ and $RC = 2\\text{ s}$. Find $V$ at $t = 2\\text{ s}$, to 2 decimal places.',
    answer: { type: 'numeric', value: 10 * Math.exp(-1), tolerance: 0.1 },
    suggestedLessonId: 'logs-engineering-applications',
  },
];
