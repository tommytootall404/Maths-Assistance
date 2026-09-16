import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

export const solvingExponentialEquations: Lesson = {
  id: 'solving-exponential-equations',
  moduleId: 'logs-exponentials',
  title: 'Solving exponential equations',
  estMinutes: 22,
  whyThisMatters: {
    scenario:
      'How long until a capacitor drops to 10% of its starting voltage? How long until a component\'s '
      + 'temperature reaches a safe limit? Questions like these put the unknown in the exponent — and logs are '
      + 'the tool that brings it back down to somewhere you can solve for it.',
  },
  prerequisites: [
    {
      skill: { id: 'e-and-ln', label: 'e and the natural log' },
      checkQuestions: [
        { id: 'q1', prompt: 'Evaluate $\\ln(e^4)$.', answer: { type: 'numeric', value: 4 } },
        { id: 'q2', prompt: 'Solve $e^x = 10$ for $x$, to 2 decimal places.', answer: { type: 'numeric', value: Math.log(10), tolerance: 0.02 } },
      ],
      refresher: {
        summary:
          '$\\ln$ and raising $e$ to a power cancel each other out: $\\ln(e^x) = x$. To solve $e^x = k$, take '
          + '$\\ln$ of both sides: $x = \\ln(k)$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'When the unknown is stuck in the exponent — like $3^x = 20$ — you cannot get it down using algebra '
        + 'alone. The way out is to take a log of **both sides**, which is always a valid thing to do, because '
        + 'applying the same operation to both sides of an equation keeps it balanced.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Taking a log of both sides lets you use the power law to pull the exponent down to ground level, where '
        + "it becomes an ordinary multiplier instead of a power — and then it's just rearranging.",
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'To solve $a^x = b$:\n\n$$\\ln(a^x) = \\ln(b) \\implies x\\ln(a) = \\ln(b) \\implies x = \\frac{\\ln(b)}{\\ln(a)}$$\n\n'
        + 'You can use $\\log$ (base 10) instead of $\\ln$ throughout — either works, as long as you use the '
        + 'same base on both sides.',
    },
    {
      id: 'e4',
      kind: 'note',
      content:
        'A very common mistake: $\\dfrac{\\ln(b)}{\\ln(a)}$ is **not** the same as $\\ln\\left(\\dfrac{b}{a}\\right)$. '
        + "The first is \"log of b, divided by log of a\" (two separate calculator button-presses). The second is "
        + '"log of the fraction b/a" (one button-press). Keep them separate.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'If instead the base is $e$, like $e^{kt} = b$, it is usually quicker to take $\\ln$ directly rather '
        + 'than dividing two logs, since $\\ln(e^{kt}) = kt$ immediately.',
    },
    { id: 'e6', kind: 'notation', content: '$$e^{kt} = b \\implies kt = \\ln(b) \\implies t = \\frac{\\ln(b)}{k}$$' },
    {
      id: 'e7',
      kind: 'plain',
      content:
        'The reverse kind of equation — where the unknown is *inside* the log, like $\\log_a(x) = c$ — is '
        + 'solved by going back to the original definition of a log: rewrite it as $x = a^c$.',
    },
    {
      id: 'e8',
      kind: 'plain',
      content:
        'And if you have a log on both sides, like $\\log_a(x) = \\log_a(y)$, the logs can simply be dropped, '
        + 'leaving $x = y$ — because a log only gives the same output for the same input. Always check your '
        + 'answer keeps everything inside the original logs positive, since logs of zero or negative numbers '
        + "don't exist.",
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Solve a^x = b',
      scenario: 'Solve $3^x = 20$ for $x$.',
      steps: [
        { id: 's1', explanationWhy: 'Take $\\ln$ of both sides — a valid move on any equation.', mathLine: '\\ln(3^x) = \\ln(20)' },
        { id: 's2', explanationWhy: 'Use the power law to bring the exponent down as a multiplier.', mathLine: 'x\\ln(3) = \\ln(20)' },
        { id: 's3', explanationWhy: 'Divide both sides by $\\ln(3)$ to isolate $x$.', mathLine: 'x = \\frac{\\ln(20)}{\\ln(3)}' },
        { id: 's4', explanationWhy: 'Evaluate both logs on a calculator and divide.', mathLine: 'x \\approx \\frac{3.00}{1.10} \\approx 2.73' },
      ],
      finalAnswer: 'x \\approx 2.73',
    },
    {
      id: 'w2',
      title: 'Engineering context: time to reach a target value',
      scenario:
        'A component\'s output follows $e^{0.2t} = 5$, where $t$ is time in seconds. Find how long it takes to '
        + 'reach this point.',
      steps: [
        { id: 's1', explanationWhy: 'Take $\\ln$ of both sides directly, since the base is already $e$.', mathLine: '\\ln(e^{0.2t}) = \\ln(5)' },
        { id: 's2', explanationWhy: '$\\ln$ and $e^{(\\cdot)}$ cancel on the left.', mathLine: '0.2t = \\ln(5)' },
        { id: 's3', explanationWhy: 'Divide both sides by 0.2 to isolate $t$.', mathLine: 't = \\frac{\\ln(5)}{0.2}' },
        { id: 's4', explanationWhy: 'Evaluate.', mathLine: 't \\approx \\frac{1.609}{0.2} \\approx 8.05\\text{ s}' },
      ],
      finalAnswer: 't \\approx 8.05\\text{ s}',
    },
    {
      id: 'w3',
      title: 'Unknown inside the log',
      scenario: 'Solve $\\log_2(x) = 4$ for $x$.',
      steps: [
        { id: 's1', explanationWhy: 'Go back to the definition of a log: $\\log_a(x) = c \\iff x = a^c$.', mathLine: '\\log_2(x) = 4 \\implies x = 2^4' },
        { id: 's2', explanationWhy: 'Evaluate the power.', mathLine: 'x = 16' },
      ],
      finalAnswer: 'x = 16',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'The unknown is inside a log — use the definition to rewrite it as a power instead.' },
        { level: 2, content: '$\\log_a(x) = c$ means exactly $x = a^c$.' },
        { level: 3, content: 'Rewrite the equation as $x = (\\text{base})^{(\\text{right-hand side})}$ and evaluate the power.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [2, 3, 5] as const);
        const power = randomInt(rng, 2, 4);
        const x = base ** power;
        return {
          prompt: `Solve $\\log_{${base}}(x) = ${power}$ for $x$.`,
          answer: { type: 'numeric', value: x, tolerance: 0.001 },
          workingNotes: `$\\log_{${base}}(x) = ${power} \\implies x = ${base}^{${power}} = ${x}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 2,
      hints: [
        { level: 1, content: 'The unknown is in the exponent, and the base is not $e$ — take $\\ln$ (or $\\log$) of both sides.' },
        { level: 2, content: 'After taking logs, use the power law to bring the exponent down: $x\\ln(a) = \\ln(b)$.' },
        { level: 3, content: 'Divide both sides by $\\ln(a)$ to finish: $x = \\dfrac{\\ln(b)}{\\ln(a)}$, then evaluate on a calculator.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [2, 3, 4, 5] as const);
        const target = randomInt(rng, 10, 90);
        const answerValue = Math.log(target) / Math.log(base);
        return {
          prompt: `Solve $${base}^x = ${target}$ for $x$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.02 },
          workingNotes: `$x = \\dfrac{\\ln(${target})}{\\ln(${base})} \\approx ${answerValue.toFixed(2)}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: Math.log(target / base), tolerance: 0.02 },
              feedback: `It looks like you computed $\\ln\\left(\\frac{${target}}{${base}}\\right)$ (the log of a fraction) rather than $\\dfrac{\\ln(${target})}{\\ln(${base})}$ (one log divided by another). These are different calculations — evaluate each log separately, then divide.`,
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'The base is already $e$, so you can take $\\ln$ of both sides and cancel immediately.' },
        { level: 2, content: '$\\ln(e^{kt}) = kt$. Once you have $kt = \\ln(b)$, divide by $k$ to get $t$.' },
        { level: 3, content: 'Find $\\ln(b)$ on your calculator, then divide by the value of $k$ given in the question.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomChoice(rng, [0.1, 0.15, 0.2, 0.25] as const);
        const target = randomInt(rng, 3, 8);
        const answerValue = Math.log(target) / k;
        return {
          prompt: `Solve $e^{${k}t} = ${target}$ for $t$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.02 },
          workingNotes: `$t = \\dfrac{\\ln(${target})}{${k}} \\approx ${answerValue.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Both sides are logs to the same base — what does that let you do to the expressions inside?' },
        { level: 2, content: 'If $\\log_a(x) = \\log_a(y)$ then $x = y$. Set the two expressions inside the logs equal and solve like a normal equation.' },
        { level: 3, content: "Solve the resulting linear equation for x, then double check both original log arguments come out positive." },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [2, 10] as const);
        const x = randomInt(rng, 5, 12);
        const offset = randomInt(rng, 1, 4);
        const rhsConst = 2 * x - offset;
        return {
          prompt: `Solve $\\log_{${base}}(2x - ${offset}) = \\log_{${base}}(${rhsConst})$ for $x$.`,
          answer: { type: 'numeric', value: x, tolerance: 0.001 },
          workingNotes: `Since the logs share a base, drop them: $2x - ${offset} = ${rhsConst} \\implies 2x = ${rhsConst + offset} \\implies x = ${x}$. Both sides stay positive, so this is valid.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'This is a decay equation — the exponent will be negative, and $t$ will come out positive.' },
        { level: 2, content: 'Take $\\ln$ of both sides, remembering $\\ln(e^{-kt}) = -kt$.' },
        { level: 3, content: 'Isolate $t$ by dividing by $-k$; a negative divided by a negative gives a positive time.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomChoice(rng, [0.05, 0.1, 0.12] as const);
        const fraction = randomChoice(rng, [0.5, 0.25, 0.1] as const);
        const answerValue = -Math.log(fraction) / k;
        return {
          prompt: `A voltage decays as $e^{-${k}t} = ${fraction}$. Find $t$, to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.1 },
          workingNotes: `$-${k}t = \\ln(${fraction}) \\implies t = \\dfrac{\\ln(${fraction})}{-${k}} \\approx ${answerValue.toFixed(1)}$.`,
        };
      },
    },
  ],
  summary:
    'To solve for an exponent, take a log (usually $\\ln$) of both sides and use the power law to bring it '
    + 'down. To solve for something inside a log, rewrite using the definition $\\log_a(x)=c \\iff x=a^c$. If '
    + 'logs of the same base appear on both sides, drop them and solve what remains — then check the arguments '
    + 'stay positive.',
  keyFormulas: [
    { id: 'solve-power', label: 'Solving for a power in the exponent', formula: 'x = \\frac{\\ln(b)}{\\ln(a)}' },
    { id: 'solve-e-power', label: 'Solving for time in an e-power equation', formula: 't = \\frac{\\ln(b)}{k}' },
    { id: 'solve-log', label: 'Solving when the unknown is inside a log', formula: 'x = a^c' },
  ],
};
