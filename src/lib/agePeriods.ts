// Entertainment age-period engine: a symbolic "theme activity index"
// (0–100) per year of life. Playful self-reflection, never a forecast.
import { buildMatrix, to22, lifeSpheres } from './matrix';
import { THEME_ARCANA } from '../content/themes';
import type { ThemeKey } from '../content/themes';

const digitSum = (n: number): number => String(Math.abs(n)).split('').reduce((a, d) => a + Number(d), 0);

export interface AgePeriod {
  age: number;
  calendarYear: number;
  arcana: number;
  scores: Record<ThemeKey, number>;
  top: ThemeKey[];
}

/** Build the 0–80 age map with theme indices. Deterministic and local. */
export function buildAgePeriods(iso: string): AgePeriod[] {
  const m = buildMatrix(iso);
  const userNums = [...m.points.map((p) => p.value), m.center, m.purpose.sky, m.purpose.earth, m.purpose.personal];
  const y0 = Number(iso.slice(0, 4));
  const keys = Object.keys(THEME_ARCANA) as ThemeKey[];
  const out: AgePeriod[] = [];
  for (let age = 0; age <= 80; age++) {
    const arcana = to22(m.center + age + digitSum(y0 + age));
    const scores = {} as Record<ThemeKey, number>;
    keys.forEach((k) => {
      let s = 25;
      if (THEME_ARCANA[k].includes(arcana)) s += 35;
      if (userNums.includes(arcana)) s += 20;
      if (THEME_ARCANA[k].includes(to22(digitSum(age) || 22))) s += 10;
      if (age % 5 === 0) s += 5;
      if (age % 7 === 0) s += 5;
      scores[k] = Math.min(100, s);
    });
    const top = (Object.entries(scores) as [ThemeKey, number][]).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k);
    out.push({ age, calendarYear: y0 + age, arcana, scores, top });
  }
  return out;
}

/** Top symbolic "windows" (age ranges) for a theme, merged when adjacent. */
export function eventWindows(periods: AgePeriod[], theme: ThemeKey, min = 18, max = 65, threshold = 60): string[] {
  const active = periods.filter((p) => p.age >= min && p.age <= max && p.scores[theme] >= threshold).map((p) => p.age);
  const ranges: [number, number][] = [];
  active.forEach((a) => {
    const last = ranges[ranges.length - 1];
    if (last && a === last[1] + 1) last[1] = a;
    else ranges.push([a, a]);
  });
  const scored = ranges.map((r) => ({
    r,
    peak: Math.max(...periods.filter((p) => p.age >= r[0] && p.age <= r[1]).map((p) => p.scores[theme])),
  }));
  scored.sort((a, b) => b.peak - a.peak);
  return scored.slice(0, 3).sort((a, b) => a.r[0] - b.r[0]).map(({ r }) => (r[0] === r[1] ? `${r[0]}` : `${r[0]}–${r[1]}`));
}

/** Symbolic children theme: a theme of care, never a pregnancy forecast. */
export function childrenSymbolic(iso: string): { score: number; key: 'many' | 'oneTwo' | 'one' | 'soft' } {
  const s = lifeSpheres(iso);
  const m = buildMatrix(iso);
  const hits = s.children.filter((v) => THEME_ARCANA.children.includes(v)).length;
  let score = 35 + hits * 15;
  if (THEME_ARCANA.children.includes(m.center)) score += 15;
  if (THEME_ARCANA.family.includes(m.center)) score += 10;
  score = Math.min(100, score);
  const key = score >= 80 && hits >= 3 ? 'many' : score >= 65 && hits >= 2 ? 'oneTwo' : score >= 50 ? 'one' : 'soft';
  return { score, key };
}

/** Career direction arcana: main path, talent, social, purpose, resources. */
export function careerArcana(iso: string): number[] {
  const m = buildMatrix(iso);
  const s = lifeSpheres(iso);
  const get = (k: string) => m.points.find((p) => p.key === k)!.value;
  return [...new Set([m.center, get('ab'), get('bc'), s.purpose, s.money[0]])];
}

/** Symbolic partner portrait: a comfortable "type", not a specific person. */
export function partnerProfile(iso: string): { partner: number; career: number; character: number } {
  const s = lifeSpheres(iso);
  const m = buildMatrix(iso);
  const month = m.points.find((p) => p.key === 'month')!.value;
  const partner = to22(s.love[0] + s.family[0] + s.love[1]);
  return { partner, career: to22(partner + s.money[0]), character: to22(partner + month) };
}
