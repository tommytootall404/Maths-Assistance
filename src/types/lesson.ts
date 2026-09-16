export type ModuleId = 'calculus' | 'vectors' | 'matrices' | 'logs-exponentials';

export interface SkillRef {
  id: string;
  label: string;
}

export type AnswerSpec =
  | { type: 'numeric'; value: number; tolerance?: number; units?: string }
  | { type: 'fraction-or-decimal'; value: number; tolerance?: number }
  | { type: 'expression'; expression: string; variables?: string[] }
  | { type: 'multiple-choice'; options: { id: string; label: string }[]; correctOptionId: string }
  | { type: 'vector'; components: number[]; tolerance?: number };

export interface PrerequisiteCheckQuestion {
  id: string;
  prompt: string;
  answer: AnswerSpec;
  hint?: string;
}

export interface RefresherContent {
  summary: string;
  worked?: WorkedExample;
  glossaryTermId?: string;
}

export interface Prerequisite {
  skill: SkillRef;
  checkQuestions: PrerequisiteCheckQuestion[];
  refresher: RefresherContent;
}

export type VisualComponentId =
  | 'tangent-explorer'
  | 'area-under-curve'
  | 'vector-playground'
  | 'matrix-multiply'
  | 'exponential-decay-slider';

export interface ExplanationBlock {
  id: string;
  kind: 'plain' | 'notation' | 'visual' | 'note';
  content?: string;
  visual?: {
    component: VisualComponentId;
    props?: Record<string, unknown>;
  };
}

export interface WorkedExampleStep {
  id: string;
  explanationWhy: string;
  mathLine: string;
}

export interface WorkedExample {
  id: string;
  title: string;
  scenario?: string;
  steps: WorkedExampleStep[];
  finalAnswer: string;
}

export interface HintTier {
  level: 1 | 2 | 3;
  content: string;
}

export interface CommonMistake {
  matches: AnswerSpec;
  feedback: string;
}

export interface GeneratedQuestion {
  prompt: string;
  answer: AnswerSpec;
  workingNotes?: string;
  /** Predictable wrong answers for THIS instance of the question, matched against
   * what the student typed so feedback can explain the specific slip rather than
   * just saying "incorrect". */
  commonMistakes?: CommonMistake[];
}

export interface PracticeQuestion {
  id: string;
  difficulty: 1 | 2 | 3;
  generate: (seed: number) => GeneratedQuestion;
  hints: [HintTier, HintTier, HintTier];
}

export interface KeyFormula {
  id: string;
  label: string;
  formula: string;
  notes?: string;
}

export interface Lesson {
  id: string;
  moduleId: ModuleId;
  title: string;
  estMinutes: number;
  whyThisMatters: {
    scenario: string;
  };
  prerequisites: Prerequisite[];
  explanation: ExplanationBlock[];
  workedExamples: WorkedExample[];
  practiceQuestions: PracticeQuestion[];
  summary: string;
  keyFormulas: KeyFormula[];
}
