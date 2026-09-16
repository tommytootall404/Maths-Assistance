import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const BASES = [2, 3, 5, 10] as const;

export const whatIsALog: Lesson = {
  id: 'what-is-a-log',
  moduleId: 'logs-exponentials',
  title: 'What is a logarithm?',
  estMinutes: 15,
  whyThisMatters: {
    scenario:
      'Sound levels in decibels, pH in chemistry, earthquake magnitude, and how fast a capacitor charges '
      + 'or discharges are all described using logarithms. They turn awkward, huge-range numbers into '
      + "something manageable — and once you know what a log actually *means*, the notation stops being scary.",
  },
  prerequisites: [
    {
      skill: { id: 'laws-of-indices', label: 'Laws of indices (powers)' },
      checkQuestions: [
        { id: 'q1', prompt: 'What is $2^3$?', answer: { type: 'numeric', value: 8 } },
        { id: 'q2', prompt: 'What is $5^2$?', answer: { type: 'numeric', value: 25 } },
        { id: 'q3', prompt: 'What is $10^0$?', answer: { type: 'numeric', value: 1 } },
      ],
      refresher: {
        summary:
          '$a^n$ means "multiply $a$ by itself, $n$ times." So $2^3 = 2 \\times 2 \\times 2 = 8$, and '
          + '$5^2 = 5 \\times 5 = 25$. Anything to the power $0$ is $1$ — for example $10^0 = 1$ — because '
          + 'each time the power drops by one, you divide by the base, and $10 \\div 10 = 1$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A logarithm just answers one question: **"what power do I need to raise this number to, in order to get '
        + 'that number?"** Nothing more mysterious than that.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'Take $2^3 = 8$. You already know this means "2 to the power 3 equals 8." A logarithm is exactly the '
        + 'same fact, just written to answer a different question. Instead of "what is 2 to the power 3?", it '
        + 'answers "what power do I raise 2 to, to get 8?" — and the answer is 3. We write that as '
        + '$\\log_2(8) = 3$.',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'In general, for a base $a$ (a positive number, not 1):\n\n$$\\log_a(b) = c \\iff a^c = b$$\n\n'
        + 'Read $\\log_a(b)$ out loud as "log, base $a$, of $b$" — or just "what power of $a$ gives $b$?"',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'Two useful special cases fall straight out of the definition: $\\log_a(a) = 1$, because $a^1 = a$. And '
        + '$\\log_a(1) = 0$, because anything to the power $0$ is $1$.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        "Logs can also be negative. $2^{-1} = \\frac{1}{2}$, so $\\log_2\\left(\\frac{1}{2}\\right) = -1$. A "
        + 'negative log just means the number is a fraction less than 1.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Evaluate a straightforward log',
      scenario: 'Find $\\log_2(16)$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Restate the question in the "what power" form — this is the whole trick.',
          mathLine: '\\log_2(16) = \\text{"2 to what power gives 16?"}',
        },
        {
          id: 's2',
          explanationWhy: 'List powers of 2 until you hit 16.',
          mathLine: '2^1=2,\\ 2^2=4,\\ 2^3=8,\\ 2^4=16',
        },
        {
          id: 's3',
          explanationWhy: '$2^4 = 16$, so the power we need is 4.',
          mathLine: '\\log_2(16) = 4',
        },
      ],
      finalAnswer: '\\log_2(16) = 4',
    },
    {
      id: 'w2',
      title: 'A log that comes out negative',
      scenario: 'Find $\\log_{10}(0.01)$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Same question as always: 10 to what power gives 0.01?',
          mathLine: '\\log_{10}(0.01) = \\text{"10 to what power gives } 0.01\\text{?"}',
        },
        {
          id: 's2',
          explanationWhy: 'Write 0.01 as a power of 10. Each negative power of 10 divides by 10 again.',
          mathLine: '10^{-1}=0.1,\\ 10^{-2}=0.01',
        },
        {
          id: 's3',
          explanationWhy: '$10^{-2} = 0.01$, so the power is $-2$.',
          mathLine: '\\log_{10}(0.01) = -2',
        },
      ],
      finalAnswer: '\\log_{10}(0.01) = -2',
    },
    {
      id: 'w3',
      title: 'A log of a fraction',
      scenario: 'Find $\\log_3\\left(\\frac{1}{9}\\right)$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Write the fraction as a power of the base, 3.',
          mathLine: '\\frac{1}{9} = \\frac{1}{3^2} = 3^{-2}',
        },
        {
          id: 's2',
          explanationWhy: 'Now it is obvious which power of 3 gives $\\frac{1}{9}$.',
          mathLine: '\\log_3\\left(\\frac{1}{9}\\right) = \\log_3(3^{-2}) = -2',
        },
      ],
      finalAnswer: '\\log_3\\left(\\frac{1}{9}\\right) = -2',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Rephrase it as a question: "base to what power gives the number inside the brackets?"' },
        { level: 2, content: 'List out powers of the base one at a time — $a^1, a^2, a^3, \\dots$ — until you reach the target number.' },
        { level: 3, content: 'The exponent that lands exactly on the target number is the answer to the log. Nothing else needs calculating.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, BASES);
        const exponent = randomInt(rng, 1, 4);
        const value = base ** exponent;
        return {
          prompt: `Find $\\log_{${base}}(${value})$.`,
          answer: { type: 'numeric', value: exponent, tolerance: 0.001 },
          workingNotes: `Ask "${base} to what power gives ${value}?" Since $${base}^{${exponent}} = ${value}$, the answer is ${exponent}.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: value / base },
              feedback: `It looks like you divided ${value} by ${base} instead. A log isn't division — it asks "what power?" Count how many times you multiply ${base} by itself to reach ${value}.`,
            },
            {
              matches: { type: 'numeric', value: value * base },
              feedback: `That looks like ${value} multiplied by ${base}. Remember $\\log_{${base}}(${value})$ asks for a power, not a product.`,
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This one is a special case — think about what happens when the exponent is 0 or 1.' },
        { level: 2, content: 'Any base to the power 0 is 1. Any base to the power 1 is just itself.' },
        { level: 3, content: 'If the number inside the log equals the base itself, the answer is 1. If the number inside the log is 1, the answer is 0.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, BASES);
        const useOne = rng() < 0.5;
        const value = useOne ? 1 : base;
        const answerValue = useOne ? 0 : 1;
        return {
          prompt: `Find $\\log_{${base}}(${value})$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.001 },
          workingNotes: useOne
            ? `Anything to the power 0 is 1, so $\\log_{${base}}(1) = 0$.`
            : `$${base}^1 = ${base}$, so $\\log_{${base}}(${base}) = 1$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: base },
              feedback: 'You may have written down the base itself rather than the power. Ask: "what power of the base gives this number?"',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Powers of the base grow quickly — try listing $a^1, a^2, a^3\\dots$ and compare.' },
        { level: 2, content: 'This target number might be larger than a small number of steps would suggest — keep going until you match it exactly.' },
        { level: 3, content: 'Once you find $a^n$ equal to the target, the log is simply $n$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [2, 3, 5] as const);
        const exponent = randomInt(rng, 2, 5);
        const value = base ** exponent;
        return {
          prompt: `Find $\\log_{${base}}(${value})$.`,
          answer: { type: 'numeric', value: exponent, tolerance: 0.001 },
          workingNotes: `$${base}^{${exponent}} = ${value}$, so $\\log_{${base}}(${value}) = ${exponent}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'A fraction less than 1 means the power is negative — remember $a^{-1} = \\frac{1}{a}$.' },
        { level: 2, content: 'Write the fraction as $\\frac{1}{a^n}$ first, which equals $a^{-n}$.' },
        { level: 3, content: 'Once the fraction is written as $a^{-n}$, the log is just $-n$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, BASES);
        const exponent = randomInt(rng, 1, 3);
        const denominator = base ** exponent;
        return {
          prompt: `Find $\\log_{${base}}\\left(\\frac{1}{${denominator}}\\right)$.`,
          answer: { type: 'numeric', value: -exponent, tolerance: 0.001 },
          workingNotes: `$\\frac{1}{${denominator}} = ${base}^{-${exponent}}$, so $\\log_{${base}}\\left(\\frac{1}{${denominator}}\\right) = -${exponent}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: exponent },
              feedback: 'You found the right size of power, but forgot the sign — a fraction less than 1 means a *negative* power.',
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: "Don't be put off by the larger base — the same idea applies: what power gives the target?" },
        { level: 2, content: 'Try squaring and cubing the base to see which lands on the target number.' },
        { level: 3, content: 'Match the target number exactly to a power of the base, then read off the exponent as your answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const base = randomChoice(rng, [4, 6, 7] as const);
        const exponent = randomInt(rng, 2, 3);
        const value = base ** exponent;
        return {
          prompt: `Find $\\log_{${base}}(${value})$.`,
          answer: { type: 'numeric', value: exponent, tolerance: 0.001 },
          workingNotes: `$${base}^{${exponent}} = ${value}$, so $\\log_{${base}}(${value}) = ${exponent}$.`,
        };
      },
    },
  ],
  summary:
    'A logarithm answers "what power?" — $\\log_a(b) = c$ means $a^c = b$. Logs of the base itself are 1, logs '
    + 'of 1 are always 0, and logs of fractions less than 1 come out negative.',
  keyFormulas: [
    { id: 'log-def', label: 'Definition of a logarithm', formula: '\\log_a(b) = c \\iff a^c = b' },
    { id: 'log-base-self', label: 'Log of the base itself', formula: '\\log_a(a) = 1' },
    { id: 'log-of-one', label: 'Log of 1', formula: '\\log_a(1) = 0' },
  ],
};
