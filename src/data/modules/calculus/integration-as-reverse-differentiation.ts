import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';

export const integrationAsReverseDifferentiation: Lesson = {
  id: 'integration-as-reverse-differentiation',
  moduleId: 'calculus',
  title: 'Integration as reverse differentiation',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'If you know how fast something is changing, integration lets you work backwards to find the original '
      + 'quantity — total distance travelled from a speed formula, total charge delivered from a current '
      + 'formula, total work done from a force formula. It is differentiation run in reverse, and it unlocks a '
      + 'whole new set of engineering questions.',
  },
  prerequisites: [
    {
      skill: { id: 'power-rule-for-integration', label: 'The power rule for differentiation' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Differentiate $y = x^4$ with respect to $x$.',
          answer: { type: 'expression', expression: '4*x^3', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Differentiate $y = x^6$ with respect to $x$.',
          answer: { type: 'expression', expression: '6*x^5', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'The power rule for differentiation: $\\dfrac{d}{dx}(x^n) = nx^{n-1}$. Integration is about running '
          + 'this process backwards — starting from a derivative and working out what function it came from.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        '**Integration undoes differentiation.** If differentiating $x^3$ gives $3x^2$, then integrating '
        + '$3x^2$ should give you back $x^3$. Integration is the reverse process: instead of "here is a '
        + 'function, find its gradient formula," it asks "here is a gradient formula, what function did it '
        + 'come from?"',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'To reverse the power rule, reverse each of its two steps in the opposite order: **add one to the '
        + 'power, then divide by that new power.**',
    },
    {
      id: 'e3',
      kind: 'notation',
      content: '$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\qquad (n \\neq -1)$$',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'The $\\int \\dots\\,dx$ notation means "integrate this with respect to $x$" — the $dx$ just labels '
        + 'which variable you are integrating over, in the same way $\\dfrac{dy}{dx}$ labels which variable a '
        + 'derivative is taken with respect to.',
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'Now, that "$+C$". Here is why it has to be there: $x^3$, $x^3+5$, and $x^3-100$ all have **exactly '
        + 'the same derivative**, $3x^2$ — adding a constant just shifts the whole curve up or down, and '
        + "shifting a curve vertically doesn't change its gradient anywhere. So if all you are given is the "
        + 'gradient formula $3x^2$, there is no way to know which of these curves — or the infinitely many '
        + 'others like them — you started from. The $+C$, called the **constant of integration**, honestly '
        + 'represents that missing piece of information.',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'In practice, if extra information pins down one point the curve passes through, you can solve for the '
        + 'exact value of $C$. Without that extra information, $+C$ simply stays as a symbol in the answer.',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        'Just like differentiation, integration works **term by term** for a polynomial: integrate each power '
        + 'term separately using the rule above, and a constant multiplier carries straight through unchanged.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'A single power term',
      scenario: 'Find $\\int 3x^2\\,dx$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Add one to the power.',
          mathLine: '\\text{new power} = 2+1 = 3',
        },
        {
          id: 's2',
          explanationWhy: 'Divide by the new power.',
          mathLine: '\\int 3x^2\\,dx = \\frac{3x^3}{3} + C',
        },
        {
          id: 's3',
          explanationWhy: 'Simplify — the 3s cancel exactly.',
          mathLine: '\\int 3x^2\\,dx = x^3 + C',
        },
      ],
      finalAnswer: '\\int 3x^2\\,dx = x^3 + C',
    },
    {
      id: 'w2',
      title: 'A polynomial, term by term',
      scenario: 'Find $\\int (4x^3 - 6x + 5)\\,dx$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Integrate the first term: add one to the power, then divide by it.',
          mathLine: '\\int 4x^3\\,dx = \\frac{4x^4}{4} = x^4',
        },
        {
          id: 's2',
          explanationWhy: 'The term $-6x$ is $-6x^1$: add one to the power (giving $x^2$), then divide by 2.',
          mathLine: '\\int -6x\\,dx = \\frac{-6x^2}{2} = -3x^2',
        },
        {
          id: 's3',
          explanationWhy: 'A constant term integrates to that constant times $x$ — think of it as $5x^0$: add one to the power to get $x^1$, then divide by 1.',
          mathLine: '\\int 5\\,dx = 5x',
        },
        {
          id: 's4',
          explanationWhy: 'Add the three results together, and do not forget the constant of integration.',
          mathLine: '\\int (4x^3 - 6x + 5)\\,dx = x^4 - 3x^2 + 5x + C',
        },
      ],
      finalAnswer: '\\int (4x^3 - 6x + 5)\\,dx = x^4 - 3x^2 + 5x + C',
    },
    {
      id: 'w3',
      title: 'A negative power',
      scenario: 'Find $\\int x^{-2}\\,dx$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Add one to the power: $-2+1=-1$.',
          mathLine: '\\text{new power} = -2+1 = -1',
        },
        {
          id: 's2',
          explanationWhy: 'Divide by the new power.',
          mathLine: '\\int x^{-2}\\,dx = \\frac{x^{-1}}{-1} + C = -x^{-1} + C',
        },
        {
          id: 's3',
          explanationWhy: 'Rewrite back as a fraction if you prefer that form.',
          mathLine: '\\int x^{-2}\\,dx = -\\frac{1}{x} + C',
        },
      ],
      finalAnswer: '\\int x^{-2}\\,dx = -\\frac{1}{x} + C',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Add one to the power, then divide the whole term by that new power.' },
        { level: 2, content: 'If the coefficient divides exactly by the new power, the arithmetic simplifies to a clean whole number.' },
        { level: 3, content: 'Your answer should be a single power term — you do not need to add $+C$ for these questions.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 1, 4);
        const k = randomInt(rng, 2, 6);
        const a = k * (n + 1);
        const newPower = n + 1;
        return {
          prompt: `Find $\\int ${a}x^{${n}}\\,dx$. (You do not need to include the $+C$.)`,
          answer: { type: 'expression', expression: `${k}*x^${newPower}`, variables: ['x'] },
          workingNotes: `Add one to the power ($${n}\\to${newPower}$) and divide by it: $\\dfrac{${a}x^{${newPower}}}{${newPower}} = ${k}x^{${newPower}}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${a}*x^${newPower}`, variables: ['x'] },
              feedback: `You raised the power correctly but forgot to divide by the new power, $${newPower}$.`,
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Integrate each term separately, exactly as you would differentiate term by term.' },
        { level: 2, content: 'For each term, add one to its power and then divide the whole term by that new power.' },
        { level: 3, content: 'Add your two integrated terms together — you do not need to include $+C$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 1, 3);
        const m = randomInt(rng, n + 1, 4);
        const k1 = randomInt(rng, 2, 5);
        const k2 = randomInt(rng, 2, 5);
        const a = k1 * (n + 1);
        const b = k2 * (m + 1);
        return {
          prompt: `Find $\\int (${a}x^{${n}} + ${b}x^{${m}})\\,dx$. (You do not need to include the $+C$.)`,
          answer: { type: 'expression', expression: `${k1}*x^${n + 1}+${k2}*x^${m + 1}`, variables: ['x'] },
          workingNotes: `$\\int ${a}x^{${n}}\\,dx = ${k1}x^{${n + 1}}$ and $\\int ${b}x^{${m}}\\,dx = ${k2}x^{${m + 1}}$, so the total is $${k1}x^{${n + 1}} + ${k2}x^{${m + 1}}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'There are three terms here, including a constant on its own — integrate each one.' },
        { level: 2, content: 'A constant term $c$ integrates to $cx$: think of it as $cx^0$, add one to the power, then divide by 1.' },
        { level: 3, content: 'Add all three integrated terms together — you do not need to include $+C$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 2, 3);
        const k1 = randomInt(rng, 2, 5);
        const a = k1 * (n + 1);
        const halfB = randomInt(rng, 1, 4);
        const b = 2 * halfB;
        const c = randomInt(rng, 1, 9);
        return {
          prompt: `Find $\\int (${a}x^{${n}} - ${b}x + ${c})\\,dx$. (You do not need to include the $+C$.)`,
          answer: { type: 'expression', expression: `${k1}*x^${n + 1}-${halfB}*x^2+${c}*x`, variables: ['x'] },
          workingNotes: `$\\int ${a}x^{${n}}\\,dx = ${k1}x^{${n + 1}}$, $\\int -${b}x\\,dx = -${halfB}x^2$, and $\\int ${c}\\,dx = ${c}x$. Total: $${k1}x^{${n + 1}} - ${halfB}x^2 + ${c}x$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Even though the power is negative, the same rule applies: add one to the power, then divide by the new power.' },
        { level: 2, content: 'Adding one to a negative power makes it less negative — for example $-3+1=-2$.' },
        { level: 3, content: 'Watch the signs carefully when you divide by the new (negative) power.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 2, 3);
        const k = randomInt(rng, 2, 5);
        const a = k * (n - 1);
        const newPower = 1 - n;
        const answerCoeff = -k;
        return {
          prompt: `Find $\\int \\dfrac{${a}}{x^{${n}}}\\,dx$. (You do not need to include the $+C$.)`,
          answer: { type: 'expression', expression: `${answerCoeff}*x^${newPower}`, variables: ['x'] },
          workingNotes: `Rewrite as $${a}x^{-${n}}$. Add one to the power ($-${n}\\to${newPower}$) and divide by it: $\\dfrac{${a}x^{${newPower}}}{${newPower}} = ${answerCoeff}x^{${newPower}}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${k}*x^${newPower}`, variables: ['x'] },
              feedback: 'Check your sign when dividing by the new power — the new power here is negative, so dividing by it should flip the sign of the coefficient.',
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'There are three power terms — integrate each one separately using the same rule as always.' },
        { level: 2, content: 'Add one to each power in turn, then divide each whole term by its own new power.' },
        { level: 3, content: 'Combine the three results, keeping every sign exactly as it appeared in the question — you do not need to include $+C$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k1 = randomInt(rng, 2, 4);
        const a = k1 * 4;
        const k2 = randomInt(rng, 2, 4);
        const b = k2 * 3;
        const halfC = randomInt(rng, 1, 4);
        const c = 2 * halfC;
        return {
          prompt: `Find $\\int (${a}x^3 - ${b}x^2 + ${c}x)\\,dx$. (You do not need to include the $+C$.)`,
          answer: { type: 'expression', expression: `${k1}*x^4-${k2}*x^3+${halfC}*x^2`, variables: ['x'] },
          workingNotes: `$\\int ${a}x^3\\,dx = ${k1}x^4$, $\\int -${b}x^2\\,dx = -${k2}x^3$, and $\\int ${c}x\\,dx = ${halfC}x^2$. Total: $${k1}x^4 - ${k2}x^3 + ${halfC}x^2$.`,
        };
      },
    },
  ],
  summary:
    'Integration reverses differentiation: to integrate $x^n$, add one to the power and divide by the new '
    + 'power, giving $\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$. Integrate polynomials term by term. The $+C$ '
    + 'exists because every vertical shift of a curve shares the same gradient formula, so the original '
    + 'starting height cannot be recovered from the gradient alone.',
  keyFormulas: [
    { id: 'power-rule-integral', label: 'Power rule for integration', formula: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C' },
    { id: 'constant-of-integration', label: 'Constant of integration', formula: '\\frac{d}{dx}\\big(F(x)+C\\big) = F\'(x)\\ \\text{for any constant } C' },
  ],
};
