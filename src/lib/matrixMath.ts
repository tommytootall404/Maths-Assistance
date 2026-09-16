import { randomInt } from './random';

/** Small matrix-arithmetic helpers shared across the Matrices module's lessons — kept in one
 * place so the arithmetic used to build worked examples and to generate/verify randomised
 * practice questions can't drift out of sync with each other. */
export type Matrix = number[][];

/** Renders a matrix as raw LaTeX `\begin{pmatrix}...\end{pmatrix}` — NOT wrapped in `$`
 * delimiters. Wrap the result in `$$...$$` when used inside a RichText field (prompt,
 * workingNotes, explanation content, scenario), or leave it bare inside a WorkedExample's
 * `mathLine`/`finalAnswer`, which render raw LaTeX directly. */
export function matrixLatex(matrix: Matrix): string {
  const rows = matrix.map((row) => row.map((v) => `${v}`).join(' & ')).join(' \\\\ ');
  return `\\begin{pmatrix} ${rows} \\end{pmatrix}`;
}

export function det2(m: Matrix): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

/** The matrix left after deleting one row and one column — used to build a 3x3 determinant's
 * minors. */
export function minor2(m: Matrix, row: number, col: number): Matrix {
  return m.filter((_, r) => r !== row).map((r) => r.filter((_, c) => c !== col));
}

/** 3x3 determinant via cofactor expansion along the top row. */
export function det3(m: Matrix): number {
  let total = 0;
  for (let c = 0; c < 3; c += 1) {
    const sign = c % 2 === 0 ? 1 : -1;
    total += sign * m[0][c] * det2(minor2(m, 0, c));
  }
  return total;
}

export function multiply(a: Matrix, b: Matrix): Matrix {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;
  const result: Matrix = [];
  for (let r = 0; r < rowsA; r += 1) {
    const row: number[] = [];
    for (let c = 0; c < colsB; c += 1) {
      let sum = 0;
      for (let k = 0; k < colsA; k += 1) sum += a[r][k] * b[k][c];
      row.push(sum);
    }
    result.push(row);
  }
  return result;
}

export function add(a: Matrix, b: Matrix): Matrix {
  return a.map((row, r) => row.map((v, c) => v + b[r][c]));
}

export function subtract(a: Matrix, b: Matrix): Matrix {
  return a.map((row, r) => row.map((v, c) => v - b[r][c]));
}

export function scalarMul(k: number, a: Matrix): Matrix {
  return a.map((row) => row.map((v) => k * v));
}

/** Inverse of a 2x2 matrix, or null if it has no inverse (determinant is zero). */
export function inverse2(m: Matrix): Matrix | null {
  const det = det2(m);
  if (det === 0) return null;
  const [[a, b], [c, d]] = m;
  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ];
}

export function randomMatrix(rng: () => number, rows: number, cols: number, min: number, max: number): Matrix {
  const result: Matrix = [];
  for (let r = 0; r < rows; r += 1) {
    const row: number[] = [];
    for (let c = 0; c < cols; c += 1) row.push(randomInt(rng, min, max));
    result.push(row);
  }
  return result;
}
