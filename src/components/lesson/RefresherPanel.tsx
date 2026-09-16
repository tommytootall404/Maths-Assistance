import type { RefresherContent } from '../../types/lesson';
import { RichText } from '../../lib/math/Math';
import { WorkedExample } from './WorkedExample';

export function RefresherPanel({
  skillLabel,
  refresher,
  onContinue,
}: {
  skillLabel: string;
  refresher: RefresherContent;
  onContinue: () => void;
}) {
  return (
    <div className="refresher-panel" role="note">
      <p className="refresher-panel__eyebrow">Quick refresher: {skillLabel}</p>
      <RichText text={refresher.summary} />
      {refresher.worked && (
        <div className="refresher-panel__worked">
          <WorkedExample example={refresher.worked} autoReveal />
        </div>
      )}
      <button type="button" className="btn btn--secondary" onClick={onContinue}>
        That makes sense, continue
      </button>
    </div>
  );
}
