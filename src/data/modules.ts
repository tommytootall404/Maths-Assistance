import type { KeyFormula, Lesson, ModuleId } from '../types/lesson';
import { logsExponentialsModule, logsExponentialsLessons } from './modules/logs-exponentials';

export interface ModuleMeta {
  id: ModuleId;
  title: string;
  shortDescription: string;
  accentColor: string;
  lessonIds: string[];
}

export const modules: ModuleMeta[] = [
  logsExponentialsModule,
  // calculus, vectors and matrices modules are added here as they're built
];

export const allLessons: Lesson[] = [...logsExponentialsLessons];

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((lesson) => lesson.id === id);
}

export function getModuleById(id: ModuleId): ModuleMeta | undefined {
  return modules.find((module) => module.id === id);
}

export function getLessonsForModule(moduleId: ModuleId): Lesson[] {
  return allLessons.filter((lesson) => lesson.moduleId === moduleId);
}

export interface FormulaSheetEntry extends KeyFormula {
  lessonId: string;
  lessonTitle: string;
}

/** Derived from each lesson's key-formulas card, so the formula sheet stays in sync
 * automatically as lessons are added or edited. */
export function getFormulaSheetForModule(moduleId: ModuleId): FormulaSheetEntry[] {
  return getLessonsForModule(moduleId).flatMap((lesson) =>
    lesson.keyFormulas.map((formula) => ({ ...formula, lessonId: lesson.id, lessonTitle: lesson.title })),
  );
}
