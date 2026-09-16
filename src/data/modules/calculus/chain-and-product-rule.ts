import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt, randomChoice } from '../../../lib/random';

export const chainAndProductRule: Lesson = {
  id: 'chain-and-product-rule',
  moduleId: 'calculus',
  title: 'The chain rule and product rule',
  estMinutes: 26,
  whyThisMatters: {
    scenario:
      'Real engineering formulas are rarely a single clean power of $x$. They are functions built out of '
      + 'other functions — like a damped oscillation $\\sin(2t)$, or a signal that is the product of a growing '
      + 'amplitude and an oscillation, $t^2\\sin(t)$. The chain rule and product rule let you differentiate '
      + 'these combinations without ever having to expand them out by hand.',
  },
  prerequisites: [
    {
      skill: { id: 'diff-recap', label: 'Power, trig and exponential derivatives' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Differentiate $y = x^5$ with respect to $x$.',
          answer: { type: 'expression', expression: '5*x^4', variables: ['x'] },
        },
        {
          id: 'q2',
          prompt: 'Differentiate $y = \\sin x$ with respect to $x$.',
          answer: { type: 'expression', expression: 'cos(x)', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'You already know $\\dfrac{d}{dx}(x^n) = nx^{n-1}$, $\\dfrac{d}{dx}(\\sin x) = \\cos x$, '
          + '$\\dfrac{d}{dx}(\\cos x) = -\\sin x$, and $\\dfrac{d}{dx}(e^x) = e^x$. This lesson shows how to use '
          + 'those same rules when functions are combined together.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'Sometimes a function is "a function of a function" — like $(3x+1)^5$. It is not just $x$ raised to a '
        + 'power; it is *the whole bracket* $3x+1$ raised to a power. The plain power rule cannot be applied '
        + 'directly here, because the thing being raised to a power is not simply $x$.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        'The **chain rule** handles exactly this. In plain English: **differentiate the outside function, '
        + 'treating the inside as one single block — then multiply by the derivative of the inside.**',
    },
    {
      id: 'e3',
      kind: 'notation',
      content:
        'For $y = (ax+b)^n$, the outside is "something to the power $n$" and the inside is $ax+b$:\n\n'
        + '$$\\frac{dy}{dx} = n(ax+b)^{n-1} \\times a$$\n\n'
        + 'the last factor of $a$ is the derivative of the inside, $ax+b$.',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'The same idea applies to trig and exponential functions with something other than plain $x$ inside '
        + 'them. For $y = \\sin(2x)$: the outside is "$\\sin$ of something," which differentiates to "$\\cos$ '
        + 'of that same something," and the inside is $2x$, which differentiates to $2$.',
    },
    {
      id: 'e5',
      kind: 'notation',
      content: '$$y = \\sin(2x) \\quad\\Longrightarrow\\quad \\frac{dy}{dx} = \\cos(2x) \\times 2 = 2\\cos(2x)$$',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'A very common mistake is differentiating only the outside and forgetting to multiply by the '
        + 'derivative of the inside — or the reverse, multiplying by the inside function itself rather than '
        + 'its derivative. Always ask: "what is inside the brackets, and what is *its* derivative?"',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        'The **product rule** is for a different situation: two separate functions **multiplied together**, '
        + 'like $x^2\\sin x$. You cannot just differentiate each part and multiply the results — that gives '
        + 'the wrong answer. Instead, call the two parts $u$ and $v$. The rule is: **(derivative of the first) '
        + '× (the second, unchanged), plus (the first, unchanged) × (derivative of the second)**.',
    },
    {
      id: 'e8',
      kind: 'notation',
      content: "$$\\frac{d}{dx}(uv) = u'v + uv'$$",
    },
    {
      id: 'e9',
      kind: 'plain',
      content:
        'For $y = x^2\\sin x$: let $u = x^2$ (so $u\' = 2x$) and $v = \\sin x$ (so $v\' = \\cos x$). Then '
        + '$\\dfrac{dy}{dx} = u\'v + uv\' = 2x\\sin x + x^2\\cos x$. Notice the final answer has two terms — '
        + 'that is always true for a product-rule derivative, and is a useful way to check you have not missed '
        + 'a piece.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Chain rule: a bracket raised to a power',
      scenario: 'Differentiate $y = (3x+1)^5$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate the outside (the power), treating the bracket as one block.',
          mathLine: '\\text{outside: } 5(3x+1)^{4}',
        },
        {
          id: 's2',
          explanationWhy: 'Find the derivative of the inside, $3x+1$.',
          mathLine: '\\text{inside derivative: } \\frac{d}{dx}(3x+1) = 3',
        },
        {
          id: 's3',
          explanationWhy: 'Multiply the two together — that is the chain rule.',
          mathLine: '\\frac{dy}{dx} = 5(3x+1)^4 \\times 3 = 15(3x+1)^4',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 15(3x+1)^4',
    },
    {
      id: 'w2',
      title: 'Chain rule: sine of a multiple of x',
      scenario: 'Differentiate $y = \\sin(2x)$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Differentiate the outside: $\\sin$ of something becomes $\\cos$ of that same something.',
          mathLine: '\\text{outside: } \\cos(2x)',
        },
        {
          id: 's2',
          explanationWhy: 'Find the derivative of the inside, $2x$.',
          mathLine: '\\text{inside derivative: } \\frac{d}{dx}(2x) = 2',
        },
        {
          id: 's3',
          explanationWhy: 'Multiply the two together.',
          mathLine: '\\frac{dy}{dx} = \\cos(2x) \\times 2 = 2\\cos(2x)',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 2\\cos(2x)',
    },
    {
      id: 'w3',
      title: 'Product rule: two functions multiplied together',
      scenario: 'Differentiate $y = x^2\\sin x$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Label the two parts and find each of their derivatives separately.',
          mathLine: 'u = x^2,\\ u\' = 2x \\qquad v = \\sin x,\\ v\' = \\cos x',
        },
        {
          id: 's2',
          explanationWhy: "Apply the product rule pattern: $u'v + uv'$.",
          mathLine: "\\frac{dy}{dx} = u'v + uv' = (2x)(\\sin x) + (x^2)(\\cos x)",
        },
        {
          id: 's3',
          explanationWhy: 'Tidy up the final expression.',
          mathLine: '\\frac{dy}{dx} = 2x\\sin x + x^2\\cos x',
        },
      ],
      finalAnswer: '\\frac{dy}{dx} = 2x\\sin x + x^2\\cos x',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This is a chain rule question: differentiate the outside power, then multiply by the derivative of the inside bracket.' },
        { level: 2, content: 'The derivative of the inside bracket $ax+b$ is simply $a$.' },
        { level: 3, content: 'Multiply the power out front by $a$ to get the new coefficient, then reduce the power on the bracket by one.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 5);
        const b = randomInt(rng, 1, 6);
        const n = randomInt(rng, 2, 4);
        const coeff = a * n;
        const power = n - 1;
        return {
          prompt: `Differentiate $y = (${a}x+${b})^{${n}}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${coeff}*(${a}*x+${b})^${power}`, variables: ['x'] },
          workingNotes: `Outside: $${n}(${a}x+${b})^{${power}}$. Inside derivative: $${a}$. Multiply: $\\dfrac{dy}{dx} = ${coeff}(${a}x+${b})^{${power}}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${n}*(${a}*x+${b})^${power}`, variables: ['x'] },
              feedback: `You differentiated the outside power correctly but forgot to multiply by the derivative of the inside bracket, which is $${a}$.`,
            },
          ],
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'This is a chain rule question with a trig function — differentiate the outside function, then multiply by the derivative of the inside.' },
        { level: 2, content: 'The inside is $kx$, which has derivative $k$.' },
        { level: 3, content: 'Multiply your differentiated trig function by $k$ to finish.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomInt(rng, 2, 6);
        const isSin = rng() < 0.5;
        return {
          prompt: isSin
            ? `Differentiate $y = \\sin(${k}x)$ with respect to $x$.`
            : `Differentiate $y = \\cos(${k}x)$ with respect to $x$.`,
          answer: isSin
            ? { type: 'expression', expression: `${k}*cos(${k}*x)`, variables: ['x'] }
            : { type: 'expression', expression: `-${k}*sin(${k}*x)`, variables: ['x'] },
          workingNotes: isSin
            ? `Outside: $\\cos(${k}x)$. Inside derivative: $${k}$. So $\\dfrac{dy}{dx} = ${k}\\cos(${k}x)$.`
            : `Outside: $-\\sin(${k}x)$. Inside derivative: $${k}$. So $\\dfrac{dy}{dx} = -${k}\\sin(${k}x)$.`,
          commonMistakes: isSin
            ? []
            : [
                {
                  matches: { type: 'expression', expression: `${k}*sin(${k}*x)`, variables: ['x'] },
                  feedback: 'You found the right size but dropped the minus sign — differentiating $\\cos$ of anything always introduces a minus sign.',
                },
              ],
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'This is a product of two functions multiplied together — use the product rule, not the power rule.' },
        { level: 2, content: "Label $u$ and $v$, find $u'$ and $v'$ separately, then combine using $u'v + uv'$." },
        { level: 3, content: 'Your final answer should have exactly two terms added together — one from each half of the product rule.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 2, 6);
        return {
          prompt: `Differentiate $y = ${a}x^2\\sin x$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${2 * a}*x*sin(x)+${a}*x^2*cos(x)`, variables: ['x'] },
          workingNotes: `With $u=${a}x^2$ ($u'=${2 * a}x$) and $v=\\sin x$ ($v'=\\cos x$): $\\dfrac{dy}{dx} = ${2 * a}x\\sin x + ${a}x^2\\cos x$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'This is a chain rule question — the outside function is exponential.' },
        { level: 2, content: 'Differentiating $e^{(\\text{something})}$ gives back $e^{(\\text{that same something})}$, then you still multiply by the derivative of the inside.' },
        { level: 3, content: 'The inside is $kx$, with derivative $k$ — multiply the whole exponential by $k$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomInt(rng, 2, 5);
        return {
          prompt: `Differentiate $y = e^{${k}x}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `${k}*exp(${k}*x)`, variables: ['x'] },
          workingNotes: `Outside: $e^{${k}x}$ (unchanged). Inside derivative: $${k}$. So $\\dfrac{dy}{dx} = ${k}e^{${k}x}$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `exp(${k}*x)`, variables: ['x'] },
              feedback: `You correctly kept $e^{${k}x}$ unchanged but forgot to multiply by the derivative of the inside, $${k}$.`,
            },
          ],
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'This combines both rules: it is a product of two functions, and one of those functions itself needs the chain rule.' },
        { level: 2, content: "Let $u=x$ and $v=e^{kx}$. Find $u'$ directly, but find $v'$ using the chain rule." },
        { level: 3, content: "Combine with $u'v+uv'$, then factor out $e^{kx}$ from both terms if you want to tidy the final answer." },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const k = randomChoice(rng, [2, 3, 4] as const);
        return {
          prompt: `Differentiate $y = xe^{${k}x}$ with respect to $x$.`,
          answer: { type: 'expression', expression: `exp(${k}*x)+${k}*x*exp(${k}*x)`, variables: ['x'] },
          workingNotes: `With $u=x$ ($u'=1$) and $v=e^{${k}x}$ ($v'=${k}e^{${k}x}$, by the chain rule): $\\dfrac{dy}{dx} = e^{${k}x} + ${k}xe^{${k}x} = e^{${k}x}(1+${k}x)$.`,
          commonMistakes: [
            {
              matches: { type: 'expression', expression: `${k}*x*exp(${k}*x)`, variables: ['x'] },
              feedback: 'It looks like you only found the $uv\'$ half of the product rule and left out the $u\'v$ term — a product rule answer needs both pieces added together.',
            },
          ],
        };
      },
    },
  ],
  summary:
    'The chain rule ("outside, then inside") differentiates a function of a function: for $y=(ax+b)^n$, '
    + '$\\dfrac{dy}{dx}=an(ax+b)^{n-1}$, and the same pattern applies to trig and exponential functions with '
    + 'something other than plain $x$ inside. The product rule handles two functions multiplied together: '
    + "$\\dfrac{d}{dx}(uv)=u'v+uv'$ — differentiate one at a time and add the two results.",
  keyFormulas: [
    {
      id: 'chain-power',
      label: 'Chain rule (power of a linear bracket)',
      formula: '\\frac{d}{dx}\\big[(ax+b)^n\\big] = an(ax+b)^{n-1}',
    },
    {
      id: 'chain-general',
      label: 'Chain rule (general)',
      formula: "\\frac{dy}{dx} = \\frac{dy}{du}\\times\\frac{du}{dx}",
    },
    { id: 'product-rule', label: 'Product rule', formula: "\\frac{d}{dx}(uv) = u'v + uv'" },
  ],
};
