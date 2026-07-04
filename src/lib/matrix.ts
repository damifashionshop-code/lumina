// Destiny Matrix — classic calculation method (as used by popular
// destiny-matrix calculators, method by N. Ladini, 2006):
//   A = birth day reduced to 1–22
//   B = birth month
//   C = digit sum of birth year reduced to 1–22
//   D = A + B + C reduced (karmic point)
//   E = A + B + C + D reduced (centre, comfort zone)
// Ancestral square (diagonal): F = A+B, G = B+C, H = C+D, I = A+D.
// Purpose line: Sky = B+D, Earth = A+C, Personal purpose = Sky+Earth.
// Interpretations on this site stay positive and are for entertainment.

const digitSum = (n: number): number => String(n).split('').reduce((a, d) => a + Number(d), 0);

/** Reduce to the 1–22 arcana range. */
export const to22 = (n: number): number => {
  while (n > 22) n = digitSum(n);
  return n;
};

export interface MatrixPoint { key: string; value: number }
export interface MatrixPurpose { sky: number; earth: number; personal: number }

export function buildMatrix(iso: string): { points: MatrixPoint[]; center: number; purpose: MatrixPurpose } {
  const [y, m, d] = iso.split('-').map(Number);
  const A = to22(d);            // character
  const B = m;                  // month 1–12, already ≤ 22
  const C = to22(digitSum(y));  // year energy
  const D = to22(A + B + C);    // karmic point
  const E = to22(A + B + C + D); // centre / comfort zone
  const F = to22(A + B);        // ancestral square
  const G = to22(B + C);
  const H = to22(C + D);
  const I = to22(A + D);
  const sky = to22(B + D);
  const earth = to22(A + C);
  const personal = to22(sky + earth);
  // Octagram order, clockwise from the top: B, G, C, H, D, I, A, F
  const points: MatrixPoint[] = [
    { key: 'month', value: B },
    { key: 'bc', value: G },
    { key: 'year', value: C },
    { key: 'cd', value: H },
    { key: 'karma', value: D },
    { key: 'ad', value: I },
    { key: 'day', value: A },
    { key: 'ab', value: F },
  ];
  return { points, center: E, purpose: { sky, earth, personal } };
}

/** Balance values 55–95: always a strong, positive picture. */
export function balanceValues(iso: string, name: string): number[] {
  const seedStr = iso + '|' + name.toLowerCase();
  let h = 0;
  for (const ch of seedStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < 7; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(55 + (h % 41));
  }
  out[h % 7] = 92 + (h % 6);
  return out.map((v) => Math.min(97, v));
}
