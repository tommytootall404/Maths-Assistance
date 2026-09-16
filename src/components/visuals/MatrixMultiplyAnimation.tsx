import { useState, type CSSProperties } from 'react';
import { InlineMath } from '../../lib/math/Math';

const MATRIX_A = [
  [2, 3, 0],
  [1, -1, 4],
];
const MATRIX_B = [
  [1, 4],
  [4, 0],
  [2, 3],
];

const ROWS_A = MATRIX_A.length;
const INNER_DIM = MATRIX_A[0].length;
const COLS_B = MATRIX_B[0].length;

interface CellInfo {
  row: number;
  col: number;
  value: number;
  sumLine: string;
}

const CELLS: CellInfo[] = [];
for (let r = 0; r < ROWS_A; r += 1) {
  for (let c = 0; c < COLS_B; c += 1) {
    const parts: string[] = [];
    let value = 0;
    for (let k = 0; k < INNER_DIM; k += 1) {
      const a = MATRIX_A[r][k];
      const b = MATRIX_B[k][c];
      parts.push(`${a} \\times ${b}`);
      value += a * b;
    }
    CELLS.push({ row: r, col: c, value, sumLine: `${parts.join(' + ')} = ${value}` });
  }
}

export function MatrixMultiplyAnimation() {
  const [revealedCount, setRevealedCount] = useState(0);
  const total = CELLS.length;
  const allRevealed = revealedCount >= total;
  const current = revealedCount > 0 ? CELLS[revealedCount - 1] : null;

  const showNext = () => {
    setRevealedCount((count) => Math.min(count + 1, total));
  };

  const reset = () => setRevealedCount(0);

  const gridStyleA: CSSProperties = { gridTemplateColumns: `repeat(${INNER_DIM}, minmax(2.4rem, 1fr))` };
  const gridStyleB: CSSProperties = { gridTemplateColumns: `repeat(${COLS_B}, minmax(2.4rem, 1fr))` };

  return (
    <div className="visual-card">
      <p className="visual-readout">
        Multiplying a {ROWS_A}×{INNER_DIM} matrix by a {INNER_DIM}×{COLS_B} matrix gives a {ROWS_A}×{COLS_B} result.
        Click through to build up each entry: row of the left matrix, column of the right matrix, multiply and add.
      </p>
      <div className="matrix-multiply">
        <div className="matrix-multiply__operand">
          <div className="matrix-grid" style={gridStyleA}>
            {MATRIX_A.map((rowVals, r) =>
              rowVals.map((val, c) => (
                <div
                  key={`a-${r}-${c}`}
                  className={`matrix-cell${current && current.row === r ? ' matrix-cell--highlight' : ''}`}
                >
                  {val}
                </div>
              )),
            )}
          </div>
        </div>
        <div className="matrix-multiply__symbol">
          <InlineMath math="\times" />
        </div>
        <div className="matrix-multiply__operand">
          <div className="matrix-grid" style={gridStyleB}>
            {MATRIX_B.map((rowVals, r) =>
              rowVals.map((val, c) => (
                <div
                  key={`b-${r}-${c}`}
                  className={`matrix-cell${current && current.col === c ? ' matrix-cell--highlight' : ''}`}
                >
                  {val}
                </div>
              )),
            )}
          </div>
        </div>
        <div className="matrix-multiply__symbol">
          <InlineMath math="=" />
        </div>
        <div className="matrix-multiply__operand">
          <div className="matrix-grid" style={gridStyleB}>
            {Array.from({ length: ROWS_A }).map((_, r) =>
              Array.from({ length: COLS_B }).map((__, c) => {
                const cell = CELLS.find((candidate) => candidate.row === r && candidate.col === c);
                const cellIndex = cell ? CELLS.indexOf(cell) : -1;
                const isRevealed = cellIndex !== -1 && cellIndex < revealedCount;
                const isCurrent = current !== null && current.row === r && current.col === c;
                return (
                  <div
                    key={`r-${r}-${c}`}
                    className={`matrix-cell matrix-cell--result${isCurrent ? ' matrix-cell--current' : ''}`}
                  >
                    {isRevealed && cell ? cell.value : '?'}
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>

      {current && (
        <p className="matrix-multiply__working">
          Row {current.row + 1} of the left matrix, dotted with column {current.col + 1} of the right matrix:{' '}
          <InlineMath math={current.sumLine} />
        </p>
      )}

      <div className="matrix-multiply__controls">
        {!allRevealed && (
          <button type="button" className="btn btn--secondary" onClick={showNext}>
            Show next cell ({revealedCount}/{total})
          </button>
        )}
        {allRevealed && (
          <button type="button" className="btn btn--secondary" onClick={reset}>
            Start again
          </button>
        )}
      </div>
    </div>
  );
}
