import { Link } from 'react-router-dom';
import { modules, getLessonsForModule } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import { ResetProgressButton } from './ResetProgressButton';

export function ProgressDashboard() {
  const { getLesson } = useProgress();

  return (
    <div className="progress-dashboard">
      <div className="progress-dashboard__header">
        <h2>Your progress</h2>
        <ResetProgressButton />
      </div>
      <div className="progress-dashboard__modules">
        {modules.map((module) => {
          const lessons = getLessonsForModule(module.id);
          const completedCount = lessons.filter((lesson) => getLesson(lesson.id).status === 'complete').length;
          return (
            <Link key={module.id} to={`/modules/${module.id}`} className="progress-dashboard__module">
              <span className="progress-dashboard__module-title" style={{ borderColor: module.accentColor }}>
                {module.title}
              </span>
              <span className="progress-dashboard__module-count">
                {completedCount} / {lessons.length} lessons complete
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
