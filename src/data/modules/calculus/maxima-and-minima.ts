import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt, randomChoice } from '../../../lib/random';

export const maximaAndMinima: Lesson = {
  id: 'maxima-and-minima',
  moduleId: 'calculus',
  title: 'Maxima, minima and optimisation',
  estMinutes: 28,
  whyThisMatters: {
    scenario:
      "\"What dimensions use the least material?\" and \"what setting gives the biggest output?\" are two of "
      + 'the most common questions in engineering design. Differentiation answers both, by turning a geometry '
      + 'or design problem into a single equation: find where the gradient is exactly zero.',
  },
  prerequisites: [
    {
      skill: { id: 'differentiation-recap-optimisation', label: 'Differentiation rules so far' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Differentiate $f(x) = x^3 - 6x$ with respect to $x$.',
          answer: { type: 'expression', expression: '3*x^2-6', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Differentiate $f(x) = 2x^3 - 3x^2$ with respect to $x$.',
          answer: { type: 'expression', expression: '6*x^2-6*x', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'This lesson relies on the power rule from earlier: $\\dfrac{d}{dx}(x^n) = nx^{n-1}$, applied term '
          + 'by term. You will differentiate a formula, then differentiate it a second time.',
      },
    },
    {
      skill: { id: 'forming-expressions-from-diagrams', label: 'Forming an expression from a diagram or constraint' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'A rectangle has length $x$ cm and width $(10-x)$ cm. Write an expression for its area, $A(x)$.',
          answer: { type: 'expression', expression: 'x*(10-x)', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'A rectangle has a fixed perimeter of 30 cm. If one side has length $x$, write an expression for the length of the adjacent side.',
          answer: { type: 'expression', expression: '15-x', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'Often the hardest part of an optimisation problem is not the calculus — it is turning a diagram or '
          + 'a fixed total (a perimeter, an area, a volume) into a single formula in one variable. The trick is '
          + 'to use the fixed total to write every other length in terms of just one unknown, usually called '
          + '$x$, before any differentiating happens.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'At a **maximum** (the top of a "hill" on a graph) or a **minimum** (the bottom of a "valley"), the '
        + 'curve momentarily flattens out before turning back the other way. These points are called '
        + '**stationary points**, and at a stationary point the gradient is exactly zero.',
    },
    { id: 'e2', kind: 'notation', content: '$$f\'(x) = 0 \\quad \\text{at a stationary point}$$' },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'To tell a maximum from a minimum in plain English, check the gradient just **before** and just '
        + '**after** the stationary point. If the gradient goes from positive (rising) to negative (falling) as '
        + 'you pass through the point, it is a **maximum** — like walking over the top of a hill. If it goes '
        + 'from negative to positive, it is a **minimum** — like walking through the bottom of a valley.',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'There is a faster shortcut that avoids checking either side by hand: the **second derivative**, '
        + '$f\'\'(x)$ — the derivative of the derivative. It measures how the gradient itself is changing, '
        + 'which tells you which way the curve is bending at that point.',
    },
    {
      id: 'e5',
      kind: 'notation',
      content:
        '$$f\'\'(x) < 0 \\implies \\text{maximum (curve bending downwards)}$$'
        + '\n\n'
        + '$$f\'\'(x) > 0 \\implies \\text{minimum (curve bending upwards)}$$',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'If $f\'\'(x) = 0$, the second derivative test does not tell you anything — fall back on checking the '
        + 'gradient either side by hand instead.',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        'This turns real design questions into calculus: "what dimensions give the largest volume?" or "what '
        + 'shape uses the least material?" First write a single-variable formula for the quantity you care '
        + 'about (often using a fixed constraint to eliminate a second variable), then differentiate it and '
        + 'set the result to zero to find the best value.',
    },
    {
      id: 'e8',
      kind: 'plain',
      content:
        'A classic example: take a flat square (or rectangular) sheet, cut a small square of side $x$ from '
        + 'each corner, then fold up the four flaps to make an open-topped box. Making $x$ small gives a wide, '
        + 'shallow box; making $x$ large gives a tall, narrow one. Somewhere in between is the value of $x$ '
        + 'that gives the **maximum volume** — exactly the kind of question differentiation is built to answer.',
    },
    {
      id: 'e9',
      kind: 'plain',
      content:
        'Another classic: a cylindrical can needs to hold a fixed volume of liquid, but you want to use the '
        + '**minimum amount of metal** (surface area) to make it — cheaper and lighter. The volume being fixed '
        + 'is the constraint that lets you write the radius and height in terms of just one variable before '
        + 'differentiating.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Finding and classifying stationary points',
      scenario: 'Find and classify the stationary points of $f(x) = x^3 - 6x^2 + 9x + 1$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate, then set the derivative to zero to find the stationary points.',
          mathLine: "f'(x) = 3x^2 - 12x + 9 = 0",
        },
        {
          id: 's2',
          explanationWhy: 'Divide through by 3 and factorise.',
          mathLine: 'x^2 - 4x + 3 = 0 \\implies (x-1)(x-3) = 0',
        },
        {
          id: 's3',
          explanationWhy: 'So there are two stationary points, at $x=1$ and $x=3$.',
          mathLine: 'x = 1 \\quad \\text{or} \\quad x = 3',
        },
        {
          id: 's4',
          explanationWhy: 'Find the second derivative to classify each one.',
          mathLine: "f''(x) = 6x - 12",
        },
        {
          id: 's5',
          explanationWhy: 'At $x=1$: $f\'\'(1) = 6-12 = -6$, which is negative, so this is a maximum.',
          mathLine: "f''(1) = -6 < 0 \\implies \\text{maximum}",
        },
        {
          id: 's6',
          explanationWhy: 'At $x=3$: $f\'\'(3) = 18-12 = 6$, which is positive, so this is a minimum.',
          mathLine: "f''(3) = 6 > 0 \\implies \\text{minimum}",
        },
      ],
      finalAnswer: '\\text{Maximum at } x=1 \\ (f(1)=5), \\quad \\text{minimum at } x=3 \\ (f(3)=1)',
    },
    {
      id: 'w2',
      title: 'Maximum volume of an open box',
      scenario:
        'A square sheet of metal has sides of length $12\\text{ cm}$. Squares of side $x$ are cut from each '
        + 'corner, and the sides are folded up to make an open-topped box. Find the value of $x$ that maximises '
        + 'the volume, and the maximum volume itself.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'After folding, the base is a square of side $(12-2x)$, and the height is $x$. Write the volume as a function of $x$.',
          mathLine: 'V(x) = x(12-2x)^2',
        },
        {
          id: 's2',
          explanationWhy: 'Expand so it is easier to differentiate.',
          mathLine: 'V(x) = 4x^3 - 48x^2 + 144x',
        },
        {
          id: 's3',
          explanationWhy: 'Differentiate and set equal to zero to find the stationary points.',
          mathLine: "V'(x) = 12x^2 - 96x + 144 = 0",
        },
        {
          id: 's4',
          explanationWhy: 'Divide through by 12 and factorise.',
          mathLine: 'x^2 - 8x + 12 = 0 \\implies (x-2)(x-6) = 0',
        },
        {
          id: 's5',
          explanationWhy: '$x=6$ is not physically valid here — it would make the base side $(12-2x)$ equal to zero, giving no box at all. That leaves $x=2$.',
          mathLine: 'x = 2 \\ (\\text{valid}), \\quad x = 6 \\ (\\text{rejected})',
        },
        {
          id: 's6',
          explanationWhy: 'Confirm $x=2$ is a maximum using the second derivative.',
          mathLine: "V''(x) = 24x - 96 \\implies V''(2) = -48 < 0 \\implies \\text{maximum}",
        },
        {
          id: 's7',
          explanationWhy: 'Substitute $x=2$ back into the volume formula.',
          mathLine: 'V(2) = 2(12-4)^2 = 2\\times64',
        },
      ],
      finalAnswer: 'x = 2\\text{ cm}, \\quad V_{max} = 128\\text{ cm}^3',
    },
    {
      id: 'w3',
      title: 'Minimum surface area of a closed cylinder',
      scenario:
        'A closed cylindrical can must hold a fixed volume of $V = 1000\\text{ cm}^3$. Find the radius and '
        + 'height that minimise the surface area (the amount of metal used).',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Write down the fixed constraint (volume) and the quantity to minimise (surface area) in terms of radius $r$ and height $h$.',
          mathLine: 'V = \\pi r^2 h \\qquad A = 2\\pi r^2 + 2\\pi rh',
        },
        {
          id: 's2',
          explanationWhy: 'Use the volume constraint to write $h$ in terms of $r$, so $A$ depends on only one variable.',
          mathLine: 'h = \\frac{V}{\\pi r^2}',
        },
        {
          id: 's3',
          explanationWhy: 'Substitute into the surface area formula.',
          mathLine: 'A(r) = 2\\pi r^2 + 2\\pi r\\left(\\frac{V}{\\pi r^2}\\right) = 2\\pi r^2 + \\frac{2V}{r}',
        },
        {
          id: 's4',
          explanationWhy: 'Differentiate with respect to $r$ and set equal to zero.',
          mathLine: "A'(r) = 4\\pi r - \\frac{2V}{r^2} = 0",
        },
        {
          id: 's5',
          explanationWhy: 'Rearrange to solve for $r$.',
          mathLine: 'r^3 = \\frac{V}{2\\pi} \\implies r = \\left(\\frac{V}{2\\pi}\\right)^{1/3}',
        },
        {
          id: 's6',
          explanationWhy: 'Second derivative $A\'\'(r) = 4\\pi + \\frac{4V}{r^3}$ is always positive for $r>0$, so this stationary point is always a minimum.',
          mathLine: "A''(r) = 4\\pi + \\frac{4V}{r^3} > 0 \\implies \\text{minimum}",
        },
        {
          id: 's7',
          explanationWhy: 'Substitute $V=1000$ to get a number for the radius.',
          mathLine: 'r = \\left(\\frac{1000}{2\\pi}\\right)^{1/3} \\approx 5.42\\text{ cm}',
        },
        {
          id: 's8',
          explanationWhy: 'Find $h$ from the constraint. A neat pattern falls out: at the minimum, the height always equals the diameter, $h=2r$.',
          mathLine: 'h = \\frac{V}{\\pi r^2} \\approx 10.84\\text{ cm} \\ (= 2r)',
        },
      ],
      finalAnswer: 'r \\approx 5.42\\text{ cm}, \\quad h \\approx 10.84\\text{ cm}, \\quad A_{min} \\approx 553.6\\text{ cm}^2',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Differentiate $f(x)$ and set the result equal to zero.' },
        { level: 2, content: 'Solve the resulting linear equation for $x$.' },
        { level: 3, content: 'Since the coefficient of $x^2$ in $f(x)$ is positive, the curve is a standard upward-opening parabola, so this stationary point is automatically a minimum.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomInt(rng, 2, 8);
        const m = randomInt(rng, 1, 10);
        return {
          prompt: `Find the $x$-coordinate of the stationary point of $f(x) = x^2 - ${2 * k}x + ${m}$, and state whether it is a maximum or a minimum.`,
          answer: { type: 'numeric', value: k, tolerance: 0.001 },
          workingNotes: `$f'(x) = 2x - ${2 * k} = 0 \\implies x = ${k}$. Since the $x^2$ coefficient is positive, this is a **minimum**.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: -k, tolerance: 0.001 },
              feedback: 'You have the right size but the wrong sign — solve $2x - ' + (2 * k) + ' = 0$ carefully for $x$.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Differentiate the height formula with respect to time, and set the result equal to zero.' },
        { level: 2, content: 'The maximum height happens exactly when the vertical velocity is zero.' },
        { level: 3, content: 'Solve the resulting linear equation for $t$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const v0Tens = randomInt(rng, 2, 6);
        const v0 = v0Tens * 10;
        const answerValue = v0Tens;
        return {
          prompt: `A ball's height is modelled by $h(t) = -5t^2 + ${v0}t$ (metres), where $t$ is time in seconds. Find the time at which it reaches its maximum height.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.001, units: 's' },
          workingNotes: `$h'(t) = -10t + ${v0} = 0 \\implies t = \\dfrac{${v0}}{10} = ${answerValue}\\text{ s}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate $f(x)$ and set the result equal to zero.' },
        { level: 2, content: 'You should get $x^2 = (\\text{some number})$ — this has two solutions, one positive and one negative. The question only asks for the positive one.' },
        { level: 3, content: 'Use the second derivative $f\'\'(x)=6x$ to classify the positive stationary point.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomInt(rng, 2, 5);
        const p = k * k;
        return {
          prompt: `$f(x) = x^3 - ${3 * p}x$ has two stationary points. Find the **positive** $x$-coordinate, and state whether it is a maximum or a minimum.`,
          answer: { type: 'numeric', value: k, tolerance: 0.001 },
          workingNotes: `$f'(x) = 3x^2 - ${3 * p} = 0 \\implies x^2 = ${p} \\implies x = \\pm${k}$. At $x=${k}$, $f''(x)=6x=${6 * k}>0$, so this is a **minimum**.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Write the volume as a function of $x$: the base side is $(L-2x)$ and the height is $x$, where $L$ is the sheet side length.' },
        { level: 2, content: 'Expand $V(x)$, differentiate it, and set the result equal to zero — you will get a quadratic in $x$.' },
        { level: 3, content: 'One of the two solutions makes the base side length zero (no box at all) and must be rejected — the other is the answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const multiple = randomInt(rng, 1, 5);
        const L = multiple * 6;
        const answerValue = L / 6;
        return {
          prompt: `An open-topped box is made by cutting squares of side $x$ from each corner of a square sheet of side $${L}\\text{ cm}$, then folding up the sides. Find the value of $x$ that maximises the volume.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'cm' },
          workingNotes: `$V(x) = x(${L}-2x)^2$. Differentiating and setting $V'(x)=0$ gives $12x^2 - ${8 * L}x + ${L * L} = 0$, which factorises to give $x = \\dfrac{${L}}{6} = ${answerValue}$ (the other root, $x=\\dfrac{${L}}{2}$, makes the base vanish, so it is rejected).`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: L / 2, tolerance: 0.01 },
              feedback: `That is the other root of the quadratic, but it makes the base side $(${L}-2x)$ equal to zero — no box at all. Reject it and use the other solution instead.`,
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Use the volume constraint $V=\\pi r^2 h$ to write $h$ in terms of $r$, then substitute into the surface area formula $A = 2\\pi r^2 + 2\\pi rh$.' },
        { level: 2, content: 'Differentiate $A(r)$ with respect to $r$ and set the result equal to zero.' },
        { level: 3, content: 'Rearrange to $r^3 = \\dfrac{V}{2\\pi}$, then take a cube root to find $r$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const V = randomChoice(rng, [500, 800, 1000, 1500, 2000] as const);
        const answerValue = Math.cbrt(V / (2 * Math.PI));
        return {
          prompt: `A closed cylindrical can must hold a fixed volume of $V = ${V}\\text{ cm}^3$. Find the radius that minimises its surface area, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.02, units: 'cm' },
          workingNotes: `$A(r) = 2\\pi r^2 + \\dfrac{2V}{r}$. Setting $A'(r) = 4\\pi r - \\dfrac{2V}{r^2} = 0$ gives $r = \\left(\\dfrac{V}{2\\pi}\\right)^{1/3} \\approx ${answerValue.toFixed(2)}\\text{ cm}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: Math.cbrt(V / Math.PI), tolerance: 0.02 },
              feedback: 'That answer comes from treating the can as open-topped (surface area $2\\pi rh + \\pi r^2$ only). This can is **closed**, with two circular ends, so the surface area formula needs an extra $\\pi r^2$ term.',
            },
          ],
        };
      },
    },
  ],
  summary:
    'Stationary points occur where $f\'(x)=0$. Classify them by checking whether the gradient changes from '
    + 'positive to negative (a maximum) or negative to positive (a minimum) either side — or use the shortcut '
    + '$f\'\'(x)<0$ for a maximum, $f\'\'(x)>0$ for a minimum. In an optimisation problem, use any fixed '
    + 'constraint to write the quantity of interest as a single-variable formula first, then differentiate and '
    + 'set it to zero.',
  keyFormulas: [
    { id: 'stationary-point', label: 'Stationary point condition', formula: "f'(x) = 0" },
    { id: 'second-derivative-max', label: 'Second derivative test (maximum)', formula: "f''(x) < 0" },
    { id: 'second-derivative-min', label: 'Second derivative test (minimum)', formula: "f''(x) > 0" },
  ],
};
