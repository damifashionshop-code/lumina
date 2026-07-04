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

/** Arcana of the current personal year: day + month + digit sum of the current year, reduced to 1–22. */
export function yearArcana(iso: string, now = new Date()): number {
  const [, m, d] = iso.split('-').map(Number);
  return to22(to22(d) + m + to22(digitSum(now.getFullYear())));
}

/** Personal arcana of a specific day: birth day + month + reduced digit sum of the calendar date. */
export function dayArcana(iso: string, date = new Date()): number {
  const [, m, d] = iso.split('-').map(Number);
  const dsum = digitSum(date.getDate()) + digitSum(date.getMonth() + 1) + digitSum(date.getFullYear());
  return to22(to22(d) + m + to22(dsum));
}

/** "Bright" arcana — days of special shine in the personal calendar. */
export const BRIGHT_ARCANA = new Set([3, 6, 10, 17, 19, 21, 22]);

/** Group matrix for 2–5 people: pointwise sums of all matrices, reduced to 1–22. */
export function groupMatrix(isos: string[]): { points: MatrixPoint[]; center: number; purpose: MatrixPurpose } {
  const ms = isos.map(buildMatrix);
  const points = ms[0].points.map((pt, i) => ({ key: pt.key, value: to22(ms.reduce((a, m) => a + m.points[i].value, 0)) }));
  const sky = to22(ms.reduce((a, m) => a + m.purpose.sky, 0));
  const earth = to22(ms.reduce((a, m) => a + m.purpose.earth, 0));
  return { points, center: to22(ms.reduce((a, m) => a + m.center, 0)), purpose: { sky, earth, personal: to22(sky + earth) } };
}

/** Compatibility matrix of a pair: pointwise sums of both matrices, reduced to 1–22. */
export function pairMatrix(iso1: string, iso2: string): { points: MatrixPoint[]; center: number; purpose: MatrixPurpose } {
  const m1 = buildMatrix(iso1), m2 = buildMatrix(iso2);
  const points = m1.points.map((pt, i) => ({ key: pt.key, value: to22(pt.value + m2.points[i].value) }));
  const sky = to22(m1.purpose.sky + m2.purpose.sky);
  const earth = to22(m1.purpose.earth + m2.purpose.earth);
  return { points, center: to22(m1.center + m2.center), purpose: { sky, earth, personal: to22(sky + earth) } };
}

// ── Extended professional decoding (classic scheme) ──────────────
// Line points from edge to centre, e.g. left axis: A → A1 → A2 → A3 → E,
// where A2 = A+E, A1 = A+A2, A3 = A2+E (all reduced to 1–22).

const base = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  const A = to22(d), B = m, C = to22(digitSum(y));
  const D = to22(A + B + C), E = to22(A + B + C + D);
  return { A, B, C, D, E };
};

const linePoints = (edge: number, E: number) => {
  const p2 = to22(edge + E);        // mid point (closer to centre)
  const p1 = to22(edge + p2);       // point next to the edge
  const p3 = to22(p2 + E);          // point next to the centre
  return { p1, p2, p3 };
};

export interface ChakraRow { key: string; fiz: number; en: number; emo: number }

/** "Health map": 7 energy centres pairing the horizontal (physics) and
    vertical (energy) axis points; emotions = their reduced sum.
    Entertainment format — not medical information. */
export function healthMap(iso: string): ChakraRow[] {
  const { A, B, C, D, E } = base(iso);
  const la = linePoints(A, E), lb = linePoints(B, E), lc = linePoints(C, E), ld = linePoints(D, E);
  const row = (key: string, fiz: number, en: number): ChakraRow => ({ key, fiz, en, emo: to22(fiz + en) });
  return [
    row('sahasrara', A, B),
    row('ajna', la.p1, lb.p1),
    row('vishuddha', la.p2, lb.p2),
    row('anahata', la.p3, lb.p3),
    row('manipura', E, E),
    row('svadhisthana', lc.p2, ld.p2),
    row('muladhara', C, D),
  ];
}

/** Age map: the octagram perimeter as a life circle. Vertices every 10
    years (A=0, F=10, B=20, G=30, C=40, H=50, D=60, I=70), midpoints at
    5-year marks equal the reduced sum of neighbouring vertices. */
export function ageMap(iso: string): { age: number; value: number }[] {
  const { A, B, C, D } = base(iso);
  const F = to22(A + B), G = to22(B + C), H = to22(C + D), I = to22(A + D);
  const verts = [A, F, B, G, C, H, D, I];
  const out: { age: number; value: number }[] = [];
  for (let i = 0; i < 8; i++) {
    out.push({ age: i * 10, value: verts[i] });
    out.push({ age: i * 10 + 5, value: to22(verts[i] + verts[(i + 1) % 8]) });
  }
  return out;
}

/** Love (♥) and money ($) channel on the E→H diagonal:
    heart = E+H, money = H+heart (classic scheme). */
export function loveMoney(iso: string): { love: number; money: number } {
  const { C, D, E } = base(iso);
  const H = to22(C + D);
  const love = to22(E + H);
  return { love, money: to22(H + love) };
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
