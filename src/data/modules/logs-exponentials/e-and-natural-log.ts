import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

export const eAndNaturalLog: Lesson = {
  id: 'e-and-natural-log',
  moduleId: 'logs-exponentials',
  title: 'e and the natural log',
  estMinutes: 18,
  whyThisMatters: {
    scenario:
      'Almost every "continuous change" process in engineering — a capacitor discharging, heat escaping into '
      + 'a room, a signal decaying, a structure creeping under load — is naturally described using a special '
      + 'number called $e$. Your calculator has a dedicated $\\ln$ button because this comes up so often.',
  },
  prerequisites: [
    {
      skill: { id: 'log-laws', label: 'Laws of logarithms' },
      checkQuestions: [
        { id: 'q1', prompt: 'Simplify $\\log_2(4) + \\log_2(2)$ to a single number.', answer: { type: 'numeric', value: 3 } },
        { id: 'q2', prompt: 'Evaluate $2\\log_{10}(10)$.', answer: { type: 'numeric', value: 2 } },
      ],
      refresher: {
        summary:
          'The product law combines added logs into one: $\\log_a(x) + \\log_a(y) = \\log_a(xy)$. The power law '
          + 'moves a multiplier inside as an exponent: $n\\log_a(x) = \\log_a(x^n)$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        "$e$ is just a number, like $\\pi$ — it isn't a variable and it doesn't stand for anything you choose. "
        + 'Its value is approximately $e \\approx 2.71828$, and it goes on forever without repeating, just like '
        + '$\\pi$ does.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Why does this particular number matter so much? It turns out that $e$ is *the* number that describes '
        + 'continuous growth or decay — growth that happens smoothly at every instant, rather than in jumps. '
        + 'Populations, radioactive decay, capacitor voltages, and cooling objects all follow this pattern, so '
        + '$e$ shows up constantly in engineering formulas of the form $y = Ae^{kt}$.',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'Because $e$ is used as a base so often, its logarithm gets its own name and symbol: the **natural '
        + 'logarithm**, written $\\ln(x)$, which just means $\\log_e(x)$.',
    },
    { id: 'e4', kind: 'notation', content: '$$\\ln(x) = \\log_e(x)$$' },
    {
      id: 'e5',
      kind: 'plain',
      content:
        '$e^x$ and $\\ln(x)$ are **inverse functions** — they undo each other completely, the same way squaring '
        + 'and square-rooting undo each other. If you raise $e$ to a power and then take $\\ln$ of the result, '
        + "you get back exactly the power you started with, and vice versa. This is the single most useful fact "
        + 'in this lesson.',
    },
    { id: 'e6', kind: 'notation', content: '$$\\ln(e^x) = x \\qquad\\qquad e^{\\ln(x)} = x \\ (x>0)$$' },
    {
      id: 'e7',
      kind: 'note',
      content:
        'On your calculator, the $\\log$ button (base 10) and the $\\ln$ button (base $e$) are different '
        + 'buttons that give different answers for the same number — always check you are pressing the right one.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Using the inverse relationship',
      scenario: 'Evaluate $\\ln(e^5)$ without a calculator.',
      steps: [
        {
          id: 's1',
          explanationWhy: '$\\ln$ and raising $e$ to a power are inverse operations — they cancel out completely.',
          mathLine: '\\ln(e^5) = 5',
        },
      ],
      finalAnswer: '\\ln(e^5) = 5',
    },
    {
      id: 'w2',
      title: 'Solving for an exponent using ln',
      scenario: 'A quantity grows as $e^x = 20$. Find $x$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'To undo $e$ to a power, take $\\ln$ of both sides.',
          mathLine: '\\ln(e^x) = \\ln(20)',
        },
        {
          id: 's2',
          explanationWhy: 'The left side simplifies immediately, since $\\ln$ and $e^{(\\cdot)}$ cancel.',
          mathLine: 'x = \\ln(20)',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate on a calculator using the $\\ln$ button.',
          mathLine: 'x \\approx 3.00',
        },
      ],
      finalAnswer: 'x \\approx 3.00',
    },
    {
      id: 'w3',
      title: 'Engineering context: continuous growth',
      scenario:
        'The number of bacteria in a culture grows as $N = N_0 e^{kt}$. If $N_0 = 100$ and $k = 0.05$ per hour, '
        + 'find $N$ after 10 hours.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Substitute the known values into the formula.',
          mathLine: 'N = 100 \\, e^{0.05 \\times 10}',
        },
        { id: 's2', explanationWhy: 'Simplify the exponent first.', mathLine: 'N = 100 \\, e^{0.5}' },
        {
          id: 's3',
          explanationWhy: 'Evaluate $e^{0.5}$ on a calculator.',
          mathLine: 'e^{0.5} \\approx 1.6487',
        },
        {
          id: 's4',
          explanationWhy: 'Multiply through to get the final population.',
          mathLine: 'N \\approx 100 \\times 1.6487 \\approx 164.9',
        },
      ],
      finalAnswer: 'N \\approx 165 \\text{ bacteria}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: '$\\ln$ and $e$-to-a-power are opposites — think about what they do to each other.' },
        { level: 2, content: 'When $\\ln$ is applied directly to $e^{(\\text{something})}$, the $e$ and $\\ln$ cancel completely.' },
        { level: 3, content: 'The answer is simply whatever power of $e$ was inside the brackets.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const power = randomInt(rng, 2, 9);
        return {
          prompt: `Evaluate $\\ln(e^{${power}})$.`,
          answer: { type: 'numeric', value: power, tolerance: 0.001 },
          workingNotes: `$\\ln$ and $e^{(\\cdot)}$ are inverse operations, so $\\ln(e^{${power}}) = ${power}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Recall the two special values: $e^0$ and $\\ln(1)$.' },
        { level: 2, content: 'Anything to the power 0 is 1, so $e^0 = 1$. And since $e^0 = 1$, $\\ln(1) = 0$.' },
        { level: 3, content: 'Use the definitions directly — no calculator needed for either of these.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const askForLn1 = rng() < 0.5;
        return askForLn1
          ? {
              prompt: 'Evaluate $\\ln(1)$.',
              answer: { type: 'numeric', value: 0, tolerance: 0.001 },
              workingNotes: 'Since $e^0 = 1$, it follows that $\\ln(1) = 0$.',
            }
          : {
              prompt: 'Evaluate $e^0$.',
              answer: { type: 'numeric', value: 1, tolerance: 0.001 },
              workingNotes: 'Anything to the power 0 equals 1, so $e^0 = 1$.',
            };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'To undo "$e$ to the power of something", apply $\\ln$ to both sides of the equation.' },
        { level: 2, content: 'Once you take $\\ln$ of both sides, the left side collapses to just the exponent.' },
        { level: 3, content: 'Use your calculator\'s $\\ln$ button on the right-hand number to finish.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const target = randomInt(rng, 5, 60);
        const answerValue = Math.log(target);
        return {
          prompt: `Solve $e^x = ${target}$ for $x$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.02 },
          workingNotes: `Take $\\ln$ of both sides: $x = \\ln(${target}) \\approx ${answerValue.toFixed(2)}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Substitute the numbers into the formula first, then simplify the exponent.' },
        { level: 2, content: 'Multiply out the exponent to get a single decimal power of $e$, then evaluate on a calculator.' },
        { level: 3, content: 'Once you have $e^{(\\text{number})}$, multiply by the value out front to finish.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n0 = randomChoice(rng, [50, 100, 200] as const);
        const k = randomChoice(rng, [0.02, 0.04, 0.05, 0.1] as const);
        const t = randomInt(rng, 5, 20);
        const answerValue = n0 * Math.exp(k * t);
        return {
          prompt: `A quantity grows as $N = N_0 e^{kt}$ with $N_0 = ${n0}$ and $k = ${k}$ per second. Find $N$ at $t = ${t}$ seconds, to the nearest whole number.`,
          answer: { type: 'numeric', value: answerValue, tolerance: Math.max(1, answerValue * 0.01) },
          workingNotes: `$N = ${n0} e^{${k} \\times ${t}} = ${n0} e^{${(k * t).toFixed(2)}} \\approx ${answerValue.toFixed(1)}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'This decays rather than grows — the exponent will be negative.' },
        { level: 2, content: 'Substitute carefully, keeping the negative sign on the exponent throughout.' },
        { level: 3, content: 'Simplify the exponent to a single decimal, evaluate $e$ to that power, then multiply by the value out front.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n0 = randomChoice(rng, [80, 120, 150] as const);
        const k = randomChoice(rng, [0.03, 0.06, 0.08] as const);
        const t = randomInt(rng, 5, 15);
        const answerValue = n0 * Math.exp(-k * t);
        return {
          prompt: `A signal decays as $N = N_0 e^{-kt}$ with $N_0 = ${n0}$ and $k = ${k}$ per second. Find $N$ at $t = ${t}$ seconds, to 1 decimal place.`,
          answer: { type: 'numeric', value: answerValue, tolerance: Math.max(0.5, answerValue * 0.01) },
          workingNotes: `$N = ${n0} e^{-${k} \\times ${t}} = ${n0} e^{-${(k * t).toFixed(2)}} \\approx ${answerValue.toFixed(1)}$.`,
        };
      },
    },
  ],
  summary:
    '$e \\approx 2.71828$ is the natural base of continuous growth and decay. Its logarithm, $\\ln(x)$, undoes '
    + '$e^x$ exactly: $\\ln(e^x) = x$ and $e^{\\ln(x)} = x$. To solve for an exponent, take $\\ln$ of both sides.',
  keyFormulas: [
    { id: 'e-value', label: 'Value of e', formula: 'e \\approx 2.71828' },
    { id: 'ln-def', label: 'Definition of ln', formula: '\\ln(x) = \\log_e(x)' },
    { id: 'inverse-1', label: 'Inverse relationship', formula: '\\ln(e^x) = x' },
    { id: 'inverse-2', label: 'Inverse relationship', formula: 'e^{\\ln(x)} = x \\ (x > 0)' },
  ],
};
