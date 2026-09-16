import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';
import { add, matrixLatex, randomMatrix, scalarMul, subtract } from '../../../lib/matrixMath';

export const additionAndScalarMultiplication: Lesson = {
  id: 'addition-and-scalar-multiplication',
  moduleId: 'matrices',
  title: 'Adding, subtracting and scaling matrices',
  estMinutes: 15,
  whyThisMatters: {
    scenario:
      'Real engineering problems often produce several matrices that need combining — two separate load cases '
      + 'on a structure added together, or every current in a circuit doubling when the supply voltage doubles. '
      + 'Matrix addition and scalar multiplication are how you combine and scale these compact number-grids '
      + 'without pulling them apart into individual numbers.',
  },
  prerequisites: [
    {
      skill: { id: 'matrix-elements', label: 'Reading elements of a matrix' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'For $N = \\begin{pmatrix} 3 & -2 \\\\ 5 & 0 \\end{pmatrix}$, find $a_{12}$.',
          answer: { type: 'numeric', value: -2 },
        },
        {
          id: 'q2',
          prompt: 'For the same matrix $N$, find $a_{21}$.',
          answer: { type: 'numeric', value: 5 },
        },
        {
          id: 'q3',
          prompt: 'How many columns does $N$ have?',
          answer: { type: 'numeric', value: 2 },
        },
      ],
      refresher: {
        summary:
          "A matrix's element $a_{ij}$ sits in row $i$, column $j$ — remember rows always come first. For "
          + '$N = \\begin{pmatrix} 3 & -2 \\\\ 5 & 0 \\end{pmatrix}$: $a_{12}$ is row 1, column 2, so $a_{12} = -2$; '
          + '$a_{21}$ is row 2, column 1, so $a_{21} = 5$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'To **add** or **subtract** two matrices, you add or subtract the entries that sit in matching '
        + 'positions — top-left with top-left, the entry in row 2 column 3 with the other matrix\'s row 2 '
        + 'column 3, and so on.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'This only works if both matrices are **exactly the same size** — same number of rows and the same '
        + 'number of columns. That is because every entry needs a "partner" in the matching position in the '
        + "other matrix; if the shapes don't match, some entries would have no partner to add to.",
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        '$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} + \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} '
        + '= \\begin{pmatrix} a+e & b+f \\\\ c+g & d+h \\end{pmatrix}$$',
    },
    {
      id: 'e4',
      kind: 'plain',
      content: 'Subtraction works exactly the same way — just subtract instead of add, position by position.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        '**Scalar multiplication** means multiplying a matrix by a single ordinary number (called a "scalar" '
        + 'because it just scales things up or down). Every single entry in the matrix gets multiplied by that '
        + 'one number.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content: '$$k\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} ka & kb \\\\ kc & kd \\end{pmatrix}$$',
    },
    {
      id: 'e7',
      kind: 'note',
      content:
        'A common slip is only multiplying one entry, or only the top row, by the scalar. Every single entry '
        + 'must be multiplied — there are no exceptions.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Adding two matrices',
      scenario:
        'A structure is tested under two separate load cases. $C$ records the forces (kN) at 2 points for load '
        + 'case 1, and $D$ records the forces for load case 2, both as (horizontal, vertical) pairs: '
        + '$$C = \\begin{pmatrix} 3 & -2 \\\\ 5 & 4 \\end{pmatrix} \\qquad D = \\begin{pmatrix} -1 & 6 \\\\ 2 & -3 \\end{pmatrix}$$ '
        + 'Find the combined total force, $C + D$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Add entries in matching positions — top-left with top-left, and so on.',
          mathLine: 'C + D = \\begin{pmatrix} 3 & -2 \\\\ 5 & 4 \\end{pmatrix} + \\begin{pmatrix} -1 & 6 \\\\ 2 & -3 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: 'Add each pair of matching entries.',
          mathLine: '= \\begin{pmatrix} 3+(-1) & -2+6 \\\\ 5+2 & 4+(-3) \\end{pmatrix}',
        },
        {
          id: 's3',
          explanationWhy: 'Simplify each entry.',
          mathLine: '= \\begin{pmatrix} 2 & 4 \\\\ 7 & 1 \\end{pmatrix}',
        },
      ],
      finalAnswer: 'C + D = \\begin{pmatrix} 2 & 4 \\\\ 7 & 1 \\end{pmatrix}',
    },
    {
      id: 'w2',
      title: 'Subtracting two matrices',
      scenario:
        'The same structure is also tested with $E$ recording the forces (kN) from a wind-load case: '
        + '$$C = \\begin{pmatrix} 8 & 1 \\\\ -3 & 5 \\end{pmatrix} \\qquad E = \\begin{pmatrix} 2 & -4 \\\\ 6 & 1 \\end{pmatrix}$$ '
        + 'Find $C - E$, the extra force the original load case applies compared with the wind-load case.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Subtract entries in matching positions — order matters, this is $C - E$, not $E - C$.',
          mathLine: 'C - E = \\begin{pmatrix} 8 & 1 \\\\ -3 & 5 \\end{pmatrix} - \\begin{pmatrix} 2 & -4 \\\\ 6 & 1 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: 'Subtract each pair of matching entries.',
          mathLine: '= \\begin{pmatrix} 8-2 & 1-(-4) \\\\ -3-6 & 5-1 \\end{pmatrix}',
        },
        {
          id: 's3',
          explanationWhy: 'Simplify each entry.',
          mathLine: '= \\begin{pmatrix} 6 & 5 \\\\ -9 & 4 \\end{pmatrix}',
        },
      ],
      finalAnswer: 'C - E = \\begin{pmatrix} 6 & 5 \\\\ -9 & 4 \\end{pmatrix}',
    },
    {
      id: 'w3',
      title: 'Engineering context: scalar multiplication',
      scenario:
        'The currents (in mA) through 3 branches of a circuit, measured at 2 time instants, are stored in '
        + 'matrix $I$. In a linear circuit, doubling the supply voltage doubles every current. Find $2I$: '
        + '$$I = \\begin{pmatrix} 2 & -1 & 3 \\\\ 0 & 4 & -2 \\end{pmatrix}$$',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Multiply every entry of the matrix by the scalar, 2.',
          mathLine: '2I = 2\\begin{pmatrix} 2 & -1 & 3 \\\\ 0 & 4 & -2 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: 'Multiply each entry individually — none are skipped.',
          mathLine: '= \\begin{pmatrix} 2(2) & 2(-1) & 2(3) \\\\ 2(0) & 2(4) & 2(-2) \\end{pmatrix}',
        },
        {
          id: 's3',
          explanationWhy: 'Simplify each entry.',
          mathLine: '= \\begin{pmatrix} 4 & -2 & 6 \\\\ 0 & 8 & -4 \\end{pmatrix}',
        },
      ],
      finalAnswer: '2I = \\begin{pmatrix} 4 & -2 & 6 \\\\ 0 & 8 & -4 \\end{pmatrix}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Add entries that are in the same position in each matrix — top-left with top-left, and so on.' },
        { level: 2, content: 'You only need one position for this question: find A\'s entry there, and B\'s entry there, then add them.' },
        { level: 3, content: 'Add the two numbers in that exact row-and-column position together — that is the entire method for matrix addition.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -9, 9);
        const b = randomMatrix(rng, 2, 2, -9, 9);
        const result = add(a, b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = result[i - 1][j - 1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find the element in row ${i}, column ${j} of $A + B$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Add the matching entries: row ${i}, column ${j} gives $${a[i - 1][j - 1]} + (${b[i - 1][j - 1]}) = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: a[i - 1][j - 1] * b[i - 1][j - 1] },
              feedback: 'It looks like you multiplied the two entries instead of adding them — matrix addition just adds matching positions.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Subtract entries that are in the same position in each matrix — top-left minus top-left, and so on.' },
        { level: 2, content: 'Order matters here: it is A minus B, not B minus A.' },
        { level: 3, content: 'Subtract B\'s entry in that position from A\'s entry in that same position — that is the entire method.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -9, 9);
        const b = randomMatrix(rng, 2, 2, -9, 9);
        const result = subtract(a, b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = result[i - 1][j - 1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find the element in row ${i}, column ${j} of $A - B$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Subtract the matching entries: row ${i}, column ${j} gives $${a[i - 1][j - 1]} - (${b[i - 1][j - 1]}) = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: b[i - 1][j - 1] - a[i - 1][j - 1] },
              feedback: 'This looks like B − A rather than A − B — the order matters, so subtract B from A.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'You only need to multiply the one entry you need by the scalar — the rest of the matrix does not matter for this question.' },
        { level: 2, content: 'Find A\'s entry in the given row and column, then multiply it by the scalar given.' },
        { level: 3, content: 'Multiply that single entry by the scalar exactly once — that is the entire calculation for scalar multiplication.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -8, 8);
        const k = randomChoice(rng, [-4, -3, -2, 2, 3, 4] as const);
        const result = scalarMul(k, a);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = result[i - 1][j - 1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)}$$ find the element in row ${i}, column ${j} of $${k}A$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Multiply every entry of $A$ by ${k}: row ${i}, column ${j} gives $${k} \\times ${a[i - 1][j - 1]} = ${value}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Same rule as with square matrices — add entries in matching positions.' },
        { level: 2, content: 'Find A\'s entry in the given row and column, and B\'s entry in that same position, then add them.' },
        { level: 3, content: 'Add the two matching entries together — the extra columns elsewhere in the matrix don\'t affect this one answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 3, -8, 8);
        const b = randomMatrix(rng, 2, 3, -8, 8);
        const result = add(a, b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 3);
        const value = result[i - 1][j - 1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find the element in row ${i}, column ${j} of $A + B$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Row ${i}, column ${j}: $${a[i - 1][j - 1]} + (${b[i - 1][j - 1]}) = ${value}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Do the scalar multiplication first (double every entry of A), then subtract B — order matters here.' },
        { level: 2, content: 'Find A\'s entry in the given position, double it, then subtract B\'s entry in that same position.' },
        { level: 3, content: 'Compute $2 \\times (\\text{A\'s entry}) - (\\text{B\'s entry})$ for that one position — that is the full method.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -8, 8);
        const b = randomMatrix(rng, 2, 2, -8, 8);
        const result = subtract(scalarMul(2, a), b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = result[i - 1][j - 1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find the element in row ${i}, column ${j} of $2A - B$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `First double the entry of $A$, then subtract the matching entry of $B$: row ${i}, column ${j} gives `
            + `$2(${a[i - 1][j - 1]}) - (${b[i - 1][j - 1]}) = ${2 * a[i - 1][j - 1]} - ${b[i - 1][j - 1]} = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: a[i - 1][j - 1] * 2 + b[i - 1][j - 1] },
              feedback: 'It looks like you added B instead of subtracting it — this question asks for $2A - B$.',
            },
            {
              matches: { type: 'numeric', value: a[i - 1][j - 1] - b[i - 1][j - 1] },
              feedback: 'It looks like you forgot to double A first — this question asks for $2A - B$, so double every entry of A before subtracting.',
            },
          ],
        };
      },
    },
  ],
  summary:
    'Matrices add or subtract entry by entry, and only when both matrices are exactly the same size — every '
    + 'entry needs a matching partner. Scalar multiplication multiplies **every** entry by the same number. '
    + 'Combinations like $2A - B$ just apply these rules one step at a time.',
  keyFormulas: [
    { id: 'matrix-add', label: 'Matrix addition/subtraction', formula: '(A \\pm B)_{ij} = a_{ij} \\pm b_{ij}' },
    { id: 'scalar-mult', label: 'Scalar multiplication', formula: '(kA)_{ij} = k \\cdot a_{ij}' },
  ],
};
