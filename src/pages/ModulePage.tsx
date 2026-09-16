import { Link, Navigate, useParams } from 'react-router-dom';
import type { ModuleId } from '../types/lesson';
import { getModuleById, getLessonsForModule } from '../data/modules';
import { useProgress } from '../hooks/useProgress';

const STATUS_LABEL: Record<string, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  complete: 'Complete',
};

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { getLesson } = useProgress();
  const module = moduleId ? getModuleById(moduleId as ModuleId) : undefined;

  if (!module) {
    return <Navigate to="/" replace />;
  }

  const lessons = getLessonsForModule(module.id);

  return (
    <div className="module-page">
      <div className="module-page__breadcrumb">
        <Link to="/">&larr; All modules</Link>
      </div>
      <h1 style={{ borderColor: module.accentColor }}>{module.title}</h1>
      <p className="module-page__description">{module.shortDescription}</p>

      <ol className="lesson-list">
        {lessons.map((lesson, index) => {
          const status = getLesson(lesson.id).status;
          return (
            <li key={lesson.id} className="lesson-list__item">
              <Link to={`/lessons/${lesson.id}`} className="lesson-list__link">
                <span className="lesson-list__number">{index + 1}</span>
                <span className="lesson-list__title">{lesson.title}</span>
                <span className={`lesson-list__status lesson-list__status--${status}`}>
                  {STATUS_LABEL[status]}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
