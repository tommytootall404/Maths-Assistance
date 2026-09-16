import type { Lesson } from '../../../types/lesson';
import type { ModuleMeta } from '../../modules';
import { whatIsALog } from './what-is-a-log';
import { lawsOfLogs } from './laws-of-logs';
import { eAndNaturalLog } from './e-and-natural-log';
import { solvingExponentialEquations } from './solving-exponential-equations';
import { engineeringApplications } from './engineering-applications';

export const logsExponentialsLessons: Lesson[] = [
  whatIsALog,
  lawsOfLogs,
  eAndNaturalLog,
  solvingExponentialEquations,
  engineeringApplications,
];

export const logsExponentialsModule: ModuleMeta = {
  id: 'logs-exponentials',
  title: 'Logarithms and Exponentials',
  shortDescription:
    'What a logarithm actually means, the laws that govern them, and where they show up in real engineering — '
    + 'capacitors, cooling, decibels and decay.',
  accentColor: '#7c5cff',
  lessonIds: logsExponentialsLessons.map((lesson) => lesson.id),
};
