import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';

function randomComponent(rng: () => number, min: number, max: number): number {
  // Avoid zero so every practice vector genuinely has two non-trivial components.
  let value = randomInt(rng, min, max);
  while (value === 0) value = randomInt(rng, min, max);
  return value;
}

export const vectorNotation: Lesson = {
  id: 'vector-notation',
  moduleId: 'vectors',
  title: 'Vector notation',
  estMinutes: 15,
  whyThisMatters: {
    scenario:
      "A force, a velocity, a displacement — none of these are fully described by a single number. A force of "
      + '"50 N" is meaningless to an engineer until you also know *which way* it is pushing. Quantities that '
      + 'need both a size and a direction are called **vectors**, and this lesson covers the different ways of '
      + 'writing them down, all of which you will see used interchangeably on drawings, spec sheets and in '
      + 'calculations throughout your course.',
  },
  prerequisites: [
    {
      skill: { id: 'reading-coordinates', label: 'Reading Cartesian coordinates' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'A point is plotted at $(4, -2)$. What is its $x$-coordinate?',
          answer: { type: 'numeric', value: 4 },
        },
        {
          id: 'q2',
          prompt: 'A point is plotted at $(4, -2)$. What is its $y$-coordinate?',
          answer: { type: 'numeric', value: -2 },
        },
      ],
      refresher: {
        summary:
          'On a Cartesian grid, a coordinate $(x, y)$ tells you how far to move: $x$ is how far right (positive) '
          + 'or left (negative) of the origin, and $y$ is how far up (positive) or down (negative). $(4, -2)$ '
          + 'means 4 across and 2 down.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A **scalar** is a quantity that only has a size — mass, temperature, speed, energy. A **vector** has '
        + 'both a size (called its **magnitude**) *and* a direction. Speed (e.g. "30 mph") is a scalar; velocity '
        + '(e.g. "30 mph due north") is the vector version of the same idea. It is exactly this distinction — '
        + 'size alone vs size-and-direction — that makes vectors worth a notation of their own.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Because a vector carries two pieces of information at once, we need a way to write both down together. '
        + 'There are two notations you will meet constantly, and they describe exactly the same thing.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'The **column vector** lists the horizontal (x) component on top and the vertical (y) component '
        + 'underneath:\n\n$$\\begin{pmatrix} x \\\\ y \\end{pmatrix}$$\n\nFor example, a displacement of 3 units '
        + 'right and 4 units up is written $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$.',
    },
    {
      id: 'e4',
      kind: 'notation',
      content:
        'The **i, j notation** uses $\\mathbf{i}$ to mean "one unit in the x-direction" and $\\mathbf{j}$ to mean '
        + '"one unit in the y-direction", then adds them together with coefficients. The same displacement as '
        + 'above is written $3\\mathbf{i} + 4\\mathbf{j}$ — 3 lots of $\\mathbf{i}$, plus 4 lots of '
        + '$\\mathbf{j}$.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'These two are just two spellings of the same vector: $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ and '
        + '$3\\mathbf{i} + 4\\mathbf{j}$ mean exactly the same thing, and you can freely convert between them — '
        + 'the number in front of $\\mathbf{i}$ is the top (x) entry of the column vector, and the number in '
        + 'front of $\\mathbf{j}$ is the bottom (y) entry.',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'A vector also needs a way to be *labelled*, separately from writing out its components. In print, a '
        + "vector's name is usually written in **bold**, like $\\mathbf{v}$. Since you can't easily write in "
        + 'bold by hand, the same vector is written **underlined**, $\\underline{v}$, or with an **arrow** on '
        + 'top, $\\vec{v}$. All three — $\\mathbf{v}$, $\\underline{v}$, $\\vec{v}$ — mean "the vector called '
        + 'v", and you will see all of them used across different textbooks and exam boards.',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        "One more thing worth knowing now: a vector's magnitude (its size, ignoring direction) is written with "
        + 'modulus bars, $|\\vec{v}|$ — read as "the magnitude of v", or informally just "the length of v". '
        + "You'll calculate this properly in a later lesson; for now, just recognise the notation when you see "
        + 'it.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Column vector to i, j form',
      scenario: 'Write $\\begin{pmatrix} 5 \\\\ -2 \\end{pmatrix}$ in i, j notation.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'The top entry is the x-component — it becomes the coefficient of $\\mathbf{i}$.',
          mathLine: '\\text{top entry } 5 \\rightarrow 5\\mathbf{i}',
        },
        {
          id: 's2',
          explanationWhy: 'The bottom entry is the y-component — it becomes the coefficient of $\\mathbf{j}$.',
          mathLine: '\\text{bottom entry } -2 \\rightarrow -2\\mathbf{j}',
        },
        {
          id: 's3',
          explanationWhy: 'Add the two parts together to write the full vector.',
          mathLine: '\\begin{pmatrix} 5 \\\\ -2 \\end{pmatrix} = 5\\mathbf{i} - 2\\mathbf{j}',
        },
      ],
      finalAnswer: '5\\mathbf{i} - 2\\mathbf{j}',
    },
    {
      id: 'w2',
      title: 'i, j form to a column vector',
      scenario: 'Write $-3\\mathbf{i} + 6\\mathbf{j}$ as a column vector.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'The coefficient of $\\mathbf{i}$ becomes the top entry.',
          mathLine: '-3\\mathbf{i} \\rightarrow \\text{top entry } -3',
        },
        {
          id: 's2',
          explanationWhy: 'The coefficient of $\\mathbf{j}$ becomes the bottom entry.',
          mathLine: '6\\mathbf{j} \\rightarrow \\text{bottom entry } 6',
        },
        {
          id: 's3',
          explanationWhy: 'Stack them to write the column vector.',
          mathLine: '-3\\mathbf{i} + 6\\mathbf{j} = \\begin{pmatrix} -3 \\\\ 6 \\end{pmatrix}',
        },
      ],
      finalAnswer: '\\begin{pmatrix} -3 \\\\ 6 \\end{pmatrix}',
    },
    {
      id: 'w3',
      title: 'Engineering flavour: a sensor reading',
      scenario:
        'A force sensor on a robot arm records a force of $\\begin{pmatrix} -4 \\\\ 3 \\end{pmatrix}$ N. Write '
        + 'this in i, j notation, and describe in plain English what it means.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Convert the column vector to i, j form exactly as before.',
          mathLine: '\\begin{pmatrix} -4 \\\\ 3 \\end{pmatrix} = -4\\mathbf{i} + 3\\mathbf{j} \\text{ N}',
        },
        {
          id: 's2',
          explanationWhy: 'A negative x-component means the force pushes left; a positive y-component means it pushes up.',
          mathLine: '\\text{4 N to the left, and 3 N upward}',
        },
      ],
      finalAnswer: '-4\\mathbf{i} + 3\\mathbf{j} \\text{ N}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'The top entry of a column vector and the coefficient of $\\mathbf{i}$ are the same number.' },
        { level: 2, content: 'The bottom entry of a column vector and the coefficient of $\\mathbf{j}$ are the same number.' },
        { level: 3, content: 'Top entry becomes the $\\mathbf{i}$ coefficient, bottom entry becomes the $\\mathbf{j}$ coefficient — then add them together.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = randomInt(rng, 1, 9);
        const y = randomInt(rng, 1, 9);
        return {
          prompt: `Write $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ in i, j notation.`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
          workingNotes: `The top entry $${x}$ becomes the $\\mathbf{i}$ coefficient and the bottom entry $${y}$ becomes the $\\mathbf{j}$ coefficient: $${x}\\mathbf{i} + ${y}\\mathbf{j}$.`,
          commonMistakes: [
            {
              matches: { type: 'vector', components: [y, x], tolerance: 0.01 },
              feedback: 'The components look swapped — the *top* entry of the column vector goes with $\\mathbf{i}$ (x-direction), and the *bottom* entry goes with $\\mathbf{j}$ (y-direction).',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'The coefficient of $\\mathbf{i}$ is the x-component — it goes on top.' },
        { level: 2, content: 'The coefficient of $\\mathbf{j}$ is the y-component — it goes on the bottom.' },
        { level: 3, content: 'Stack the $\\mathbf{i}$ coefficient above the $\\mathbf{j}$ coefficient to build the column vector.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = randomInt(rng, 1, 9);
        const y = randomInt(rng, 1, 9);
        return {
          prompt: `Write $${x}\\mathbf{i} + ${y}\\mathbf{j}$ as a column vector.`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
          workingNotes: `The $\\mathbf{i}$ coefficient $${x}$ becomes the top entry and the $\\mathbf{j}$ coefficient $${y}$ becomes the bottom entry: $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Negative components work exactly the same way — just carry the minus sign across.' },
        { level: 2, content: 'A negative x-component means "left" and a negative y-component means "down", but the conversion process is unchanged.' },
        { level: 3, content: 'Match each entry to its coefficient, keeping the sign of each number exactly as given.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = randomComponent(rng, -9, 9);
        const y = randomComponent(rng, -9, 9);
        const columnToIj = rng() < 0.5;
        return columnToIj
          ? {
              prompt: `Write $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ in i, j notation.`,
              answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
              workingNotes: `$\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix} = ${x}\\mathbf{i} + (${y})\\mathbf{j}$.`,
            }
          : {
              prompt: `Write $${x}\\mathbf{i} + (${y})\\mathbf{j}$ as a column vector.`,
              answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
              workingNotes: `$${x}\\mathbf{i} + (${y})\\mathbf{j} = \\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$.`,
            };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Read off the horizontal push/pull first — that gives you the x-component.' },
        { level: 2, content: 'Then read off the vertical push/pull — that gives you the y-component.' },
        { level: 3, content: 'Right and up are positive; left and down are negative. Write the vector as a column vector or in i, j form.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rightLeft = randomInt(rng, 2, 12);
        const upDown = randomInt(rng, 2, 12);
        const goesRight = rng() < 0.5;
        const goesUp = rng() < 0.5;
        const x = goesRight ? rightLeft : -rightLeft;
        const y = goesUp ? upDown : -upDown;
        return {
          prompt:
            `A cable pulls on a bracket with a horizontal force of $${rightLeft}$ N to the `
            + `${goesRight ? 'right' : 'left'}, and a vertical force of $${upDown}$ N `
            + `${goesUp ? 'upward' : 'downward'}. Write this force as a vector (column vector or i, j form).`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
          workingNotes: `Right/up are positive, left/down are negative, so the force vector is $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ N.`,
          commonMistakes: [
            {
              matches: { type: 'vector', components: [Math.abs(x), Math.abs(y)], tolerance: 0.01 },
              feedback: 'Check the signs — a force pointing left or downward should be written as a *negative* component, not a positive one.',
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'One of the components here is zero — that just means there is no push at all in that direction.' },
        { level: 2, content: 'A purely horizontal vector has a y-component of 0; a purely vertical vector has an x-component of 0.' },
        { level: 3, content: "Write the zero explicitly in the vector — don't leave it out." },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const horizontal = rng() < 0.5;
        const magnitude = randomComponent(rng, -15, 15);
        const x = horizontal ? magnitude : 0;
        const y = horizontal ? 0 : magnitude;
        const columnToIj = rng() < 0.5;
        const describeIj = `${x !== 0 ? `${x}\\mathbf{i}` : ''}${x !== 0 && y !== 0 ? ' + ' : ''}${y !== 0 ? `${y}\\mathbf{j}` : ''}`;
        return columnToIj
          ? {
              prompt: `Write $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$ in i, j notation.`,
              answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
              workingNotes: `A ${horizontal ? 'purely horizontal' : 'purely vertical'} vector: $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix} = ${describeIj}$.`,
            }
          : {
              prompt: `Write $${describeIj}$ as a column vector.`,
              answer: { type: 'vector', components: [x, y], tolerance: 0.01 },
              workingNotes: `The missing direction has a component of 0: $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$.`,
            };
      },
    },
  ],
  summary:
    'A vector has both magnitude (size) and direction, unlike a scalar which only has size. The same vector can '
    + 'be written as a column vector $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ or in i, j notation '
    + '$x\\mathbf{i} + y\\mathbf{j}$ — the top entry matches the $\\mathbf{i}$ coefficient and the bottom entry '
    + 'matches the $\\mathbf{j}$ coefficient. A vector\'s name is written bold in print ($\\mathbf{v}$) or '
    + 'underlined/arrowed by hand ($\\underline{v}$, $\\vec{v}$), and its magnitude is written $|\\vec{v}|$.',
  keyFormulas: [
    { id: 'column-vector', label: 'Column vector', formula: '\\begin{pmatrix} x \\\\ y \\end{pmatrix}' },
    { id: 'ij-notation', label: 'i, j notation', formula: 'x\\mathbf{i} + y\\mathbf{j}' },
    { id: 'vector-magnitude-notation', label: 'Magnitude notation', formula: '|\\vec{v}|' },
  ],
};
