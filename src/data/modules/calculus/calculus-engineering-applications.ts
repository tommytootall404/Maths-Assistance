import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt } from '../../../lib/random';

export const calculusEngineeringApplications: Lesson = {
  id: 'calculus-engineering-applications',
  moduleId: 'calculus',
  title: 'Engineering applications of calculus',
  estMinutes: 26,
  whyThisMatters: {
    scenario:
      'This lesson pulls differentiation and integration together in three real engineering settings: the '
      + 'work done by a changing force, the relationship between shear force and bending moment inside a '
      + 'loaded beam, and total electrical charge. In each one, recognising whether a question is asking for a '
      + '"rate of change" (differentiate) or a "total from a rate" (integrate) is the whole skill.',
  },
  prerequisites: [
    {
      skill: { id: 'calculus-recap-applications', label: 'Rates of change and stationary points' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'If $s(t) = t^3$ is displacement, find the velocity formula $v(t)$.',
          answer: { type: 'expression', expression: '3*t^2', variables: ['t'] },
        },
        {
          id: 'q2',
          prompt: 'Find $\\int (4x+2)\\,dx$ (no need for $+C$).',
          answer: { type: 'expression', expression: '2*x^2+2*x', variables: ['x'] },
        },
      ],
      refresher: {
        summary:
          'This lesson combines two ideas from earlier: differentiating a formula to get a rate of change '
          + '(as in the rates-of-change lesson), and integrating a formula to get a total or an area (as in '
          + 'the definite integrals lesson).',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        '**Work done by a variable force.** If a force stayed constant, work would just be force × distance. '
        + 'But if the force changes as an object moves — for example a spring that gets harder to stretch — '
        + 'the work done is the **area under the force-displacement graph**, which means it is a definite '
        + 'integral of the force with respect to displacement.',
    },
    { id: 'e2', kind: 'notation', content: '$$W = \\int_a^b F(x)\\,dx$$' },
    {
      id: 'e3',
      kind: 'plain',
      content:
        '**Shear force and bending moment in a beam.** As you move along a loaded beam, the internal bending '
        + 'moment $M(x)$ changes from point to point, and so does the internal shear force $V(x)$. The '
        + 'relationship between them is exactly a rate of change: the shear force is the **derivative** of the '
        + 'bending moment with respect to position along the beam. It tells you how quickly the bending moment '
        + 'is changing at that point.',
    },
    { id: 'e4', kind: 'notation', content: '$$V(x) = \\frac{dM}{dx}$$' },
    {
      id: 'e5',
      kind: 'note',
      content:
        'A useful consequence, linking straight back to the last lesson: wherever the shear force is zero, '
        + 'the bending moment has a **stationary point** — usually its maximum. That is exactly why engineers '
        + 'care about finding where $V(x)=0$ along a beam: it locates the point of greatest bending.',
    },
    {
      id: 'e6',
      kind: 'plain',
      content:
        '**Total charge from current.** Back in the rates-of-change lesson, current was defined as the rate '
        + 'of change of charge, $I=\\dfrac{dQ}{dt}$. Run that relationship in reverse: if you know the current '
        + 'over time, the **total charge delivered** between two times is the area under the current-time '
        + 'graph — a definite integral of current with respect to time.',
    },
    { id: 'e7', kind: 'notation', content: '$$Q = \\int_a^b I(t)\\,dt$$' },
    {
      id: 'e8',
      kind: 'plain',
      content:
        'Notice the pattern across all three: whenever a quantity is described as a **rate**, integrating it '
        + 'gives you a **total**. Whenever a quantity is described as a **total that changes**, differentiating '
        + 'it gives you the **rate**. Spotting which direction a question is asking you to go is most of the '
        + 'work.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Work done by a variable force',
      scenario:
        'A force acting on an object is $F(x) = 4x + 2$ (N), where $x$ is the displacement in metres. Find the '
        + 'work done moving the object from $x=0$ to $x=4\\text{ m}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Work done is the definite integral of force with respect to displacement.',
          mathLine: 'W = \\int_0^4 (4x+2)\\,dx',
        },
        {
          id: 's2',
          explanationWhy: 'Find the antiderivative.',
          mathLine: '\\int (4x+2)\\,dx = 2x^2+2x',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate between the limits.',
          mathLine: '\\big[2x^2+2x\\big]_0^4 = (2(4)^2+2(4)) - (0)',
        },
      ],
      finalAnswer: 'W = 40\\text{ J}',
    },
    {
      id: 'w2',
      title: 'Shear force from a bending moment formula',
      scenario:
        'A beam has bending moment $M(x) = 50x - 5x^2$ (kN·m) along its length, where $x$ is the distance in '
        + 'metres from one end. Find the shear force at $x=2\\text{ m}$, and find where the shear force is '
        + 'zero.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Shear force is the derivative of bending moment with respect to position.',
          mathLine: 'V(x) = \\frac{dM}{dx} = 50 - 10x',
        },
        {
          id: 's2',
          explanationWhy: 'Substitute $x=2$.',
          mathLine: 'V(2) = 50 - 10(2) = 50 - 20',
        },
        {
          id: 's3',
          explanationWhy: 'Set $V(x)=0$ to find where the shear force vanishes — this is where the bending moment is at its maximum.',
          mathLine: '50 - 10x = 0 \\implies x = 5',
        },
      ],
      finalAnswer: 'V(2) = 30\\text{ kN}, \\quad V(x)=0 \\text{ at } x=5\\text{ m}',
    },
    {
      id: 'w3',
      title: 'Total charge from a current-time graph',
      scenario: 'A current $I(t) = 6t^2 + 2$ (A) flows in a circuit. Find the total charge delivered between $t=0$ and $t=3\\text{ s}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Total charge is the definite integral of current with respect to time.',
          mathLine: 'Q = \\int_0^3 (6t^2+2)\\,dt',
        },
        {
          id: 's2',
          explanationWhy: 'Find the antiderivative.',
          mathLine: '\\int (6t^2+2)\\,dt = 2t^3+2t',
        },
        {
          id: 's3',
          explanationWhy: 'Evaluate between the limits.',
          mathLine: '\\big[2t^3+2t\\big]_0^3 = (2(27)+6) - (0)',
        },
      ],
      finalAnswer: 'Q = 60\\text{ C}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Work done is the definite integral of the force with respect to displacement.' },
        { level: 2, content: 'Find the antiderivative of the force formula first.' },
        { level: 3, content: 'Evaluate the antiderivative at the upper displacement, then at the lower displacement, and subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const aHalf = randomInt(rng, 1, 5);
        const a = 2 * aHalf;
        const b = randomInt(rng, 1, 6);
        const c = randomInt(rng, 2, 6);
        const answerValue = aHalf * c * c + b * c;
        return {
          prompt: `A force $F(x) = ${a}x + ${b}$ (N) acts on an object as it moves from $x=0$ to $x=${c}\\text{ m}$. Find the work done.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'J' },
          workingNotes: `$W = \\int_0^{${c}} (${a}x+${b})\\,dx$. Antiderivative: $${aHalf}x^2+${b}x$. Evaluating between the limits gives $${answerValue}\\text{ J}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Total charge is the definite integral of the current with respect to time.' },
        { level: 2, content: 'Find the antiderivative of the current formula first.' },
        { level: 3, content: 'Evaluate the antiderivative at the upper time, then at the lower time (zero), and subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const aThird = randomInt(rng, 1, 4);
        const a = 3 * aThird;
        const b = randomInt(rng, 1, 6);
        const c = randomInt(rng, 1, 4);
        const answerValue = aThird * c ** 3 + b * c;
        return {
          prompt: `A current $I(t) = ${a}t^2 + ${b}$ (A) flows in a circuit. Find the total charge delivered between $t=0$ and $t=${c}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'C' },
          workingNotes: `$Q = \\int_0^{${c}} (${a}t^2+${b})\\,dt$. Antiderivative: $${aThird}t^3+${b}t$. Evaluating between the limits gives $${answerValue}\\text{ C}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Shear force is the derivative of the bending moment with respect to position.' },
        { level: 2, content: 'Differentiate $M(x)$ using the power rule, term by term.' },
        { level: 3, content: 'Substitute the given position into your formula for $V(x)$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const b = randomInt(rng, 2, 8);
        const x0 = randomInt(rng, 1, 5);
        const k = randomInt(rng, 1, 6);
        const a = 2 * b * k + randomInt(rng, 0, 4) * 2; // keeps a-2b*x0 varied but clean (even offset)
        const answerValue = a - 2 * b * x0;
        return {
          prompt: `A beam has bending moment $M(x) = ${a}x - ${b}x^2$ (kN·m). Find the shear force at $x=${x0}\\text{ m}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'kN' },
          workingNotes: `$V(x) = \\dfrac{dM}{dx} = ${a} - ${2 * b}x$, so $V(${x0}) = ${a} - ${2 * b}(${x0}) = ${answerValue}\\text{ kN}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate the bending moment formula to get the shear force formula.' },
        { level: 2, content: 'Set the shear force formula equal to zero.' },
        { level: 3, content: 'Solve the resulting linear equation for $x$ — this is where the bending moment reaches its maximum.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const b = randomInt(rng, 2, 8);
        const k = randomInt(rng, 1, 6);
        const a = 2 * b * k;
        return {
          prompt: `A beam has bending moment $M(x) = ${a}x - ${b}x^2$ (kN·m). Find the value of $x$ at which the shear force is zero.`,
          answer: { type: 'numeric', value: k, tolerance: 0.01, units: 'm' },
          workingNotes: `$V(x) = \\dfrac{dM}{dx} = ${a} - ${2 * b}x$. Setting $V(x)=0$: $x = \\dfrac{${a}}{${2 * b}} = ${k}\\text{ m}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Work done is still the definite integral of force with respect to displacement — the limits are just not zero this time.' },
        { level: 2, content: 'Find the antiderivative of $F(x)$ first, exactly as before.' },
        { level: 3, content: 'Evaluate the antiderivative at the upper displacement, then at the lower displacement, and subtract.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const aThird = randomInt(rng, 1, 3);
        const a = 3 * aThird;
        const b = randomInt(rng, 1, 6);
        const p = randomInt(rng, 0, 2);
        const q = randomInt(rng, p + 2, p + 5);
        const answerValue = aThird * (q ** 3 - p ** 3) + b * (q - p);
        return {
          prompt: `A force $F(x) = ${a}x^2 + ${b}$ (N) acts on an object as it moves from $x=${p}\\text{ m}$ to $x=${q}\\text{ m}$. Find the work done.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'J' },
          workingNotes: `$W = \\int_{${p}}^{${q}} (${a}x^2+${b})\\,dx$. Antiderivative: $${aThird}x^3+${b}x$. Evaluating between the limits gives $${answerValue}\\text{ J}$.`,
        };
      },
    },
  ],
  summary:
    'A rate integrates up to a total: work is $\\int F\\,dx$, and total charge is $\\int I\\,dt$. A changing '
    + 'total differentiates down to a rate: shear force is $\\dfrac{dM}{dx}$. The same two operations from '
    + 'earlier in this module — differentiate to get a rate, integrate to get a total — cover every one of '
    + 'these engineering relationships.',
  keyFormulas: [
    { id: 'work-done', label: 'Work done by a variable force', formula: 'W = \\int_a^b F(x)\\,dx' },
    { id: 'shear-force', label: 'Shear force from bending moment', formula: 'V(x) = \\frac{dM}{dx}' },
    { id: 'total-charge', label: 'Total charge from current', formula: 'Q = \\int_a^b I(t)\\,dt' },
  ],
};
