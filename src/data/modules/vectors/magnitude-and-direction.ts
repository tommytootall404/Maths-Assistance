import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const SIGNS = [1, -1] as const;

/** Wraps an angle in degrees into the range [0, 360), matching the convention used
 * throughout this lesson (measured anticlockwise from the positive x-axis). */
function directionDegrees(x: number, y: number): number {
  const raw = Math.atan2(y, x) * (180 / Math.PI);
  return raw < 0 ? raw + 360 : raw;
}

export const magnitudeAndDirection: Lesson = {
  id: 'magnitude-and-direction',
  moduleId: 'vectors',
  title: 'Magnitude and direction from components',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'This is resolving a vector in reverse. Sensors, simulations and CAD software usually hand you a vector '
      + 'as raw x and y components — but for a report, a diagram, or to compare it with another vector, you '
      + 'often need it back in the "size and direction" form a human reads naturally. This lesson covers how to '
      + 'get from $(x, y)$ back to $|\\vec{v}|$ and $\\theta$.',
  },
  prerequisites: [
    {
      skill: { id: 'pythagoras', label: "Pythagoras' theorem" },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'A right-angled triangle has shorter sides of $3$ cm and $4$ cm. Find the length of the hypotenuse.',
          answer: { type: 'numeric', value: 5 },
        },
        {
          id: 'q2',
          prompt: 'A right-angled triangle has a hypotenuse of $13$ cm and one short side of $5$ cm. Find the length of the other short side.',
          answer: { type: 'numeric', value: 12 },
          hint: 'Rearrange $c^2 = a^2 + b^2$ to find a shorter side: $a = \\sqrt{c^2 - b^2}$.',
        },
      ],
      refresher: {
        summary:
          "Pythagoras' theorem relates the three sides of a right-angled triangle: $c^2 = a^2 + b^2$, where $c$ "
          + 'is the hypotenuse (the longest side, opposite the right angle) and $a$, $b$ are the two shorter '
          + 'sides. To find the hypotenuse, square the two shorter sides, add them, then square root. To find a '
          + 'shorter side instead, rearrange first: $a = \\sqrt{c^2 - b^2}$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Given a vector as components $(x, y)$, the same right-angled triangle from the last lesson lets you go '
        + 'backwards: the components are the two shorter sides, and the vector itself is the hypotenuse. So its '
        + "**magnitude** — its length — comes straight from Pythagoras' theorem.",
    },
    {
      id: 'e2',
      kind: 'notation',
      content: '$$|\\vec{v}| = \\sqrt{x^2 + y^2}$$',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'For the **direction**, the angle $\\theta$ between the vector and the positive x-axis, you use the '
        + 'inverse tangent — since $\\tan(\\theta) = \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{y}{x}$ '
        + 'for a vector measured from the horizontal.',
    },
    {
      id: 'e4',
      kind: 'notation',
      content: '$$\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)$$',
    },
    {
      id: 'e5',
      kind: 'note',
      content:
        "Here's the practical catch: your calculator's $\\tan^{-1}$ button only ever gives an answer between "
        + '$-90°$ and $90°$ — but a vector can point in *any* direction, all the way round to $360°$. So the '
        + "calculator's answer is only correct as-is when the vector points into the right half of the plane "
        + '(positive $x$). **Always sketch the vector first** and check which quadrant it actually lies in: if '
        + 'the x-component is negative, add $180°$ to whatever the calculator gives you; if the calculator '
        + 'gives a negative angle and you want a positive one instead, add $360°$. Sketching first takes ten '
        + 'seconds and avoids reporting a direction that is exactly backwards.',
    },
    {
      id: 'e6',
      kind: 'visual',
      content:
        'Drag the point below to build your own intuition — watch how the magnitude and direction readout '
        + 'changes as the vector moves into each quadrant.',
      visual: { component: 'vector-playground' },
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Both components positive',
      scenario: 'Find the magnitude and direction of $\\begin{pmatrix} 6 \\\\ 8 \\end{pmatrix}$.',
      steps: [
        { id: 's1', explanationWhy: "Apply Pythagoras' theorem for the magnitude.", mathLine: '|\\vec{v}| = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10' },
        { id: 's2', explanationWhy: 'Both components are positive, so the vector is in the first quadrant and the calculator\'s answer needs no adjustment.', mathLine: '\\theta = \\tan^{-1}\\left(\\frac{8}{6}\\right) \\approx 53.13°' },
      ],
      finalAnswer: '|\\vec{v}| = 10, \\ \\theta \\approx 53.13°',
    },
    {
      id: 'w2',
      title: 'Negative x-component',
      scenario: 'Find the magnitude and direction of $\\begin{pmatrix} -5 \\\\ 12 \\end{pmatrix}$.',
      steps: [
        { id: 's1', explanationWhy: "Apply Pythagoras' theorem — the signs don't matter once squared.", mathLine: '|\\vec{v}| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{169} = 13' },
        { id: 's2', explanationWhy: 'The calculator gives a value between $-90°$ and $90°$, which is negative here since $y/x$ is negative.', mathLine: '\\tan^{-1}\\left(\\frac{12}{-5}\\right) \\approx -67.38°' },
        { id: 's3', explanationWhy: 'The x-component is negative, so the vector points into the second quadrant — add $180°$ to correct it.', mathLine: '\\theta \\approx -67.38° + 180° = 112.62°' },
      ],
      finalAnswer: '|\\vec{v}| = 13, \\ \\theta \\approx 112.62°',
    },
    {
      id: 'w3',
      title: 'Negative y-component',
      scenario: 'Find the magnitude and direction of $\\begin{pmatrix} 7 \\\\ -24 \\end{pmatrix}$.',
      steps: [
        { id: 's1', explanationWhy: "Apply Pythagoras' theorem.", mathLine: '|\\vec{v}| = \\sqrt{7^2 + (-24)^2} = \\sqrt{625} = 25' },
        { id: 's2', explanationWhy: 'Evaluate the calculator\'s inverse tan.', mathLine: '\\tan^{-1}\\left(\\frac{-24}{7}\\right) \\approx -73.74°' },
        { id: 's3', explanationWhy: 'The x-component is positive here, so the vector is in the fourth quadrant. Adding $360°$ gives a positive angle measured the same way round as the others.', mathLine: '\\theta \\approx -73.74° + 360° = 286.26°' },
      ],
      finalAnswer: '|\\vec{v}| = 25, \\ \\theta \\approx 286.26°',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Square each component, add the results, then square root.' },
        { level: 2, content: 'The formula is $|\\vec{v}| = \\sqrt{x^2 + y^2}$.' },
        { level: 3, content: 'Substitute the given x and y values and evaluate on a calculator.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = randomInt(rng, 1, 12);
        const y = randomInt(rng, 1, 12);
        const answerValue = Math.hypot(x, y);
        return {
          prompt: `Find the magnitude of $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.05 },
          workingNotes: `$|\\vec{v}| = \\sqrt{${x}^2 + ${y}^2} \\approx ${answerValue.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Both components are positive, so the vector is in the first quadrant — no adjustment needed.' },
        { level: 2, content: 'Use $\\theta = \\tan^{-1}\\left(\\dfrac{y}{x}\\right)$.' },
        { level: 3, content: 'Divide y by x, then take the inverse tan on your calculator (degree mode).' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = randomInt(rng, 1, 12);
        const y = randomInt(rng, 1, 12);
        const answerValue = directionDegrees(x, y);
        return {
          prompt: `Find the direction of $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$, as an angle from the positive x-axis, to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.3 },
          workingNotes: `$\\theta = \\tan^{-1}\\left(\\frac{${y}}{${x}}\\right) \\approx ${answerValue.toFixed(1)}°$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'The signs of the components do not affect the magnitude — squaring removes them.' },
        { level: 2, content: 'The formula is still $|\\vec{v}| = \\sqrt{x^2 + y^2}$, regardless of quadrant.' },
        { level: 3, content: 'Substitute the values (keeping track of which is x and which is y) and evaluate.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const xMag = randomInt(rng, 2, 15);
        const yMag = randomInt(rng, 2, 15);
        const xSign = randomChoice(rng, SIGNS);
        const ySign = randomChoice(rng, SIGNS);
        const x = xMag * xSign;
        const y = yMag * ySign;
        const answerValue = Math.hypot(x, y);
        return {
          prompt: `Find the magnitude of $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.05 },
          workingNotes: `$|\\vec{v}| = \\sqrt{(${x})^2 + (${y})^2} \\approx ${answerValue.toFixed(2)}$ — the signs disappear once you square.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Sketch it first: a negative x with a positive y sits in the second quadrant (top-left).' },
        { level: 2, content: 'Find $\\tan^{-1}\\left(\\dfrac{y}{x}\\right)$ on your calculator — it will come out negative.' },
        { level: 3, content: 'Because the vector is in the second quadrant, add $180°$ to the calculator\'s result.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = -randomInt(rng, 2, 15);
        const y = randomInt(rng, 2, 15);
        const answerValue = directionDegrees(x, y);
        const rawCalculatorValue = Math.atan(y / x) * (180 / Math.PI);
        return {
          prompt: `Find the direction of $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$, as an angle from the positive x-axis (0°–360°), to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.3 },
          workingNotes: `The calculator gives $\\tan^{-1}\\left(\\frac{${y}}{${x}}\\right) \\approx ${rawCalculatorValue.toFixed(1)}°$. The x-component is negative (second quadrant), so add $180°$: $\\theta \\approx ${answerValue.toFixed(1)}°$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: rawCalculatorValue, tolerance: 0.3 },
              feedback: "That's the raw calculator value, before the quadrant correction. Since the x-component is negative, the vector is in the second quadrant, so you need to add 180° to it.",
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Sketch it first: work out which quadrant the vector is actually in from the signs of x and y.' },
        { level: 2, content: 'Find the calculator\'s raw $\\tan^{-1}(y/x)$ value, then decide whether to add 180° or 360° based on the quadrant.' },
        { level: 3, content: 'Both x and y negative means the third quadrant — add 180° to the (positive) calculator result to land between 180° and 270°.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const x = -randomInt(rng, 2, 20);
        const y = -randomInt(rng, 2, 20);
        const answerValue = directionDegrees(x, y);
        const rawCalculatorValue = Math.atan(y / x) * (180 / Math.PI);
        return {
          prompt: `Find the direction of $\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$, as an angle from the positive x-axis (0°–360°), to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.3 },
          workingNotes: `Both components are negative (third quadrant). The calculator gives $\\tan^{-1}\\left(\\frac{${y}}{${x}}\\right) \\approx ${rawCalculatorValue.toFixed(1)}°$; add $180°$ to get $\\theta \\approx ${answerValue.toFixed(1)}°$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: rawCalculatorValue, tolerance: 0.3 },
              feedback: "That's the raw calculator value. Both components are negative here, which puts the vector in the third quadrant — add 180° to get the true direction.",
            },
          ],
        };
      },
    },
  ],
  summary:
    'Given components $(x, y)$, the magnitude is $|\\vec{v}| = \\sqrt{x^2 + y^2}$ (Pythagoras) and the direction '
    + 'is $\\theta = \\tan^{-1}(y/x)$ — but always sketch the vector first, because the calculator only returns '
    + 'an angle between $-90°$ and $90°$. Add $180°$ if $x$ is negative, or $360°$ if you want a negative result '
    + 'expressed as a positive angle.',
  keyFormulas: [
    { id: 'magnitude', label: 'Magnitude from components', formula: '|\\vec{v}| = \\sqrt{x^2 + y^2}' },
    { id: 'direction', label: 'Direction from components', formula: '\\theta = \\tan^{-1}\\left(\\frac{y}{x}\\right)' },
  ],
};
