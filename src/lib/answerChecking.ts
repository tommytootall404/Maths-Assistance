import { evaluate, simplify } from 'mathjs';
import type { AnswerSpec } from '../types/lesson';

function closeEnough(a: number, b: number, tolerance?: number): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  const tol = tolerance ?? Math.max(1e-6, Math.abs(b) * 0.005);
  return Math.abs(a - b) <= tol;
}

function tryEvaluateNumeric(input: string): number | null {
  try {
    const result: unknown = evaluate(input);
    if (typeof result === 'number') return result;
    if (
      result !== null &&
      typeof result === 'object' &&
      'toNumber' in result &&
      typeof (result as { toNumber: unknown }).toNumber === 'function'
    ) {
      return (result as { toNumber: () => number }).toNumber();
    }
    return null;
  } catch {
    return null;
  }
}

function checkExpressionEquivalence(studentExpr: string, targetExpr: string, variables: string[]): boolean {
  try {
    const diff = simplify(`(${studentExpr}) - (${targetExpr})`).toString();
    if (diff === '0') return true;
  } catch {
    // symbolic simplification failed (e.g. unusual syntax) - fall back to numeric sampling below
  }

  // Sample enough points to be confident, but skip points where either expression is
  // undefined (e.g. log of a negative number) rather than failing outright - functions
  // like log/sqrt/tan are only defined on part of the number line.
  const requiredSamples = 8;
  const maxAttempts = 60;
  let validSamples = 0;
  let attempts = 0;

  while (validSamples < requiredSamples && attempts < maxAttempts) {
    attempts += 1;
    const scope: Record<string, number> = {};
    for (const v of variables) {
      // biased away from 0 and from "nice" round numbers, so coincidental matches or
      // divide-by-zero points are very unlikely
      const magnitude = Math.random() * 5 + 0.3;
      scope[v] = Math.random() < 0.5 ? magnitude : -magnitude;
    }
    let a: unknown;
    let b: unknown;
    try {
      a = evaluate(studentExpr, scope);
      b = evaluate(targetExpr, scope);
    } catch {
      continue;
    }
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isFinite(a) || !Number.isFinite(b)) {
      continue;
    }
    validSamples += 1;
    if (!closeEnough(a, b, Math.max(1e-4, Math.abs(b) * 0.01))) return false;
  }
  return validSamples >= requiredSamples;
}

function parseVectorInput(input: string, componentCount: number): number[] | null {
  const cleaned = input.trim();

  if (/[ijk]/i.test(cleaned) && !/^[[(]/.test(cleaned)) {
    const termRe = /([+-]?\s*\d*\.?\d*)\s*([ijk])/gi;
    const axes: Record<string, number> = { i: 0, j: 0, k: 0 };
    let match: RegExpExecArray | null;
    let matchedAny = false;
    while ((match = termRe.exec(cleaned)) !== null) {
      let coeffStr = match[1].replace(/\s+/g, '');
      if (coeffStr === '' || coeffStr === '+') coeffStr = '1';
      else if (coeffStr === '-') coeffStr = '-1';
      const parsed = Number(coeffStr);
      if (!Number.isFinite(parsed)) continue;
      matchedAny = true;
      axes[match[2].toLowerCase()] += parsed;
    }
    if (matchedAny) return [axes.i, axes.j, axes.k].slice(0, componentCount);
  }

  const stripped = cleaned.replace(/[[\]()]/g, '');
  const parts = stripped.split(/[,\s]+/).filter((p) => p !== '');
  const nums = parts.map(Number);
  if (nums.length > 0 && nums.every((n) => Number.isFinite(n))) return nums;
  return null;
}

function checkVectorEquivalence(input: string, target: number[], tolerance?: number): boolean {
  const parsed = parseVectorInput(input, target.length);
  if (!parsed || parsed.length !== target.length) return false;
  const tol = tolerance ?? 0.05;
  return parsed.every((value, idx) => closeEnough(value, target[idx], tol));
}

export function checkAnswer(studentInput: string, spec: AnswerSpec): boolean {
  const trimmed = studentInput.trim();
  if (trimmed === '') return false;

  switch (spec.type) {
    case 'numeric':
    case 'fraction-or-decimal': {
      const value = tryEvaluateNumeric(trimmed);
      if (value === null) return false;
      return closeEnough(value, spec.value, spec.tolerance);
    }
    case 'expression':
      return checkExpressionEquivalence(trimmed, spec.expression, spec.variables ?? ['x']);
    case 'multiple-choice':
      return trimmed === spec.correctOptionId;
    case 'vector':
      return checkVectorEquivalence(trimmed, spec.components, spec.tolerance);
    default:
      return false;
  }
}

/** True if `input` at least parses as a number/expression - used to give a gentler
 * "that doesn't look like a number" message instead of a generic wrong-answer one. */
export function looksLikeValidInput(studentInput: string, spec: AnswerSpec): boolean {
  const trimmed = studentInput.trim();
  if (trimmed === '') return false;
  if (spec.type === 'numeric' || spec.type === 'fraction-or-decimal') {
    return tryEvaluateNumeric(trimmed) !== null;
  }
  if (spec.type === 'expression') {
    // Variables mean this may not evaluate without a scope, so just check it's built from
    // plausible algebraic characters rather than requiring it to evaluate on its own.
    return /^[0-9a-zA-Z+\-*/^().\s]+$/.test(trimmed);
  }
  if (spec.type === 'vector') {
    return parseVectorInput(trimmed, spec.components.length) !== null;
  }
  return true;
}
