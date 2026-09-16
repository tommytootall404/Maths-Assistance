import { useState, type FormEvent } from 'react';
import type { Prerequisite } from '../../types/lesson';
import { checkAnswer, looksLikeValidInput } from '../../lib/answerChecking';
import { RichText } from '../../lib/math/Math';
import { RefresherPanel } from './RefresherPanel';

export function PrerequisiteCheck({
  prerequisites,
  onComplete,
}: {
  prerequisites: Prerequisite[];
  onComplete: (allPassedFirstTry: boolean) => void;
}) {
  const [skillIndex, setSkillIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showRefresher, setShowRefresher] = useState(false);
  const [anyStruggled, setAnyStruggled] = useState(false);

  const current = prerequisites[skillIndex];

  const advance = () => {
    setShowRefresher(false);
    setAnswers({});
    const next = skillIndex + 1;
    if (next >= prerequisites.length) {
      onComplete(!anyStruggled);
    } else {
      setSkillIndex(next);
    }
  };

  const handleCheck = (event: FormEvent) => {
    event.preventDefault();
    const allCorrect = current.checkQuestions.every((question) => {
      const value = answers[question.id] ?? '';
      return looksLikeValidInput(value, question.answer) && checkAnswer(value, question.answer);
    });
    if (allCorrect) {
      advance();
    } else {
      setAnyStruggled(true);
      setShowRefresher(true);
    }
  };

  if (showRefresher) {
    return (
      <section className="lesson-stage" aria-labelledby="prereq-heading">
        <h2 id="prereq-heading">Quick check: {current.skill.label}</h2>
        <p className="lesson-stage__intro">No problem — here's a quick refresher first.</p>
        <RefresherPanel skillLabel={current.skill.label} refresher={current.refresher} onContinue={advance} />
      </section>
    );
  }

  return (
    <section className="lesson-stage" aria-labelledby="prereq-heading">
      <h2 id="prereq-heading">Quick check: {current.skill.label}</h2>
      <p className="lesson-stage__intro">
        Before we start, let's make sure these GCSE basics are solid — just {current.checkQuestions.length} quick
        question{current.checkQuestions.length === 1 ? '' : 's'}.
      </p>
      <form onSubmit={handleCheck} className="prereq-check__form">
        {current.checkQuestions.map((question) => (
          <div key={question.id} className="prereq-check__question">
            <RichText text={question.prompt} />
            <input
              type="text"
              value={answers[question.id] ?? ''}
              onChange={(event) => setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))}
              aria-label={`Answer for: ${question.prompt}`}
              autoComplete="off"
            />
          </div>
        ))}
        <button type="submit" className="btn btn--primary">
          Check answers
        </button>
      </form>
    </section>
  );
}
