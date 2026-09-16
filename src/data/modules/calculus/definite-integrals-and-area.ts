import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';

export const definiteIntegralsAndArea: Lesson = {
  id: 'definite-integrals-and-area',
  moduleId: 'calculus',
  title: 'Definite integrals and area',
  estMinutes: 20,
  whyThisMatters: {
    scenario:
      'A definite integral turns a rate-of-change graph into an actual total: the area under a velocity-time '
      + 'graph is a distance, the area under a force-displacement graph is an amount of work, the area under a '
      + 'current-time graph is a total charge. Putting numbers on the limits of integration is what makes '
      + 'calculus genuinely useful for real quantities, not just abstract formulas.',
  },
  prerequisites: [
    {
      skill: { id: 'indefinite-integration-recap', label: 'Indefinite integration' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Find $\\int 4x^3\\,dx$ (no need for $+C$).',
          answer: { type: 'expression', expression: 'x^4', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Find $\\int 6x\\,dx$ (no need for $+C$).',
          answer: { type: 'expression', expression: '3*x^2', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'Integrating $x^n$ means adding one to the power and dividing by the new power: '
          + '$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}+C$. This lesson uses that same skill, but now with two '
          + 'numbers attached to the integral sign.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A **definite integral** has two numbers attached to it, like $\\int_1^3$, called the **limits**. It '
        + "represents the (signed) area trapped between the curve and the x-axis, between those two x-values. "
        + 'Unlike an indefinite integral, a definite integral has a single numeric answer — there is no $+C$.',
    },
    {
      id: 'e2',
      kind: 'notation',
      content: '$$\\int_a^b f(x)\\,dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a)$$',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'Here $F(x)$ is any antiderivative of $f(x)$ — found exactly as in the last lesson. The square-bracket '
        + 'notation $\\big[F(x)\\big]_a^b$ just means "evaluate $F$ at the top limit, then subtract $F$ '
        + 'evaluated at the bottom limit."',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'Notice the $+C$ never needs to be written for a definite integral, because it always cancels: if you '
        + 'used $F(x)+C$ instead, you would get $\\big(F(b)+C\\big) - \\big(F(a)+C\\big)$, and the two $C$s '
        + 'subtract away to nothing. So you can safely ignore $+C$ the moment limits are attached.',
    },
    {
      id: 'e5',
      kind: 'visual',
      content:
        'Try the tool below. Drag the two sliders to change the limits $a$ and $b$, watch the shaded region '
        + 'change, and compare it with the exact value calculated by evaluating $F(b)-F(a)$.',
      visual: { component: 'area-under-curve' },
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'If the curve dips below the x-axis between $a$ and $b$, that part of the "area" comes out negative — '
        + 'the integral gives the **signed** area, not always the physical area you would measure with a ruler. '
        + 'Every example in this lesson stays above the x-axis, so this will not come up yet, but keep it in '
        + 'mind for later.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'A straightforward definite integral',
      scenario: 'Evaluate $\\int_1^3 2x\\,dx$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Find the antiderivative first, exactly as in the last lesson.',
          mathLine: '\\int 2x\\,dx = x^2',
        },
        {
          id: 's2',
          explanationWhy: 'Evaluate the antiderivative at the top limit, $x=3$.',
          mathLine: '3^2 = 9',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate the antiderivative at the bottom limit, $x=1$, and subtract.',
          mathLine: '\\int_1^3 2x\\,dx = 9 - 1^2 = 9 - 1',
        },
      ],
      finalAnswer: '\\int_1^3 2x\\,dx = 8',
    },
    {
      id: 'w2',
      title: 'A polynomial definite integral',
      scenario: 'Evaluate $\\int_0^2 (3x^2+1)\\,dx$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Find the antiderivative term by term.',
          mathLine: '\\int (3x^2+1)\\,dx = x^3+x',
        },
        {
          id: 's2',
          explanationWhy: 'Evaluate at the top limit, $x=2$.',
          mathLine: '(2)^3+(2) = 8+2 = 10',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate at the bottom limit, $x=0$, and subtract.',
          mathLine: '(0)^3+(0) = 0',
        },
      ],
      finalAnswer: '\\int_0^2 (3x^2+1)\\,dx = 10',
    },
    {
      id: 'w3',
      title: 'Engineering context: distance from a velocity graph',
      scenario:
        'A vehicle\'s velocity is $v(t) = 2t+3$ (m/s), where $t$ is time in seconds. Find the distance '
        + 'travelled between $t=0$ and $t=4$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Distance travelled is the area under a velocity-time graph, so integrate $v(t)$ between the two times.',
          mathLine: '\\text{distance} = \\int_0^4 (2t+3)\\,dt',
        },
        {
          id: 's2',
          explanationWhy: 'Find the antiderivative.',
          mathLine: '\\int (2t+3)\\,dt = t^2+3t',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate at $t=4$ and $t=0$, then subtract.',
          mathLine: '(4^2+3\\times4) - (0^2+3\\times0) = 28 - 0',
        },
      ],
      finalAnswer: '\\text{distance} = 28\\text{ m}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Find the antiderivative first, then evaluate it at the top and bottom limits.' },
        { level: 2, content: 'Substitute the top limit into the antiderivative, then substitute the bottom limit in separately.' },
        { level: 3, content: 'Subtract the bottom-limit value from the top-limit value — that difference is the final answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const kHalf = randomInt(rng, 1, 5);
        const k = 2 * kHalf;
        const a = randomInt(rng, 0, 3);
        const b = randomInt(rng, a + 1, 6);
        const answerValue = kHalf * (b * b - a * a);
        return {
          prompt: `Evaluate $\\int_{${a}}^{${b}} ${k}x\\,dx$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `Antiderivative: $${kHalf}x^2$. $\\big[${kHalf}x^2\\big]_{${a}}^{${b}} = ${kHalf}(${b})^2 - ${kHalf}(${a})^2 = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Integrate the power term as usual, then apply the two limits.' },
        { level: 2, content: 'Add one to the power and divide by the new power to get the antiderivative.' },
        { level: 3, content: 'Cube the top limit and the bottom limit separately inside the antiderivative, then subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const kThird = randomInt(rng, 1, 4);
        const k = 3 * kThird;
        const a = randomInt(rng, 0, 2);
        const b = randomInt(rng, a + 1, 4);
        const answerValue = kThird * (b ** 3 - a ** 3);
        return {
          prompt: `Evaluate $\\int_{${a}}^{${b}} ${k}x^2\\,dx$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `Antiderivative: $${kThird}x^3$. $\\big[${kThird}x^3\\big]_{${a}}^{${b}} = ${kThird}(${b})^3 - ${kThird}(${a})^3 = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Integrate each term separately, including the constant.' },
        { level: 2, content: 'Remember a constant $m$ integrates to $mx$.' },
        { level: 3, content: 'Substitute both limits into the full antiderivative and subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const kThird = randomInt(rng, 1, 4);
        const k = 3 * kThird;
        const m = randomInt(rng, 1, 6);
        const a = randomInt(rng, 0, 2);
        const b = randomInt(rng, a + 1, 4);
        const answerValue = kThird * (b ** 3 - a ** 3) + m * (b - a);
        return {
          prompt: `Evaluate $\\int_{${a}}^{${b}} (${k}x^2 + ${m})\\,dx$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `Antiderivative: $${kThird}x^3+${m}x$. $\\big[${kThird}x^3+${m}x\\big]_{${a}}^{${b}} = ${kThird}(${b})^3+${m}(${b}) - \\big(${kThird}(${a})^3+${m}(${a})\\big) = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Integrate each of the two power terms separately.' },
        { level: 2, content: 'Keep the minus sign attached to the second term all the way through.' },
        { level: 3, content: 'Substitute the top limit into the full antiderivative, then the bottom limit, then subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const pQuarter = randomInt(rng, 1, 3);
        const p = 4 * pQuarter;
        const qHalf = randomInt(rng, 1, 4);
        const q = 2 * qHalf;
        const a = randomInt(rng, 0, 1);
        const b = randomInt(rng, a + 2, 3);
        const answerValue = pQuarter * (b ** 4 - a ** 4) - qHalf * (b * b - a * a);
        return {
          prompt: `Evaluate $\\int_{${a}}^{${b}} (${p}x^3 - ${q}x)\\,dx$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01 },
          workingNotes: `Antiderivative: $${pQuarter}x^4-${qHalf}x^2$. $\\big[${pQuarter}x^4-${qHalf}x^2\\big]_{${a}}^{${b}} = ${answerValue}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'The distance travelled is the definite integral of the velocity function between the two times.' },
        { level: 2, content: 'Find the antiderivative of $kt+c$ first, then apply the two time limits.' },
        { level: 3, content: 'Substitute the later time and the earlier time into the antiderivative, then subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const kHalf = randomInt(rng, 1, 4);
        const k = 2 * kHalf;
        const c = randomInt(rng, 1, 6);
        const a = randomInt(rng, 0, 2);
        const b = randomInt(rng, a + 2, 6);
        const answerValue = kHalf * (b * b - a * a) + c * (b - a);
        return {
          prompt: `A component moves with velocity $v(t) = ${k}t + ${c}$ (m/s). Find the distance travelled between $t=${a}\\text{ s}$ and $t=${b}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'm' },
          workingNotes: `Distance $= \\int_{${a}}^{${b}} (${k}t+${c})\\,dt$. Antiderivative: $${kHalf}t^2+${c}t$. Evaluating between the limits gives $${answerValue}\\text{ m}$.`,
        };
      },
    },
  ],
  summary:
    'A definite integral $\\int_a^b f(x)\\,dx$ gives the signed area under $f(x)$ between $x=a$ and $x=b$, '
    + 'computed as $F(b)-F(a)$ using any antiderivative $F$ — the $+C$ always cancels out. Physically, it '
    + 'converts a rate-of-change graph into a total, like turning a velocity graph into a distance.',
  keyFormulas: [
    {
      id: 'ftc',
      label: 'Definite integral',
      formula: '\\int_a^b f(x)\\,dx = F(b) - F(a)',
      notes: 'where $F$ is any antiderivative of $f$.',
    },
  ],
};
