import type { Lesson } from '../../../types/lesson';
import type { ModuleMeta } from '../../modules';
import { whatIsAMatrix } from './what-is-a-matrix';
import { additionAndScalarMultiplication } from './addition-and-scalar-multiplication';
import { matrixMultiplication } from './matrix-multiplication';
import { determinants } from './determinants';
import { inverseAndSimultaneousEquations } from './inverse-and-simultaneous-equations';

export const matricesLessons: Lesson[] = [
  whatIsAMatrix,
  additionAndScalarMultiplication,
  matrixMultiplication,
  determinants,
  inverseAndSimultaneousEquations,
];

export const matricesModule: ModuleMeta = {
  id: 'matrices',
  title: 'Matrices and Determinants',
  shortDescription:
    'What a matrix actually is, how to add, scale and multiply them, and how determinants and inverses let you '
    + 'solve real circuit and structural equations in one step.',
  accentColor: '#c2670f',
  lessonIds: matricesLessons.map((lesson) => lesson.id),
};
