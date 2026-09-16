import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export const resolvingIntoComponents: Lesson = {
  id: 'resolving-into-components',
  moduleId: 'vectors',
  title: 'Resolving a vector into components',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'A force is often given as "20 N at 30° above the horizontal" — easy to picture, but hard to calculate '
      + "with directly. To add forces together, check for equilibrium, or work out a projectile's path, it is "
      + 'far easier to first break (or **resolve**) the vector into a purely horizontal part and a purely '
      + 'vertical part. This is one of the most-used skills in the whole vectors topic.',
  },
  prerequisites: [
    {
      skill: { id: 'sohcahtoa', label: 'SOHCAHTOA (right-angled trigonometry)' },
      checkQuestions: [
        {
          id: 'q1',
          prompt:
            'In a right-angled triangle, the hypotenuse is $10$ cm and one angle is $30°$. Find the length of '
            + 'the side **opposite** that angle, to 2 decimal places.',
          answer: { type: 'numeric', value: 10 * Math.sin(toRad(30)), tolerance: 0.05 },
          hint: 'Opposite = hypotenuse $\\times \\sin(\\theta)$.',
        },
        {
          id: 'q2',
          prompt:
            'In the same triangle (hypotenuse $10$ cm, angle $30°$), find the length of the side **adjacent** '
            + 'to that angle, to 2 decimal places.',
          answer: { type: 'numeric', value: 10 * Math.cos(toRad(30)), tolerance: 0.05 },
          hint: 'Adjacent = hypotenuse $\\times \\cos(\\theta)$.',
        },
      ],
      refresher: {
        summary:
          'SOHCAHTOA is a memory aid for the three trig ratios in a right-angled triangle: '
          + '$\\sin(\\theta) = \\dfrac{\\text{opposite}}{\\text{hypotenuse}}$, '
          + '$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}$, and '
          + '$\\tan(\\theta) = \\dfrac{\\text{opposite}}{\\text{adjacent}}$. Rearranging the first two gives you '
          + 'a side directly: opposite $= \\text{hyp} \\times \\sin(\\theta)$, and adjacent '
          + '$= \\text{hyp} \\times \\cos(\\theta)$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Picture a vector drawn from the origin at some angle $\\theta$ above the horizontal. If you drop a '
        + 'line straight down from its tip to the x-axis, you have made a right-angled triangle: the vector '
        + "itself is the **hypotenuse**, the horizontal side is the vector's x-component, and the vertical side "
        + "is the vector's y-component.",
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Because $\\theta$ is measured from the horizontal, the x-component sits **adjacent** to the angle and '
        + 'the y-component sits **opposite** to it. That means SOHCAHTOA gives you both components directly '
        + "from the vector's magnitude $|\\vec{v}|$ (the hypotenuse) and its angle $\\theta$.",
    },
    {
      id: 'e3',
      kind: 'notation',
      content: '$$x = |\\vec{v}|\\cos(\\theta) \\qquad\\qquad y = |\\vec{v}|\\sin(\\theta)$$',
    },
    {
      id: 'e4',
      kind: 'note',
      content:
        'These formulas assume $\\theta$ is measured from the **horizontal** (positive x-axis). If a problem '
        + 'instead gives you the angle from the *vertical*, sketch the triangle first — the roles of $\\sin$ '
        + 'and $\\cos$ swap round. Always draw the triangle rather than guessing which formula to use.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'Direction still matters once you have the numbers. An angle measured **above** the horizontal gives a '
        + 'positive y-component (pointing up); an angle measured **below** the horizontal gives a negative '
        + 'y-component (pointing down). The x-component works the same way for left/right.',
    },
    {
      id: 'e6',
      kind: 'plain',
      content:
        'This is exactly the calculation behind resolving a force into its horizontal and vertical effects, or '
        + "finding a projectile's initial horizontal speed and vertical speed from its launch speed and launch "
        + 'angle.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Resolving a force at an angle',
      scenario: 'A force of $20$ N acts at $30°$ above the horizontal. Find its horizontal and vertical components.',
      steps: [
        { id: 's1', explanationWhy: 'Start from the resolving formulas.', mathLine: 'x = |\\vec{v}|\\cos(\\theta), \\quad y = |\\vec{v}|\\sin(\\theta)' },
        { id: 's2', explanationWhy: 'Substitute the magnitude ($20$ N) and angle ($30°$).', mathLine: 'x = 20\\cos(30°), \\quad y = 20\\sin(30°)' },
        { id: 's3', explanationWhy: 'Evaluate on a calculator.', mathLine: 'x \\approx 17.32\\text{ N}, \\quad y = 10\\text{ N}' },
      ],
      finalAnswer: 'x \\approx 17.32\\text{ N}, \\ y = 10\\text{ N}',
    },
    {
      id: 'w2',
      title: 'Launch velocity components',
      scenario: 'A component is launched with a speed of $15\\text{ m/s}$ at $50°$ above the horizontal. Find its initial horizontal and vertical speed.',
      steps: [
        { id: 's1', explanationWhy: 'The launch speed is the magnitude, and the launch angle is $\\theta$.', mathLine: 'x = 15\\cos(50°), \\quad y = 15\\sin(50°)' },
        { id: 's2', explanationWhy: 'Evaluate each on a calculator.', mathLine: 'x \\approx 9.64\\text{ m/s}, \\quad y \\approx 11.49\\text{ m/s}' },
      ],
      finalAnswer: 'x \\approx 9.64\\text{ m/s}, \\ y \\approx 11.49\\text{ m/s}',
    },
    {
      id: 'w3',
      title: 'An angle below the horizontal',
      scenario: 'A cable applies a tension of $40$ N at $25°$ below the horizontal. Find its horizontal and vertical components.',
      steps: [
        { id: 's1', explanationWhy: 'Use the magnitude of the tension and the given angle in the usual formulas.', mathLine: 'x = 40\\cos(25°), \\quad y = 40\\sin(25°)' },
        { id: 's2', explanationWhy: 'Evaluate the sizes first.', mathLine: 'x \\approx 36.25\\text{ N}, \\quad y \\approx 16.90\\text{ N}' },
        { id: 's3', explanationWhy: '"Below the horizontal" means the vertical part points downward, so the y-component is negative.', mathLine: 'y \\approx -16.90\\text{ N}' },
      ],
      finalAnswer: 'x \\approx 36.25\\text{ N}, \\ y \\approx -16.90\\text{ N}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'You need the component adjacent to the angle — that uses cosine.' },
        { level: 2, content: 'The formula is $x = |\\vec{v}|\\cos(\\theta)$.' },
        { level: 3, content: 'Multiply the magnitude by $\\cos(\\theta)$ on your calculator (in degree mode) to get the answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 10, 50);
        const angle = randomInt(rng, 20, 70);
        const answerValue = magnitude * Math.cos(toRad(angle));
        return {
          prompt: `A force of $${magnitude}$ N acts at $${angle}°$ above the horizontal. Find its horizontal (x) component, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.1 },
          workingNotes: `$x = ${magnitude}\\cos(${angle}°) \\approx ${answerValue.toFixed(2)}$ N.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: magnitude * Math.sin(toRad(angle)), tolerance: 0.1 },
              feedback: 'That is the *vertical* component (using sine). The horizontal component uses cosine, since it is adjacent to the angle.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'You need the component opposite the angle — that uses sine.' },
        { level: 2, content: 'The formula is $y = |\\vec{v}|\\sin(\\theta)$.' },
        { level: 3, content: 'Multiply the magnitude by $\\sin(\\theta)$ on your calculator (in degree mode) to get the answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 10, 50);
        const angle = randomInt(rng, 20, 70);
        const answerValue = magnitude * Math.sin(toRad(angle));
        return {
          prompt: `A force of $${magnitude}$ N acts at $${angle}°$ above the horizontal. Find its vertical (y) component, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.1 },
          workingNotes: `$y = ${magnitude}\\sin(${angle}°) \\approx ${answerValue.toFixed(2)}$ N.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: magnitude * Math.cos(toRad(angle)), tolerance: 0.1 },
              feedback: 'That is the *horizontal* component (using cosine). The vertical component uses sine, since it is opposite the angle.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Find the horizontal component with cosine and the vertical component with sine, separately.' },
        { level: 2, content: '$x = |\\vec{v}|\\cos(\\theta)$ and $y = |\\vec{v}|\\sin(\\theta)$.' },
        { level: 3, content: 'Give your answer as a vector — either a column vector or in i, j form — using both values you calculated.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 15, 60);
        const angle = randomInt(rng, 15, 75);
        const x = magnitude * Math.cos(toRad(angle));
        const y = magnitude * Math.sin(toRad(angle));
        return {
          prompt: `An initial velocity of $${magnitude}$ m/s acts at $${angle}°$ above the horizontal. Find its horizontal and vertical components as a vector, to 2 decimal places.`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.1 },
          workingNotes: `$x = ${magnitude}\\cos(${angle}°) \\approx ${x.toFixed(2)}$, $y = ${magnitude}\\sin(${angle}°) \\approx ${y.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Find the sizes of both components first, exactly as usual, using cosine and sine.' },
        { level: 2, content: '"Below the horizontal" affects the sign of the vertical component only.' },
        { level: 3, content: 'The x-component stays positive (pulling to the right); the y-component becomes negative (pulling down).' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 20, 60);
        const angle = randomInt(rng, 15, 60);
        const x = magnitude * Math.cos(toRad(angle));
        const y = -magnitude * Math.sin(toRad(angle));
        return {
          prompt: `A cable applies a tension of $${magnitude}$ N at $${angle}°$ **below** the horizontal. Find its horizontal and vertical components as a vector, to 2 decimal places.`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.1 },
          workingNotes: `$x = ${magnitude}\\cos(${angle}°) \\approx ${x.toFixed(2)}$. Since the angle is below the horizontal, $y = -${magnitude}\\sin(${angle}°) \\approx ${y.toFixed(2)}$.`,
          commonMistakes: [
            {
              matches: { type: 'vector', components: [x, -y], tolerance: 0.1 },
              feedback: 'The size is right, but the sign of the vertical component should be negative — the angle is *below* the horizontal, so it pulls downward.',
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'A very shallow angle makes one component much bigger than the other — this is normal, resolve it exactly as always.' },
        { level: 2, content: 'Use $x = |\\vec{v}|\\cos(\\theta)$ and $y = |\\vec{v}|\\sin(\\theta)$ with the given magnitude and angle.' },
        { level: 3, content: 'Calculate both components carefully to 2 decimal places and give your answer as a vector.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 40, 120);
        const angle = randomInt(rng, 5, 15);
        const x = magnitude * Math.cos(toRad(angle));
        const y = magnitude * Math.sin(toRad(angle));
        return {
          prompt: `A jet of water leaves a nozzle at $${magnitude}$ m/s, angled just $${angle}°$ above the horizontal. Find its horizontal and vertical velocity components as a vector, to 2 decimal places.`,
          answer: { type: 'vector', components: [x, y], tolerance: 0.15 },
          workingNotes: `$x = ${magnitude}\\cos(${angle}°) \\approx ${x.toFixed(2)}$, $y = ${magnitude}\\sin(${angle}°) \\approx ${y.toFixed(2)}$ — most of the speed stays horizontal at such a shallow angle.`,
        };
      },
    },
  ],
  summary:
    'A vector of magnitude $|\\vec{v}|$ at angle $\\theta$ above the horizontal resolves into components '
    + '$x = |\\vec{v}|\\cos(\\theta)$ and $y = |\\vec{v}|\\sin(\\theta)$. An angle above the horizontal gives a '
    + 'positive y-component; an angle below gives a negative one. Always sketch the right-angled triangle if '
    + "you're unsure which ratio to use.",
  keyFormulas: [
    { id: 'resolve-x', label: 'Horizontal component', formula: 'x = |\\vec{v}|\\cos(\\theta)' },
    { id: 'resolve-y', label: 'Vertical component', formula: 'y = |\\vec{v}|\\sin(\\theta)' },
  ],
};
