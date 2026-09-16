import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt, randomChoice } from '../../../lib/random';

export const differentiatingPowersAndPolynomials: Lesson = {
  id: 'differentiating-powers-and-polynomials',
  moduleId: 'calculus',
  title: 'Differentiating powers and polynomials',
  estMinutes: 22,
  whyThisMatters: {
    scenario:
      'Every curve on an engineering graph — stress against strain, voltage against time, the height of a '
      + 'beam along its length — has a gradient that changes as you move along it. Differentiation is the tool '
      + 'that gives you a formula for that gradient at any point, instead of just one number for a whole graph. '
      + "It's the foundation every other technique in this module is built on.",
  },
  prerequisites: [
    {
      skill: { id: 'laws-of-indices-calc', label: 'Laws of indices (powers)' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Simplify $x^2 \\times x^3$.',
          answer: { type: 'expression', expression: 'x^5', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Write $\\dfrac{1}{x^2}$ using a negative power of $x$.',
          answer: { type: 'expression', expression: 'x^(-2)', variables: ['x'] },
        },
        {
          id: 'q3',
          prompt: 'Write $\\sqrt{x}$ using a fractional power of $x$.',
          answer: { type: 'expression', expression: 'x^(1/2)', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'A negative power means "one over": $x^{-n} = \\dfrac{1}{x^n}$. A fractional power means a root: '
          + '$x^{1/2} = \\sqrt{x}$. These rewrites matter because the differentiation rule in this lesson only '
          + 'works cleanly once everything is written as $x$ to a power.',
      },
    },
    {
      skill: { id: 'gradient-of-a-line', label: 'Gradient of a straight line' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Find the gradient of the line joining $(1, 2)$ and $(3, 8)$.',
          answer: { type: 'numeric', value: 3 },
        },
        {
          id: 'q2',
          prompt: 'Find the gradient of the line joining $(0, 5)$ and $(4, -3)$.',
          answer: { type: 'numeric', value: -2 },
        },
      ],
      refresher: {
        summary:
          'Gradient is $\\dfrac{\\Delta y}{\\Delta x}$ — the change in $y$ divided by the change in $x$ between '
          + 'two points: $\\dfrac{y_2-y_1}{x_2-x_1}$. A straight line has exactly the same gradient everywhere '
          + 'along it, so it never matters which two points you pick.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'You already know how to find the gradient of a straight line — pick any two points and use '
        + '$\\dfrac{\\Delta y}{\\Delta x}$, the rise divided by the run. A straight line has the same gradient '
        + 'everywhere: pick any two points on it and you get the same answer every time.',
    },
    {
      id: 'e2',
      kind: 'notation',
      content: '$$\\text{gradient} = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2-y_1}{x_2-x_1}$$',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        "A curve is different. Its steepness changes as you move along it — think of a car's distance-time "
        + 'graph as it speeds up, or the curved profile of a beam under load. A single number cannot describe '
        + "the gradient of a whole curve, because it's different at every point. What we need instead is a "
        + '**formula** that gives the gradient at any $x$-value you choose. That formula is called the '
        + '**derivative**, and finding it is called **differentiation**.',
    },
    {
      id: 'e4',
      kind: 'visual',
      content:
        'Try dragging the point along the curve $y=x^2$ below. The straight line shown is the **tangent** — it '
        + 'just touches the curve at that point, matching its steepness exactly there. The gradient reading is '
        + 'the exact gradient of the curve at that one point.',
      visual: { component: 'tangent-explorer' },
    },
    {
      id: 'e5',
      kind: 'plain',
      content:
        'Notice the pattern as you drag: at $x=1$ the gradient reads $2$, at $x=2$ it reads $4$, at $x=3$ it '
        + 'reads $6$. The gradient always comes out as $2x$. That is exactly what differentiation gives you — '
        + 'for $y=x^2$, the gradient formula is $\\dfrac{dy}{dx} = 2x$.',
    },
    {
      id: 'e6',
      kind: 'notation',
      content: '$$y = x^2 \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = 2x$$',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        'Two notations for a derivative mean exactly the same thing: $f\'(x)$ ("f dash of x", or "f prime") '
        + 'and $\\dfrac{dy}{dx}$ ("dee y by dee x") are both just ways of writing "the gradient formula." Which '
        + 'one you see depends only on whether the function was written as $y = \\dots$ or $f(x) = \\dots$.',
    },
    {
      id: 'e8',
      kind: 'notation',
      content:
        'The general pattern for any power of $x$ is called the **power rule**:\n\n'
        + '$$\\frac{d}{dx}\\left(x^n\\right) = n x^{n-1}$$\n\n'
        + 'Multiply by the old power, then reduce the power by one. This works for *any* real number $n$ — '
        + 'positive, negative, or a fraction.',
    },
    {
      id: 'e9',
      kind: 'plain',
      content:
        'A polynomial is just several power terms added or subtracted, like $y = 3x^2 - 5x + 7$. Differentiate '
        + 'it **term by term**: find the derivative of each piece separately, keeping its plus or minus sign, '
        + 'and add the results together.',
    },
    {
      id: 'e10',
      kind: 'plain',
      content:
        'A constant on its own, like the $+7$ above, always differentiates to $0$. That makes sense: a '
        + 'constant is a flat horizontal line on a graph, and a flat line has zero gradient everywhere — it '
        + "isn't changing at all.",
    },
    {
      id: 'e11',
      kind: 'note',
      content:
        'Negative and fractional powers follow the exact same power rule, once you rewrite roots and fractions '
        + 'as powers first. For example $\\dfrac{1}{x^2} = x^{-2}$, and $\\sqrt{x} = x^{1/2}$ — after that '
        + 'rewrite, the power rule applies exactly as before.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Differentiate a single power term',
      scenario: 'Differentiate $y = x^4$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Apply the power rule: multiply by the old power, then reduce the power by one.',
          mathLine: '\\frac{dy}{dx} = 4x^{4-1}',
        },
        {
          id: 's2',
          explanationWhy: 'Simplify the new power.',
          mathLine: '\\frac{dy}{dx} = 4x^3',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 4x^3',
    },
    {
      id: 'w2',
      title: 'Differentiate a polynomial term by term',
      scenario: 'Differentiate $y = 3x^2 - 5x + 7$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate the first term using the power rule.',
          mathLine: '\\frac{d}{dx}(3x^2) = 3 \\times 2 x^{2-1} = 6x',
        },
        {
          id: 's2',
          explanationWhy: 'The middle term is $x^1$, so its derivative is just its coefficient.',
          mathLine: '\\frac{d}{dx}(-5x) = -5x^{1-1} = -5x^0 = -5',
        },
        {
          id: 's3',
          explanationWhy: 'A constant term differentiates to zero — it has no gradient.',
          mathLine: '\\frac{d}{dx}(7) = 0',
        },
        {
          id: 's4',
          explanationWhy: 'Add the three results back together.',
          mathLine: '\\frac{dy}{dx} = 6x - 5',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 6x - 5',
    },
    {
      id: 'w3',
      title: 'Negative powers',
      scenario: 'Differentiate $y = \\dfrac{1}{x^2}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Rewrite the fraction as a negative power so the power rule can be applied.',
          mathLine: 'y = x^{-2}',
        },
        {
          id: 's2',
          explanationWhy: 'Apply the power rule: multiply by $-2$, then reduce the power by one.',
          mathLine: '\\frac{dy}{dx} = -2x^{-2-1} = -2x^{-3}',
        },
        {
          id: 's3',
          explanationWhy: 'Rewrite back as a fraction if you prefer that form.',
          mathLine: '\\frac{dy}{dx} = -\\frac{2}{x^3}',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = -\\frac{2}{x^3}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Use the power rule: multiply by the power, then reduce the power by one.' },
        { level: 2, content: 'If $y = ax^n$, the derivative is $a \\times n \\times x^{n-1}$ — work out the new coefficient first.' },
        { level: 3, content: 'Multiply the coefficient by the power to get the new coefficient, then subtract one from the power. That is the full answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 2, 4);
        const a = randomInt(rng, 2, 6);
        const coeff = a * n;
        const power = n - 1;
        return {
          prompt: `Differentiate $y = ${a}x^{${n}}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeff}*x^${power}`, variables: ['x'] },
          workingNotes: `Multiply by the old power and reduce the power by one: $\\dfrac{dy}{dx} = ${a}\\times ${n}\\,x^{${power}} = ${coeff}x^{${power}}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${a}*x^${power}`, variables: ['x'] },
              feedback:
                'You reduced the power correctly but forgot to multiply by the original power first. The power '
                + 'rule needs both steps: multiply by $n$, then reduce the power by one.',
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Differentiate the power term as usual, then think about what happens to the constant.' },
        { level: 2, content: 'A constant on its own is a flat line, so it contributes nothing to the gradient.' },
        { level: 3, content: 'The constant term simply disappears from the derivative — only the power term survives.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 2, 3);
        const a = randomInt(rng, 2, 5);
        const c = randomInt(rng, 1, 9);
        const coeff = a * n;
        const power = n - 1;
        return {
          prompt: `Differentiate $y = ${a}x^{${n}} + ${c}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeff}*x^${power}`, variables: ['x'] },
          workingNotes: `The power term differentiates to $${coeff}x^{${power}}$; the constant $+${c}$ differentiates to $0$, since $\\frac{d}{dx}(c)=0$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${coeff}*x^${power}+${c}`, variables: ['x'] },
              feedback:
                "A constant doesn't just carry over unchanged — it differentiates to zero, because a constant is "
                + 'a flat line with no gradient. Drop it from your derivative.',
            },
          ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate each term separately, then add the results together.' },
        { level: 2, content: 'Apply the power rule to both power terms in turn: multiply by the power, reduce the power by one.' },
        { level: 3, content: 'If a term reduces to $x^0$, remember $x^0=1$, so that term becomes just its coefficient.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n = randomInt(rng, 2, 4);
        const m = randomInt(rng, 1, n - 1);
        const a = randomInt(rng, 2, 6);
        const b = randomInt(rng, 2, 6);
        const coeffN = a * n;
        const powerN = n - 1;
        const coeffM = b * m;
        const powerM = m - 1;
        const secondTerm = powerM === 0 ? `${coeffM}` : `${coeffM}*x^${powerM}`;
        return {
          prompt: `Differentiate $y = ${a}x^{${n}} + ${b}x^{${m}}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeffN}*x^${powerN}+${secondTerm}`, variables: ['x'] },
          workingNotes: `$\\dfrac{d}{dx}(${a}x^{${n}}) = ${coeffN}x^{${powerN}}$ and $\\dfrac{d}{dx}(${b}x^{${m}}) = ${secondTerm}$, so $\\dfrac{dy}{dx} = ${coeffN}x^{${powerN}} + ${secondTerm}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'There are four terms — differentiate every single one, including the constant.' },
        { level: 2, content: 'Keep track of the signs carefully: a minus sign in front of a term stays attached to it.' },
        { level: 3, content: 'The final constant term differentiates to zero, so it should not appear anywhere in your answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 5);
        const b = randomInt(rng, 2, 6);
        const c = randomInt(rng, 2, 8);
        const d = randomInt(rng, 1, 9);
        const coeffCubed = 3 * a;
        const coeffSquared = 2 * b;
        return {
          prompt: `Differentiate $y = ${a}x^3 - ${b}x^2 + ${c}x - ${d}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeffCubed}*x^2-${coeffSquared}*x+${c}`, variables: ['x'] },
          workingNotes: `$\\dfrac{dy}{dx} = ${coeffCubed}x^2 - ${coeffSquared}x + ${c}$ — the derivative of $${c}x$ is just $${c}$, and the constant $-${d}$ differentiates to $0$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${coeffCubed}*x^2-${coeffSquared}*x+${c}-${d}`, variables: ['x'] },
              feedback: `The constant term $-${d}$ should disappear completely — a constant always differentiates to $0$, it doesn't carry through unchanged.`,
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Rewrite the fraction term as a negative power of $x$ before differentiating.' },
        { level: 2, content: 'Apply the power rule to the negative power exactly as normal: multiply by the power, then reduce it by one (which makes it more negative).' },
        { level: 3, content: 'Double-check your signs: a negative power reduced by one stays negative, and multiplying two negatives (the original coefficient sign and the power) can flip the overall sign.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 5);
        const b = randomInt(rng, 2, 6);
        const n = randomChoice(rng, [2, 3] as const);
        const coeffX = 2 * a;
        const coeffPower = -(b * n);
        const newPower = -(n + 1);
        return {
          prompt: `Differentiate $y = ${a}x^2 + \\dfrac{${b}}{x^{${n}}}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeffX}*x+${coeffPower}*x^${newPower}`, variables: ['x'] },
          workingNotes: `Rewrite $\\dfrac{${b}}{x^{${n}}} = ${b}x^{-${n}}$, so its derivative is $${coeffPower}x^{${newPower}}$. Combined with $\\dfrac{d}{dx}(${a}x^2)=${coeffX}x$, the full derivative is $${coeffX}x ${coeffPower}x^{${newPower}}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${coeffX}*x+${b * n}*x^${newPower}`, variables: ['x'] },
              feedback:
                'Check the sign on the second term — differentiating a negative power keeps a negative power, and '
                + 'here it also flips the sign of the coefficient. Redo that term carefully.',
            },
          ],
        };
      },
    },
  ],
  summary:
    'Differentiation gives a formula for the gradient of a curve at any point. For $y=x^n$, the power rule '
    + 'says $\\dfrac{dy}{dx}=nx^{n-1}$ — multiply by the power, then reduce the power by one. Differentiate '
    + 'polynomials term by term, remember constants always differentiate to $0$, and rewrite negative or '
    + 'fractional powers as $x$ to a power before applying the rule.',
  keyFormulas: [
    { id: 'power-rule', label: 'Power rule', formula: '\\frac{d}{dx}(x^n) = nx^{n-1}' },
    { id: 'constant-rule', label: 'Derivative of a constant', formula: '\\frac{d}{dx}(c) = 0' },
    {
      id: 'sum-rule',
      label: 'Term-by-term (sum) rule',
      formula: "\\frac{d}{dx}\\big(f(x)+g(x)\\big) = f'(x)+g'(x)",
    },
  ],
};
