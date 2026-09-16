import type { AnswerSpec, ModuleId } from '../types/lesson';

export interface DiagnosticQuestion {
  id: string;
  moduleId: ModuleId;
  topic: string;
  prompt: string;
  answer: AnswerSpec;
  /** Lesson to suggest starting at if this question is answered wrong. Questions for a
   * module are ordered easiest-topic-first, matching lesson order, so the first wrong
   * answer in a module points at where to begin. */
  suggestedLessonId: string;
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'd1',
    moduleId: 'logs-exponentials',
    topic: 'Laws of indices',
    prompt: 'What is $2^3$?',
    answer: { type: 'numeric', value: 8 },
    suggestedLessonId: 'what-is-a-log',
  },
  {
    id: 'd2',
    moduleId: 'logs-exponentials',
    topic: 'What a logarithm means',
    prompt: 'Find $\\log_2(8)$.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'what-is-a-log',
  },
  {
    id: 'd3',
    moduleId: 'logs-exponentials',
    topic: 'Laws of logarithms',
    prompt: 'Write $\\log_2(4) + \\log_2(2)$ as a single number.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'laws-of-logs',
  },
  {
    id: 'd4',
    moduleId: 'logs-exponentials',
    topic: 'e and the natural log',
    prompt: 'Evaluate $\\ln(e^3)$.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'e-and-natural-log',
  },
  {
    id: 'd5',
    moduleId: 'logs-exponentials',
    topic: 'Solving exponential equations',
    prompt: 'Solve $\\log_2(x) = 4$ for $x$.',
    answer: { type: 'numeric', value: 16 },
    suggestedLessonId: 'solving-exponential-equations',
  },
  {
    id: 'd6',
    moduleId: 'logs-exponentials',
    topic: 'Engineering applications',
    prompt: 'A capacitor discharges as $V = V_0 e^{-t/RC}$, with $V_0 = 10\\text{ V}$ and $RC = 2\\text{ s}$. Find $V$ at $t = 2\\text{ s}$, to 2 decimal places.',
    answer: { type: 'numeric', value: 10 * Math.exp(-1), tolerance: 0.1 },
    suggestedLessonId: 'logs-engineering-applications',
  },

  // Calculus
  {
    id: 'c1',
    moduleId: 'calculus',
    topic: 'Differentiating powers and polynomials',
    prompt: 'Differentiate $f(x) = x^3$ with respect to $x$.',
    answer: { type: 'expression', expression: '3*x^2', variables: ['x'] },
    suggestedLessonId: 'differentiating-powers-and-polynomials',
  },
  {
    id: 'c2',
    moduleId: 'calculus',
    topic: 'Differentiating trig and exponential functions',
    prompt: 'Differentiate $f(x) = \\sin(x)$ with respect to $x$.',
    answer: { type: 'expression', expression: 'cos(x)', variables: ['x'] },
    suggestedLessonId: 'differentiating-trig-and-exponential',
  },
  {
    id: 'c3',
    moduleId: 'calculus',
    topic: 'Chain and product rule',
    prompt: 'Differentiate $f(x) = (2x+1)^3$ with respect to $x$.',
    answer: { type: 'expression', expression: '6*(2*x+1)^2', variables: ['x'] },
    suggestedLessonId: 'chain-and-product-rule',
  },
  {
    id: 'c4',
    moduleId: 'calculus',
    topic: 'Integration as reverse differentiation',
    prompt: 'Integrate $f(x) = x^2$ with respect to $x$ (you can ignore $+C$).',
    answer: { type: 'expression', expression: 'x^3/3', variables: ['x'] },
    suggestedLessonId: 'integration-as-reverse-differentiation',
  },
  {
    id: 'c5',
    moduleId: 'calculus',
    topic: 'Definite integrals and area',
    prompt: 'Evaluate $\\displaystyle\\int_0^2 x\\,dx$.',
    answer: { type: 'numeric', value: 2 },
    suggestedLessonId: 'definite-integrals-and-area',
  },
  {
    id: 'c6',
    moduleId: 'calculus',
    topic: 'Rates of change',
    prompt: 'A displacement is $s = t^2 + 3t$ (metres). Find the velocity $\\dfrac{ds}{dt}$ at $t = 2\\text{ s}$.',
    answer: { type: 'numeric', value: 7, units: 'm/s' },
    suggestedLessonId: 'rates-of-change',
  },
  {
    id: 'c7',
    moduleId: 'calculus',
    topic: 'Maxima and minima',
    prompt: 'Find the $x$-coordinate of the stationary point of $f(x) = x^2 - 4x + 1$.',
    answer: { type: 'numeric', value: 2 },
    suggestedLessonId: 'maxima-and-minima',
  },
  {
    id: 'c8',
    moduleId: 'calculus',
    topic: 'Engineering applications of calculus',
    prompt: 'A velocity is $v(t) = 3t^2$ (m/s). Find the total distance travelled between $t=0$ and $t=2\\text{ s}$ (the area under the graph).',
    answer: { type: 'numeric', value: 8, units: 'm' },
    suggestedLessonId: 'calculus-engineering-applications',
  },

  // Vectors
  {
    id: 'v1',
    moduleId: 'vectors',
    topic: 'Vector notation',
    prompt: 'Write the vector $\\begin{pmatrix} 5 \\\\ 2 \\end{pmatrix}$ in i, j notation — what is the coefficient of $\\mathbf{i}$?',
    answer: { type: 'numeric', value: 5 },
    suggestedLessonId: 'vector-notation',
  },
  {
    id: 'v2',
    moduleId: 'vectors',
    topic: 'Resolving vectors into components',
    prompt: 'A force of $10\\text{ N}$ acts at $60°$ above the horizontal. Find its horizontal (x) component, to 1 decimal place.',
    answer: { type: 'numeric', value: 5, tolerance: 0.2 },
    suggestedLessonId: 'resolving-into-components',
  },
  {
    id: 'v3',
    moduleId: 'vectors',
    topic: 'Magnitude and direction',
    prompt: 'Find the magnitude of the vector $(3, 4)$.',
    answer: { type: 'numeric', value: 5 },
    suggestedLessonId: 'magnitude-and-direction',
  },
  {
    id: 'v4',
    moduleId: 'vectors',
    topic: 'Adding and subtracting vectors',
    prompt: 'Add the vectors $(2, 3)$ and $(1, -1)$.',
    answer: { type: 'vector', components: [3, 2], tolerance: 0.01 },
    suggestedLessonId: 'addition-and-subtraction',
  },
  {
    id: 'v5',
    moduleId: 'vectors',
    topic: 'Forces and motion',
    prompt: 'Two forces, $(5, 0)$ and $(-2, 3)$, act on a bracket. Find the third force needed for equilibrium (so all three forces sum to zero).',
    answer: { type: 'vector', components: [-3, -3], tolerance: 0.01 },
    suggestedLessonId: 'forces-and-motion',
  },
  {
    id: 'v6',
    moduleId: 'vectors',
    topic: 'Scalar and vector product',
    prompt: 'Find the dot product of $(2, 3)$ and $(4, -1)$.',
    answer: { type: 'numeric', value: 5 },
    suggestedLessonId: 'scalar-and-vector-product',
  },

  // Matrices
  {
    id: 'm1',
    moduleId: 'matrices',
    topic: 'Reading a matrix',
    prompt: 'How many rows does a 3×2 matrix have?',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'what-is-a-matrix',
  },
  {
    id: 'm2',
    moduleId: 'matrices',
    topic: 'Addition and scalar multiplication',
    prompt: 'Given $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix}$, find the element in row 1, column 1 of $A+B$.',
    answer: { type: 'numeric', value: 6 },
    suggestedLessonId: 'addition-and-scalar-multiplication',
  },
  {
    id: 'm3',
    moduleId: 'matrices',
    topic: 'Matrix multiplication',
    prompt: 'Given $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 2 & 0 \\\\ 1 & 2 \\end{pmatrix}$, find element $c_{11}$ of $C = AB$.',
    answer: { type: 'numeric', value: 4 },
    suggestedLessonId: 'matrix-multiplication',
  },
  {
    id: 'm4',
    moduleId: 'matrices',
    topic: 'Determinants',
    prompt: 'Find $\\det(M)$ for $M = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}$.',
    answer: { type: 'numeric', value: 5 },
    suggestedLessonId: 'determinants',
  },
  {
    id: 'm5',
    moduleId: 'matrices',
    topic: 'Inverse and simultaneous equations',
    prompt: 'Solve the simultaneous equations $2x + y = 8$ and $x - y = 1$ for $x$.',
    answer: { type: 'numeric', value: 3 },
    suggestedLessonId: 'inverse-and-simultaneous-equations',
  },
];
