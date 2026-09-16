import { DiagnosticQuiz } from '../components/diagnostic/DiagnosticQuiz';

export function DiagnosticPage() {
  return (
    <div className="diagnostic-page">
      <h1>Where should you start?</h1>
      <p className="diagnostic-page__intro">
        A handful of quick questions from each module, just to suggest a sensible starting point — not a test.
      </p>
      <DiagnosticQuiz />
    </div>
  );
}
