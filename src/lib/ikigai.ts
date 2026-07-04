// Ikigai compass: built purely from the user's own words.
// No promises of income or guaranteed success — only gentle directions.
import { ikigaiTemplates, focusBoost } from '../content/library';
import type { L } from '../content/library';
import { pickN } from './random';

export interface IkigaiAnswers {
  love: string; good: string; thanks: string; inspire: string;
  grow: string; life: string; focus: string;
}

const firstPhrase = (s: string, fallback: L, lang: 'ru' | 'en'): string => {
  const t = s.split(/[,;.\n]/)[0].trim().toLowerCase();
  return t.length > 1 ? t : fallback[lang];
};

export function ikigaiDirections(a: IkigaiAnswers, lang: 'ru' | 'en', rnd: () => number): string[] {
  const fb: Record<string, L> = {
    love: { ru: 'любимые занятия', en: 'your favourite activities' },
    good: { ru: 'ваши сильные стороны', en: 'your strengths' },
    grow: { ru: 'что-то новое и интересное', en: 'something new and interesting' },
    inspire: { ru: 'близкие вам темы', en: 'topics close to you' },
  };
  const vars: Record<string, string> = {
    love: firstPhrase(a.love, fb.love, lang),
    good: firstPhrase(a.good, fb.good, lang),
    grow: firstPhrase(a.grow, fb.grow, lang),
    inspire: firstPhrase(a.inspire, fb.inspire, lang),
  };
  const chosen = pickN(ikigaiTemplates, 4, rnd);
  const dirs = chosen.map((t) => t[lang].replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? ''));
  const boost = focusBoost[a.focus];
  if (boost) dirs.push(boost[lang]);
  return dirs;
}
