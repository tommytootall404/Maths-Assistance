import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';
import { det2, det3, matrixLatex, minor2, randomMatrix, type Matrix } from '../../../lib/matrixMath';

function det3Expansion(m: Matrix): string {
  const signs = [1, -1, 1];
  const terms = m[0].map((entry, c) => {
    const minorDet = det2(minor2(m, 0, c));
    const sign = signs[c] === 1 ? '+' : '-';
    return `${sign}(${entry})(${minorDet})`;
  });
  return `\\det(P) = ${terms.join('')} = ${det3(m)}`;
}

export const determinants: Lesson = {
  id: 'determinants',
  moduleId: 'matrices',
  title: 'Determinants',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      "Before you can invert a matrix or be sure a system of equations even has a sensible answer, you need to "
      + 'calculate its **determinant** — a single number that tells you whether the system is well-behaved. A '
      + "determinant of zero is an engineer's warning sign: a structure that can't be analysed for a unique "
      + "solution, or a circuit that's been set up in a way that doesn't pin down a single answer.",
  },
  prerequisites: [
    {
      skill: { id: 'multiply-subtract', label: 'Multiplying then subtracting' },
      checkQuestions: [
        { id: 'q1', prompt: 'Work out $4\\times 3 - 2\\times 5$.', answer: { type: 'numeric', value: 2 } },
        { id: 'q2', prompt: 'Work out $(-2)\\times 6 - 3\\times(-1)$.', answer: { type: 'numeric', value: -9 } },
        { id: 'q3', prompt: 'Work out $5\\times 5 - 0\\times 7$.', answer: { type: 'numeric', value: 25 } },
      ],
      refresher: {
        summary:
          'Multiplication happens before subtraction (BIDMAS): $4\\times3 - 2\\times5$ means '
          + '$(4\\times3) - (2\\times5) = 12 - 10 = 2$ — work out both products first, then subtract. Watch signs '
          + 'carefully: $(-2)\\times6 - 3\\times(-1) = -12 - (-3) = -12+3 = -9$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'The **determinant** is a single number calculated from a **square** matrix (same number of rows as '
        + 'columns) — only square matrices have one.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'For a $2\\times2$ matrix, the determinant is a "criss-cross multiply and subtract": multiply the two '
        + 'entries on the leading diagonal (top-left and bottom-right) together, multiply the two entries on the '
        + 'other diagonal (top-right and bottom-left) together, then subtract the second product from the first.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content: '$$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'What does the determinant actually tell you? If $\\det(A) = 0$, the matrix **cannot be inverted**, and '
        + 'the system of simultaneous equations it represents does not have one single unique solution (it '
        + 'might have none, or infinitely many). A non-zero determinant means the system behaves nicely and has '
        + 'exactly one solution.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'A $3\\times3$ determinant is trickier, but built from the same $2\\times2$ idea, using a method called '
        + '**cofactor expansion along the top row**. In plain English: take each number along the top row in '
        + 'turn. For each one, cross out its own row and its own column, which leaves a $2\\times2$ matrix '
        + 'behind — find that $2\\times2$ matrix\'s determinant (called a **minor**). Multiply the minor by the '
        + 'top-row number, alternating $+$ and $-$ signs as you move along the row (starting with $+$), then add '
        + 'the three results together.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content:
        '$$\\det\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix} '
        + '= a\\det\\begin{pmatrix} e & f \\\\ h & i \\end{pmatrix} - b\\det\\begin{pmatrix} d & f \\\\ g & i \\end{pmatrix} '
        + '+ c\\det\\begin{pmatrix} d & e \\\\ g & h \\end{pmatrix}$$',
    },
    {
      id: 'e7',
      kind: 'note',
      content:
        'Two common traps: forgetting to alternate the sign $(+,-,+)$ on the middle term, and crossing out the '
        + 'wrong row or column when forming a minor — always cross out the row and column of the number you are '
        + 'currently multiplying by.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'A 2×2 determinant',
      scenario:
        'Two simultaneous equations describing currents in a circuit have coefficient matrix '
        + '$$M = \\begin{pmatrix} 4 & 3 \\\\ 2 & 5 \\end{pmatrix}$$ Find $\\det(M)$ to check whether the system '
        + 'has a unique solution.',
      steps: [
        { id: 's1', explanationWhy: 'Multiply the leading diagonal (top-left × bottom-right).', mathLine: '4 \\times 5 = 20' },
        { id: 's2', explanationWhy: 'Multiply the other diagonal (top-right × bottom-left).', mathLine: '3 \\times 2 = 6' },
        { id: 's3', explanationWhy: 'Subtract the second product from the first.', mathLine: '\\det(M) = 20 - 6 = 14' },
      ],
      finalAnswer: '\\det(M) = 14 \\neq 0 \\implies \\text{unique solution exists}',
    },
    {
      id: 'w2',
      title: 'A 2×2 determinant that comes out zero',
      scenario:
        'A pair of equilibrium equations for a simple frame gives coefficient matrix '
        + '$$N = \\begin{pmatrix} 2 & 4 \\\\ 1 & 2 \\end{pmatrix}$$ Find $\\det(N)$ and explain what it tells you '
        + 'about the system.',
      steps: [
        { id: 's1', explanationWhy: 'Multiply the leading diagonal.', mathLine: '2 \\times 2 = 4' },
        { id: 's2', explanationWhy: 'Multiply the other diagonal.', mathLine: '4 \\times 1 = 4' },
        { id: 's3', explanationWhy: 'Subtract.', mathLine: '\\det(N) = 4 - 4 = 0' },
      ],
      finalAnswer: '\\det(N) = 0 \\implies \\text{no unique solution — the matrix cannot be inverted}',
    },
    {
      id: 'w3',
      title: 'A 3×3 determinant by cofactor expansion',
      scenario:
        'Three simultaneous equations describing the mesh currents of a 3-loop circuit have coefficient matrix '
        + '$$P = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$$ Find $\\det(P)$ to check '
        + 'the system is solvable.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Start with the first top-row entry, 1: cross out its row and column, leaving a 2×2 minor.',
          mathLine: 'a_{11} = 1 \\implies \\text{minor} = \\begin{pmatrix} 4 & 5 \\\\ 0 & 6 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: "Find that minor's determinant, then multiply by the top-row entry (sign +).",
          mathLine: '+1 \\times (4\\times6 - 5\\times0) = 1 \\times 24 = 24',
        },
        {
          id: 's3',
          explanationWhy: 'Second top-row entry, 2: cross out its row and column; this term is subtracted (sign −).',
          mathLine: 'a_{12}=2 \\implies \\text{minor}=\\begin{pmatrix} 0 & 5 \\\\ 1 & 6 \\end{pmatrix} \\implies -2\\times(0\\times6 - 5\\times1) = -2\\times(-5) = 10',
        },
        {
          id: 's4',
          explanationWhy: 'Third top-row entry, 3: cross out its row and column; the sign returns to +.',
          mathLine: 'a_{13}=3 \\implies \\text{minor}=\\begin{pmatrix} 0 & 4 \\\\ 1 & 0 \\end{pmatrix} \\implies +3\\times(0\\times0 - 4\\times1) = 3\\times(-4) = -12',
        },
        {
          id: 's5',
          explanationWhy: 'Add the three signed terms together.',
          mathLine: '\\det(P) = 24 + 10 - 12 = 22',
        },
      ],
      finalAnswer: '\\det(P) = 22',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Multiply the two numbers on the leading diagonal (top-left and bottom-right) together first.' },
        { level: 2, content: 'Now multiply the two numbers on the other diagonal (top-right and bottom-left) together.' },
        { level: 3, content: 'Subtract the second product from the first: $\\det = ad - bc$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const m = randomMatrix(rng, 2, 2, -5, 5);
        const value = det2(m);
        return {
          prompt: `Find $\\det(M)$ for $$M = ${matrixLatex(m)}$$`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det(M) = (${m[0][0]})(${m[1][1]}) - (${m[0][1]})(${m[1][0]}) = ${m[0][0] * m[1][1]} - ${m[0][1] * m[1][0]} = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: m[0][0] * m[1][1] + m[0][1] * m[1][0] },
              feedback: 'It looks like you added the two diagonal products instead of subtracting. Remember: multiply the leading diagonal, multiply the other diagonal, then SUBTRACT.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Multiply the two numbers on the leading diagonal (top-left and bottom-right) together first.' },
        { level: 2, content: 'Now multiply the two numbers on the other diagonal (top-right and bottom-left) — watch the signs carefully.' },
        { level: 3, content: 'Subtract the second product from the first: $\\det = ad - bc$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const m = randomMatrix(rng, 2, 2, -8, 8);
        const value = det2(m);
        return {
          prompt: `Find $\\det(M)$ for $$M = ${matrixLatex(m)}$$`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det(M) = (${m[0][0]})(${m[1][1]}) - (${m[0][1]})(${m[1][0]}) = ${m[0][0] * m[1][1]} - ${m[0][1] * m[1][0]} = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: m[0][0] * m[1][1] + m[0][1] * m[1][0] },
              feedback: 'It looks like you added the two diagonal products instead of subtracting. Remember: multiply the leading diagonal, multiply the other diagonal, then SUBTRACT.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Work out the determinant first, using the criss-cross multiply-and-subtract method.' },
        { level: 2, content: 'Once you have $\\det(M)$, check whether it is zero or not.' },
        { level: 3, content: 'A non-zero determinant means the matrix has an inverse; a determinant of exactly zero means it does not.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const singular = rng() < 0.5;
        let m: Matrix;
        if (singular) {
          const a = randomInt(rng, 1, 6);
          const b = randomInt(rng, 1, 6);
          const k = randomChoice(rng, [2, 3, -2, -3] as const);
          m = [[a, b], [k * a, k * b]];
        } else {
          do {
            m = randomMatrix(rng, 2, 2, -6, 6);
          } while (det2(m) === 0);
        }
        const value = det2(m);
        return {
          prompt: `Find $\\det(M)$ for $$M = ${matrixLatex(m)}$$ and state, in your working, whether $M$ has an inverse.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det(M) = ${value}$. ${value === 0 ? 'Because this is zero, M cannot be inverted.' : 'Because this is non-zero, M can be inverted.'}`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Expand along the top row: take each entry in turn, and cross out its row and column to find its minor.' },
        { level: 2, content: 'Find each minor\'s 2×2 determinant, multiply by the top-row entry, and remember to alternate the signs $+,-,+$.' },
        { level: 3, content: 'Add the three signed terms together: $a(\\text{minor}_1) - b(\\text{minor}_2) + c(\\text{minor}_3)$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const m = randomMatrix(rng, 3, 3, -3, 3);
        const value = det3(m);
        return {
          prompt: `Find $\\det(P)$ for $$P = ${matrixLatex(m)}$$ by expanding along the top row.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Expanding along the top row: $${det3Expansion(m)}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Expand along the top row: take each entry in turn, and cross out its row and column to find its minor.' },
        { level: 2, content: 'Find each minor\'s 2×2 determinant, multiply by the top-row entry, and remember to alternate the signs $+,-,+$.' },
        { level: 3, content: 'Add the three signed terms together: $a(\\text{minor}_1) - b(\\text{minor}_2) + c(\\text{minor}_3)$ — take your time with the arithmetic, the numbers are larger here.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const m = randomMatrix(rng, 3, 3, -5, 5);
        const value = det3(m);
        return {
          prompt: `Find $\\det(P)$ for $$P = ${matrixLatex(m)}$$ by expanding along the top row.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Expanding along the top row: $${det3Expansion(m)}$.`,
        };
      },
    },
  ],
  summary:
    '2×2 determinants: criss-cross multiply the diagonals and subtract — $\\det = ad-bc$. 3×3 determinants: '
    + 'expand along the top row, multiplying each entry by the determinant of the 2×2 minor left when you cross '
    + 'out its row and column, alternating $+,-,+$. A determinant of zero means the matrix has no inverse, and '
    + 'the system of equations it represents has no single unique solution.',
  keyFormulas: [
    { id: 'det-2x2', label: '2×2 determinant', formula: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc' },
    {
      id: 'det-3x3',
      label: '3×3 determinant (top-row expansion)',
      formula:
        '\\det\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix} '
        + '= a\\det\\begin{pmatrix} e & f \\\\ h & i \\end{pmatrix} - b\\det\\begin{pmatrix} d & f \\\\ g & i \\end{pmatrix} + c\\det\\begin{pmatrix} d & e \\\\ g & h \\end{pmatrix}',
    },
    { id: 'det-zero', label: 'Singular matrix', formula: '\\det(A) = 0 \\implies A^{-1} \\text{ does not exist}', notes: 'A zero determinant also means the associated system of equations has no single unique solution.' },
  ],
};
