import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { pairMatrix } from '../lib/matrix';
import { archetypes } from '../content/library';
import type { L } from '../content/library';
import { arcanaTexts, pairStrengthsPool, pairTipsPool } from '../content/arcana';
import { seedFromString, mulberry32, pickN } from '../lib/random';
import { MatrixWheel } from '../components/Charts';
import { playChime, playClick } from '../lib/audio';
import { haptic } from '../lib/haptics';

interface PairResult {
  matrix: ReturnType<typeof pairMatrix>;
  strengths: L[];
  tips: L[];
}

export default function PairScreen() {
  const { t, lang } = useLang();
  const { sound } = useSettings();
  const [n1, setN1] = useState('');
  const [d1, setD1] = useState('');
  const [n2, setN2] = useState('');
  const [d2, setD2] = useState('');
  const [ok, setOk] = useState(false);
  const [res, setRes] = useState<PairResult | null>(null);
  const isDate = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
  const valid = ok && n1.trim().length > 0 && n2.trim().length > 0 && isDate(d1) && isDate(d2);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    playClick(sound);
    const rnd = mulberry32(seedFromString(d1 + '|' + d2 + '|pair'));
    setRes({
      matrix: pairMatrix(d1, d2),
      strengths: pickN(pairStrengthsPool, 3, rnd),
      tips: pickN(pairTipsPool, 3, rnd),
    });
    playChime(sound);
    haptic([15, 60, 15]);
    window.scrollTo({ top: 0 });
  };

  const person = (title: string, n: string, setN: (v: string) => void, d: string, setD: (v: string) => void, idx: string) => (
    <div className="rounded-2xl border border-white/80 bg-white/50 p-4">
      <p className="mb-3 font-display text-xl text-champagne">{title}</p>
      <label htmlFor={`pn-${idx}`} className="label">{t.pair.name}</label>
      <input id={`pn-${idx}`} className="field" value={n} onChange={(e) => setN(e.target.value)} maxLength={40} required />
      <label htmlFor={`pd-${idx}`} className="label mt-3">{t.pair.dob}</label>
      <input id={`pd-${idx}`} className="field" type="date" min="1900-01-01" max="2026-12-31" value={d} onChange={(e) => setD(e.target.value)} required />
    </div>
  );

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-8">
      {!res && (
        <form className="glass glass-glow animate-fadeUp p-7 md:p-10" onSubmit={submit}>
          <h2 className="font-display text-4xl text-champagne">{t.pair.title}</h2>
          <p className="mt-2 text-sm text-lavender/90">{t.pair.subtitle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {person(t.pair.p1, n1, setN1, d1, setD1, '1')}
            {person(t.pair.p2, n2, setN2, d2, setD2, '2')}
          </div>
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/80 bg-white/50 p-4">
            <input type="checkbox" checked={ok} onChange={(e) => { setOk(e.target.checked); playClick(sound); }} className="mt-1 h-5 w-5 shrink-0 accent-[#6b5bb5]" />
            <span className="text-sm leading-relaxed text-pearl/90">{t.pair.consent}</span>
          </label>
          <button type="submit" disabled={!valid} className="btn-primary mt-6 w-full text-lg disabled:cursor-not-allowed disabled:opacity-35">
            {t.pair.submit}
          </button>
          <p className="mt-4 text-center text-xs text-pearl/50">{t.pair.note}</p>
        </form>
      )}

      {res && (
        <>
          <header className="animate-fadeUp text-center">
            <h2 className="gold-text font-display text-4xl font-semibold md:text-5xl">{t.pair.resultTitle(n1.trim(), n2.trim())}</h2>
          </header>

          <section className="glass glass-glow animate-fadeUp mt-6 p-6 md:p-9">
            <MatrixWheel points={res.matrix.points} center={res.matrix.center} />
            <div className="mt-5 text-center">
              <p className="text-xs uppercase tracking-wider text-lavender">{t.pair.unionCenter}</p>
              <p className="gold-text mt-1 font-display text-4xl">{res.matrix.center} · {archetypes[res.matrix.center].name[lang]}</p>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed text-pearl/85">{arcanaTexts[res.matrix.center].long[lang]}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {([['matrixSky', res.matrix.purpose.sky], ['matrixEarth', res.matrix.purpose.earth], ['matrixPurpose', res.matrix.purpose.personal]] as const).map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-white/80 bg-white/50 p-4 text-center">
                  <p className="text-xs uppercase tracking-wider text-lavender">{t.report[k]}</p>
                  <p className="mt-1 font-display text-2xl text-champagne">{v}</p>
                  <p className="text-sm text-pearl/85">{archetypes[v].name[lang]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass glass-glow animate-fadeUp mt-6 p-6 md:p-9">
            <h3 className="font-display text-2xl text-champagne">{t.pair.strengths}</h3>
            <ul className="mt-4 grid gap-3">
              {res.strengths.map((x, i) => (
                <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-pearl/90"><span className="mr-2 text-gold">✦</span>{x[lang]}</li>
              ))}
            </ul>
            <h3 className="mt-7 font-display text-2xl text-champagne">{t.pair.tips}</h3>
            <ul className="mt-4 grid gap-3">
              {res.tips.map((x, i) => (
                <li key={i} className="rounded-2xl border border-lavender/35 bg-lavender/10 px-4 py-3 text-pearl/90"><span className="mr-2">🌿</span>{x[lang]}</li>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-pearl/50">{t.pair.note}</p>
          </section>

          <div className="no-print mt-8 flex flex-wrap justify-center gap-3">
            <button className="btn-primary" onClick={() => { playClick(sound); setRes(null); window.scrollTo({ top: 0 }); }}>{t.pair.again}</button>
            <Link className="btn-ghost" to="/">{t.nav.back}</Link>
          </div>
        </>
      )}
    </div>
  );
}
