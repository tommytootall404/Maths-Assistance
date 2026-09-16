import { useMemo } from 'react';
import { getLessonById } from '../data/modules';

export function useLesson(lessonId: string | undefined) {
  return useMemo(() => (lessonId ? getLessonById(lessonId) : undefined), [lessonId]);
}
