import type { ModuleId } from '../types/lesson';

export interface GlossaryTerm {
  id: string;
  term: string;
  moduleId: ModuleId;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  {
    id: 'logarithm',
    term: 'Logarithm',
    moduleId: 'logs-exponentials',
    definition:
      'The power you need to raise a base to, in order to get a given number. $\\log_a(b) = c$ means $a^c = b$.',
  },
  {
    id: 'base',
    term: 'Base (of a logarithm or power)',
    moduleId: 'logs-exponentials',
    definition: 'The number being raised to a power. In $\\log_2(8)$ and $2^3$, the base is 2.',
  },
  {
    id: 'natural-log',
    term: 'Natural logarithm (ln)',
    moduleId: 'logs-exponentials',
    definition: 'A logarithm with base $e$. $\\ln(x)$ means exactly the same as $\\log_e(x)$.',
  },
  {
    id: 'euler-number',
    term: 'e (Euler\'s number)',
    moduleId: 'logs-exponentials',
    definition:
      "A fixed number, approximately $2.71828$, that describes continuous growth or decay. Not a variable — its value never changes.",
  },
  {
    id: 'exponential-function',
    term: 'Exponential function',
    moduleId: 'logs-exponentials',
    definition: 'A function where the variable appears in the exponent, such as $y = a^x$ or $y = e^{kt}$.',
  },
  {
    id: 'time-constant',
    term: 'Time constant (RC)',
    moduleId: 'logs-exponentials',
    definition:
      'For a capacitor discharging or charging through a resistor, the value $RC$ (in seconds) that controls '
      + 'how quickly the change happens — a larger time constant means a slower change.',
  },
  {
    id: 'decibel',
    term: 'Decibel (dB)',
    moduleId: 'logs-exponentials',
    definition:
      'A logarithmic unit used to express a ratio of two powers or voltages, compressing very large ranges '
      + 'into manageable numbers.',
  },
  {
    id: 'half-life',
    term: 'Half-life',
    moduleId: 'logs-exponentials',
    definition: 'The time it takes for a decaying quantity to fall to half its original value.',
  },
  {
    id: 'decay-constant',
    term: 'Decay constant (λ)',
    moduleId: 'logs-exponentials',
    definition: 'The constant $\\lambda$ in $N(t) = N_0 e^{-\\lambda t}$ that controls how fast a quantity decays.',
  },
  {
    id: 'index-laws',
    term: 'Laws of indices',
    moduleId: 'logs-exponentials',
    definition:
      'Rules for combining powers, such as $a^m \\times a^n = a^{m+n}$ and $a^m \\div a^n = a^{m-n}$ — the '
      + 'foundation the log laws are built from.',
  },
];
