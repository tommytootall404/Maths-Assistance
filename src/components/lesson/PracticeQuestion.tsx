import { useMemo, useState, type FormEvent } from 'react';
import type { PracticeQuestion as PracticeQuestionType } from '../../types/lesson';
import { checkAnswer, looksLikeValidInput } from '../../lib/answerChecking';
import { newSeed } from '../../lib/random';
import { RichText } from '../../lib/math/Math';
import { HintPanel } from './HintPanel';

type FeedbackState = { kind: 'correct' | 'incorrect' | 'invalid'; message: string } | null;

export function PracticeQuestion({
  question,
  onSolved,
}: {
  question: PracticeQuestionType;
  onSolved: () => void;
}) {
  const [seed, setSeed] = useState(() => newSeed());
  const instance = useMemo(() => question.generate(seed), [question, seed]);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [revealedHints, setRevealedHints] = useState(0);
  const [solved, setSolved] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!looksLikeValidInput(input, instance.answer)) {
      setFeedback({
        kind: 'invalid',
        message: "That doesn't look like a valid answer yet — check the format and try again.",
      });
      return;
    }
    if (checkAnswer(input, instance.answer)) {
      setFeedback({ kind: 'correct', message: 'Correct — nice work.' });
      if (!solved) {
        setSolved(true);
        onSolved();
      }
      return;
    }
    const mistake = instance.commonMistakes?.find((candidate) => checkAnswer(input, candidate.matches));
    setFeedback({
      kind: 'incorrect',
      message: mistake
        ? mistake.feedback
        : "Not quite — that's okay. Try the nudge hint below, or look back at the worked examples above.",
    });
  };

  const tryNewNumbers = () => {
    setSeed(newSeed());
    setInput('');
    setFeedback(null);
    setRevealedHints(0);
    setSolved(false);
  };

  return (
    <div className="practice-question">
      <RichText className="practice-question__prompt" text={instance.prompt} />
      <form onSubmit={handleSubmit} className="practice-question__form">
        <label htmlFor={`answer-${question.id}`} className="sr-only">
          Your answer
        </label>
        <input
          id={`answer-${question.id}`}
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Your answer"
          autoComplete="off"
          inputMode="text"
        />
        <button type="submit" className="btn btn--primary">
          Check answer
        </button>
      </form>
      {feedback && (
        <div
          className={`practice-question__feedback practice-question__feedback--${feedback.kind}`}
          role="status"
        >
          <RichText text={feedback.message} />
        </div>
      )}
      <HintPanel
        hints={question.hints}
        revealedLevels={revealedHints}
        onReveal={() => setRevealedHints((n) => Math.min(n + 1, 3))}
      />
      {revealedHints >= 3 && instance.workingNotes && (
        <div className="practice-question__working">
          <RichText text={instance.workingNotes} />
        </div>
      )}
      <button type="button" className="btn btn--ghost" onClick={tryNewNumbers}>
        Try new numbers
      </button>
    </div>
  );
}
