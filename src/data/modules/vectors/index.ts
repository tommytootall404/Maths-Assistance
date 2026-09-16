import type { Lesson } from '../../../types/lesson';
import type { ModuleMeta } from '../../modules';
import { vectorNotation } from './vector-notation';
import { resolvingIntoComponents } from './resolving-into-components';
import { magnitudeAndDirection } from './magnitude-and-direction';
import { additionAndSubtraction } from './addition-and-subtraction';
import { forcesAndMotion } from './forces-and-motion';
import { scalarAndVectorProduct } from './scalar-and-vector-product';

export const vectorsLessons: Lesson[] = [
  vectorNotation,
  resolvingIntoComponents,
  magnitudeAndDirection,
  additionAndSubtraction,
  forcesAndMotion,
  scalarAndVectorProduct,
];

export const vectorsModule: ModuleMeta = {
  id: 'vectors',
  title: 'Vectors',
  shortDescription:
    'Quantities with both size and direction — how to write them, resolve them into components, combine '
    + 'forces and velocities, and use them to check equilibrium in real structures.',
  accentColor: '#1f9d8c',
  lessonIds: vectorsLessons.map((lesson) => lesson.id),
};
