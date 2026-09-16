import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const SIGNS = [1, -1] as const;

function randomSigned(rng: () => number, min: number, max: number): number {
  return randomInt(rng, min, max) * randomChoice(rng, SIGNS);
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export const scalarAndVectorProduct: Lesson = {
  id: 'scalar-and-vector-product',
  moduleId: 'vectors',
  title: 'Scalar and vector products (extension)',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'This lesson is an **extension topic** — it goes beyond the core T Level content, but it shows up in '
      + 'some further engineering contexts, such as calculating the work done by a force, checking whether two '
      + 'structural members are truly perpendicular, or finding the turning effect (moment) of a force. It '
      + 'builds directly on everything in this module so far.',
  },
  prerequisites: [
    {
      skill: { id: 'vector-magnitude-recap', label: 'Vector magnitude and components' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Find the magnitude of $\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$.',
          answer: { type: 'numeric', value: 5 },
        },
        {
          id: 'q2',
          prompt: 'Find $\\cos(60°)$, to 2 decimal places.',
          answer: { type: 'numeric', value: Math.cos(toRad(60)), tolerance: 0.01 },
        },
      ],
      refresher: {
        summary:
          'Recall that a vector\'s magnitude is $|\\vec{v}| = \\sqrt{x^2+y^2}$ (Pythagoras), and that your '
          + 'calculator gives trig ratios like $\\cos(60°) = 0.5$ directly — both are used constantly in this '
          + 'lesson.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'note',
      content:
        '**Extension content**: multiplying two vectors together is not covered in the core T Level '
        + 'specification. Treat this lesson as a bonus if you have spare time, or come back to it if a later '
        + 'topic (such as work done, or moments) references it directly.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'The **scalar product** (also called the **dot product**) takes two vectors and combines them into a '
        + 'single number — a scalar, hence the name. You calculate it by multiplying matching components '
        + 'together and adding the results.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        '$$\\vec{a} \\cdot \\vec{b} = a_xb_x + a_yb_y = |\\vec{a}||\\vec{b}|\\cos(\\theta)$$\n\nwhere $\\theta$ '
        + 'is the angle between the two vectors.',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'One direct engineering use is **work done**: when a force moves an object through a displacement, '
        + 'only the part of the force acting *along* the direction of movement actually does work — a force '
        + 'pushing sideways to the motion does nothing useful. The scalar product captures this automatically: '
        + '$W = \\vec{F} \\cdot \\vec{d} = |\\vec{F}||\\vec{d}|\\cos(\\theta)$, where $\\theta$ is the angle '
        + 'between the force and the displacement.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'The other very useful fact follows straight from the formula: since $\\cos(90°) = 0$, the scalar '
        + 'product of two **perpendicular** vectors is always exactly $0$. This gives a quick test — if '
        + '$\\vec{a} \\cdot \\vec{b} = 0$, the two vectors are at right angles to each other, useful for '
        + 'checking that structural members genuinely meet at 90°.',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'There is also a **vector product** (or **cross product**), briefly: instead of combining two vectors '
        + 'into a scalar, it combines them into a new vector, used in engineering to calculate the turning '
        + 'effect of a force — a **moment** or **torque**. In two dimensions, we usually only need its size, '
        + 'given by $|\\vec{a} \\times \\vec{b}| = a_xb_y - a_yb_x = |\\vec{a}||\\vec{b}|\\sin(\\theta)$. For a '
        + 'force $\\vec{F}$ applied at a position $\\vec{r}$ from a pivot, this gives the moment of the force '
        + 'about that pivot. The sign tells you the rotational sense (clockwise or anticlockwise); the size '
        + 'tells you how strong the turning effect is. This is as far as this course needs to go with it.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Scalar product from components',
      scenario: 'Find $\\vec{a} \\cdot \\vec{b}$ where $\\vec{a} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ and $\\vec{b} = \\begin{pmatrix} 2 \\\\ -1 \\end{pmatrix}$.',
      steps: [
        { id: 's1', explanationWhy: 'Multiply matching components together.', mathLine: '(3 \\times 2) + (4 \\times -1)' },
        { id: 's2', explanationWhy: 'Add the two results.', mathLine: '= 6 - 4 = 2' },
      ],
      finalAnswer: '\\vec{a} \\cdot \\vec{b} = 2',
    },
    {
      id: 'w2',
      title: 'Work done by a force',
      scenario: 'A force of $40$ N acts at $60°$ to the direction a crate is dragged along the floor, moving it $5$ m. Find the work done.',
      steps: [
        { id: 's1', explanationWhy: 'Use the magnitude form of the scalar product for work done.', mathLine: 'W = |\\vec{F}||\\vec{d}|\\cos(\\theta)' },
        { id: 's2', explanationWhy: 'Substitute the force, displacement, and angle between them.', mathLine: 'W = 40 \\times 5 \\times \\cos(60°)' },
        { id: 's3', explanationWhy: '$\\cos(60°) = 0.5$.', mathLine: 'W = 200 \\times 0.5 = 100\\text{ J}' },
      ],
      finalAnswer: 'W = 100\\text{ J}',
    },
    {
      id: 'w3',
      title: 'Extension: moment of a force',
      scenario: 'A force $\\vec{F} = \\begin{pmatrix} 0 \\\\ 5 \\end{pmatrix}$ N is applied at a position $\\vec{r} = \\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}$ m from a pivot. Find the moment of the force about the pivot.',
      steps: [
        { id: 's1', explanationWhy: 'Use the 2D scalar form of the vector product.', mathLine: 'M = r_xF_y - r_yF_x' },
        { id: 's2', explanationWhy: 'Substitute the components.', mathLine: 'M = (3 \\times 5) - (0 \\times 0) = 15\\text{ N}\\cdot\\text{m}' },
      ],
      finalAnswer: 'M = 15\\text{ N}\\cdot\\text{m}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Multiply the two x-components together, and separately multiply the two y-components together.' },
        { level: 2, content: 'The formula is $\\vec{a} \\cdot \\vec{b} = a_xb_x + a_yb_y$.' },
        { level: 3, content: 'Add the two products together — the result is a single number, not a vector.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 1, 10);
        const a2 = randomSigned(rng, 1, 10);
        const b1 = randomSigned(rng, 1, 10);
        const b2 = randomSigned(rng, 1, 10);
        const answerValue = a1 * b1 + a2 * b2;
        return {
          prompt: `Find $\\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix} \\cdot \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `$(${a1} \\times ${b1}) + (${a2} \\times ${b2}) = ${a1 * b1} + ${a2 * b2} = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Calculate the scalar product exactly as usual, multiplying and adding matching components.' },
        { level: 2, content: 'If the result comes out as 0, remember what that tells you about the angle between the vectors.' },
        { level: 3, content: 'A scalar product of 0 means the vectors are perpendicular (at 90°) to each other, since $\\cos(90°) = 0$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const perpendicular = rng() < 0.5;
        const a1 = randomSigned(rng, 1, 9);
        const a2 = randomSigned(rng, 1, 9);
        let b1: number;
        let b2: number;
        if (perpendicular) {
          const scale = randomInt(rng, 1, 3);
          b1 = -a2 * scale;
          b2 = a1 * scale;
        } else {
          b1 = randomSigned(rng, 1, 9);
          b2 = randomSigned(rng, 1, 9);
        }
        const answerValue = a1 * b1 + a2 * b2;
        return {
          prompt: `Find $\\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix} \\cdot \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$. What does your answer tell you about the two vectors?`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: answerValue === 0
            ? `$(${a1} \\times ${b1}) + (${a2} \\times ${b2}) = ${answerValue}$ — since the scalar product is 0, the two vectors are perpendicular.`
            : `$(${a1} \\times ${b1}) + (${a2} \\times ${b2}) = ${answerValue}$ — since this is not 0, the two vectors are not perpendicular.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Work done uses the magnitude form of the scalar product, not the component form.' },
        { level: 2, content: '$W = |\\vec{F}||\\vec{d}|\\cos(\\theta)$, where $\\theta$ is the angle between the force and the displacement.' },
        { level: 3, content: 'Multiply the force, the displacement, and $\\cos(\\theta)$ together.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const force = randomInt(rng, 10, 60);
        const displacement = randomInt(rng, 2, 10);
        const angle = randomInt(rng, 20, 70);
        const answerValue = force * displacement * Math.cos(toRad(angle));
        return {
          prompt: `A force of $${force}$ N acts at $${angle}°$ to the direction of motion of a crate, which is dragged $${displacement}$ m. Find the work done, to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.5 },
          workingNotes: `$W = ${force} \\times ${displacement} \\times \\cos(${angle}°) \\approx ${answerValue.toFixed(1)}$ J.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: force * displacement, tolerance: 0.5 },
              feedback: "That's just force times displacement, ignoring the angle between them. Only the component of force along the direction of motion does work — multiply by $\\cos(\\theta)$ as well.",
            },
          ],
        };
      },
    },
    {
      id: 'p4',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Rearrange the magnitude form of the scalar product to make $\\cos(\\theta)$ the subject.' },
        { level: 2, content: '$\\cos(\\theta) = \\dfrac{\\vec{a}\\cdot\\vec{b}}{|\\vec{a}||\\vec{b}|}$ — find the scalar product and both magnitudes first.' },
        { level: 3, content: 'Once you have $\\cos(\\theta)$ as a decimal, use $\\cos^{-1}$ on your calculator to find $\\theta$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomInt(rng, 2, 10);
        const a2 = randomInt(rng, 2, 10);
        const b1 = randomInt(rng, 2, 10);
        const b2 = randomInt(rng, -10, -2);
        const dot = a1 * b1 + a2 * b2;
        const magA = Math.hypot(a1, a2);
        const magB = Math.hypot(b1, b2);
        const cosTheta = dot / (magA * magB);
        const answerValue = (Math.acos(Math.min(1, Math.max(-1, cosTheta))) * 180) / Math.PI;
        return {
          prompt: `Find the angle between $\\vec{a} = \\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix}$ and $\\vec{b} = \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$, to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.5 },
          workingNotes: `$\\vec{a}\\cdot\\vec{b} = ${dot}$, $|\\vec{a}| \\approx ${magA.toFixed(2)}$, $|\\vec{b}| \\approx ${magB.toFixed(2)}$, so $\\cos(\\theta) \\approx ${cosTheta.toFixed(3)}$, giving $\\theta \\approx ${answerValue.toFixed(1)}°$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'This uses the 2D vector (cross) product formula, not the scalar product.' },
        { level: 2, content: 'The formula for the moment is $M = r_xF_y - r_yF_x$.' },
        { level: 3, content: 'Substitute the position and force components carefully, keeping track of the order of subtraction.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const rx = randomSigned(rng, 1, 8);
        const ry = randomSigned(rng, 1, 8);
        const fx = randomSigned(rng, 1, 15);
        const fy = randomSigned(rng, 1, 15);
        const answerValue = rx * fy - ry * fx;
        return {
          prompt: `(Extension) A force $\\vec{F} = \\begin{pmatrix} ${fx} \\\\ ${fy} \\end{pmatrix}$ N is applied at position $\\vec{r} = \\begin{pmatrix} ${rx} \\\\ ${ry} \\end{pmatrix}$ m from a pivot. Find the moment of the force about the pivot, $M = r_xF_y - r_yF_x$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `$M = (${rx} \\times ${fy}) - (${ry} \\times ${fx}) = ${rx * fy} - ${ry * fx} = ${answerValue}$ N$\\cdot$m.`,
        };
      },
    },
  ],
  summary:
    'The scalar (dot) product combines two vectors into a single number: '
    + '$\\vec{a}\\cdot\\vec{b} = a_xb_x + a_yb_y = |\\vec{a}||\\vec{b}|\\cos(\\theta)$. It is used to calculate '
    + 'work done, and a result of exactly 0 means the vectors are perpendicular. The vector (cross) product, '
    + 'briefly touched on here, gives the turning effect (moment) of a force — in 2D, its size is '
    + '$a_xb_y - a_yb_x$.',
  keyFormulas: [
    { id: 'scalar-product-components', label: 'Scalar product (components)', formula: '\\vec{a}\\cdot\\vec{b} = a_xb_x + a_yb_y' },
    { id: 'scalar-product-angle', label: 'Scalar product (magnitude/angle)', formula: '\\vec{a}\\cdot\\vec{b} = |\\vec{a}||\\vec{b}|\\cos(\\theta)' },
    { id: 'work-done', label: 'Work done by a force', formula: 'W = \\vec{F}\\cdot\\vec{d}' },
    { id: 'vector-product-2d', label: 'Vector (cross) product magnitude, 2D', formula: '|\\vec{a}\\times\\vec{b}| = a_xb_y - a_yb_x' },
  ],
};
