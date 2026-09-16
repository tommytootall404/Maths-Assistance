import { Navigate, useParams } from 'react-router-dom';
import { useLesson } from '../hooks/useLesson';
import { LessonPage } from '../components/lesson/LessonPage';

export function LessonRoute() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = useLesson(lessonId);

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  return <LessonPage key={lesson.id} lesson={lesson} />;
}
