import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';
import { matrixLatex, randomMatrix } from '../../../lib/matrixMath';

export const whatIsAMatrix: Lesson = {
  id: 'what-is-a-matrix',
  moduleId: 'matrices',
  title: 'What is a matrix?',
  estMinutes: 15,
  whyThisMatters: {
    scenario:
      'A matrix is a compact way to store lots of related numbers as a single object — the currents through '
      + 'several branches of a circuit, the coordinates of every joint in a structure, or the coefficients of a '
      + 'whole system of simultaneous equations. Engineers write these as matrices so they can be processed as '
      + 'one thing, by hand or by a computer, instead of juggling dozens of separate numbers.',
  },
  prerequisites: [
    {
      skill: { id: 'negative-numbers', label: 'Working with negative numbers' },
      checkQuestions: [
        { id: 'q1', prompt: 'What is $-3 + 5$?', answer: { type: 'numeric', value: 2 } },
        { id: 'q2', prompt: 'What is $4 - 7$?', answer: { type: 'numeric', value: -3 } },
        { id: 'q3', prompt: 'What is $-2 \\times -6$?', answer: { type: 'numeric', value: 12 } },
      ],
      refresher: {
        summary:
          'On a number line, adding moves right and subtracting moves left — so $-3 + 5$ starts at $-3$ and '
          + 'moves 5 steps right, landing on $2$. Two negatives multiplied together always give a positive: '
          + '$-2 \\times -6 = 12$. You will see plenty of negative numbers sitting inside matrices, so being '
          + 'comfortable with this matters.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A **matrix** is simply a rectangular grid of numbers, arranged in rows and columns. That is genuinely '
        + 'the whole idea — everything else in this module is just rules for reading, combining and processing '
        + 'that grid.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Engineers use matrices to keep a whole set of related numbers organised in one object instead of loose '
        + 'and separate. A few examples: the currents through several branches of a circuit measured at several '
        + 'time instants, the x and y coordinates of every joint in a structure, or the coefficients of a whole '
        + 'system of simultaneous equations, all in one place.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'A matrix is usually given a capital letter name, and written inside curved brackets. For example:\n\n'
        + '$$M = \\begin{pmatrix} 4 & -2 & 7 \\\\ 0 & 5 & -1 \\end{pmatrix}$$',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'The **dimensions** of a matrix tell you its shape: how many rows and how many columns it has. Rows are '
        + 'the horizontal lines of numbers; columns are the vertical lines. A matrix with 2 rows and 3 columns '
        + 'is called a "2 by 3" matrix, written $2 \\times 3$ — **rows are always stated first**, columns second. '
        + 'Get in the habit of this order now, because it stays fixed for the rest of the module.',
    },
    {
      id: 'e5',
      kind: 'notation',
      content:
        'An individual entry in a matrix is called an **element**, and is labelled with two small subscript '
        + 'numbers: $a_{ij}$ means the element in row $i$, column $j$ — again, row first, then column. So '
        + '$a_{23}$ means "row 2, column 3".',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'The single most common mix-up with matrices is swapping rows and columns. Everything — dimensions, '
        + 'element labels, and (in the next lessons) the rules for combining matrices — always reads **rows '
        + 'first, then columns**.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Reading the dimensions of a matrix',
      scenario:
        'An engineer records the current (in mA) through 3 branches of a circuit, measured at 2 different time '
        + 'instants, as a matrix: $$M = \\begin{pmatrix} 4 & -2 & 7 \\\\ 0 & 5 & -1 \\end{pmatrix}$$ How many rows '
        + 'and columns does $M$ have?',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Count the horizontal lines of numbers — each one is a row.',
          mathLine: 'M = \\begin{pmatrix} 4 & -2 & 7 \\\\ 0 & 5 & -1 \\end{pmatrix} \\implies 2 \\text{ rows}',
        },
        {
          id: 's2',
          explanationWhy: 'Count how many numbers sit in a single row — that is the number of columns.',
          mathLine: '\\text{each row has 3 numbers} \\implies 3 \\text{ columns}',
        },
        {
          id: 's3',
          explanationWhy: 'State the dimensions as rows $\\times$ columns, rows first.',
          mathLine: 'M \\text{ is a } 2 \\times 3 \\text{ matrix}',
        },
      ],
      finalAnswer: 'M \\text{ is a } 2 \\times 3 \\text{ matrix}',
    },
    {
      id: 'w2',
      title: 'Identifying an element',
      scenario: 'Using the same matrix $M$ from above, find $a_{23}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'The notation $a_{ij}$ means row $i$, column $j$ — row number always comes first.',
          mathLine: 'a_{23} \\implies \\text{row } 2, \\text{ column } 3',
        },
        {
          id: 's2',
          explanationWhy: 'Go to row 2, then along to column 3, and pick out that entry.',
          mathLine: 'M = \\begin{pmatrix} 4 & -2 & 7 \\\\ 0 & 5 & -1 \\end{pmatrix}',
        },
        {
          id: 's3',
          explanationWhy: 'Read off the value sitting in that position.',
          mathLine: 'a_{23} = -1',
        },
      ],
      finalAnswer: 'a_{23} = -1',
    },
    {
      id: 'w3',
      title: 'Engineering context: coordinates of a structure',
      scenario:
        'A matrix stores the coordinates (in metres) of the 4 joints of a rectangular truss: row 1 holds every '
        + "joint's x-coordinate, row 2 holds every joint's y-coordinate, and each column is one joint: "
        + '$$P = \\begin{pmatrix} 0 & 3 & 3 & 0 \\\\ 0 & 0 & 4 & 4 \\end{pmatrix}$$ Find the coordinates of joint 3.',
      steps: [
        {
          id: 's1',
          explanationWhy: "Joint 3 is column 3 — read down that column for its x and y values.",
          mathLine: 'a_{13} = 3, \\quad a_{23} = 4',
        },
        {
          id: 's2',
          explanationWhy: 'Combine the two values as a coordinate pair (x, y).',
          mathLine: '\\text{Joint 3} = (3, 4) \\text{ m}',
        },
      ],
      finalAnswer: '\\text{Joint 3} = (3, 4) \\text{ m}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Rows are the horizontal lines of numbers — count how many there are, reading top to bottom.' },
        { level: 2, content: 'Each row is one complete horizontal line across the matrix. Count the lines, not the numbers inside them.' },
        { level: 3, content: 'The number of rows is simply how many horizontal lines of numbers the matrix has, from top to bottom.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rows = randomInt(rng, 2, 4);
        const cols = randomInt(rng, 2, 4);
        const matrix = randomMatrix(rng, rows, cols, -9, 9);
        return {
          prompt: `Consider the matrix $$M = ${matrixLatex(matrix)}$$ How many **rows** does $M$ have?`,
          answer: { type: 'numeric', value: rows, tolerance: 0.001 },
          workingNotes: `$M$ has ${rows} horizontal lines of numbers, so it has ${rows} rows (and ${cols} columns).`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: cols },
              feedback: "That's the number of columns, not rows. Rows are the horizontal lines — count how many of those there are, reading top to bottom.",
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Columns are the vertical lines of numbers — count how many there are, reading left to right.' },
        { level: 2, content: 'Look at a single row: however many numbers sit across it, that is how many columns the matrix has.' },
        { level: 3, content: 'The number of columns equals how many entries there are in one row of the matrix.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rows = randomInt(rng, 2, 4);
        const cols = randomInt(rng, 2, 4);
        const matrix = randomMatrix(rng, rows, cols, -9, 9);
        return {
          prompt: `Consider the matrix $$M = ${matrixLatex(matrix)}$$ How many **columns** does $M$ have?`,
          answer: { type: 'numeric', value: cols, tolerance: 0.001 },
          workingNotes: `Every row of $M$ has ${cols} numbers across it, so it has ${cols} columns (and ${rows} rows).`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: rows },
              feedback: "That's the number of rows, not columns. Columns are the vertical lines — count how many entries sit across a single row.",
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Every entry counts once — think about how the rows and columns combine to give the total.' },
        { level: 2, content: 'The total number of elements is the number of rows multiplied by the number of columns.' },
        { level: 3, content: 'Multiply the row count by the column count to get the total number of elements.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rows = randomInt(rng, 2, 4);
        const cols = randomInt(rng, 2, 4);
        const matrix = randomMatrix(rng, rows, cols, -9, 9);
        const value = rows * cols;
        return {
          prompt: `Consider the matrix $$M = ${matrixLatex(matrix)}$$ How many elements does $M$ contain in total?`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `$M$ is $${rows} \\times ${cols}$, so it has $${rows} \\times ${cols} = ${value}$ elements.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: rows + cols },
              feedback: 'It looks like you added the rows and columns rather than multiplying them. The total number of elements is rows $\\times$ columns.',
            },
          ],
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: '$a_{ij}$ means row $i$, column $j$ — row number always comes first.' },
        { level: 2, content: 'Go to the row given first, then move along to the column given, and read off that one number.' },
        { level: 3, content: 'Count down to the correct row, then across to the correct column — the number sitting there is your answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rows = randomInt(rng, 2, 3);
        const cols = randomInt(rng, 2, 3);
        const matrix = randomMatrix(rng, rows, cols, 1, 9);
        const i = randomInt(rng, 1, rows);
        const j = randomInt(rng, 1, cols);
        const value = matrix[i - 1][j - 1];
        const swapValid = j <= rows && i <= cols;
        return {
          prompt: `Consider the matrix $$M = ${matrixLatex(matrix)}$$ Find $a_{${i}${j}}$ (row ${i}, column ${j}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Go to row ${i}, then along to column ${j}: $a_{${i}${j}} = ${value}$.`,
          commonMistakes: swapValid
            ? [
                {
                  matches: { type: 'numeric', value: matrix[j - 1][i - 1] },
                  feedback: 'It looks like you swapped the row and column — remember $a_{ij}$ means row $i$ first, then column $j$.',
                },
              ]
            : undefined,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Same idea as before, just with a bigger matrix and some negative numbers to watch out for.' },
        { level: 2, content: 'Find the correct row first, then move along to the correct column — negative signs belong to the number, so include them.' },
        { level: 3, content: 'Count down to the correct row, then across to the correct column, and read off the value including its sign.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const matrix = randomMatrix(rng, 3, 3, -9, 9);
        const i = randomInt(rng, 1, 3);
        const j = randomInt(rng, 1, 3);
        const value = matrix[i - 1][j - 1];
        return {
          prompt: `Consider the matrix $$M = ${matrixLatex(matrix)}$$ Find $a_{${i}${j}}$ (row ${i}, column ${j}).`,
          answer: { type: 'numeric', value, tolerance: 0.001 },
          workingNotes: `Go to row ${i}, then along to column ${j}: $a_{${i}${j}} = ${value}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: matrix[j - 1][i - 1] },
              feedback: 'It looks like you swapped the row and column — remember $a_{ij}$ means row $i$ first, then column $j$.',
            },
          ],
        };
      },
    },
  ],
  summary:
    'A matrix is a rectangular grid of numbers, read as rows $\\times$ columns (rows always first). Each element '
    + '$a_{ij}$ sits in row $i$, column $j$. Matrices are a compact way to store related numbers — circuit '
    + 'currents, structural coordinates, or the coefficients of a system of equations — in one object.',
  keyFormulas: [
    { id: 'matrix-dimensions', label: 'Matrix dimensions', formula: 'm \\times n \\implies m \\text{ rows}, \\ n \\text{ columns}' },
    { id: 'matrix-element', label: 'Element notation', formula: 'a_{ij} = \\text{entry in row } i, \\text{ column } j' },
  ],
};
