import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomInt, randomChoice } from '../../../lib/random';

export const ratesOfChange: Lesson = {
  id: 'rates-of-change',
  moduleId: 'calculus',
  title: 'Rates of change',
  estMinutes: 22,
  whyThisMatters: {
    scenario:
      'This is where differentiation stops being an abstract technique and starts describing real, changing '
      + 'quantities: how fast something is moving, how fast it is speeding up, how much electric current is '
      + 'flowing, how fast a component is cooling down. Every one of these is "the derivative of something '
      + 'with respect to time" — the exact same maths as finding a gradient, just applied to physical '
      + 'quantities instead of an abstract curve.',
  },
  prerequisites: [
    {
      skill: { id: 'differentiation-recap-rates', label: 'Differentiation rules so far' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Differentiate $s = 2t^3$ with respect to $t$.',
          answer: { type: 'expression', expression: '6*t^2', variables: ['t'] },
        },
        {
          id: 'q2',
          prompt: 'Differentiate $s = (2t+1)^2$ with respect to $t$.',
          answer: { type: 'expression', expression: '4*(2*t+1)', variables: ['t'] },
        },
      ],
      refresher: {
        summary:
          'Everything here uses the power, chain, trig and exponential differentiation rules from earlier in '
          + 'this module — just with $t$ (time) as the variable instead of $x$, since these quantities all '
          + 'change over time.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A derivative is always "the rate of change of one quantity with respect to another." So far that has '
        + 'meant the gradient of a graph. But the exact same idea describes how physical quantities change over '
        + 'time — you just differentiate with respect to $t$ instead of $x$.',
    },
    {
      id: 'e2',
      kind: 'plain',
      content:
        '**Velocity** is the rate of change of displacement (position), $s$, with respect to time: it tells '
        + 'you how fast something is moving, and in which direction.',
    },
    { id: 'e3', kind: 'notation', content: '$$v = \\frac{ds}{dt}$$' },
    {
      id: 'e4',
      kind: 'plain',
      content:
        '**Acceleration** is the rate of change of velocity with respect to time — how fast the speed itself '
        + 'is changing. Since velocity is already a derivative of displacement, acceleration is the derivative '
        + 'of a derivative: the **second derivative** of displacement.',
    },
    { id: 'e5', kind: 'notation', content: '$$a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}$$' },
    {
      id: 'e6',
      kind: 'plain',
      content:
        '**Electrical current** works exactly the same way: it is the rate at which electric charge, $Q$, '
        + 'flows past a point.',
    },
    { id: 'e7', kind: 'notation', content: '$$I = \\frac{dQ}{dt}$$' },
    {
      id: 'e8',
      kind: 'plain',
      content:
        'And a component **heating up or cooling down** has a rate of change of temperature, $\\dfrac{dT}{dt}$. '
        + 'A positive value means it is warming; a negative value means it is cooling — the sign tells you the '
        + 'direction, exactly like velocity does for motion.',
    },
    {
      id: 'e9',
      kind: 'note',
      content:
        'In every one of these examples, the recipe is identical: write down a formula for the quantity in '
        + 'terms of time, then differentiate it with respect to $t$. The physical meaning changes, but the '
        + 'calculus never does.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Velocity from a displacement formula',
      scenario:
        'A component moves so that its displacement is $s(t) = 4t^3 - 2t^2 + 5t$ (m). Find its velocity at '
        + '$t=2\\text{ s}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Velocity is the derivative of displacement with respect to time.',
          mathLine: 'v(t) = \\frac{ds}{dt} = 12t^2 - 4t + 5',
        },
        {
          id: 's2',
          explanationWhy: 'Substitute $t=2$.',
          mathLine: 'v(2) = 12(2)^2 - 4(2) + 5 = 48 - 8 + 5',
        },
      ],
      finalAnswer: 'v(2) = 45\\text{ m/s}',
    },
    {
      id: 'w2',
      title: 'Acceleration from a velocity formula',
      scenario: 'A component has velocity $v(t) = 6t^2 - 3t$ (m/s). Find its acceleration at $t=1\\text{ s}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Acceleration is the derivative of velocity with respect to time.',
          mathLine: 'a(t) = \\frac{dv}{dt} = 12t - 3',
        },
        {
          id: 's2',
          explanationWhy: 'Substitute $t=1$.',
          mathLine: 'a(1) = 12(1) - 3',
        },
      ],
      finalAnswer: 'a(1) = 9\\text{ m/s}^2',
    },
    {
      id: 'w3',
      title: 'Current from a charge formula',
      scenario: 'The charge that has flowed is $Q(t) = 3t^2 + 2t$ (coulombs). Find the current at $t=3\\text{ s}$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'Current is the derivative of charge with respect to time.',
          mathLine: 'I(t) = \\frac{dQ}{dt} = 6t + 2',
        },
        {
          id: 's2',
          explanationWhy: 'Substitute $t=3$.',
          mathLine: 'I(3) = 6(3) + 2',
        },
      ],
      finalAnswer: 'I(3) = 20\\text{ A}',
    },
    {
      id: 'w4',
      title: 'Rate of cooling',
      scenario:
        'A component\'s temperature follows $T(t) = 80e^{-0.1t} + 20$ (°C). Find how fast it is cooling the '
        + 'instant it starts, at $t=0$.',
      steps: [
        {
          id: 's1',
          explanationWhy: 'The rate of change of temperature is $\\dfrac{dT}{dt}$. Differentiate using the chain rule on the exponential term — the constant $+20$ vanishes.',
          mathLine: '\\frac{dT}{dt} = 80\\times(-0.1)e^{-0.1t} = -8e^{-0.1t}',
        },
        {
          id: 's2',
          explanationWhy: 'Substitute $t=0$, remembering $e^0=1$.',
          mathLine: '\\left.\\frac{dT}{dt}\\right|_{t=0} = -8e^{0} = -8',
        },
      ],
      finalAnswer: '\\left.\\frac{dT}{dt}\\right|_{t=0} = -8\\text{ °C/min}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Differentiate the displacement formula to get a formula for velocity, then substitute the given time.' },
        { level: 2, content: 'Use the power rule on each term of $s(t)$ separately.' },
        { level: 3, content: 'Once you have $v(t)$, substitute the time value in and simplify.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 1, 4);
        const b = randomInt(rng, 1, 8);
        const t0 = randomInt(rng, 1, 4);
        const answerValue = 3 * a * t0 * t0 + b;
        return {
          prompt: `A component's displacement is $s(t) = ${a}t^3 + ${b}t$ (m). Find its velocity at $t=${t0}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'm/s' },
          workingNotes: `$v(t) = \\dfrac{ds}{dt} = ${3 * a}t^2 + ${b}$, so $v(${t0}) = ${3 * a}(${t0})^2 + ${b} = ${answerValue}\\text{ m/s}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Differentiate the velocity formula to get a formula for acceleration, then substitute the given time.' },
        { level: 2, content: 'Use the power rule on each term of $v(t)$ separately.' },
        { level: 3, content: 'Once you have $a(t)$, substitute the time value in and simplify.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 1, 5);
        const b = randomInt(rng, 1, 6);
        const t0 = randomInt(rng, 1, 4);
        const answerValue = 2 * a * t0 - b;
        return {
          prompt: `A component's velocity is $v(t) = ${a}t^2 - ${b}t$ (m/s). Find its acceleration at $t=${t0}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'm/s^2' },
          workingNotes: `$a(t) = \\dfrac{dv}{dt} = ${2 * a}t - ${b}$, so $a(${t0}) = ${2 * a}(${t0}) - ${b} = ${answerValue}\\text{ m/s}^2$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate the charge formula to get a formula for current, then substitute the given time.' },
        { level: 2, content: 'Use the power rule on each term of $Q(t)$ separately.' },
        { level: 3, content: 'Once you have $I(t)$, substitute the time value in and simplify.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 1, 5);
        const b = randomInt(rng, 1, 8);
        const t0 = randomInt(rng, 1, 4);
        const answerValue = 2 * a * t0 + b;
        return {
          prompt: `The charge that has flowed through a circuit is $Q(t) = ${a}t^2 + ${b}t$ (coulombs). Find the current at $t=${t0}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'A' },
          workingNotes: `$I(t) = \\dfrac{dQ}{dt} = ${2 * a}t + ${b}$, so $I(${t0}) = ${2 * a}(${t0}) + ${b} = ${answerValue}\\text{ A}$.`,
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Differentiate the temperature formula, using the chain rule on the exponential term.' },
        { level: 2, content: 'Differentiating $Ae^{-kt}$ with respect to $t$ gives $-kAe^{-kt}$; the constant term vanishes entirely.' },
        { level: 3, content: 'Substitute $t=0$ and remember $e^0=1$, so the rate simplifies to $-kA$.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const A = randomInt(rng, 20, 90);
        const k = randomChoice(rng, [0.05, 0.1, 0.2, 0.25] as const);
        const tEnv = randomInt(rng, 15, 22);
        const answerValue = -k * A;
        return {
          prompt: `A component's temperature follows $T(t) = ${A}e^{-${k}t} + ${tEnv}$ (°C). Find the rate of change of temperature at $t=0$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.02, units: '°C/min' },
          workingNotes: `$\\dfrac{dT}{dt} = -${k}\\times${A}\\,e^{-${k}t} = -${(k * A).toFixed(2)}e^{-${k}t}$. At $t=0$, $e^0=1$, so the rate is $${answerValue.toFixed(2)}\\text{ °C/min}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Acceleration is the second derivative of displacement — differentiate twice.' },
        { level: 2, content: 'First differentiate $s(t)$ to get $v(t)$, then differentiate $v(t)$ to get $a(t)$.' },
        { level: 3, content: 'Once you have $a(t)$, substitute the given time value in and simplify.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a = randomInt(rng, 1, 3);
        const b = randomInt(rng, 1, 5);
        const c = randomInt(rng, 1, 6);
        const t0 = randomInt(rng, 1, 3);
        const answerValue = 6 * a * t0 - 2 * b;
        return {
          prompt: `A component's displacement is $s(t) = ${a}t^3 - ${b}t^2 + ${c}t$ (m). Find its acceleration at $t=${t0}\\text{ s}$.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.01, units: 'm/s^2' },
          workingNotes: `$v(t) = ${3 * a}t^2 - ${2 * b}t + ${c}$, then $a(t) = ${6 * a}t - ${2 * b}$, so $a(${t0}) = ${6 * a}(${t0}) - ${2 * b} = ${answerValue}\\text{ m/s}^2$.`,
        };
      },
    },
  ],
  summary:
    'Any "rate of change" is a derivative with respect to time: velocity $v=\\dfrac{ds}{dt}$, acceleration '
    + '$a=\\dfrac{dv}{dt}=\\dfrac{d^2s}{dt^2}$, current $I=\\dfrac{dQ}{dt}$, and rate of heating or cooling '
    + '$\\dfrac{dT}{dt}$. The physical meaning changes each time, but the technique is always the same: write '
    + 'a formula for the quantity, then differentiate it with respect to time.',
  keyFormulas: [
    { id: 'velocity', label: 'Velocity', formula: 'v = \\frac{ds}{dt}' },
    { id: 'acceleration', label: 'Acceleration', formula: 'a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}' },
    { id: 'current', label: 'Electrical current', formula: 'I = \\frac{dQ}{dt}' },
  ],
};
