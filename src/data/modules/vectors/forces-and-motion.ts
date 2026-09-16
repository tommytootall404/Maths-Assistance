import type { Lesson } from '../../../types/lesson';
import { mulberry32, randomChoice, randomInt } from '../../../lib/random';

const SIGNS = [1, -1] as const;

function randomSigned(rng: () => number, min: number, max: number): number {
  return randomInt(rng, min, max) * randomChoice(rng, SIGNS);
}

export const forcesAndMotion: Lesson = {
  id: 'forces-and-motion',
  moduleId: 'vectors',
  title: 'Forces and motion as vectors',
  estMinutes: 22,
  whyThisMatters: {
    scenario:
      'This lesson is where vectors earn their keep in engineering. Every structure has multiple forces acting '
      + 'on it at once — is it actually staying still, or is something about to move? Every vehicle moving '
      + 'through wind or water has its own velocity combined with the wind\'s or current\'s. Vector addition is '
      + 'the tool that answers both kinds of question.',
  },
  prerequisites: [
    {
      skill: { id: 'vector-addition-recap', label: 'Adding and subtracting vectors' },
      checkQuestions: [
        {
          id: 'q1',
          prompt: 'Find $\\begin{pmatrix} 5 \\\\ -3 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 7 \\end{pmatrix}$.',
          answer: { type: 'vector', components: [3, 4], tolerance: 0.01 },
        },
      ],
      refresher: {
        summary:
          'Vectors add component by component: add the x-components together, and separately add the '
          + 'y-components together. $\\begin{pmatrix} 5 \\\\ -3 \\end{pmatrix} + \\begin{pmatrix} -2 \\\\ 7 '
          + '\\end{pmatrix} = \\begin{pmatrix} 5 + (-2) \\\\ -3 + 7 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 4 '
          + '\\end{pmatrix}$.',
      },
    },
  ],
  explanation: [
    {
      id: 'e1',
      kind: 'plain',
      content:
        'When several forces act on the same object at once, their combined effect is exactly as if a single '
        + 'force were acting instead. That single equivalent force is called the **resultant force**, and it is '
        + 'simply the vector sum of every individual force.',
    },
    {
      id: 'e2',
      kind: 'notation',
      content: '$$\\vec{F_R} = \\vec{F_1} + \\vec{F_2} + \\cdots + \\vec{F_n}$$',
    },
    {
      id: 'e3',
      kind: 'plain',
      content:
        'A very important special case is **equilibrium**: an object stays still (or carries on at constant '
        + 'velocity) exactly when the resultant force on it is the **zero vector**, $\\begin{pmatrix} 0 \\\\ 0 '
        + '\\end{pmatrix}$ — every force is perfectly balanced out by the others. A bracket held by three cables '
        + 'is in equilibrium if, and only if, the three cable tensions sum to zero. This gives you a powerful '
        + 'technique: if you know all but one of the forces on an object in equilibrium, you can find the '
        + 'missing one by making the total sum to zero.',
    },
    {
      id: 'e4',
      kind: 'plain',
      content:
        'The same vector-addition idea applies to **motion**, not just forces. A boat has its own velocity '
        + 'relative to the water (from its engine and heading), but the water itself might be moving too — a '
        + "river current, for example. The boat's actual velocity over the ground (its **resultant velocity**) "
        + "is the vector sum of the boat's own velocity and the current's velocity.",
    },
    {
      id: 'e5',
      kind: 'notation',
      content: '$$\\vec{v}_{\\text{resultant}} = \\vec{v}_{\\text{boat}} + \\vec{v}_{\\text{current}}$$',
    },
    {
      id: 'e6',
      kind: 'note',
      content:
        'Speed is just a number (a scalar) — the magnitude of a velocity vector. Once you have a resultant '
        + 'velocity as components, you can find the resultant *speed* using the magnitude formula from the '
        + 'last lesson: $|\\vec{v}| = \\sqrt{x^2+y^2}$.',
    },
  ],
  workedExamples: [
    {
      id: 'w1',
      title: 'Resultant of two forces',
      scenario:
        'Two forces act on a beam: $\\vec{F_1} = \\begin{pmatrix} 12 \\\\ 5 \\end{pmatrix}$ N and '
        + '$\\vec{F_2} = \\begin{pmatrix} -4 \\\\ 9 \\end{pmatrix}$ N. Find the resultant force, and its '
        + 'magnitude.',
      steps: [
        { id: 's1', explanationWhy: 'The resultant is the vector sum — add component by component.', mathLine: '\\vec{F_R} = \\begin{pmatrix} 12 + (-4) \\\\ 5 + 9 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ 14 \\end{pmatrix} \\text{ N}' },
        { id: 's2', explanationWhy: 'The magnitude of the resultant comes from Pythagoras.', mathLine: '|\\vec{F_R}| = \\sqrt{8^2 + 14^2} \\approx 16.12\\text{ N}' },
      ],
      finalAnswer: '\\vec{F_R} = \\begin{pmatrix} 8 \\\\ 14 \\end{pmatrix} \\text{ N}, \\ |\\vec{F_R}| \\approx 16.12\\text{ N}',
    },
    {
      id: 'w2',
      title: 'Finding a missing force for equilibrium',
      scenario:
        'A bracket is held in equilibrium by three cables. Two of the tensions are '
        + '$\\vec{T_1} = \\begin{pmatrix} 30 \\\\ 10 \\end{pmatrix}$ N and $\\vec{T_2} = \\begin{pmatrix} -10 \\\\ '
        + '-25 \\end{pmatrix}$ N. Find the third tension $\\vec{T_3}$.',
      steps: [
        { id: 's1', explanationWhy: 'Equilibrium means all three forces sum to the zero vector.', mathLine: '\\vec{T_1} + \\vec{T_2} + \\vec{T_3} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}' },
        { id: 's2', explanationWhy: 'Rearrange to make $\\vec{T_3}$ the subject.', mathLine: '\\vec{T_3} = -\\vec{T_1} - \\vec{T_2}' },
        { id: 's3', explanationWhy: 'Substitute the two known tensions.', mathLine: '\\vec{T_3} = -\\begin{pmatrix} 30 \\\\ 10 \\end{pmatrix} - \\begin{pmatrix} -10 \\\\ -25 \\end{pmatrix} = \\begin{pmatrix} -30+10 \\\\ -10+25 \\end{pmatrix}' },
        { id: 's4', explanationWhy: 'Evaluate each component.', mathLine: '\\vec{T_3} = \\begin{pmatrix} -20 \\\\ 15 \\end{pmatrix} \\text{ N}' },
      ],
      finalAnswer: '\\vec{T_3} = \\begin{pmatrix} -20 \\\\ 15 \\end{pmatrix} \\text{ N}',
    },
    {
      id: 'w3',
      title: 'Boat crossing a river current',
      scenario:
        'A boat heads directly across a river with its own velocity $\\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix}$ '
        + 'm/s. The river current flows at $\\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix}$ m/s. Find the boat\'s '
        + 'actual resultant velocity and speed over the ground.',
      steps: [
        { id: 's1', explanationWhy: "The boat's actual velocity is the vector sum of its own velocity and the current's velocity.", mathLine: '\\vec{v}_R = \\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix} + \\begin{pmatrix} 3 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\text{ m/s}' },
        { id: 's2', explanationWhy: 'The resultant speed is the magnitude of this resultant velocity.', mathLine: '|\\vec{v}_R| = \\sqrt{3^2 + 4^2} = 5\\text{ m/s}' },
        { id: 's3', explanationWhy: 'So although the boat is aimed straight across, the current sweeps it off course — it ends up moving diagonally.', mathLine: '\\text{actual path: diagonal, at } 5\\text{ m/s}' },
      ],
      finalAnswer: '\\vec{v}_R = \\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix} \\text{ m/s}, \\ |\\vec{v}_R| = 5\\text{ m/s}',
    },
  ],
  practiceQuestions: [
    {
      id: 'p1',
      difficulty: 1,
      hints: [
        { level: 1, content: 'The resultant force is just the vector sum of the individual forces.' },
        { level: 2, content: 'Add the x-components together, and separately add the y-components together.' },
        { level: 3, content: 'Write your answer as a vector (column vector or i, j form).' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 2, 15);
        const a2 = randomSigned(rng, 2, 15);
        const b1 = randomSigned(rng, 2, 15);
        const b2 = randomSigned(rng, 2, 15);
        return {
          prompt: `Two forces act on an object: $\\vec{F_1} = \\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix}$ N and $\\vec{F_2} = \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$ N. Find the resultant force $\\vec{F_R}$.`,
          answer: { type: 'vector', components: [a1 + b1, a2 + b2], tolerance: 0.01 },
          workingNotes: `$\\vec{F_R} = \\begin{pmatrix} ${a1} + ${b1} \\\\ ${a2} + ${b2} \\end{pmatrix} = \\begin{pmatrix} ${a1 + b1} \\\\ ${a2 + b2} \\end{pmatrix}$ N.`,
        };
      },
    },
    {
      id: 'p2',
      difficulty: 1,
      hints: [
        { level: 1, content: 'Add all three forces together, one component at a time.' },
        { level: 2, content: 'Add all three x-components together, and separately all three y-components.' },
        { level: 3, content: 'The order you add them in does not change the answer.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 1, 10);
        const a2 = randomSigned(rng, 1, 10);
        const b1 = randomSigned(rng, 1, 10);
        const b2 = randomSigned(rng, 1, 10);
        const c1 = randomSigned(rng, 1, 10);
        const c2 = randomSigned(rng, 1, 10);
        return {
          prompt:
            `Three forces act on a joint: $\\vec{F_1} = \\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix}$ N, `
            + `$\\vec{F_2} = \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$ N, and `
            + `$\\vec{F_3} = \\begin{pmatrix} ${c1} \\\\ ${c2} \\end{pmatrix}$ N. Find the resultant force.`,
          answer: { type: 'vector', components: [a1 + b1 + c1, a2 + b2 + c2], tolerance: 0.01 },
          workingNotes: `$\\vec{F_R} = \\begin{pmatrix} ${a1 + b1 + c1} \\\\ ${a2 + b2 + c2} \\end{pmatrix}$ N.`,
        };
      },
    },
    {
      id: 'p3',
      difficulty: 2,
      hints: [
        { level: 1, content: 'Equilibrium means all the forces sum to the zero vector.' },
        { level: 2, content: 'Rearrange: the missing force equals minus the sum of the known forces.' },
        { level: 3, content: 'Add the two known forces first, then reverse the sign of every component of that sum.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const a1 = randomSigned(rng, 3, 20);
        const a2 = randomSigned(rng, 3, 20);
        const b1 = randomSigned(rng, 3, 20);
        const b2 = randomSigned(rng, 3, 20);
        const t3x = -(a1 + b1);
        const t3y = -(a2 + b2);
        return {
          prompt:
            `A bracket is held in equilibrium by three cables. Two of the tensions are `
            + `$\\vec{T_1} = \\begin{pmatrix} ${a1} \\\\ ${a2} \\end{pmatrix}$ N and `
            + `$\\vec{T_2} = \\begin{pmatrix} ${b1} \\\\ ${b2} \\end{pmatrix}$ N. Find the third tension $\\vec{T_3}$.`,
          answer: { type: 'vector', components: [t3x, t3y], tolerance: 0.01 },
          workingNotes: `$\\vec{T_3} = -(\\vec{T_1} + \\vec{T_2}) = -\\begin{pmatrix} ${a1 + b1} \\\\ ${a2 + b2} \\end{pmatrix} = \\begin{pmatrix} ${t3x} \\\\ ${t3y} \\end{pmatrix}$ N.`,
          commonMistakes: [
            {
              matches: { type: 'vector', components: [a1 + b1, a2 + b2], tolerance: 0.01 },
              feedback: 'That is the sum of the two known tensions, not the missing one. For equilibrium the missing force must *cancel out* that sum, so it needs the opposite sign in every component.',
            },
          ],
        };
      },
    },
    {
      id: 'p4',
      difficulty: 2,
      hints: [
        { level: 1, content: "The boat's actual velocity is its own velocity plus the current's velocity, added component by component." },
        { level: 2, content: 'Add the two velocity vectors to get the resultant velocity.' },
        { level: 3, content: 'Then use $|\\vec{v}| = \\sqrt{x^2+y^2}$ on the resultant to get the resultant speed.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const boatX = randomInt(rng, 0, 6);
        const boatY = randomInt(rng, 3, 8);
        const currentX = randomInt(rng, 2, 8);
        const currentY = randomInt(rng, 0, 2);
        const speed = Math.hypot(boatX + currentX, boatY + currentY);
        return {
          prompt:
            `A boat's own velocity through the water is $\\begin{pmatrix} ${boatX} \\\\ ${boatY} \\end{pmatrix}$ m/s. `
            + `The river current flows at $\\begin{pmatrix} ${currentX} \\\\ ${currentY} \\end{pmatrix}$ m/s. `
            + `Find the boat's resultant speed over the ground, to 2 decimal places.`,
          answer: { type: 'numeric', value: speed, tolerance: 0.05 },
          workingNotes: `Resultant velocity $= \\begin{pmatrix} ${boatX + currentX} \\\\ ${boatY + currentY} \\end{pmatrix}$ m/s, so speed $= \\sqrt{${boatX + currentX}^2 + ${boatY + currentY}^2} \\approx ${speed.toFixed(2)}$ m/s.`,
        };
      },
    },
    {
      id: 'p5',
      difficulty: 3,
      hints: [
        { level: 1, content: 'One of the forces is given as a magnitude and angle — resolve it into components first, using the method from an earlier lesson.' },
        { level: 2, content: 'Once every force is written as $(x, y)$ components, equilibrium means they all sum to zero.' },
        { level: 3, content: 'Add the resolved force to the other known force, then reverse the sign of every component to find the missing one.' },
      ],
      generate: (seed) => {
        const rng = mulberry32(seed);
        const magnitude = randomInt(rng, 20, 50);
        const angle = randomInt(rng, 20, 70);
        const f1x = magnitude * Math.cos((angle * Math.PI) / 180);
        const f1y = magnitude * Math.sin((angle * Math.PI) / 180);
        const f2x = randomSigned(rng, 5, 25);
        const f2y = randomSigned(rng, 5, 25);
        const f3x = -(f1x + f2x);
        const f3y = -(f1y + f2y);
        return {
          prompt:
            `A bracket in equilibrium has three forces acting on it. $\\vec{F_1}$ acts at $${magnitude}$ N, `
            + `$${angle}°$ above the horizontal. $\\vec{F_2} = \\begin{pmatrix} ${f2x} \\\\ ${f2y} \\end{pmatrix}$ N. `
            + `Find the third force $\\vec{F_3}$ needed to keep the bracket in equilibrium, to 2 decimal places.`,
          answer: { type: 'vector', components: [f3x, f3y], tolerance: 0.1 },
          workingNotes: `Resolve $\\vec{F_1}$ first: $\\begin{pmatrix} ${magnitude}\\cos(${angle}°) \\\\ ${magnitude}\\sin(${angle}°) \\end{pmatrix} \\approx \\begin{pmatrix} ${f1x.toFixed(2)} \\\\ ${f1y.toFixed(2)} \\end{pmatrix}$ N. For equilibrium, $\\vec{F_3} = -(\\vec{F_1} + \\vec{F_2}) \\approx \\begin{pmatrix} ${f3x.toFixed(2)} \\\\ ${f3y.toFixed(2)} \\end{pmatrix}$ N.`,
        };
      },
    },
  ],
  summary:
    'The resultant force (or resultant velocity) on an object is the vector sum of every individual force (or '
    + 'velocity) acting on it. An object is in **equilibrium** when its resultant force is the zero vector — '
    + 'every force is exactly balanced. The same vector-addition idea combines a vehicle\'s own velocity with a '
    + 'current or wind to find its actual velocity over the ground.',
  keyFormulas: [
    { id: 'resultant-force', label: 'Resultant force', formula: '\\vec{F_R} = \\vec{F_1} + \\vec{F_2} + \\cdots + \\vec{F_n}' },
    { id: 'equilibrium', label: 'Equilibrium condition', formula: '\\vec{F_R} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix}' },
    { id: 'resultant-velocity', label: 'Resultant velocity', formula: '\\vec{v}_{\\text{resultant}} = \\vec{v}_{\\text{object}} + \\vec{v}_{\\text{medium}}' },
  ],
};
