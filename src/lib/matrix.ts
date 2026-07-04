// Playful "destiny matrix": 8 circular positions derived from the birth
// date with values reduced to 1–22, each mapped to a kind archetype.
// This is a game, not divination.
import { reduceTo9 } from './numerology';

export interface MatrixPoint { key: string; value: number }

const to22 = (n: number): number => {
  while (n > 22) n = String(n).split('').reduce((a, d) => a + Number(d), 0);
  return n === 0 ? 22 : n;
};

export function buildMatrix(iso: string): { points: MatrixPoint[]; center: number } {
  const [y, m, d] = iso.split('-').map(Number);
  const dayV = to22(d);
  const monthV = to22(m);
  const yearV = to22(String(y).split('').reduce((a, c) => a + Number(c), 0));
  const mission = to22(dayV + monthV + yearV);
  const heart = to22(dayV + monthV);
  const talent = to22(monthV + yearV);
  const support = to22(dayV + yearV);
  const growth = to22(heart + talent);
  const center = to22(mission + heart);
  const points: MatrixPoint[] = [
    { key: 'day', value: dayV },
    { key: 'month', value: monthV },
    { key: 'year', value: yearV },
    { key: 'mission', value: mission },
    { key: 'heart', value: heart },
    { key: 'talent', value: talent },
    { key: 'support', value: support },
    { key: 'growth', value: growth },
  ];
  return { points, center };
}

/** Balance values 55–95: always a strong, positive picture. */
export function balanceValues(iso: string, name: string): number[] {
  const seedStr = iso + '|' + name.toLowerCase();
  let h = 0;
  for (const ch of seedStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < 7; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(55 + (h % 41)); // 55..95 — never a "bad" zone
  }
  // Nudge one axis to a clear high so every report has a "shining" side
  out[reduceTo9(h) % 7] = 92 + (h % 6);
  return out.map((v) => Math.min(97, v));
}
