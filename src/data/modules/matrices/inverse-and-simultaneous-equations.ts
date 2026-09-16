import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';
import { det2, inverse2, matrixLatex, randomMatrix, type Matrix } from '../../../lib/matrixMath';

/** Builds a 2x2 integer matrix with determinant exactly 1 via elementary row shears (which never
 * change the determinant), so its inverse is guaranteed to have clean integer entries too. */
function randomUnimodular2(rng: () => number, steps = 2): Matrix {
  let m: Matrix = [[1, 0], [0, 1]];
  for (let s = 0; s < steps; s += 1) {
    const k = randomChoice(rng, [-3, -2, -1, 1, 2, 3] as const);
    if (rng() < 0.5) {
      m = [[...m[0]], [m[1][0] + k * m[0][0], m[1][1] + k * m[0][1]]];
    } else {
      m = [[m[0][0] + k * m[1][0], m[0][1] + k * m[1][1]], [...m[1]]];
    }
  }
  return m;
}

export const inverseAndSimultaneousEquations: Lesson = {
  id: 'inverse-and-simultaneous-equations',
  moduleId: 'matrices',
  title: 'The inverse matrix and solving simultaneous equations',
  estMinutes: 25,
  whyThisMatters: {
    scenario:
      'When Kirchhoff\'s laws give you two equations in two unknown currents, or equilibrium gives you two '
      + 'equations in two unknown member forces, the matrix inverse lets you solve for both unknowns in one '
      + 'clean calculation — $\\vec x = A^{-1}\\vec b$ — instead of juggling substitution by hand. It is also '
      + 'exactly the method a computer uses to solve much bigger structural or circuit systems.',
  },
  prerequisites: [
    {
      skill: { id: 'simultaneous-equations', label: 'Solving simultaneous equations by elimination' },
      checkQuestions: [
        { id: 'q1', prompt: 'Solve $x + y = 7$ and $x - y = 3$ for $x$.', answer: { type: 'numeric', value: 5 } },
        { id: 'q2', prompt: 'Solve $2x + y = 9$ and $x + y = 5$ for $y$.', answer: { type: 'numeric', value: 1 } },
        { id: 'q3', prompt: 'Solve $3x - y = 7$ and $x + y = 5$ for $x$.', answer: { type: 'numeric', value: 3 } },
      ],
      refresher: {
        summary:
          'To solve two simultaneous equations by elimination: add or subtract the equations (after multiplying '
          + 'one by a suitable number, if needed) so that one variable cancels out completely. Solve the single '
          + 'remaining equation, then substitute that value back into either original equation to find the other '
          + 'variable. For example, with $x+y=7$ and $x-y=3$: adding the two equations eliminates $y$, giving '
          + '$2x=10$, so $x=5$; then substituting back, $y = 7-5 = 2$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'You cannot divide by a matrix, but the **inverse** of a matrix does the same job that division does '
        + 'for ordinary numbers. Multiplying a matrix $A$ by its inverse $A^{-1}$ "undoes" it, leaving the '
        + '**identity matrix** $I$ (the matrix equivalent of the number 1): $A^{-1}A = I$ — exactly like '
        + '$\\frac{1}{a}\\times a = 1$ for an ordinary number $a$.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'For a $2\\times2$ matrix, finding the inverse follows a simple recipe: **swap** the two numbers on the '
        + 'leading diagonal (top-left and bottom-right), **change the sign** of the other two numbers (top-right '
        + 'and bottom-left), then **divide every entry** by the determinant.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'For $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$:\n\n'
        + '$$A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$',
    },
    {
      id: 'e4',
      kind: 'note',
      content:
        "This only works if $ad-bc \\neq 0$ — that's exactly the determinant from the last lesson. If the "
        + 'determinant is zero, dividing by it is impossible, so the inverse simply does not exist.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'This is useful because two simultaneous equations $ax+by=e$ and $cx+dy=f$ can be written as a single '
        + 'matrix equation: $$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} e \\\\ f \\end{pmatrix}$$ '
        + 'or, more compactly, $A\\vec x = \\vec b$.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content:
        'Multiplying both sides on the left by $A^{-1}$ undoes $A$, leaving $\\vec x$ on its own — because '
        + '$A^{-1}A = I$ does nothing to whatever it multiplies:\n\n'
        + '$$A^{-1}A\\vec x = A^{-1}\\vec b \\implies \\vec x = A^{-1}\\vec b$$',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        "This is exactly how you'd solve for two unknown currents from Kirchhoff's voltage law equations around "
        + 'two loops, or two unknown member forces from equilibrium equations at a pin joint: write the '
        + "coefficients as a matrix, find its inverse, multiply by the right-hand-side vector, and you're done "
        + 'in one calculation instead of juggling substitution.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Finding the inverse of a 2×2 matrix',
      scenario: 'Find the inverse of $D = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: "Find the determinant first — you'll divide by it at the end.",
          mathLine: '\\det(D) = (2)(3) - (1)(5) = 6 - 5 = 1',
        },
        {
          id: 's2',
          explanationWhy: 'Swap the leading diagonal (2 and 3 swap places) and change the sign of the other diagonal (1 and 5 become −1 and −5).',
          mathLine: '\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}',
        },
        {
          id: 's3',
          explanationWhy: 'Divide every entry by the determinant, 1 — dividing by 1 changes nothing here.',
          mathLine: 'D^{-1} = \\frac{1}{1}\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}',
        },
      ],
      finalAnswer: 'D^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}',
    },
    {
      id: 'w2',
      title: 'Engineering context: circuit currents from Kirchhoff\'s voltage law',
      scenario:
        "Kirchhoff's voltage law around two loops of a circuit gives: $3i_1 + i_2 = 13$ and $i_1 + 2i_2 = 6$ "
        + '(currents in amps). Write this as a matrix equation and solve for $i_1$ and $i_2$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Write the two equations as a matrix equation $A\\vec i = \\vec b$.',
          mathLine: '\\begin{pmatrix} 3 & 1 \\\\ 1 & 2 \\end{pmatrix}\\begin{pmatrix} i_1 \\\\ i_2 \\end{pmatrix} = \\begin{pmatrix} 13 \\\\ 6 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: 'Find $\\det(A)$ to check an inverse exists.',
          mathLine: '\\det(A) = (3)(2) - (1)(1) = 5',
        },
        {
          id: 's3',
          explanationWhy: 'Build $A^{-1}$: swap the leading diagonal, negate the other diagonal, divide by the determinant.',
          mathLine: 'A^{-1} = \\frac{1}{5}\\begin{pmatrix} 2 & -1 \\\\ -1 & 3 \\end{pmatrix}',
        },
        {
          id: 's4',
          explanationWhy: 'Multiply $A^{-1}$ by $\\vec b$ to get $\\vec i$.',
          mathLine: '\\vec i = \\frac{1}{5}\\begin{pmatrix} 2 & -1 \\\\ -1 & 3 \\end{pmatrix}\\begin{pmatrix} 13 \\\\ 6 \\end{pmatrix} = \\frac{1}{5}\\begin{pmatrix} (2)(13)+(-1)(6) \\\\ (-1)(13)+(3)(6) \\end{pmatrix} = \\frac{1}{5}\\begin{pmatrix} 20 \\\\ 5 \\end{pmatrix}',
        },
        {
          id: 's5',
          explanationWhy: 'Simplify.',
          mathLine: '\\vec i = \\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix} \\implies i_1 = 4\\text{ A}, \\ i_2 = 1\\text{ A}',
        },
      ],
      finalAnswer: 'i_1 = 4\\text{ A}, \\quad i_2 = 1\\text{ A}',
    },
    {
      id: 'w3',
      title: 'Engineering context: forces in a pin-jointed structure',
      scenario:
        'At a pin joint in a truss, horizontal and vertical force equilibrium give: $T_1 + 2T_2 = 11$ and '
        + '$2T_1 - T_2 = 7$ (tensions in kN). Write this as a matrix equation and solve for $T_1$ and $T_2$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Write the equilibrium equations as a matrix equation $C\\vec T = \\vec b$.',
          mathLine: '\\begin{pmatrix} 1 & 2 \\\\ 2 & -1 \\end{pmatrix}\\begin{pmatrix} T_1 \\\\ T_2 \\end{pmatrix} = \\begin{pmatrix} 11 \\\\ 7 \\end{pmatrix}',
        },
        {
          id: 's2',
          explanationWhy: 'Find $\\det(C)$.',
          mathLine: '\\det(C) = (1)(-1) - (2)(2) = -1 - 4 = -5',
        },
        {
          id: 's3',
          explanationWhy: 'Build $C^{-1}$: swap the diagonal, negate the other diagonal, divide by the determinant.',
          mathLine: 'C^{-1} = \\frac{1}{-5}\\begin{pmatrix} -1 & -2 \\\\ -2 & 1 \\end{pmatrix} = \\begin{pmatrix} \\frac{1}{5} & \\frac{2}{5} \\\\ \\frac{2}{5} & -\\frac{1}{5} \\end{pmatrix}',
        },
        {
          id: 's4',
          explanationWhy: 'Multiply $C^{-1}$ by $\\vec b$.',
          mathLine: '\\vec T = \\begin{pmatrix} \\frac{1}{5} & \\frac{2}{5} \\\\ \\frac{2}{5} & -\\frac{1}{5} \\end{pmatrix}\\begin{pmatrix} 11 \\\\ 7 \\end{pmatrix} = \\begin{pmatrix} \\frac{1}{5}(11)+\\frac{2}{5}(7) \\\\ \\frac{2}{5}(11)-\\frac{1}{5}(7) \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 3 \\end{pmatrix}',
        },
        {
          id: 's5',
          explanationWhy: 'Read off the tensions.',
          mathLine: 'T_1 = 5\\text{ kN}, \\quad T_2 = 3\\text{ kN}',
        },
      ],
      finalAnswer: 'T_1 = 5\\text{ kN}, \\quad T_2 = 3\\text{ kN}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Start by finding the determinant of A — you will need it to build the inverse.' },
        { level: 2, content: 'Swap the numbers on the leading diagonal, negate the numbers on the other diagonal, then divide every entry by the determinant.' },
        { level: 3, content: 'Build the whole inverse matrix using the swap/negate/divide rule, then read off the one entry the question asks for.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomUnimodular2(rng);
        const inv = inverse2(a) as Matrix;
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = inv[i - 1][j - 1];
        return {
          prompt: `Find element $(A^{-1})_{${i}${j}}$ (row ${i}, column ${j}) for $$A = ${matrixLatex(a)}$$`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det(A) = ${det2(a)}$. Swap the leading diagonal, negate the other diagonal, then divide by the determinant: $A^{-1} = ${matrixLatex(inv)}$, so $(A^{-1})_{${i}${j}} = ${value}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This is $A\\vec x = \\vec b$ — to undo A, multiply both sides by $A^{-1}$.' },
        { level: 2, content: 'Find $A^{-1}$ using the swap/negate/divide rule, then multiply it by the vector on the right-hand side.' },
        { level: 3, content: 'Compute $\\vec x = A^{-1}\\vec b$ fully, then read off the value the question asks for (x or y).' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomUnimodular2(rng);
        const xVec = [randomInt(rng, -5, 5), randomInt(rng, -5, 5)];
        const b = [a[0][0] * xVec[0] + a[0][1] * xVec[1], a[1][0] * xVec[0] + a[1][1] * xVec[1]];
        const askX = rng() < 0.5;
        const value = askX ? xVec[0] : xVec[1];
        return {
          prompt: `Solve $$${matrixLatex(a)}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ${b[0]} \\\\ ${b[1]} \\end{pmatrix}$$ for $${askX ? 'x' : 'y'}$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det(A)=${det2(a)}$, so $A^{-1} = ${matrixLatex(inverse2(a) as Matrix)}$. Then $\\vec x = A^{-1}\\vec b = \\begin{pmatrix} ${xVec[0]} \\\\ ${xVec[1]} \\end{pmatrix}$, so $x=${xVec[0]}$ and $y=${xVec[1]}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Start by finding the determinant of A — this one may not divide evenly, so expect a decimal.' },
        { level: 2, content: 'Swap the leading diagonal, negate the other diagonal, then divide every entry by the determinant.' },
        { level: 3, content: 'Build the whole inverse matrix, then read off the one entry the question asks for, rounding to 2 decimal places.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        let a: Matrix;
        do {
          a = randomMatrix(rng, 2, 2, -6, 6);
        } while (det2(a) === 0);
        const inv = inverse2(a) as Matrix;
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = inv[i - 1][j - 1];
        return {
          prompt: `Find element $(A^{-1})_{${i}${j}}$ (row ${i}, column ${j}), to 2 decimal places, for $$A = ${matrixLatex(a)}$$`,
          answer: { type: 'fraction-or-decimal', value, tolerance: 0.02 },
          workingNotes: `$\\det(A) = ${det2(a)}$. $A^{-1} = \\frac{1}{${det2(a)}}${matrixLatex([[a[1][1], -a[0][1]], [-a[1][0], a[0][0]]])}$, so $(A^{-1})_{${i}${j}} \\approx ${value.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'This is $A\\vec x = \\vec b$ — to undo A, multiply both sides by $A^{-1}$.' },
        { level: 2, content: 'Find $A^{-1}$ (it may involve decimals here), then multiply it by the vector on the right-hand side.' },
        { level: 3, content: 'Compute $\\vec x = A^{-1}\\vec b$ fully, then read off the value the question asks for, rounding to 2 decimal places.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        let a: Matrix;
        do {
          a = randomMatrix(rng, 2, 2, -5, 5);
        } while (det2(a) === 0);
        const b = [randomInt(rng, -10, 10), randomInt(rng, -10, 10)];
        const inv = inverse2(a) as Matrix;
        const xVec = [inv[0][0] * b[0] + inv[0][1] * b[1], inv[1][0] * b[0] + inv[1][1] * b[1]];
        const askX = rng() < 0.5;
        const value = askX ? xVec[0] : xVec[1];
        return {
          prompt: `Solve $$${matrixLatex(a)}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ${b[0]} \\\\ ${b[1]} \\end{pmatrix}$$ for $${askX ? 'x' : 'y'}$, to 2 decimal places.`,
          answer: { type: 'fraction-or-decimal', value, tolerance: 0.02 },
          workingNotes: `$\\det(A)=${det2(a)}$, so $A^{-1}$ exists. $\\vec x = A^{-1}\\vec b \\approx \\begin{pmatrix} ${xVec[0].toFixed(2)} \\\\ ${xVec[1].toFixed(2)} \\end{pmatrix}$, so $${askX ? 'x' : 'y'} \\approx ${value.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'First turn the word problem into a matrix equation $A\\vec x = \\vec b$ — identify the coefficients and the right-hand-side values.' },
        { level: 2, content: 'Once you have the matrix equation, find $A^{-1}$ using swap/negate/divide, then multiply by $\\vec b$.' },
        { level: 3, content: 'Solve fully for both unknowns using $\\vec x = A^{-1}\\vec b$, then pick out the one the question asks for.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomUnimodular2(rng, 3);
        const xVec = [randomInt(rng, -6, 6), randomInt(rng, -6, 6)];
        const b = [a[0][0] * xVec[0] + a[0][1] * xVec[1], a[1][0] * xVec[0] + a[1][1] * xVec[1]];
        const isCircuit = rng() < 0.5;
        const askFirst = rng() < 0.5;
        const value = askFirst ? xVec[0] : xVec[1];
        const varPair = isCircuit ? ['i_1', 'i_2'] : ['T_1', 'T_2'];
        const varName = askFirst ? varPair[0] : varPair[1];
        const unitLabel = isCircuit ? 'A' : 'kN';
        const contextLine = isCircuit
          ? "Kirchhoff's voltage law around two loops of a circuit gives the mesh currents $i_1, i_2$ (in amps) as:"
          : 'Equilibrium at a pin joint in a truss gives the member tensions $T_1, T_2$ (in kN) as:';
        return {
          prompt: `${contextLine}\n\n$$${matrixLatex(a)}\\begin{pmatrix} ${varPair[0]} \\\\ ${varPair[1]} \\end{pmatrix} = \\begin{pmatrix} ${b[0]} \\\\ ${b[1]} \\end{pmatrix}$$\n\nFind $${varName}$ (in ${unitLabel}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$\\det = ${det2(a)}$. Using $\\vec x = A^{-1}\\vec b$: $${varPair[0]} = ${xVec[0]}$ and $${varPair[1]} = ${xVec[1]}$, so $${varName} = ${value}\\ \\text{${unitLabel}}$.`,
        };
      },
    },
  ],
  summary:
    'The inverse of a 2×2 matrix swaps the leading diagonal, negates the other diagonal, and divides everything '
    + 'by the determinant — and only exists when the determinant is non-zero. Two simultaneous equations '
    + '$ax+by=e,\\ cx+dy=f$ can be written as $A\\vec x=\\vec b$, and solved in one step as $\\vec x = A^{-1}\\vec b$ '
    + '— the matrix method engineers use to solve circuit and structural equations systematically.',
  keyFormulas: [
    { id: 'inverse-2x2', label: 'Inverse of a 2×2 matrix', formula: 'A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}' },
    { id: 'matrix-equation', label: 'Simultaneous equations in matrix form', formula: 'A\\vec x = \\vec b' },
    { id: 'solve-by-inverse', label: 'Solving via the inverse', formula: '\\vec x = A^{-1}\\vec b' },
  ],
};
