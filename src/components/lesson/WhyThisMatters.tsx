import { RichText } from '../../lib/math/Math';

export function WhyThisMatters({ scenario, onContinue }: { scenario: string; onContinue: () => void }) {
  return (
    <section className="lesson-stage" aria-labelledby="why-heading">
      <h2 id="why-heading">Why this matters</h2>
      <RichText className="lesson-stage__body" text={scenario} />
      <button type="button" className="btn btn--primary" onClick={onContinue}>
        Continue
      </button>
    </section>
  );
}
