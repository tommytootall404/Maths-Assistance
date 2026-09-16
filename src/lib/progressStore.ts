import type { LessonProgress, ProgressState } from '../types/progress';

const STORAGE_KEY = 'maths-assistance:progress:v1';

export function createEmptyLessonProgress(lessonId: string): LessonProgress {
  return {
    lessonId,
    prerequisitesPassed: false,
    explanationViewed: false,
    workedExamplesViewed: [],
    practiceQuestionsCorrect: {},
    lastVisited: new Date().toISOString(),
    status: 'not-started',
  };
}

function readRaw(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { version: 1, lessons: {} };
    const parsed = JSON.parse(raw) as ProgressState;
    if (parsed.version !== 1 || typeof parsed.lessons !== 'object') return { version: 1, lessons: {} };
    return parsed;
  } catch {
    return { version: 1, lessons: {} };
  }
}

function writeRaw(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, quota exceeded) - progress just won't persist
  }
}

export function getProgress(): ProgressState {
  return readRaw();
}

export function getLessonProgress(lessonId: string): LessonProgress | undefined {
  return readRaw().lessons[lessonId];
}

export function updateLessonProgress(lessonId: string, update: Partial<LessonProgress>): LessonProgress {
  const state = readRaw();
  const existing = state.lessons[lessonId] ?? createEmptyLessonProgress(lessonId);
  const merged: LessonProgress = { ...existing, ...update, lastVisited: new Date().toISOString() };
  state.lessons[lessonId] = merged;
  writeRaw(state);
  return merged;
}

export function resetAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
