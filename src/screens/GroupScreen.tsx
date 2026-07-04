import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { groupMatrix, buildMatrix } from '../lib/matrix';
import { archetypes } from '../content/library';
import type { L } from '../content/library';
import { arcanaTexts, pairStrengthsPool, pairTipsPool } from '../content/arcana';
import { seedFromString, mulberry32, pickN } from '../lib/random';
import { MatrixWheel } from '../components/Charts';
import { playClick, playChime } from '../lib/audio';
import { haptic } from '../lib/haptics';

interface Person { n: string; d: string }
interface GroupResult { matrix: ReturnType<typeof groupMatrix>; roles: { name: string; value: number }[]; strengths: L[]; tips: L[] }

export default function GroupScreen() {
  const { t, lang } = useLang();
  const { sound } = useSettings();
  const [people, setPeople] = useState<Person[]>([{ n: '', d: '' }, { n: '', d: '' }]);
  const [ok, setOk] = useState(false);
  const [res, setRes] = useState<GroupResult | null>(null);
  const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
  const valid = ok && people.length >= 2 && people.every((p) => p.n.trim().length > 0 && isDate(p.d));

  const upd = (i: number, k: keyof Person, v: string) =>
    setPeople((ps) => ps.map((p, j) => (j === i ? { ...p, [k]: v } : p)));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    playClick(sound);
    const rnd = mulberry32(seedFromString(people.map((p) => p.d).join('|') + '|group'));
    setRes({
      matrix: groupMatrix(people.map((p) => p.d)),
      roles: people.map((p) => ({ name: p.n.trim(), value: buildMatrix(p.d).center })),
      strengths: pickN(pairStrengthsPool, 3, rnd),
      tips: pickN(pairTipsPool, 3, rnd),
    });
    playChime(sound);
    haptic([15, 60, 15]);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-8">
      {!res && (
        <form className="glass glass-glow animate-fadeUp p-7 md:p-10" onSubmit={submit}>
          <h2 className="font-display text-4xl text-champagne">{t.group.title}</h2>
          <p className="mt-2 text-sm text-lavender/90">{t.group.subtitle}</p>
          <div className="mt-6 grid gap-4">
            {people.map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/80 bg-white/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-display text-xl text-champagne">{t.group.person} {i + 1}</p>
                  {people.length > 2 && (
                    <button type="button" className="text-sm text-lavender hover:text-champagne" onClick={() => setPeople((ps) => ps.filter((_, j) => j !== i))}>
                      {t.group.remove} ✕
                    </button>
                  )}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`gn-${i}`} className="label">{t.pair.name}</label>
                    <input id={`gn-${i}`} className="field" value={p.n} onChange={(e) => upd(i, 'n', e.target.value)} maxLength={40} required />
                  </div>
                  <div>
                    <label htmlFor={`gd-${i}`} className="label">{t.pair.dob}</label>
                    <input id={`gd-${i}`} className="field" type="date" min="1900-01-01" max="2026-12-31" value={p.d} onChange={(e) => upd(i, 'd', e.target.value)} required />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {people.length < 5 && (
            <button type="button" className="btn-ghost mt-4" onClick={() => { playClick(sound); setPeople((ps) => [...ps, { n: '', d: '' }]); }}>
              {t.group.add}
            </button>
          )}
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/80 bg-white/50 p-4">
            <input type="checkbox" checked={ok} onChange={(e) => { setOk(e.target.checked); playClick(sound); }} className="mt-1 h-5 w-5 shrink-0 accent-[#6b5bb5]" />
            <span className="text-sm leading-relaxed text-pearl/90">{t.pair.consent}</span>
          </label>
          <button type="submit" disabled={!valid} className="btn-primary mt-6 w-full text-lg disabled:cursor-not-allowed disabled:opacity-35">
            {t.group.submit}
          </button>
          <p className="mt-4 text-center text-xs text-pearl/50">{t.pair.note}</p>
        </form>
      )}

      {res && (
        <>
          <section className="glass glass-glow animate-fadeUp p-6 md:p-9">
            <MatrixWheel points={res.matrix.points} center={res.matrix.center} />
            <div className="mt-5 text-center">
              <p className="text-xs uppercase tracking-wider text-lavender">{t.group.center}</p>
              <p className="gold-text mt-1 font-display text-4xl">{res.matrix.center} · {archetypes[res.matrix.center].name[lang]}</p>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-pearl/85">{arcanaTexts[res.matrix.center].long[lang]}</p>
            </div>
          </section>

          <section className="glass glass-glow animate-fadeUp mt-6 p-6 md:p-9">
            <h3 className="font-display text-2xl text-champagne">{t.group.roles}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {res.roles.map((r, i) => (
                <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3">
                  <p className="font-semibold text-pearl">{r.name}</p>
                  <p className="text-sm text-champagne">{r.value} · {archetypes[r.value].name[lang]}</p>
                  <p className="mt-1 text-xs text-pearl/70">✦ {archetypes[r.value].strength[lang]}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-7 font-display text-2xl text-champagne">{t.group.strengths}</h3>
            <ul className="mt-4 grid gap-3">
              {res.strengths.map((x, i) => (
                <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-pearl/90"><span className="mr-2 text-gold">✦</span>{x[lang]}</li>
              ))}
            </ul>
            <h3 className="mt-7 font-display text-2xl text-champagne">{t.group.tips}</h3>
            <ul className="mt-4 grid gap-3">
              {res.tips.map((x, i) => (
                <li key={i} className="rounded-2xl border border-lavender/35 bg-lavender/10 px-4 py-3 text-pearl/90"><span className="mr-2">🌿</span>{x[lang]}</li>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-pearl/50">{t.pair.note}</p>
          </section>

          <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
            <button className="btn-primary" onClick={() => { playClick(sound); setRes(null); window.scrollTo({ top: 0 }); }}>{t.group.again}</button>
            <Link className="btn-ghost" to="/">{t.nav.back}</Link>
          </div>
        </>
      )}
    </div>
  );
}
