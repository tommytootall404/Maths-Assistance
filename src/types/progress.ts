export type LessonStatus = 'not-started' | 'in-progress' | 'complete';

export interface LessonProgress {
  lessonId: string;
  prerequisitesPassed: boolean;
  explanationViewed: boolean;
  workedExamplesViewed: string[];
  practiceQuestionsCorrect: Record<string, boolean>;
  lastVisited: string;
  status: LessonStatus;
}

export interface ProgressState {
  version: 1;
  lessons: Record<string, LessonProgress>;
}
