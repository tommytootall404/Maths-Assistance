import { useState } from 'react';
import type { WorkedExample as WorkedExampleType } from '../../types/lesson';
import { BlockMath, RichText } from '../../lib/math/Math';

export function WorkedExample({
  example,
  autoReveal = false,
  onFullyRevealed,
}: {
  example: WorkedExampleType;
  autoReveal?: boolean;
  onFullyRevealed?: () => void;
}) {
  const [revealedCount, setRevealedCount] = useState(autoReveal ? example.steps.length : 0);
  const allRevealed = revealedCount >= example.steps.length;

  const showNext = () => {
    const next = Math.min(revealedCount + 1, example.steps.length);
    setRevealedCount(next);
    if (next === example.steps.length) onFullyRevealed?.();
  };

  return (
    <div className="worked-example">
      <h3 className="worked-example__title">{example.title}</h3>
      {example.scenario && <RichText className="worked-example__scenario" text={example.scenario} />}
      <ol className="worked-example__steps">
        {example.steps.slice(0, revealedCount).map((step) => (
          <li key={step.id} className="worked-example__step">
            <RichText className="worked-example__why" text={step.explanationWhy} />
            <BlockMath math={step.mathLine} />
          </li>
        ))}
      </ol>
      {!allRevealed && (
        <button type="button" className="btn btn--secondary" onClick={showNext}>
          Show next step ({revealedCount}/{example.steps.length})
        </button>
      )}
      {allRevealed && (
        <div className="worked-example__final">
          <span className="worked-example__final-label">Final answer:</span>
          <BlockMath math={example.finalAnswer} />
        </div>
      )}
    </div>
  );
}
