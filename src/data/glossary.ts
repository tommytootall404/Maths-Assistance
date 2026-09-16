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

  // Calculus
  {
    id: 'differentiation',
    term: 'Differentiation',
    moduleId: 'calculus',
    definition: 'Finding the gradient (rate of change) of a curve as a formula, rather than just one number.',
  },
  {
    id: 'derivative',
    term: 'Derivative',
    moduleId: 'calculus',
    definition:
      'The result of differentiating a function — a new function, written $f\'(x)$ or $\\dfrac{dy}{dx}$, that '
      + 'gives the gradient at any point.',
  },
  {
    id: 'integration',
    term: 'Integration',
    moduleId: 'calculus',
    definition: 'The reverse of differentiation — finding a function from its gradient function.',
  },
  {
    id: 'constant-of-integration',
    term: 'Constant of integration (+C)',
    moduleId: 'calculus',
    definition:
      'Added when integrating, because many curves share the same gradient function and differ only by a '
      + 'vertical shift — without extra information, you cannot know which one you started with.',
  },
  {
    id: 'definite-integral',
    term: 'Definite integral',
    moduleId: 'calculus',
    definition:
      'An integral evaluated between two limits, $\\displaystyle\\int_a^b f(x)\\,dx$, giving the area under the '
      + 'curve between $x=a$ and $x=b$.',
  },
  {
    id: 'chain-rule',
    term: 'Chain rule',
    moduleId: 'calculus',
    definition: 'The rule for differentiating a "function of a function" — differentiate the outside, then multiply by the derivative of the inside.',
  },
  {
    id: 'product-rule-calc',
    term: 'Product rule',
    moduleId: 'calculus',
    definition: 'The rule for differentiating two functions multiplied together: $\\dfrac{d}{dx}(uv) = u\'v + uv\'$.',
  },
  {
    id: 'stationary-point',
    term: 'Stationary point',
    moduleId: 'calculus',
    definition: 'A point on a curve where the gradient is exactly zero — a maximum, a minimum, or a point of inflection.',
  },
  {
    id: 'second-derivative',
    term: 'Second derivative',
    moduleId: 'calculus',
    definition:
      'The derivative of the derivative, written $f\'\'(x)$ — used to classify a stationary point as a maximum '
      + '($f\'\'(x)<0$) or minimum ($f\'\'(x)>0$).',
  },

  // Vectors
  {
    id: 'vector',
    term: 'Vector',
    moduleId: 'vectors',
    definition: 'A quantity with both magnitude (size) and direction, such as force, velocity or displacement.',
  },
  {
    id: 'scalar',
    term: 'Scalar',
    moduleId: 'vectors',
    definition: 'A quantity with only a size and no direction, such as mass, temperature or speed.',
  },
  {
    id: 'magnitude',
    term: 'Magnitude',
    moduleId: 'vectors',
    definition: 'The size (length) of a vector, written $|\\vec{v}|$, found from its components using Pythagoras: $|\\vec v|=\\sqrt{x^2+y^2}$.',
  },
  {
    id: 'component',
    term: 'Component',
    moduleId: 'vectors',
    definition: 'The part of a vector acting along one direction (usually horizontal, x, or vertical, y).',
  },
  {
    id: 'resultant',
    term: 'Resultant',
    moduleId: 'vectors',
    definition: 'The single vector you get by adding two or more vectors together — e.g. the combined effect of several forces.',
  },
  {
    id: 'equilibrium',
    term: 'Equilibrium',
    moduleId: 'vectors',
    definition: 'The state where the forces acting on an object balance exactly, so the resultant force is the zero vector.',
  },
  {
    id: 'dot-product',
    term: 'Dot (scalar) product',
    moduleId: 'vectors',
    definition:
      'A way of multiplying two vectors to get a single number: $\\vec a\\cdot\\vec b = a_xb_x+a_yb_y = |a||b|\\cos\\theta$. '
      + 'A result of zero means the vectors are perpendicular.',
  },

  // Matrices
  {
    id: 'matrix',
    term: 'Matrix',
    moduleId: 'matrices',
    definition: 'A rectangular grid of numbers, arranged in rows and columns.',
  },
  {
    id: 'matrix-dimensions',
    term: 'Dimensions (of a matrix)',
    moduleId: 'matrices',
    definition: 'The size of a matrix, given as rows × columns — e.g. a 2×3 matrix has 2 rows and 3 columns, always rows first.',
  },
  {
    id: 'matrix-element',
    term: 'Element',
    moduleId: 'matrices',
    definition: 'One entry in a matrix, named $a_{ij}$ for the entry in row $i$, column $j$.',
  },
  {
    id: 'determinant',
    term: 'Determinant',
    moduleId: 'matrices',
    definition:
      'A single number calculated from a square matrix that tells you, among other things, whether it can be '
      + 'inverted — a determinant of zero means it cannot.',
  },
  {
    id: 'matrix-inverse',
    term: 'Inverse (of a matrix)',
    moduleId: 'matrices',
    definition:
      'The matrix $A^{-1}$ that "undoes" $A$, so $AA^{-1}=I$. Only exists when the determinant is non-zero. For a '
      + '2×2 matrix, $A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.',
  },
  {
    id: 'identity-matrix',
    term: 'Identity matrix',
    moduleId: 'matrices',
    definition: 'The matrix equivalent of the number 1 — multiplying any matrix by it leaves the matrix unchanged.',
  },
];
