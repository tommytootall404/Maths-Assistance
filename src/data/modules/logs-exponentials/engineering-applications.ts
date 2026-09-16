import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

export const engineeringApplications: Lesson = {
  id: 'logs-engineering-applications',
  moduleId: 'logs-exponentials',
  title: 'Engineering uses of logs and exponentials',
  estMinutes: 25,
  whyThisMatters: {
    scenario:
      'This lesson pulls everything together: a capacitor discharging through a resistor, a hot component '
      + 'cooling down, and the decibel scale used for sound and signal power all follow the same underlying '
      + 'exponential pattern. Recognising that pattern lets you solve problems in any of these areas the same way.',
  },
  prerequisites: [
    {
      skill: { id: 'solving-exp-equations', label: 'Solving exponential equations' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Solve $e^{0.1t} = 4$ for $t$, to 2 decimal places.',
          answer: { type: 'numeric', value: Math.log(4) / 0.1, tolerance: 0.05 },
        },
        { id: 'q2', prompt: 'Evaluate $\\log_{10}(1000)$.', answer: { type: 'numeric', value: 3 } },
      ],
      refresher: {
        summary:
          'To solve $e^{kt} = b$, take $\\ln$ of both sides: $kt = \\ln(b)$, so $t = \\dfrac{\\ln(b)}{k}$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'A **capacitor** discharging through a resistor loses voltage smoothly over time, following '
        + '$V(t) = V_0 e^{-t/RC}$, where $V_0$ is the starting voltage and $RC$ (in seconds) is called the '
        + '**time constant** — it controls how quickly the discharge happens. A larger $RC$ means a slower discharge.',
    },
    {
      id: 'e2',
      kind: 'visual',
      content:
        'Try the slider below: it plots $V(t) = V_0 e^{-t/RC}$. Drag the time constant and watch how the curve '
        + 'stretches or compresses, and read the voltage off at any time.',
      visual: { component: 'exponential-decay-slider' },
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'Charging works the same way but builds up instead of dying away: $V(t) = V_0\\left(1 - e^{-t/RC}\\right)$.',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        "**Newton's law of cooling** says a hot object cools towards the surrounding temperature at a rate "
        + 'proportional to how far above it currently is — which gives exactly the same shape of formula.',
    },
    {
      id: 'e5',
      kind: 'notation',
      content: '$$T(t) = T_{env} + (T_0 - T_{env})e^{-kt}$$',
    },
    {
      id: 'e6',
      kind: 'plain',
      content:
        'Here $T_{env}$ is the surrounding (ambient) temperature the object cools towards, $T_0$ is the starting '
        + 'temperature, and $k$ controls how fast it cools — larger $k$ means faster cooling.',
    },
    {
      id: 'e7',
      kind: 'plain',
      content:
        '**Decibels (dB)** use logs to compress huge ranges of power or voltage into manageable numbers — a '
        + 'whisper and a jet engine differ by a factor of about a trillion in power, which a log scale turns '
        + 'into a difference of just 120 dB.',
    },
    {
      id: 'e8',
      kind: 'notation',
      content:
        '$$\\text{Power ratio: } dB = 10\\log_{10}\\left(\\frac{P}{P_0}\\right) \\qquad\\qquad '
        + '\\text{Voltage ratio: } dB = 20\\log_{10}\\left(\\frac{V}{V_0}\\right)$$',
    },
    {
      id: 'e9',
      kind: 'note',
      content:
        'The factor is 10 for power ratios but 20 for voltage (or amplitude) ratios — because power is '
        + 'proportional to voltage squared, and the power law of logs turns that square into an extra factor of 2.',
    },
    {
      id: 'e10',
      kind: 'plain',
      content:
        'Finally, general **exponential decay** — of radioactivity, a discharging capacitor\'s charge, or '
        + 'signal strength — is written $N(t) = N_0 e^{-\\lambda t}$, where $\\lambda$ (lambda) is the decay '
        + 'constant. The **half-life**, the time for the quantity to halve, is $t_{1/2} = \\dfrac{\\ln 2}{\\lambda}$.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Capacitor discharge: find the voltage',
      scenario: 'A capacitor discharges from $V_0 = 10\\text{ V}$ with a time constant $RC = 2\\text{ s}$. Find the voltage at $t = 4\\text{ s}$.',
      steps: [
        { id: 's1', explanationWhy: 'Start from the discharge formula.', mathLine: 'V(t) = V_0 e^{-t/RC}' },
        { id: 's2', explanationWhy: 'Substitute the known values.', mathLine: 'V(4) = 10\\, e^{-4/2} = 10\\, e^{-2}' },
        { id: 's3', explanationWhy: 'Evaluate $e^{-2}$ on a calculator.', mathLine: 'e^{-2} \\approx 0.1353' },
        { id: 's4', explanationWhy: 'Multiply through.', mathLine: 'V(4) \\approx 10 \\times 0.1353 \\approx 1.35\\text{ V}' },
      ],
      finalAnswer: 'V(4) \\approx 1.35\\text{ V}',
    },
    {
      id: 'w2',
      title: 'Capacitor discharge: find the time constant',
      scenario: 'A capacitor discharges from $12\\text{ V}$ to $3\\text{ V}$ in $5\\text{ s}$. Find its time constant $RC$.',
      steps: [
        { id: 's1', explanationWhy: 'Substitute the known values into the discharge formula.', mathLine: '3 = 12\\, e^{-5/RC}' },
        { id: 's2', explanationWhy: 'Divide both sides by 12 to isolate the exponential.', mathLine: '0.25 = e^{-5/RC}' },
        { id: 's3', explanationWhy: 'Take $\\ln$ of both sides to bring the exponent down.', mathLine: '\\ln(0.25) = -\\frac{5}{RC}' },
        { id: 's4', explanationWhy: 'Rearrange for $RC$ — dividing by a negative flips the sign, giving a positive time constant.', mathLine: 'RC = \\frac{-5}{\\ln(0.25)} \\approx 3.61\\text{ s}' },
      ],
      finalAnswer: 'RC \\approx 3.61\\text{ s}',
    },
    {
      id: 'w3',
      title: 'Decibel gain',
      scenario: 'An amplifier increases a signal from $0.5\\text{ V}$ to $5\\text{ V}$. Find the gain in dB.',
      steps: [
        { id: 's1', explanationWhy: 'This is a voltage ratio, so use the 20-log form.', mathLine: 'dB = 20\\log_{10}\\left(\\frac{V}{V_0}\\right)' },
        { id: 's2', explanationWhy: 'Substitute the voltages.', mathLine: 'dB = 20\\log_{10}\\left(\\frac{5}{0.5}\\right) = 20\\log_{10}(10)' },
        { id: 's3', explanationWhy: '$\\log_{10}(10) = 1$.', mathLine: 'dB = 20 \\times 1 = 20' },
      ],
      finalAnswer: 'dB = 20',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Use the discharge formula $V(t) = V_0 e^{-t/RC}$ directly — you know every value except $V(t)$.' },
        { level: 2, content: 'Work out the exponent $-t/RC$ as a decimal first, then evaluate $e$ to that power.' },
        { level: 3, content: 'Multiply the result by $V_0$ to get the final voltage.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const v0 = randomChoice(rng, [5, 9, 10, 12] as const);
        const rc = randomChoice(rng, [1, 2, 4] as const);
        const t = randomChoice(rng, [1, 2, 3, 4] as const);
        const answerValue = v0 * Math.exp(-t / rc);
        return {
          prompt: `A capacitor discharges from $V_0 = ${v0}\\text{ V}$ with time constant $RC = ${rc}\\text{ s}$. Find the voltage at $t = ${t}\\text{ s}$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.05 },
          workingNotes: `$V = ${v0} e^{-${t}/${rc}} \\approx ${answerValue.toFixed(2)}\\text{ V}$.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Substitute the two temperatures and time into the cooling formula, then solve for $k$.' },
        { level: 2, content: 'Rearrange so $e^{-kt}$ is alone on one side, then take $\\ln$ of both sides.' },
        { level: 3, content: 'Divide $\\ln(\\text{ratio})$ by $-t$ to get $k$; the negatives should cancel to a positive result.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const tEnv = 20;
        const t0 = randomChoice(rng, [80, 90, 100] as const);
        const t = randomChoice(rng, [5, 10, 15] as const);
        const tNow = randomInt(rng, tEnv + 10, t0 - 10);
        const answerValue = -Math.log((tNow - tEnv) / (t0 - tEnv)) / t;
        return {
          prompt: `A component cools from $${t0}\\text{°C}$ towards a room temperature of $${tEnv}\\text{°C}$, following $T(t) = ${tEnv} + (${t0} - ${tEnv})e^{-kt}$. After $${t}$ minutes it has reached $${tNow}\\text{°C}$. Find $k$, to 3 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.003 },
          workingNotes: `$\\frac{${tNow} - ${tEnv}}{${t0} - ${tEnv}} = e^{-k \\times ${t}} \\implies k = \\frac{-\\ln\\left(\\frac{${tNow - tEnv}}{${t0 - tEnv}}\\right)}{${t}} \\approx ${answerValue.toFixed(3)}$.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Decide first: is this a power ratio (factor of 10) or a voltage/amplitude ratio (factor of 20)?' },
        { level: 2, content: 'Divide the two values to get the ratio, then take $\\log_{10}$ of that ratio.' },
        { level: 3, content: 'Multiply the log by 10 (power) or 20 (voltage) to get the final dB value.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const isVoltage = rng() < 0.5;
        const ratio = randomChoice(rng, [2, 10, 4, 100] as const);
        const base = randomChoice(rng, [1, 2, 5] as const);
        const p0 = base;
        const p1 = base * ratio;
        const multiplier = isVoltage ? 20 : 10;
        const answerValue = multiplier * Math.log10(ratio);
        const unitLabel = isVoltage ? 'V' : 'W';
        const quantityLabel = isVoltage ? 'voltage' : 'power';
        return {
          prompt: `A signal's ${quantityLabel} increases from $${p0}\\text{ ${unitLabel}}$ to $${p1}\\text{ ${unitLabel}}$. Find the gain in dB.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.1 },
          workingNotes: `$dB = ${multiplier}\\log_{10}\\left(\\frac{${p1}}{${p0}}\\right) = ${multiplier}\\log_{10}(${ratio}) \\approx ${answerValue.toFixed(1)}$.`,
          commonMistakes: [
            {
              matches: { type: 'numeric', value: (multiplier === 20 ? 10 : 20) * Math.log10(ratio), tolerance: 0.1 },
              feedback: `You may have used the wrong multiplier. This is a ${quantityLabel} ratio, so the correct factor is ${multiplier} (power ratios use 10, voltage/amplitude ratios use 20 — because power $\\propto$ voltage$^2$).`,
            },
          ],
        };
      },
    },
    {
      id: 'p4',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Use the general decay formula $N = N_0 e^{-\\lambda t}$ with the given half-life.' },
        { level: 2, content: 'First find $\\lambda$ from the half-life: $\\lambda = \\dfrac{\\ln 2}{t_{1/2}}$.' },
        { level: 3, content: 'Substitute $\\lambda$ and the given time into $N = N_0 e^{-\\lambda t}$ and evaluate.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const n0 = randomChoice(rng, [200, 400, 500] as const);
        const halfLife = randomChoice(rng, [4, 5, 8, 10] as const);
        const t = randomChoice(rng, [2, 6, 12] as const);
        const lambda = Math.log(2) / halfLife;
        const answerValue = n0 * Math.exp(-lambda * t);
        return {
          prompt: `A radioactive sample starts at $N_0 = ${n0}$ and has a half-life of $${halfLife}$ hours. Find $N$ after $${t}$ hours, to the nearest whole number.`,
          answer: { type: 'numeric', value: answerValue, tolerance: Math.max(2, answerValue * 0.01) },
          workingNotes: `$\\lambda = \\dfrac{\\ln 2}{${halfLife}} \\approx ${lambda.toFixed(4)}$ per hour, so $N = ${n0} e^{-${lambda.toFixed(4)} \\times ${t}} \\approx ${answerValue.toFixed(0)}$.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'Rearrange the discharge formula so the exponential term is isolated first.' },
        { level: 2, content: 'Take $\\ln$ of both sides once the exponential is alone, then rearrange for the time constant.' },
        { level: 3, content: 'Watch the signs carefully: $\\ln$ of a fraction less than 1 is negative, and dividing by $-t$ should leave $RC$ positive.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const v0 = randomChoice(rng, [9, 12, 15] as const);
        const fraction = randomChoice(rng, [0.5, 0.25, 0.1] as const);
        const t = randomChoice(rng, [3, 6, 9] as const);
        const answerValue = -t / Math.log(fraction);
        const vTarget = v0 * fraction;
        return {
          prompt: `A capacitor discharges from $${v0}\\text{ V}$ to $${vTarget}\\text{ V}$ in $${t}\\text{ s}$. Find its time constant $RC$, to 2 decimal places.`,
          answer: { type: 'numeric', value: answerValue, tolerance: 0.1 },
          workingNotes: `$${fraction} = e^{-${t}/RC} \\implies RC = \\dfrac{-${t}}{\\ln(${fraction})} \\approx ${answerValue.toFixed(2)}\\text{ s}$.`,
        };
      },
    },
  ],
  summary:
    'Capacitor charge/discharge, Newton\'s law of cooling, and radioactive decay all follow the same '
    + 'exponential shape, $y = y_0 e^{\\pm kt}$, just with different letters for the constants. Decibels use '
    + 'logs the other way round, compressing a power or voltage ratio into a manageable scale — remember 10 for '
    + 'power, 20 for voltage.',
  keyFormulas: [
    { id: 'discharge', label: 'Capacitor discharge', formula: 'V(t) = V_0 e^{-t/RC}' },
    { id: 'charge', label: 'Capacitor charge', formula: 'V(t) = V_0\\left(1 - e^{-t/RC}\\right)' },
    { id: 'cooling', label: "Newton's law of cooling", formula: 'T(t) = T_{env} + (T_0 - T_{env})e^{-kt}' },
    { id: 'decibel-power', label: 'Decibels (power ratio)', formula: 'dB = 10\\log_{10}\\left(\\frac{P}{P_0}\\right)' },
    { id: 'decibel-voltage', label: 'Decibels (voltage ratio)', formula: 'dB = 20\\log_{10}\\left(\\frac{V}{V_0}\\right)' },
    { id: 'decay', label: 'Exponential decay', formula: 'N(t) = N_0 e^{-\\lambda t}' },
    { id: 'half-life', label: 'Half-life', formula: 't_{1/2} = \\frac{\\ln 2}{\\lambda}' },
  ],
};
