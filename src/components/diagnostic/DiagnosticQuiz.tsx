import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { diagnosticQuestions } from '../../data/diagnosticQuiz';
import { modules, getLessonById } from '../../data/modules';
import { checkAnswer, looksLikeValidInput } from '../../lib/answerChecking';
import { RichText } from '../../lib/math/Math';

interface ModuleResult {
  moduleId: string;
  moduleTitle: string;
  suggestedLessonId: string;
  suggestedLessonTitle: string;
  allCorrect: boolean;
}

export function DiagnosticQuiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ModuleResult[] | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const computed: ModuleResult[] = modules.map((module) => {
      const questions = diagnosticQuestions.filter((q) => q.moduleId === module.id);
      let suggestion = questions[questions.length - 1];
      let allCorrect = true;
      for (const question of questions) {
        const value = answers[question.id] ?? '';
        const correct = looksLikeValidInput(value, question.answer) && checkAnswer(value, question.answer);
        if (!correct) {
          suggestion = question;
          allCorrect = false;
          break;
        }
      }
      const lesson = getLessonById(suggestion.suggestedLessonId);
      return {
        moduleId: module.id,
        moduleTitle: module.title,
        suggestedLessonId: suggestion.suggestedLessonId,
        suggestedLessonTitle: lesson?.title ?? suggestion.suggestedLessonId,
        allCorrect,
      };
    });
    setResults(computed);
  };

  if (results) {
    return (
      <div className="diagnostic-results">
        <h2>Here's where we'd suggest starting</h2>
        {results.map((result) => (
          <div key={result.moduleId} className="diagnostic-results__module">
            <h3>{result.moduleTitle}</h3>
            <p>
              {result.allCorrect
                ? "You're confident with the basics here — feel free to start from the beginning anyway, or jump ahead."
                : 'We would suggest starting at:'}
            </p>
            <Link to={`/lessons/${result.suggestedLessonId}`} className="btn btn--primary">
              Start: {result.suggestedLessonTitle}
            </Link>
          </div>
        ))}
        <button type="button" className="btn btn--ghost" onClick={() => setResults(null)}>
          Retake the quiz
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="diagnostic-quiz">
      <p className="diagnostic-quiz__intro">
        No pressure here — there's no pass or fail. Answer what you can; anything you're unsure of just tells us
        where to suggest starting. Leave a question blank if you're not sure.
      </p>
      {diagnosticQuestions.map((question) => (
        <div key={question.id} className="diagnostic-quiz__question">
          <p className="diagnostic-quiz__topic">{question.topic}</p>
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
        See suggestions
      </button>
    </form>
  );
}
