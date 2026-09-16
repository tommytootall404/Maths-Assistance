import type { HintTier } from '../../types/lesson';
import { RichText } from '../../lib/math/Math';

const LEVEL_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Nudge',
  2: 'Bigger hint',
  3: 'Full worked solution',
};

export function HintPanel({
  hints,
  revealedLevels,
  onReveal,
}: {
  hints: [HintTier, HintTier, HintTier];
  revealedLevels: number;
  onReveal: () => void;
}) {
  return (
    <div className="hint-panel">
      {hints.slice(0, revealedLevels).map((hint) => (
        <div key={hint.level} className="hint-panel__tier">
          <p className="hint-panel__label">{LEVEL_LABELS[hint.level]}</p>
          <RichText text={hint.content} />
        </div>
      ))}
      {revealedLevels < 3 && (
        <button type="button" className="btn btn--ghost" onClick={onReveal}>
          {revealedLevels === 0 ? 'Need a hint?' : `Show ${LEVEL_LABELS[(revealedLevels + 1) as 1 | 2 | 3].toLowerCase()}`}
        </button>
      )}
    </div>
  );
}
