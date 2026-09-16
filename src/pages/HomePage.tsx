import { Link } from 'react-router-dom';
import { modules, getLessonsForModule } from '../data/modules';
import { ProgressDashboard } from '../components/progress/ProgressDashboard';

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <h1>Maths for your Engineering T Level</h1>
        <p>
          Clear, step-by-step maths built for the T Level in Engineering — starting from the basics, with plenty
          of worked examples and no pressure. Work at your own pace; everything is saved on this device as you go.
        </p>
        <Link to="/diagnostic" className="btn btn--primary">
          Not sure where to start? Take the quick check
        </Link>
      </section>

      <section className="home-modules">
        <h2>Modules</h2>
        <div className="home-modules__grid">
          {modules.map((module) => {
            const lessons = getLessonsForModule(module.id);
            return (
              <Link key={module.id} to={`/modules/${module.id}`} className="module-card" style={{ borderTopColor: module.accentColor }}>
                <h3>{module.title}</h3>
                <p>{module.shortDescription}</p>
                <span className="module-card__count">{lessons.length} lessons</span>
              </Link>
            );
          })}
        </div>
      </section>

      <ProgressDashboard />
    </div>
  );
}
