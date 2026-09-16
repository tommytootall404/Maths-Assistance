import type { ExplanationBlock } from '../../types/lesson';
import { RichText } from '../../lib/math/Math';
import { VisualRenderer } from '../visuals/VisualRenderer';

export function Explanation({ blocks, onContinue }: { blocks: ExplanationBlock[]; onContinue: () => void }) {
  return (
    <section className="lesson-stage" aria-labelledby="explanation-heading">
      <h2 id="explanation-heading">Explanation</h2>
      <div className="explanation">
        {blocks.map((block) => {
          if (block.kind === 'visual' && block.visual) {
            return (
              <div key={block.id} className="explanation__visual">
                {block.content && <RichText text={block.content} />}
                <VisualRenderer component={block.visual.component} />
              </div>
            );
          }
          if (block.kind === 'note') {
            return (
              <div key={block.id} className="explanation__note" role="note">
                <RichText text={block.content ?? ''} />
              </div>
            );
          }
          return <RichText key={block.id} className="explanation__block" text={block.content ?? ''} />;
        })}
      </div>
      <button type="button" className="btn btn--primary" onClick={onContinue}>
        Continue to worked examples
      </button>
    </section>
  );
}
