import { Link } from 'react-router-dom';
import type { KeyFormula } from '../../types/lesson';
import { RichText } from '../../lib/math/Math';
import { FormulaCard } from './FormulaCard';

export function LessonSummary({
  summary,
  keyFormulas,
  nextLessonId,
  moduleId,
}: {
  summary: string;
  keyFormulas: KeyFormula[];
  nextLessonId?: string;
  moduleId: string;
}) {
  return (
    <section className="lesson-stage" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Lesson summary</h2>
      <RichText className="lesson-stage__body" text={summary} />
      <div className="key-formulas">
        {keyFormulas.map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}
      </div>
      <div className="lesson-summary__actions">
        <Link to={`/modules/${moduleId}`} className="btn btn--secondary">
          Back to module
        </Link>
        {nextLessonId && (
          <Link to={`/lessons/${nextLessonId}`} className="btn btn--primary">
            Next lesson
          </Link>
        )}
      </div>
    </section>
  );
}
