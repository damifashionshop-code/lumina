// Entertainment numerology. All local, no server. No claims of accuracy.

/** Sum digits of a positive integer. */
const digitSum = (n: number): number => String(n).split('').reduce((a, d) => a + Number(d), 0);

/** Reduce to 1–9, keeping master numbers 11 / 22 / 33. */
export function reduceKeepMasters(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) n = digitSum(n);
  return n;
}

/** Plain reduction to 1–9 (for period energy). */
export function reduceTo9(n: number): number {
  while (n > 9) n = digitSum(n);
  return n;
}

/** Life path number from an ISO date string (YYYY-MM-DD). */
export function lifePathNumber(iso: string): number {
  const total = iso.replace(/\D/g, '').split('').reduce((a, d) => a + Number(d), 0);
  return reduceKeepMasters(total);
}

/** Playful "personal year" and "personal month" energies (1–9). */
export function periodEnergy(iso: string, now = new Date()) {
  const [, m, d] = iso.split('-').map(Number);
  const year = reduceTo9(digitSum(d) + digitSum(m) + digitSum(now.getFullYear()));
  const month = reduceTo9(year + now.getMonth() + 1);
  return { year, month };
}
