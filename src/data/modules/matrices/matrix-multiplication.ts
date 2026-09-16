import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';
import { matrixLatex, multiply, randomMatrix } from '../../../lib/matrixMath';

export const matrixMultiplication: Lesson = {
  id: 'matrix-multiplication',
  moduleId: 'matrices',
  title: 'Multiplying matrices',
  estMinutes: 25,
  whyThisMatters: {
    scenario:
      "Matrix multiplication is the single most useful operation in this module — it's how a system of "
      + 'equations gets built and solved, how coordinates get rotated and transformed, and how a '
      + "stiffness matrix combines with a set of loads to predict how a structure will deform. Learn this well "
      + 'and the rest of the module (and a lot of further engineering maths) falls into place.',
  },
  prerequisites: [
    {
      skill: { id: 'multiply-add-confidence', label: 'Multiplying then adding' },
      checkQuestions: [
        { id: 'q1', prompt: 'Work out $3\\times 4 + (-2)\\times 5$.', answer: { type: 'numeric', value: 2 } },
        { id: 'q2', prompt: 'Work out $(-1)\\times 6 + 2\\times 3$.', answer: { type: 'numeric', value: 0 } },
        {
          id: 'q3',
          prompt: 'For $N = \\begin{pmatrix} 2 & 5 \\\\ -3 & 1 \\end{pmatrix}$, find $a_{21}$.',
          answer: { type: 'numeric', value: -3 },
        },
      ],
      refresher: {
        summary:
          'Multiplication happens before addition (BIDMAS), so $3\\times4 + (-2)\\times5$ means '
          + '$(3\\times4) + ((-2)\\times5) = 12 + (-10) = 2$ — work out each product first, then add them all up. '
          + "This is exactly the skill matrix multiplication needs, over and over. Also remember $a_{ij}$ means "
          + 'row $i$, column $j$: for $N = \\begin{pmatrix} 2 & 5 \\\\ -3 & 1 \\end{pmatrix}$, $a_{21} = -3$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Multiplying two matrices does **not** work like addition — you cannot just multiply the entries sitting '
        + "in matching positions. Instead, every entry of the answer is built from a whole **row** of the first "
        + 'matrix and a whole **column** of the second matrix.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Here is the whole method in plain English: take a row from the first matrix and a column from the '
        + "second matrix. Pair them up one-to-one — first number in the row with first number in the column, "
        + 'second with second, and so on — multiply each pair, then add all those products together. For '
        + 'example, pairing the row $(2, 3, 0)$ with the column $(1, 4, 2)$ gives '
        + '$2\\times1 + 3\\times4 + 0\\times2 = 2+12+0 = 14$.',
    },
    {
      id: 'e3',
      kind: 'visual',
      content:
        'Try it yourself below — click through to build up the result matrix one entry at a time, watching '
        + 'which row of the left matrix and which column of the right matrix combine for each cell.',
      visual: { component: 'matrix-multiply' },
    },
    {
      id: 'e4',
      kind: 'notation',
      content:
        'For the sizes to work out, the number of **columns** in the first matrix must equal the number of '
        + '**rows** in the second matrix — this is called the inner dimensions matching. The result then has '
        + 'as many rows as the first matrix, and as many columns as the second:\n\n'
        + '$$A_{m \\times n} \\times B_{n \\times p} = C_{m \\times p}$$',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'Why must the inner dimensions match? Because every entry of the result pairs up one row with one '
        + 'column, number by number. If a row of $A$ had 3 numbers but a column of $B$ only had 2, some numbers '
        + 'would be left over with nothing to pair up with, and the calculation could not be completed.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content:
        'Written formally, the element in row $i$, column $j$ of the product $C = AB$ is: '
        + '$$c_{ij} = \\sum_k a_{ik}b_{kj}$$ In plain English: row $i$ of $A$, dotted with column $j$ of $B$.',
    },
    {
      id: 'e7',
      kind: 'note',
      content:
        'Two traps worth remembering: matrix multiplication is generally **not commutative** — $AB \\neq BA$ '
        + "in most cases, so the order you multiply in matters. And it is never just \"multiply matching "
        + 'positions" the way addition is — always row times column.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'A 2×2 by 2×2 multiplication',
      scenario:
        'Multiply $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & -1 \\end{pmatrix}$ by $B = \\begin{pmatrix} 4 & 0 \\\\ -2 & 5 \\end{pmatrix}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Check the dimensions first: $A$ is 2×2 and $B$ is 2×2 — the inner numbers match (2=2), so multiplication is possible, and the result will be 2×2.',
          mathLine: 'A_{2\\times2} \\times B_{2\\times2} = C_{2\\times2}',
        },
        {
          id: 's2',
          explanationWhy: 'Top-left entry: row 1 of $A$ with column 1 of $B$.',
          mathLine: 'c_{11} = (2)(4) + (1)(-2) = 8 - 2 = 6',
        },
        {
          id: 's3',
          explanationWhy: 'Top-right entry: row 1 of $A$ with column 2 of $B$.',
          mathLine: 'c_{12} = (2)(0) + (1)(5) = 0 + 5 = 5',
        },
        {
          id: 's4',
          explanationWhy: 'Bottom-left entry: row 2 of $A$ with column 1 of $B$.',
          mathLine: 'c_{21} = (3)(4) + (-1)(-2) = 12 + 2 = 14',
        },
        {
          id: 's5',
          explanationWhy: 'Bottom-right entry: row 2 of $A$ with column 2 of $B$.',
          mathLine: 'c_{22} = (3)(0) + (-1)(5) = 0 - 5 = -5',
        },
      ],
      finalAnswer: 'AB = \\begin{pmatrix} 6 & 5 \\\\ 14 & -5 \\end{pmatrix}',
    },
    {
      id: 'w2',
      title: 'A non-square multiplication (2×3 by 3×2)',
      scenario:
        'Multiply $A = \\begin{pmatrix} 2 & 3 & 0 \\\\ 1 & -1 & 4 \\end{pmatrix}$ by $B = \\begin{pmatrix} 1 & 4 \\\\ 4 & 0 \\\\ 2 & 3 \\end{pmatrix}$ '
        + '(this is the same pair of matrices used in the interactive visual above).',
      steps: [
        {
          id: 's1',
          explanationWhy: '$A$ is 2×3 and $B$ is 3×2 — the inner numbers match (3=3), so the product exists and will be 2×2.',
          mathLine: 'A_{2\\times3} \\times B_{3\\times2} = C_{2\\times2}',
        },
        {
          id: 's2',
          explanationWhy: 'Top-left: row 1 of $A$ with column 1 of $B$.',
          mathLine: 'c_{11} = (2)(1) + (3)(4) + (0)(2) = 2 + 12 + 0 = 14',
        },
        {
          id: 's3',
          explanationWhy: 'Top-right: row 1 of $A$ with column 2 of $B$.',
          mathLine: 'c_{12} = (2)(4) + (3)(0) + (0)(3) = 8 + 0 + 0 = 8',
        },
        {
          id: 's4',
          explanationWhy: 'Bottom-left: row 2 of $A$ with column 1 of $B$.',
          mathLine: 'c_{21} = (1)(1) + (-1)(4) + (4)(2) = 1 - 4 + 8 = 5',
        },
        {
          id: 's5',
          explanationWhy: 'Bottom-right: row 2 of $A$ with column 2 of $B$.',
          mathLine: 'c_{22} = (1)(4) + (-1)(0) + (4)(3) = 4 - 0 + 12 = 16',
        },
      ],
      finalAnswer: 'AB = \\begin{pmatrix} 14 & 8 \\\\ 5 & 16 \\end{pmatrix}',
    },
    {
      id: 'w3',
      title: 'Engineering context: costing a bill of materials',
      scenario:
        'A workshop makes two products. Each unit of product 1 needs 3 bolts, 2 brackets and 1 hinge; each unit '
        + 'of product 2 needs 1 bolt, 4 brackets and 2 hinges. Bolts cost £5, brackets £2 and hinges £10 each. '
        + 'Use matrix multiplication to find the total parts cost of one unit of each product: '
        + '$$Q = \\begin{pmatrix} 3 & 2 & 1 \\\\ 1 & 4 & 2 \\end{pmatrix} \\qquad c = \\begin{pmatrix} 5 \\\\ 2 \\\\ 10 \\end{pmatrix}$$',
      steps: [
        {
          id: 's1',
          explanationWhy: '$Q$ is 2×3 (products × parts) and $c$ is 3×1 (parts × cost) — inner numbers match (3=3), so $Qc$ exists and gives a 2×1 result (cost per product).',
          mathLine: 'Q_{2\\times3} \\times c_{3\\times1} = (Qc)_{2\\times1}',
        },
        {
          id: 's2',
          explanationWhy: "Product 1's cost: row 1 of $Q$ with the single column of $c$.",
          mathLine: '(Qc)_{11} = (3)(5) + (2)(2) + (1)(10) = 15 + 4 + 10 = 29',
        },
        {
          id: 's3',
          explanationWhy: "Product 2's cost: row 2 of $Q$ with the single column of $c$.",
          mathLine: '(Qc)_{21} = (1)(5) + (4)(2) + (2)(10) = 5 + 8 + 20 = 33',
        },
      ],
      finalAnswer: 'Qc = \\begin{pmatrix} 29 \\\\ 33 \\end{pmatrix} \\implies \\text{£29 for product 1, £33 for product 2}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Take row 1 of A and column 1 of B — pair up the numbers one-to-one.' },
        { level: 2, content: 'Multiply each paired-up pair of numbers, then add the two products together.' },
        { level: 3, content: '$c_{11} = (\\text{row 1 of A, first number}) \\times (\\text{column 1 of B, first number}) + (\\text{row 1 of A, second number}) \\times (\\text{column 1 of B, second number})$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -5, 5);
        const b = randomMatrix(rng, 2, 2, -5, 5);
        const product = multiply(a, b);
        const value = product[0][0];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find element $c_{11}$ (row 1, column 1) of $C = AB$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$c_{11}$ = row 1 of $A$ dotted with column 1 of $B$: $(${a[0][0]})(${b[0][0]}) + (${a[0][1]})(${b[1][0]}) = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: a[0][0] * b[0][0] + a[0][1] * b[0][1] },
              feedback: 'It looks like you multiplied row 1 of A by ROW 1 of B, rather than by column 1 of B. The second matrix needs to be read down its column, not across its row.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Take row 1 of A and column 2 of B this time — pair up the numbers one-to-one.' },
        { level: 2, content: 'Multiply each paired-up pair of numbers, then add the two products together.' },
        { level: 3, content: '$c_{12} = (\\text{row 1 of A, first number}) \\times (\\text{column 2 of B, first number}) + (\\text{row 1 of A, second number}) \\times (\\text{column 2 of B, second number})$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -5, 5);
        const b = randomMatrix(rng, 2, 2, -5, 5);
        const product = multiply(a, b);
        const value = product[0][1];
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find element $c_{12}$ (row 1, column 2) of $C = AB$.`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$c_{12}$ = row 1 of $A$ dotted with column 2 of $B$: $(${a[0][0]})(${b[0][1]}) + (${a[0][1]})(${b[1][1]}) = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: product[0][0] },
              feedback: 'That is $c_{11}$, using column 1 of B — this question asks for $c_{12}$, which needs column 2 of B instead.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Work out which row of A and which column of B the requested element needs.' },
        { level: 2, content: 'Pair up that row with that column one-to-one, multiply each pair, then add the products.' },
        { level: 3, content: '$c_{ij}$ is always row $i$ of A dotted with column $j$ of B — write out both, multiply matching terms, and sum.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 2, -9, 9);
        const b = randomMatrix(rng, 2, 2, -9, 9);
        const product = multiply(a, b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = product[i - 1][j - 1];
        const dotTerms = `(${a[i - 1][0]})(${b[0][j - 1]}) + (${a[i - 1][1]})(${b[1][j - 1]})`;
        return {
          prompt: `Given $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ find element $c_{${i}${j}}$ of $C = AB$ (row ${i}, column ${j}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$c_{${i}${j}}$ = row ${i} of $A$ dotted with column ${j} of $B$: $${dotTerms} = ${value}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'A is 2×3 and B is 3×2 — each dot product now has 3 pairs of numbers, not 2.' },
        { level: 2, content: 'Take the requested row of A (3 numbers) and the requested column of B (3 numbers), and pair them up one-to-one.' },
        { level: 3, content: 'Multiply each of the 3 pairs together, then add all 3 products to get the element.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 2, 3, -6, 6);
        const b = randomMatrix(rng, 3, 2, -6, 6);
        const product = multiply(a, b);
        const i = randomInt(rng, 1, 2);
        const j = randomInt(rng, 1, 2);
        const value = product[i - 1][j - 1];
        const dotTerms = `(${a[i - 1][0]})(${b[0][j - 1]}) + (${a[i - 1][1]})(${b[1][j - 1]}) + (${a[i - 1][2]})(${b[2][j - 1]})`;
        return {
          prompt: `$A$ is 2×3 and $B$ is 3×2: $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ Find element $c_{${i}${j}}$ of $C = AB$ (row ${i}, column ${j}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$c_{${i}${j}}$ = row ${i} of $A$ dotted with column ${j} of $B$: $${dotTerms} = ${value}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'A is 3×2 and B is 2×3, so the result C is 3×3 — take extra care tracking which row and column you need.' },
        { level: 2, content: 'Each dot product only has 2 pairs of numbers here — find the requested row of A and column of B, and pair them up.' },
        { level: 3, content: 'Multiply the 2 paired-up terms and add them — the size of the result matrix does not change the method, only how many entries there are to keep track of.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomMatrix(rng, 3, 2, -6, 6);
        const b = randomMatrix(rng, 2, 3, -6, 6);
        const product = multiply(a, b);
        const i = randomInt(rng, 1, 3);
        const j = randomInt(rng, 1, 3);
        const value = product[i - 1][j - 1];
        const dotTerms = `(${a[i - 1][0]})(${b[0][j - 1]}) + (${a[i - 1][1]})(${b[1][j - 1]})`;
        return {
          prompt: `$A$ is 3×2 and $B$ is 2×3, so $C = AB$ is 3×3: $$A = ${matrixLatex(a)} \\qquad B = ${matrixLatex(b)}$$ Find element $c_{${i}${j}}$ of $C$ (row ${i}, column ${j}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$c_{${i}${j}}$ = row ${i} of $A$ dotted with column ${j} of $B$: $${dotTerms} = ${value}$.`,
        };
      },
    },
  ],
  summary:
    'To multiply matrices, take each row of the first matrix and each column of the second, multiply matching '
    + 'entries together, and add: $c_{ij}$ = row $i$ of $A$ dotted with column $j$ of $B$. Multiplication is '
    + 'only possible when the number of columns in $A$ equals the number of rows in $B$; the result has as many '
    + 'rows as $A$ and as many columns as $B$.',
  keyFormulas: [
    { id: 'matmul-compat', label: 'Compatibility & result size', formula: 'A_{m\\times n} \\times B_{n\\times p} = C_{m\\times p}' },
    { id: 'matmul-element', label: 'Element formula', formula: 'c_{ij} = \\sum_k a_{ik}b_{kj}' },
  ],
};
