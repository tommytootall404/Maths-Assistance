import { useCallback, useState } from 'react';
import type { LessonProgress, ProgressState } from '../types/progress';
import {
  createEmptyLessonProgress,
  getProgress,
  resetAllProgress,
  updateLessonProgress,
} from '../lib/progressStore';

export function useProgress() {
  const [state, setState] = useState<ProgressState>(() => getProgress());

  const refresh = useCallback(() => setState(getProgress()), []);

  const updateLesson = useCallback(
    (lessonId: string, update: Partial<LessonProgress>) => {
      updateLessonProgress(lessonId, update);
      refresh();
    },
    [refresh],
  );

  const resetAll = useCallback(() => {
    resetAllProgress();
    refresh();
  }, [refresh]);

  const getLesson = useCallback(
    (lessonId: string): LessonProgress => state.lessons[lessonId] ?? createEmptyLessonProgress(lessonId),
    [state],
  );

  return { progress: state, updateLesson, resetAll, getLesson, refresh };
}
