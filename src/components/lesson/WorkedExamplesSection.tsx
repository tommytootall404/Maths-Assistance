import { useState } from 'react';
import type { WorkedExample as WorkedExampleType } from '../../types/lesson';
import { WorkedExample } from './WorkedExample';

export function WorkedExamplesSection({
  examples,
  onExampleViewed,
  onContinue,
}: {
  examples: WorkedExampleType[];
  onExampleViewed: (exampleId: string) => void;
  onContinue: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [revealedFinal, setRevealedFinal] = useState(false);
  const example = examples[index];
  const isLast = index === examples.length - 1;

  const handleFullyRevealed = () => {
    setRevealedFinal(true);
    onExampleViewed(example.id);
  };

  const goNext = () => {
    setRevealedFinal(false);
    if (isLast) {
      onContinue();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <section className="lesson-stage" aria-labelledby="examples-heading">
      <h2 id="examples-heading">
        Worked example {index + 1} of {examples.length}
      </h2>
      <WorkedExample key={example.id} example={example} onFullyRevealed={handleFullyRevealed} />
      {revealedFinal && (
        <button type="button" className="btn btn--primary" onClick={goNext}>
          {isLast ? 'Continue to practice' : 'Next worked example'}
        </button>
      )}
    </section>
  );
}
