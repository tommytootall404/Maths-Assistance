import type { Lesson } from '../../../types/lesson';
import type { ModuleMeta } from '../../modules';
import { differentiatingPowersAndPolynomials } from './differentiating-powers-and-polynomials';
import { differentiatingTrigAndExponential } from './differentiating-trig-and-exponential';
import { chainAndProductRule } from './chain-and-product-rule';
import { integrationAsReverseDifferentiation } from './integration-as-reverse-differentiation';
import { definiteIntegralsAndArea } from './definite-integrals-and-area';
import { ratesOfChange } from './rates-of-change';
import { maximaAndMinima } from './maxima-and-minima';
import { calculusEngineeringApplications } from './calculus-engineering-applications';

export const calculusLessons: Lesson[] = [
  differentiatingPowersAndPolynomials,
  differentiatingTrigAndExponential,
  chainAndProductRule,
  integrationAsReverseDifferentiation,
  definiteIntegralsAndArea,
  ratesOfChange,
  maximaAndMinima,
  calculusEngineeringApplications,
];

export const calculusModule: ModuleMeta = {
  id: 'calculus',
  title: 'Calculus',
  shortDescription:
    'Differentiation and integration from first principles through to real engineering use — gradients of '
    + 'curves, the chain and product rules, areas under graphs, rates of change, and optimisation problems '
    + 'like maximum volume and minimum material.',
  accentColor: '#2f6fed',
  lessonIds: calculusLessons.map((lesson) => lesson.id),
};
