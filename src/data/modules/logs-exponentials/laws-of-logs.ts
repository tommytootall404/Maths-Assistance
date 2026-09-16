import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const BASES = [2, 3, 5, 10] as const;

export const lawsOfLogs: Lesson = {
  id: 'laws-of-logs',
  moduleId: 'logs-exponentials',
  title: 'Laws of logarithms',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'Engineers rarely deal with one clean log at a time — you often need to combine or split logs when '
      + 'working with gain in decibels, pH mixtures, or simplifying formulas before plugging numbers in. The '
      + 'laws of logs let you rearrange these expressions safely, the same way the laws of indices let you '
      + 'rearrange powers.',
  },
  prerequisites: [
    {
      skill: { id: 'evaluating-logs', label: 'Evaluating simple logarithms' },
      checkQuestions: [
        { id: 'q1', prompt: 'Find $\\log_2(8)$.', answer: { type: 'numeric', value: 3 } },
        { id: 'q2', prompt: 'Find $\\log_{10}(100)$.', answer: { type: 'numeric', value: 2 } },
      ],
      refresher: {
        summary:
          'Remember: $\\log_a(b)$ asks "what power of $a$ gives $b$?" Since $2^3 = 8$, $\\log_2(8) = 3$. Since '
          + '$10^2 = 100$, $\\log_{10}(100) = 2$.',
      },
    },
    {
      skill: { id: 'laws-of-indices-multiply', label: 'Laws of indices: multiplying powers' },
      checkQuestions: [
        {
          id: 'q3',
          prompt: 'Simplify $a^2 \\times a^3$ (answer as $a$ to a power, e.g. type "a^5").',
          answer: { type: 'expression', expression: 'a^5', variables: ['a'] },
        },
      ],
      refresher: {
        summary:
          'When you multiply powers of the *same* base, you add the exponents: $a^m \\times a^n = a^{m+n}$. '
          + 'This is exactly why the log laws below work the way they do.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Because a logarithm is really just an exponent in disguise, the log laws are the index laws written '
        + 'in "power" language. There are three you need for T Level engineering maths.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        '**Product law**: the log of two numbers multiplied together is the sum of their logs — because '
        + 'multiplying numbers means *adding* their powers.',
    },
    { id: 'e3', kind: 'notation', content: '$$\\log_a(xy) = \\log_a(x) + \\log_a(y)$$' },
    {
      id: 'e4',
      kind: 'plain',
      content:
        '**Quotient law**: the log of one number divided by another is the *difference* of their logs — because '
        + 'dividing means subtracting powers.',
    },
    { id: 'e5', kind: 'notation', content: '$$\\log_a\\left(\\frac{x}{y}\\right) = \\log_a(x) - \\log_a(y)$$' },
    {
      id: 'e6',
      kind: 'plain',
      content:
        '**Power law**: if the number inside the log is raised to a power, that power can be brought out to the '
        + 'front as a multiplier.',
    },
    { id: 'e7', kind: 'notation', content: '$$\\log_a(x^n) = n\\log_a(x)$$' },
    {
      id: 'e8',
      kind: 'note',
      content:
        'A very common trap: $\\log_a(x + y)$ is **not** the same as $\\log_a(x) + \\log_a(y)$. The laws only '
        + 'work for multiplying, dividing, and raising to powers — never for adding or subtracting *inside* the '
        + 'log.',
    },
    {
      id: 'e9',
      kind: 'plain',
      content:
        "Your calculator only has buttons for $\\log$ (base 10) and $\\ln$ (base $e$ — more on that next lesson). "
        + 'If you ever need a log in a different base, the **change of base** rule converts it: '
        + '$\\log_a(b) = \\dfrac{\\log_c(b)}{\\log_c(a)}$ for any base $c$ you like — usually base 10 or $e$, '
        + "since that's what the calculator gives you.",
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Combine two logs with the product law',
      scenario: 'Simplify $\\log_2(8) + \\log_2(4)$ into a single log, then evaluate it.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'The product law turns "log plus log" into a single log of a product.',
          mathLine: '\\log_2(8) + \\log_2(4) = \\log_2(8 \\times 4)',
        },
        { id: 's2', explanationWhy: 'Multiply the numbers inside.', mathLine: '= \\log_2(32)' },
        {
          id: 's3',
          explanationWhy: '$2^5 = 32$, so this evaluates directly.',
          mathLine: '= 5',
        },
        {
          id: 's4',
          explanationWhy: 'Check: $\\log_2(8) = 3$ and $\\log_2(4) = 2$, and $3 + 2 = 5$. It matches.',
          mathLine: '\\log_2(8) + \\log_2(4) = 3 + 2 = 5 \\checkmark',
        },
      ],
      finalAnswer: '\\log_2(8) + \\log_2(4) = 5',
    },
    {
      id: 'w2',
      title: 'Use the power law and quotient law together',
      scenario: 'Simplify $2\\log_3(9) - \\log_3(3)$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Use the power law to move the 2 inside as an exponent first.',
          mathLine: '2\\log_3(9) = \\log_3(9^2) = \\log_3(81)',
        },
        {
          id: 's2',
          explanationWhy: 'Now use the quotient law to combine the subtraction into one log.',
          mathLine: '\\log_3(81) - \\log_3(3) = \\log_3\\left(\\frac{81}{3}\\right) = \\log_3(27)',
        },
        {
          id: 's3',
          explanationWhy: '$3^3 = 27$.',
          mathLine: '\\log_3(27) = 3',
        },
      ],
      finalAnswer: '2\\log_3(9) - \\log_3(3) = 3',
    },
    {
      id: 'w3',
      title: 'Engineering flavour: a ratio of readings',
      scenario:
        'A sensor reading increases from 10 units to 1000 units. Express the change as $\\log_{10}(1000) - \\log_{10}(10)$ '
        + 'as a single log, and evaluate it — this is the same structure used when calculating gain in decibels.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Apply the quotient law to combine the two logs.',
          mathLine: '\\log_{10}(1000) - \\log_{10}(10) = \\log_{10}\\left(\\frac{1000}{10}\\right) = \\log_{10}(100)',
        },
        {
          id: 's2',
          explanationWhy: '$10^2 = 100$.',
          mathLine: '\\log_{10}(100) = 2',
        },
      ],
      finalAnswer: '\\log_{10}(1000) - \\log_{10}(10) = 2',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Two logs of the same base, added together — which law combines them into one log?' },
        { level: 2, content: 'The product law says $\\log_a(x) + \\log_a(y) = \\log_a(xy)$. Multiply the numbers inside first.' },
        { level: 3, content: 'Combine into a single log using the product law, then evaluate that single log directly.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, BASES);
        const e1 = randomInt(rng, 1, 3);
        const e2 = randomInt(rng, 1, 3);
        const x = base ** e1;
        const y = base ** e2;
        return {
          prompt: `Write $\\log_{${base}}(${x}) + \\log_{${base}}(${y})$ as a single value.`,
          answer: { type: 'numeric', value: e1 + e2, tolerance: 0.001 },
          workingNotes: `$\\log_{${base}}(${x}) + \\log_{${base}}(${y}) = \\log_{${base}}(${x * y}) = ${e1 + e2}$ since $${base}^{${e1 + e2}} = ${x * y}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Two logs of the same base, subtracted — which law applies?' },
        { level: 2, content: 'The quotient law says $\\log_a(x) - \\log_a(y) = \\log_a\\left(\\frac{x}{y}\\right)$. Divide the numbers inside.' },
        { level: 3, content: 'Combine into a single log by dividing, then evaluate that single log directly.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, BASES);
        const eBig = randomInt(rng, 2, 5);
        const eSmall = randomInt(rng, 1, eBig - 1);
        const x = base ** eBig;
        const y = base ** eSmall;
        return {
          prompt: `Write $\\log_{${base}}(${x}) - \\log_{${base}}(${y})$ as a single value.`,
          answer: { type: 'numeric', value: eBig - eSmall, tolerance: 0.001 },
          workingNotes: `$\\log_{${base}}(${x}) - \\log_{${base}}(${y}) = \\log_{${base}}\\left(\\frac{${x}}{${y}}\\right) = ${eBig - eSmall}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'A number multiplying a log means "bring it inside as a power" — use the power law.' },
        { level: 2, content: '$n\\log_a(x) = \\log_a(x^n)$. Work out $x^n$ first, then evaluate the log of that.' },
        { level: 3, content: 'Rewrite as a single log using the power law, then evaluate it directly — same method as worked example 2.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [2, 3] as const);
        const inner = randomInt(rng, 2, 3);
        const n = randomInt(rng, 2, 3);
        const x = base ** inner;
        const answerValue = n * inner;
        return {
          prompt: `Evaluate $${n}\\log_{${base}}(${x})$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.001 },
          workingNotes: `$${n}\\log_{${base}}(${x}) = \\log_{${base}}(${x}^{${n}}) = \\log_{${base}}(${x ** n}) = ${answerValue}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: n + inner },
              feedback: `It looks like you added ${n} and ${inner}. The power law says to *multiply* the exponent by ${n}, not add — bring the ${n} inside as a power first: $\\log_{${base}}(${x}^{${n}})$.`,
            },
          ],
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: "This mixes multiplying, dividing and a power — take it one law at a time." },
        { level: 2, content: 'Deal with the power first (bring it inside as an exponent), then combine the remaining logs with the product/quotient law.' },
        { level: 3, content: 'End up with a single log, then evaluate it the same way you always do: "what power of the base gives this number?"' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = 2;
        const a = randomInt(rng, 1, 3);
        const b = randomInt(rng, 1, 2);
        const xA = base ** a;
        const xB = base ** b;
        const answerValue = a + b;
        return {
          prompt: `Evaluate $\\log_{${base}}(${xA}) + \\log_{${base}}(${xB})$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.001 },
          workingNotes: `$\\log_{${base}}(${xA}) + \\log_{${base}}(${xB}) = \\log_{${base}}(${xA * xB}) = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Watch carefully whether each term is added or subtracted — that decides product law vs quotient law.' },
        { level: 2, content: 'Apply the power law to any coefficient first, then combine everything left to right into one log.' },
        { level: 3, content: 'Reduce the whole expression to a single log of one number, then evaluate that number as a power of the base.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = 2;
        const a = randomInt(rng, 3, 5);
        const b = randomInt(rng, 1, 2);
        const c = randomInt(rng, 1, 2);
        const xA = base ** a;
        const xB = base ** b;
        const xC = base ** c;
        const answerValue = a - b + c;
        return {
          prompt: `Evaluate $\\log_{${base}}(${xA}) - \\log_{${base}}(${xB}) + \\log_{${base}}(${xC})$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.001 },
          workingNotes: `Combine left to right: $\\log_{${base}}\\left(\\frac{${xA}}{${xB}}\\right) + \\log_{${base}}(${xC}) = \\log_{${base}}\\left(\\frac{${xA}}{${xB}} \\times ${xC}\\right) = \\log_{${base}}(${(xA / xB) * xC}) = ${answerValue}$.`,
        };
      },
    },
  ],
  summary:
    'The three log laws mirror the index laws: multiplying inside a log means adding logs (product law), '
    + 'dividing means subtracting (quotient law), and a power inside a log can be brought out front as a '
    + 'multiplier (power law). They never apply to addition or subtraction inside the log itself.',
  keyFormulas: [
    { id: 'product-law', label: 'Product law', formula: '\\log_a(xy) = \\log_a(x) + \\log_a(y)' },
    { id: 'quotient-law', label: 'Quotient law', formula: '\\log_a\\left(\\frac{x}{y}\\right) = \\log_a(x) - \\log_a(y)' },
    { id: 'power-law', label: 'Power law', formula: '\\log_a(x^n) = n\\log_a(x)' },
    { id: 'change-of-base', label: 'Change of base', formula: '\\log_a(b) = \\frac{\\log_c(b)}{\\log_c(a)}' },
  ],
};
