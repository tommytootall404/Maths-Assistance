import type { KeyFormula } from '../../types/lesson';
import { BlockMath, RichText } from '../../lib/math/Math';

export function FormulaCard({ formula }: { formula: KeyFormula }) {
  return (
    <div className="formula-card">
      <p className="formula-card__label">{formula.label}</p>
      <BlockMath math={formula.formula} />
      {formula.notes && <RichText className="formula-card__notes" text={formula.notes} />}
    </div>
  );
}
