import { useState } from 'react';
import type { PracticeQuestion as PracticeQuestionType } from '../../types/lesson';
import { PracticeQuestion } from './PracticeQuestion';

export function PracticeSection({
  questions,
  onQuestionSolved,
  onContinue,
}: {
  questions: PracticeQuestionType[];
  onQuestionSolved: (questionId: string) => void;
  onContinue: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [solvedIds, setSolvedIds] = useState<ReadonlySet<string>>(new Set());
  const question = questions[index];
  const isLast = index === questions.length - 1;

  const handleSolved = () => {
    setSolvedIds((prev) => new Set(prev).add(question.id));
    onQuestionSolved(question.id);
  };

  const goNext = () => {
    if (isLast) {
      onContinue();
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <section className="lesson-stage" aria-labelledby="practice-heading">
      <h2 id="practice-heading">
        Practice question {index + 1} of {questions.length}
      </h2>
      <p className="practice-section__progress">
        {solvedIds.size} of {questions.length} solved so far — take your time.
      </p>
      <PracticeQuestion key={question.id} question={question} onSolved={handleSolved} />
      <div className="practice-section__nav">
        {index > 0 && (
          <button type="button" className="btn btn--ghost" onClick={() => setIndex((i) => i - 1)}>
            Previous question
          </button>
        )}
        <button type="button" className="btn btn--primary" onClick={goNext}>
          {isLast ? 'Finish practice' : 'Next question'}
        </button>
      </div>
    </section>
  );
}
