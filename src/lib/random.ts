/** Small seeded PRNG (mulberry32) so practice questions can be regenerated with new numbers,
 * while still being reproducible from a given seed (useful for testing). */
export function mulberry32(seed: number): () => number {
  let state = seed | 0;
  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

export function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function randomChoice<T>(rng: () => number, options: readonly T[]): T {
  return options[Math.floor(rng() * options.length)];
}

/** An integer in [min, max], never equal to any value in `excluding`. */
export function randomIntExcluding(
  rng: () => number,
  min: number,
  max: number,
  excluding: readonly number[],
): number {
  let value = randomInt(rng, min, max);
  let attempts = 0;
  while (excluding.includes(value) && attempts < 50) {
    value = randomInt(rng, min, max);
    attempts += 1;
  }
  return value;
}
