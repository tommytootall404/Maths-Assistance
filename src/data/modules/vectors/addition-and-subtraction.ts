import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const SIGNS = [1, -1] as const;

function randomSigned(rng: () => number, min: number, max: number): number {
  return randomInt(rng, min, max) * randomChoice(rng, SIGNS);
}

export const additionAndSubtraction: Lesson = {
  id: 'addition-and-subtraction',
  moduleId: 'vectors',
  title: 'Adding and subtracting vectors',
  estMinutes: 18,
  whyThisMatters: {
    scenario:
      'Real objects rarely have just one force, one velocity or one displacement acting on them — a bridge '
      + 'has several loads on it at once, a plane flies through moving air, a robot arm makes several moves in '
      + 'sequence. To find the overall (or **resultant**) effect, you add or subtract the individual vectors. '
      + 'This is the single most useful vector skill for engineering — the next lesson builds directly on it.',
  },
  prerequisites: [],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Vectors are added and subtracted **component by component** — matching x with x, and y with y. There '
        + "is no need to worry about magnitude or direction directly; just deal with each direction's numbers "
        + 'separately.',
    },
    {
      id: 'e2',
      kind: 'notation',
      content:
        'If $\\vec{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\end{pmatrix}$ and $\\vec{b} = \\begin{pmatrix} b_1 \\\\ '
        + 'b_2 \\end{pmatrix}$, then:\n\n$$\\vec{a} + \\vec{b} = \\begin{pmatrix} a_1 + b_1 \\\\ a_2 + b_2 '
        + '\\end{pmatrix}$$',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'Subtraction works the same way, just subtracting instead of adding each pair of matching components. '
        + 'In fact $\\vec{a} - \\vec{b}$ is exactly the same as $\\vec{a} + (-\\vec{b})$ — subtracting a vector '
        + 'is the same as adding its reverse, a vector of the same length pointing the opposite way.',
    },
    {
      id: 'e4',
      kind: 'notation',
      content: '$$\\vec{a} - \\vec{b} = \\begin{pmatrix} a_1 - b_1 \\\\ a_2 - b_2 \\end{pmatrix}$$',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'In i, j notation it looks even more like ordinary algebra — you simply collect the $\\mathbf{i}$ terms '
        + 'together and the $\\mathbf{j}$ terms together. For example, $(3\\mathbf{i} + 5\\mathbf{j}) + '
        + '(2\\mathbf{i} - 7\\mathbf{j}) = 5\\mathbf{i} - 2\\mathbf{j}$.',
    },
    {
      id: 'e6',
      kind: 'plain',
      content:
        'There is also a useful geometric picture worth keeping in your head: the **nose-to-tail** method. '
        + 'Draw the first vector, then draw the second vector starting exactly where the first one\'s arrowhead '
        + '(its "nose") ends. The resultant — the sum of the two — is the single vector drawn straight from the '
        + 'very start of the first vector to the very end of the second. Adding vectors is like walking one '
        + 'path, then another, and asking where you ended up compared to where you started.',
    },
    {
      id: 'e7',
      kind: 'note',
      content:
        'The order does not matter for addition — $\\vec{a} + \\vec{b}$ gives exactly the same resultant as '
        + '$\\vec{b} + \\vec{a}$, just drawn nose-to-tail in a different order. It **does** matter for '
        + 'subtraction, though: $\\vec{a} - \\vec{b}$ and $\\vec{b} - \\vec{a}$ point in exactly opposite '
        + 'directions.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Adding two column vectors',
      scenario: 'Find $\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} + \\begin{pmatrix} -5 \\\\ 6 \\end{pmatrix}$.',
      steps: [
        { id: 's1', explanationWhy: 'Add the top (x) entries together.', mathLine: '3 + (-5) = -2' },
        { id: 's2', explanationWhy: 'Add the bottom (y) entries together.', mathLine: '-2 + 6 = 4' },
        { id: 's3', explanationWhy: 'Combine the two results into a column vector.', mathLine: '\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix} + \\begin{pmatrix} -5 \\\\ 6 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}' },
      ],
      finalAnswer: '\\begin{pmatrix} -2 \\\\ 4 \\end{pmatrix}',
    },
    {
      id: 'w2',
      title: 'Subtracting in i, j form',
      scenario: 'Find $(7\\mathbf{i} + 2\\mathbf{j}) - (4\\mathbf{i} - 5\\mathbf{j})$.',
      steps: [
        { id: 's1', explanationWhy: 'Subtract the $\\mathbf{i}$ coefficients.', mathLine: '7 - 4 = 3' },
        { id: 's2', explanationWhy: 'Subtract the $\\mathbf{j}$ coefficients — subtracting a negative flips the sign.', mathLine: '2 - (-5) = 7' },
        { id: 's3', explanationWhy: 'Combine both parts back together.', mathLine: '(7\\mathbf{i} + 2\\mathbf{j}) - (4\\mathbf{i} - 5\\mathbf{j}) = 3\\mathbf{i} + 7\\mathbf{j}' },
      ],
      finalAnswer: '3\\mathbf{i} + 7\\mathbf{j}',
    },
    {
      id: 'w3',
      title: 'Engineering flavour: two forces combined',
      scenario:
        'Two forces act on a bracket: $\\vec{F_1} = \\begin{pmatrix} 8 \\\\ 3 \\end{pmatrix}$ N and '
        + '$\\vec{F_2} = \\begin{pmatrix} -2 \\\\ 5 \\end{pmatrix}$ N. Find the single resultant force that has '
        + 'the same overall effect as both acting together.',
      steps: [
        { id: 's1', explanationWhy: 'The resultant of several forces is simply their vector sum — add component by component.', mathLine: '\\vec{F_R} = \\vec{F_1} + \\vec{F_2} = \\begin{pmatrix} 8 + (-2) \\\\ 3 + 5 \\end{pmatrix}' },
        { id: 's2', explanationWhy: 'Evaluate each component.', mathLine: '\\vec{F_R} = \\begin{pmatrix} 6 \\\\ 8 \\end{pmatrix} \\text{ N}' },
      ],
      finalAnswer: '\\vec{F_R} = \\begin{pmatrix} 6 \\\\ 8 \\end{pmatrix} \\text{ N}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Add the x-components together, and separately add the y-components together.' },
        { level: 2, content: 'For column vectors: add top entries together, then add bottom entries together.' },
        { level: 3, content: 'Combine the two resulting numbers into your answer vector.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomInt(rng, 1, 9);
        const a2 = randomInt(rng, 1, 9);
        const b1 = randomInt(rng, 1, 9);
        const b2 = randomInt(rng, 1, 9);
        return {
          prompt: `Find $\\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix} + \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$.`,
          answer: { type: 'vector', components: [a1 + b1, a2 + b2], tolerance: 0.01 },
          workingNotes: `Add matching components: $(${a1} + ${b1}, ${a2} + ${b2}) = (${a1 + b1}, ${a2 + b2})$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Subtract the x-components, and separately subtract the y-components.' },
        { level: 2, content: 'Collect the $\\mathbf{i}$ terms together and the $\\mathbf{j}$ terms together.' },
        { level: 3, content: 'Watch the signs carefully when subtracting.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomInt(rng, 2, 12);
        const a2 = randomInt(rng, 2, 12);
        const b1 = randomInt(rng, 1, 9);
        const b2 = randomInt(rng, 1, 9);
        return {
          prompt: `Find $(${a1}\\mathbf{i} + ${a2}\\mathbf{j}) - (${b1}\\mathbf{i} + ${b2}\\mathbf{j})$.`,
          answer: { type: 'vector', components: [a1 - b1, a2 - b2], tolerance: 0.01 },
          workingNotes: `Subtract matching coefficients: $(${a1} - ${b1})\\mathbf{i} + (${a2} - ${b2})\\mathbf{j} = ${a1 - b1}\\mathbf{i} + ${a2 - b2}\\mathbf{j}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Negative components work exactly the same way — just carry the sign through the addition.' },
        { level: 2, content: 'Add x-components together, and separately add y-components together, keeping track of signs.' },
        { level: 3, content: 'Double check each sign before combining the final vector.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 1, 10);
        const a2 = randomSigned(rng, 1, 10);
        const b1 = randomSigned(rng, 1, 10);
        const b2 = randomSigned(rng, 1, 10);
        return {
          prompt: `Find $\\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix} + \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$.`,
          answer: { type: 'vector', components: [a1 + b1, a2 + b2], tolerance: 0.01 },
          workingNotes: `$(${a1} + ${b1}, ${a2} + ${b2}) = (${a1 + b1}, ${a2 + b2})$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Three vectors add together the same way as two — just combine one pair at a time.' },
        { level: 2, content: 'Add all three x-components together, and separately all three y-components.' },
        { level: 3, content: "It doesn't matter what order you add them in — the total is the same either way." },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 1, 8);
        const a2 = randomSigned(rng, 1, 8);
        const b1 = randomSigned(rng, 1, 8);
        const b2 = randomSigned(rng, 1, 8);
        const c1 = randomSigned(rng, 1, 8);
        const c2 = randomSigned(rng, 1, 8);
        return {
          prompt: `Find $(${a1}\\mathbf{i} + ${a2}\\mathbf{j}) + (${b1}\\mathbf{i} + ${b2}\\mathbf{j}) + (${c1}\\mathbf{i} + ${c2}\\mathbf{j})$.`,
          answer: { type: 'vector', components: [a1 + b1 + c1, a2 + b2 + c2], tolerance: 0.01 },
          workingNotes: `Collect $\\mathbf{i}$ terms: $${a1} + ${b1} + ${c1} = ${a1 + b1 + c1}$. Collect $\\mathbf{j}$ terms: $${a2} + ${b2} + ${c2} = ${a2 + b2 + c2}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Two forces are being combined and a third subtracted — deal with the addition and subtraction one step at a time.' },
        { level: 2, content: 'Add the first two forces component-wise, then subtract the third force component-wise from that result.' },
        { level: 3, content: 'Careful with signs throughout — write out each component calculation separately before combining.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 2, 12);
        const a2 = randomSigned(rng, 2, 12);
        const b1 = randomSigned(rng, 2, 12);
        const b2 = randomSigned(rng, 2, 12);
        const c1 = randomSigned(rng, 2, 12);
        const c2 = randomSigned(rng, 2, 12);
        const resultX = a1 + b1 - c1;
        const resultY = a2 + b2 - c2;
        return {
          prompt:
            `Three forces act on a joint: $\\vec{F_1} = \\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix}$ N, `
            + `$\\vec{F_2} = \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$ N, and `
            + `$\\vec{F_3} = \\begin{pmatrix} ${c1} \\\\ ${c2} \\end{pmatrix}$ N. Find $\\vec{F_1} + \\vec{F_2} - \\vec{F_3}$.`,
          answer: { type: 'vector', components: [resultX, resultY], tolerance: 0.01 },
          workingNotes: `x: $${a1} + ${b1} - ${c1} = ${resultX}$. y: $${a2} + ${b2} - ${c2} = ${resultY}$.`,
        };
      },
    },
  ],
  summary:
    'Vectors are added and subtracted component by component — top with top, bottom with bottom (or '
    + '$\\mathbf{i}$ with $\\mathbf{i}$, $\\mathbf{j}$ with $\\mathbf{j}$). Geometrically, adding vectors is the '
    + '"nose-to-tail" method: draw one after the other, and the resultant runs from the very start to the very '
    + 'end. Subtracting a vector is the same as adding its reverse.',
  keyFormulas: [
    { id: 'vector-add', label: 'Vector addition', formula: '\\begin{pmatrix} a_1 \\\\ a_2 \\end{pmatrix} + \\begin{pmatrix} b_1 \\\\ b_2 \\end{pmatrix} = \\begin{pmatrix} a_1+b_1 \\\\ a_2+b_2 \\end{pmatrix}' },
    { id: 'vector-subtract', label: 'Vector subtraction', formula: '\\begin{pmatrix} a_1 \\\\ a_2 \\end{pmatrix} - \\begin{pmatrix} b_1 \\\\ b_2 \\end{pmatrix} = \\begin{pmatrix} a_1-b_1 \\\\ a_2-b_2 \\end{pmatrix}' },
  ],
};
