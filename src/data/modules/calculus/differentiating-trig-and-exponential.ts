import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt, randomChoice } from '../../../lib/random';

export const differentiatingTrigAndExponential: Lesson = {
  id: 'differentiating-trig-and-exponential',
  moduleId: 'calculus',
  title: 'Differentiating trig and exponential functions',
  estMinutes: 18,
  whyThisMatters: {
    scenario:
      'Alternating current, vibration, sound waves and pendulum motion are all described by sine and cosine. '
      + 'Charging capacitors, population growth and radioactive decay are all described by $e^x$. Both function '
      + 'families show up constantly in engineering, so knowing how to differentiate them instantly — without '
      + 're-deriving anything — is a core skill for everything that follows.',
  },
  prerequisites: [
    {
      skill: { id: 'power-rule-recap', label: 'The power rule' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Differentiate $y = x^5$ with respect to $x$.',
          answer: { type: 'expression', expression: '5*x^4', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Differentiate $y = 4x^2$ with respect to $x$.',
          answer: { type: 'expression', expression: '8*x', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'The power rule: $\\dfrac{d}{dx}(x^n) = nx^{n-1}$ — multiply by the power, then reduce the power by '
          + 'one. This lesson adds two brand-new rules alongside it, for trig and exponential functions.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Sine, cosine and $e^x$ do not follow the power rule — they are not powers of $x$ at all. Instead, '
        + 'their derivatives are simply **facts to know**, the same way you know $2\\times2=4$. There is no '
        + 'need to derive them from scratch — just learn the results and practise applying them.',
    },
    {
      id: 'e2',
      kind: 'note',
      content:
        'Every rule in this lesson assumes $x$ is measured in **radians**, not degrees. This is the standard '
        + 'convention throughout engineering maths — if you ever see degrees in a problem, convert to radians '
        + 'first ($180° = \\pi$ radians) before differentiating.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content: '$$\\frac{d}{dx}\\big(\\sin x\\big) = \\cos x \\qquad\\qquad \\frac{d}{dx}\\big(\\cos x\\big) = -\\sin x$$',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'Notice the minus sign only appears when differentiating $\\cos x$, never $\\sin x$ — a common slip is '
        + 'to add a minus sign to the wrong one, or to both. Also notice the pattern continues if you '
        + 'differentiate again: differentiating $\\cos x$ gives $-\\sin x$, and differentiating that gives back '
        + '$-\\cos x$ — sine and cosine cycle through four results before repeating.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'Now the exponential function, $e^x$. This one is genuinely remarkable: differentiating it gives back '
        + '**exactly the same function**.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content: '$$\\frac{d}{dx}\\big(e^x\\big) = e^x$$',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        '$e^x$ is the only function (up to a constant multiplier) with this property — its gradient at any '
        + 'point is equal to its own value at that point. That single property is why $e^x$ turns up everywhere '
        + 'a quantity\'s rate of change depends on the quantity itself — capacitor charge, population growth, '
        + 'radioactive decay.',
    },
    {
      id: 'e8',
      kind: 'plain',
      content:
        'These new rules combine with everything from the last lesson exactly as you would expect: constant '
        + 'multiples carry straight through, and you still differentiate term by term. So for $y = 3\\sin x + '
        + '2x^2$, differentiate each term separately using whichever rule fits it: $\\dfrac{dy}{dx} = 3\\cos x '
        + '+ 4x$.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'A mix of sine and cosine',
      scenario: 'Differentiate $y = 5\\sin x - 3\\cos x$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate the sine term: $\\sin x \\to \\cos x$, and the constant multiplier carries through.',
          mathLine: '\\frac{d}{dx}(5\\sin x) = 5\\cos x',
        },
        {
          id: 's2',
          explanationWhy: 'Differentiate the cosine term: $\\cos x \\to -\\sin x$. The existing minus sign and this new minus sign combine to give a plus.',
          mathLine: '\\frac{d}{dx}(-3\\cos x) = -3\\times(-\\sin x) = 3\\sin x',
        },
        {
          id: 's3',
          explanationWhy: 'Add the two results together.',
          mathLine: '\\frac{dy}{dx} = 5\\cos x + 3\\sin x',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 5\\cos x + 3\\sin x',
    },
    {
      id: 'w2',
      title: 'Exponential plus a power term',
      scenario: 'Differentiate $y = 4e^x + x^3$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiating $e^x$ gives back $e^x$ itself; the constant multiplier of 4 carries straight through.',
          mathLine: '\\frac{d}{dx}(4e^x) = 4e^x',
        },
        {
          id: 's2',
          explanationWhy: 'Differentiate the power term with the ordinary power rule.',
          mathLine: '\\frac{d}{dx}(x^3) = 3x^2',
        },
        {
          id: 's3',
          explanationWhy: 'Add the two results.',
          mathLine: '\\frac{dy}{dx} = 4e^x + 3x^2',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 4e^x + 3x^2',
    },
    {
      id: 'w3',
      title: 'Sine and a power term together',
      scenario: 'Differentiate $y = 3\\sin x + 2x^2$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate the sine term using the trig rule.',
          mathLine: '\\frac{d}{dx}(3\\sin x) = 3\\cos x',
        },
        {
          id: 's2',
          explanationWhy: 'Differentiate the power term using the power rule.',
          mathLine: '\\frac{d}{dx}(2x^2) = 4x',
        },
        {
          id: 's3',
          explanationWhy: 'Add the two results together.',
          mathLine: '\\frac{dy}{dx} = 3\\cos x + 4x',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 3\\cos x + 4x',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This is a straight application of one of the two new trig rules.' },
        { level: 2, content: 'Differentiating $\\sin x$ gives $\\cos x$ — the constant multiplier just carries through unchanged.' },
        { level: 3, content: 'Multiply the constant by $\\cos x$ — that is the full derivative.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 8);
        return {
          prompt: `Differentiate $y = ${a}\\sin x$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${a}*cos(x)`, variables: ['x'] },
          workingNotes: `$\\dfrac{d}{dx}(\\sin x) = \\cos x$, so $\\dfrac{dy}{dx} = ${a}\\cos x$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This is a straight application of the other trig rule — watch the sign carefully.' },
        { level: 2, content: 'Differentiating $\\cos x$ gives $-\\sin x$, not $\\sin x$.' },
        { level: 3, content: 'Multiply the constant by $-\\sin x$ — do not drop the minus sign.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 8);
        return {
          prompt: `Differentiate $y = ${a}\\cos x$ with respect to $x$.`,
          answer: { type: 'expression', expression: `-${a}*sin(x)`, variables: ['x'] },
          workingNotes: `$\\dfrac{d}{dx}(\\cos x) = -\\sin x$, so $\\dfrac{dy}{dx} = -${a}\\sin x$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${a}*sin(x)`, variables: ['x'] },
              feedback: 'You found the right size but dropped the minus sign — differentiating $\\cos x$ always gives $-\\sin x$.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate each term separately: one is exponential, the other is a power term.' },
        { level: 2, content: 'Differentiating $e^x$ gives back $e^x$ unchanged; the power term follows the ordinary power rule.' },
        { level: 3, content: 'Add the two derivatives together, keeping their original signs.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 6);
        const n = randomInt(rng, 2, 3);
        const b = randomInt(rng, 2, 6);
        const coeff = b * n;
        const power = n - 1;
        return {
          prompt: `Differentiate $y = ${a}e^x + ${b}x^{${n}}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${a}*exp(x)+${coeff}*x^${power}`, variables: ['x'] },
          workingNotes: `$\\dfrac{d}{dx}(${a}e^x) = ${a}e^x$ and $\\dfrac{d}{dx}(${b}x^{${n}}) = ${coeff}x^{${power}}$, so $\\dfrac{dy}{dx} = ${a}e^x + ${coeff}x^{${power}}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate the sine and cosine terms separately, then add the results.' },
        { level: 2, content: 'Remember: $\\sin x \\to \\cos x$, and $\\cos x \\to -\\sin x$.' },
        { level: 3, content: 'Watch the sign carried by the cosine term — a minus in front of the original term combines with the minus produced by differentiating $\\cos x$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 7);
        const b = randomInt(rng, 2, 7);
        const bIsSubtracted = rng() < 0.5;
        const cosCoeff = bIsSubtracted ? b : -b;
        return {
          prompt: bIsSubtracted
            ? `Differentiate $y = ${a}\\sin x - ${b}\\cos x$ with respect to $x$.`
            : `Differentiate $y = ${a}\\sin x + ${b}\\cos x$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${a}*cos(x)+${cosCoeff}*sin(x)`, variables: ['x'] },
          workingNotes: bIsSubtracted
            ? `$\\dfrac{d}{dx}(${a}\\sin x) = ${a}\\cos x$ and $\\dfrac{d}{dx}(-${b}\\cos x) = ${b}\\sin x$, so $\\dfrac{dy}{dx} = ${a}\\cos x + ${b}\\sin x$.`
            : `$\\dfrac{d}{dx}(${a}\\sin x) = ${a}\\cos x$ and $\\dfrac{d}{dx}(${b}\\cos x) = -${b}\\sin x$, so $\\dfrac{dy}{dx} = ${a}\\cos x - ${b}\\sin x$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'There are three terms here, from three different rules — take them one at a time.' },
        { level: 2, content: 'Use the trig rule on the sine term, the power rule on the power term, and the exponential rule on the last term.' },
        { level: 3, content: 'Add the three derivatives together, keeping every sign exactly as it was in the question.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 6);
        const b = randomInt(rng, 2, 5);
        const c = randomInt(rng, 2, 6);
        const coeff = 2 * b;
        return {
          prompt: `Differentiate $y = ${a}\\sin x + ${b}x^2 - ${c}e^x$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${a}*cos(x)+${coeff}*x-${c}*exp(x)`, variables: ['x'] },
          workingNotes: `$\\dfrac{d}{dx}(${a}\\sin x) = ${a}\\cos x$, $\\dfrac{d}{dx}(${b}x^2) = ${coeff}x$, and $\\dfrac{d}{dx}(-${c}e^x) = -${c}e^x$. Combined: $\\dfrac{dy}{dx} = ${a}\\cos x + ${coeff}x - ${c}e^x$.`,
        };
      },
    },
  ],
  summary:
    'Learn these as facts: $\\sin x \\to \\cos x$, $\\cos x \\to -\\sin x$, and $e^x \\to e^x$ (unchanged) — all '
    + 'assuming $x$ is in radians. Combine them with the power rule term by term exactly as before, keeping '
    + 'every constant multiplier and sign carefully tracked.',
  keyFormulas: [
    { id: 'diff-sin', label: 'Derivative of sine', formula: '\\frac{d}{dx}(\\sin x) = \\cos x' },
    { id: 'diff-cos', label: 'Derivative of cosine', formula: '\\frac{d}{dx}(\\cos x) = -\\sin x' },
    { id: 'diff-exp', label: 'Derivative of the exponential', formula: '\\frac{d}{dx}(e^x) = e^x' },
  ],
};
