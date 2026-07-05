import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { playClick, playChime, speakReport, stopSpeaking } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { archetypes, lifePath } from '../lib/report';
import { arcanaTexts } from '../content/arcana';
import type { Report } from '../lib/report';
import { MatrixWheel, RadarChart, IkigaiVenn, ProgressRing } from '../components/Charts';
import { healthMap, ageMap, loveMoney, lifeSpheres, to22 } from '../lib/matrix';
import { weeklyPool } from '../content/library';
import { seedFromString, mulberry32, pickN } from '../lib/random';
import { usePayment } from '../lib/payment';
import { shareText, downloadShareCard, encodeShare } from '../lib/share';

function Section({ title, note, children, delay = 0 }: { title: string; note?: string; children: ReactNode; delay?: number }) {
  return (
    <section className="glass glass-glow animate-fadeUp mt-6 p-6 md:p-9" style={{ animationDelay: `${delay}s` }}>
      <h3 className="font-display text-3xl text-champagne">{title}</h3>
      {note && <p className="mt-1 text-sm text-lavender/75">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Locked({ children }: { children: ReactNode }) {
  const { t } = useLang();
  const { paid, openPay } = usePayment();
  if (paid) return <>{children}</>;
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none select-none blur-md">{children}</div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-display text-2xl text-champagne">{t.pay.locked}</p>
        <p className="max-w-sm text-sm text-pearl/75">{t.pay.lockedNote}</p>
        <button className="btn-primary no-print" onClick={openPay}>{t.pay.unlock}</button>
      </div>
    </div>
  );
}

function PayModal() {
  const { t } = useLang();
  const { open, closePay, mockPay } = usePayment();
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="no-print fixed inset-0 z-50 flex items-center justify-center bg-indigoDeep/30 px-5 backdrop-blur-sm">
      <div className="glass glass-glow w-full max-w-md p-7 text-center">
        <h3 className="font-display text-3xl text-champagne">{t.pay.modalTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-pearl/85">{t.pay.modalText}</p>
        <p className="gold-text mt-4 font-display text-5xl">{t.pay.price}</p>
        {/* MOCK PAYMENT — replace with Kaspi Pay / CloudPayments / Stripe
            checkout + server-side verification (see src/lib/payment.tsx) */}
        <button className="btn-primary mt-5 w-full" onClick={mockPay}>{t.pay.mock}</button>
        <button className="btn-ghost mt-3 w-full" onClick={closePay}>{t.pay.cancel}</button>
        <p className="mt-4 text-xs text-pearl/55">{t.pay.mockNote}</p>
      </div>
    </div>
  );
}

function DecodeItem({ label, value }: { label: string; value: number }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const a = archetypes[value];
  const x = arcanaTexts[value];
  return (
    <div className="rounded-2xl border border-white/80 bg-white/50">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full flex-wrap items-center justify-between gap-2 px-4 py-3 text-left">
        <span className="text-sm text-pearl/90">{label}</span>
        <span className="font-display text-lg text-champagne">{value} · {a.name[lang]} <span className="ml-1 text-lavender">{open ? '−' : '+'}</span></span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} print:block px-4 pb-4 text-sm leading-relaxed text-pearl/85`}>
        <p>{x.long[lang]}</p>
        <p className="mt-2"><span className="text-lavender">✦ {t.report.inPlus}: </span>{x.plus[lang]}</p>
        <p className="mt-1"><span className="text-lavender">🌱 {t.report.growthZone}: </span>{x.growth[lang]}</p>
        <p className="mt-1 italic text-pearl/70">{x.tip[lang]}</p>
      </div>
    </div>
  );
}

export default function ReportScreen({ report, onRestart, shared = false }: { report: Report; onRestart: () => void; shared?: boolean }) {
  const { t, lang } = useLang();
  const { sound } = useSettings();
  const [toast, setToast] = useState('');
  const [listening, setListening] = useState(false);
  const arch = archetypes[report.archetypeValue];
  const lp = lifePath[report.lifePathValue];
  const isMaster = [11, 22, 33].includes(report.lifePathValue);
  const base = typeof location !== 'undefined' ? location.origin + location.pathname : '';
  // Live share link: the friend opens a real interactive report, not a screenshot.
  const url = `${base}#/r/${encodeShare(report.name, report.dob, report.focus)}`;
  const health = healthMap(report.dob);
  const ages = ageMap(report.dob);
  const lm = loveMoney(report.dob);
  const spheres = lifeSpheres(report.dob);
  const plan7 = pickN(weeklyPool, 7, mulberry32(seedFromString(report.dob + '|plan7')));
  const { paid, openPay } = usePayment();
  const bornYear = Number(report.dob.slice(0, 4));
  const bornMonthDay = report.dob.slice(5);
  const nowD = new Date();
  const nowMonthDay = `${String(nowD.getMonth() + 1).padStart(2, '0')}-${String(nowD.getDate()).padStart(2, '0')}`;
  const curAge = Math.max(0, nowD.getFullYear() - bornYear - (nowMonthDay < bornMonthDay ? 1 : 0));
  const curIdx = Math.min(15, Math.floor(curAge / 5));
  const curPeriod = ages[curIdx];
  const nextPeriods = [1, 2, 3].map((k) => ages[(curIdx + k) % 16]);

  useEffect(() => { playChime(sound); haptic([15, 60, 15, 60, 30]); return () => stopSpeaking(); }, []); // eslint-disable-line

  const say = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };
  const click = () => { playClick(sound); haptic(10); };

  const audioText = [
    t.report.greeting(report.name).replace('✨', ''),
    `${t.report.archetype}: ${arch.name[lang]}. ${arch.desc[lang]}`,
    `${t.report.lifePath}: ${lp.title[lang]}. ${lp.desc[lang]}`,
    t.report.strengths + ': ' + report.strengths.map((x) => x[lang]).join('. '),
    t.report.growth + ': ' + report.growth.map((x) => x[lang]).join(' '),
    t.report.week + ': ' + report.weekly.map((x) => x[lang]).join(' '),
    report.affirmations.map((x) => x[lang]).join(' '),
    `${t.report.motto}: ${report.motto[lang]}`,
  ].join(' ');

  const toggleListen = () => {
    click();
    if (listening) { stopSpeaking(); setListening(false); }
    else { setListening(true); speakReport(audioText, lang, () => setListening(false)); }
  };

  const storyText = `${t.report.shareText(arch.name[lang], report.motto[lang])} ${url}`;

  const doShare = async () => {
    click();
    const res = await shareText(t.report.shareTitle, t.report.shareText(arch.name[lang], report.motto[lang]), url);
    if (res === 'copied') say(t.report.copied);
  };

  const clearData = () => {
    click();
    // Local-only MVP: wiping localStorage removes everything we stored.
    Object.keys(localStorage).filter((k) => k.startsWith('lumina.')).forEach((k) => localStorage.removeItem(k));
    say(t.report.cleared);
  };

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-8">
      {/* Print-only cover page for the PDF export */}
      <div className="hidden print:block text-center" style={{ pageBreakAfter: 'always', paddingTop: '60mm' }}>
        <p className="tracking-[0.4em] text-lavender">L U M I N A</p>
        <p className="mt-8 font-display text-5xl text-champagne">{t.report.greeting(report.name)}</p>
        <p className="mt-4 text-sm text-pearl/70">{new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
        <p className="mx-auto mt-12 max-w-md text-xs leading-relaxed text-pearl/60">{t.report.disclaimerInline}</p>
      </div>

      {/* Greeting */}
      <header className="animate-fadeUp text-center">
        <h2 className="gold-text font-display text-5xl font-semibold md:text-6xl">{t.report.greeting(report.name)}</h2>
        <p className="mt-3 text-sm text-lavender/80">{t.report.greetingSub}</p>
        {paid
          ? <p className="mt-2 text-xs text-gold">{t.pay.paidBadge}</p>
          : <p className="mt-2 text-xs text-pearl/55">{t.pay.freeNote}</p>}
      </header>

      {/* Archetype */}
      <Section title={t.report.archetype} delay={0.1}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/60 text-4xl" style={{ boxShadow: '0 10px 30px rgba(107,91,181,0.28)' }}>
            {report.archetypeValue}
          </div>
          <p className="gold-text font-display text-4xl">{arch.name[lang]}</p>
          <p className="max-w-xl leading-relaxed text-pearl/85">{arch.desc[lang]}</p>
          <p className="text-sm text-lavender">✨ {arch.strength[lang]}</p>
        </div>
      </Section>

      {/* Life path */}
      <Section title={t.report.lifePath} delay={0.15}>
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-lavender/40 font-display text-4xl text-champagne">
            {report.lifePathValue}
          </div>
          <div>
            <p className="font-display text-2xl text-champagne">
              {lp.title[lang]} {isMaster && <span className="text-sm text-lavender">({t.report.lifePathMaster})</span>}
            </p>
            <p className="mt-1 leading-relaxed text-pearl/85">{lp.desc[lang]}</p>
            <p className="mt-2 text-sm text-lavender/90">
              {lp.strengths.map((s) => s[lang]).join(' · ')}
            </p>
            <p className="mt-2 text-sm italic text-pearl/70">{lp.tip[lang]}</p>
          </div>
        </div>
      </Section>

      {/* Matrix */}
      <Section title={t.report.matrix} note={t.report.matrixNote} delay={0.2}>
        <MatrixWheel points={report.matrix.points} center={report.matrix.center} />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {([['matrixSky', report.matrix.purpose.sky], ['matrixEarth', report.matrix.purpose.earth], ['matrixPurpose', report.matrix.purpose.personal]] as const).map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/80 bg-white/50 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-lavender">{t.report[k]}</p>
              <p className="mt-1 font-display text-2xl text-champagne">{v}</p>
              <p className="text-sm text-pearl/85">{archetypes[v].name[lang]}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {([[t.report.loveTitle, lm.love], [t.report.moneyTitle, lm.money]] as const).map(([label, v]) => (
            <div key={label} className="rounded-2xl border border-gold/40 bg-white/50 p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-lavender">{label}</p>
              <p className="mt-1 font-display text-2xl text-champagne">{v} · {archetypes[v].name[lang]}</p>
              <p className="text-sm text-pearl/80">✦ {arcanaTexts[v].plus[lang]}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Full decoding of every position */}
      <Locked><Section title={t.report.decode} note={t.report.decodeNote} delay={0.22}>
        <div className="grid gap-3">
          {report.matrix.points.map((p) => (
            <DecodeItem key={p.key} label={t.report.posLabels[p.key]} value={p.value} />
          ))}
          <DecodeItem label={t.report.posLabels.center} value={report.matrix.center} />
          <DecodeItem label={t.report.posLabels.sky} value={report.matrix.purpose.sky} />
          <DecodeItem label={t.report.posLabels.earth} value={report.matrix.purpose.earth} />
          <DecodeItem label={t.report.posLabels.personal} value={report.matrix.purpose.personal} />
        </div>
      </Section></Locked>

      {/* Health map (entertainment format) */}
      <Locked><Section title={t.report.health} note={t.report.healthNote} delay={0.24}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="text-lavender">
                {[...t.report.healthCols, t.report.healthRec].map((c) => <th key={c} className="border-b border-lavender/40 pb-2 pr-4 font-medium">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {health.map((r) => (
                <tr key={r.key}>
                  <td className="border-b border-lavender/20 py-3 pr-4">
                    <span className="font-semibold text-champagne">{t.report.chakras[r.key][0]}</span>
                    <span className="block text-xs text-pearl/60">{t.report.chakras[r.key][1]}</span>
                  </td>
                  {[r.fiz, r.en, r.emo].map((v, i) => (
                    <td key={i} className="border-b border-lavender/20 py-3 pr-4">
                      <span className="font-semibold text-pearl" title={archetypes[v].name[lang]}>{v}</span>
                    </td>
                  ))}
                  <td className="border-b border-lavender/20 py-3 text-xs text-pearl/70">{arcanaTexts[r.emo].tip[lang]}</td>
                </tr>
              ))}
              <tr>
                <td className="py-3 pr-4 font-semibold text-champagne">{t.report.healthTotal}</td>
                {(['fiz', 'en', 'emo'] as const).map((k) => (
                  <td key={k} className="py-3 pr-4 font-semibold text-gold">{to22(health.reduce((a, r) => a + r[k], 0))}</td>
                ))}
                <td className="py-3 text-xs text-pearl/70">✨</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section></Locked>

      {/* Age map: the life circle */}
      <Locked><Section title={t.report.ageMapTitle} note={t.report.ageMapNote} delay={0.26}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ages.map((a) => (
            <div key={a.age} title={archetypes[a.value].name[lang]} className="rounded-xl border border-white/70 bg-white/45 p-3 text-center">
              <p className="text-xs uppercase tracking-wider text-lavender">{a.age} {t.report.ageYears}</p>
              <p className="font-display text-xl text-champagne">{a.value}</p>
              <p className="truncate text-[11px] text-pearl/70">{archetypes[a.value].name[lang]}</p>
            </div>
          ))}
        </div>
      </Section></Locked>

      {/* Life periods: current + next 3 */}
      <Locked><Section title={t.report.periodsTitle} note={t.report.periodsNote} delay={0.27}>
        <p className="text-sm text-lavender">{t.report.currentAge(curAge)}</p>
        <div className="mt-3 rounded-2xl border border-gold/40 bg-white/50 p-5">
          <p className="text-xs uppercase tracking-widest text-lavender">{t.report.currentPeriod} · {curPeriod.age}–{curPeriod.age + 5} {t.report.ageYears}</p>
          <p className="gold-text mt-1 font-display text-3xl">{curPeriod.value} · {archetypes[curPeriod.value].name[lang]}</p>
          <p className="mt-2 text-sm leading-relaxed text-pearl/90">{arcanaTexts[curPeriod.value].long[lang]}</p>
          <p className="mt-2 text-sm text-pearl/85"><span className="text-lavender">✦ {t.report.periodResource}: </span>{arcanaTexts[curPeriod.value].plus[lang]}</p>
          <p className="mt-1 text-sm text-pearl/85"><span className="text-lavender">🌱 {t.report.periodAttention}: </span>{arcanaTexts[curPeriod.value].growth[lang]}</p>
          <p className="mt-1 text-sm italic text-pearl/70">{arcanaTexts[curPeriod.value].tip[lang]}</p>
        </div>
        <h4 className="mt-6 font-display text-xl text-champagne">{t.report.nextPeriods}</h4>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {nextPeriods.map((pp) => (
            <div key={pp.age} className="rounded-2xl border border-white/80 bg-white/50 p-4">
              <p className="text-xs uppercase tracking-wider text-lavender">{pp.age} {t.report.ageYears}</p>
              <p className="font-display text-2xl text-champagne">{pp.value} · {archetypes[pp.value].name[lang]}</p>
              <p className="mt-1 text-xs text-pearl/75">✦ {arcanaTexts[pp.value].plus[lang]}</p>
            </div>
          ))}
        </div>
      </Section></Locked>

      {/* Sphere lines: love, family, children, money, ancestry */}
      <Locked>
      {(Object.entries({ love: spheres.love, family: spheres.family, children: spheres.children, money: spheres.money, male: spheres.male, female: spheres.female }) as [string, [number, number, number]][]).map(([key, vals], si) => (
        <Section key={key} title={t.report.spheres[key][0]} note={t.report.spheres[key][1]} delay={0.28 + si * 0.02}>
          <div className="grid gap-3">
            {vals.map((v, i) => (
              <div key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-lavender">{t.report.spheres[key][2][i]}</p>
                <p className="font-display text-xl text-champagne">{v} · {archetypes[v].name[lang]}</p>
                <p className="mt-1 text-sm text-pearl/85">
                  {i < 2
                    ? <><span className="text-lavender">✦ {t.report.sphereHelps}: </span>{arcanaTexts[v].plus[lang]}</>
                    : <><span className="text-lavender">🌱 {t.report.sphereGrow}: </span>{arcanaTexts[v].growth[lang]}</>}
                </p>
              </div>
            ))}
            <p className="text-sm italic text-pearl/70"><span className="not-italic text-lavender">{t.report.sphereTip}: </span>{arcanaTexts[vals[0]].tip[lang]}</p>
          </div>
        </Section>
      ))}
      </Locked>

      {/* Strengths */}
      <Section title={t.report.strengths} delay={0.25}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {(paid ? report.strengths : report.strengths.slice(0, 3)).map((s, i) => (
            <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-pearl/90">
              <span className="mr-2 text-gold">✦</span>{s[lang]}
            </li>
          ))}
        </ul>
      </Section>

      {/* Growth zones */}
      <Section title={t.report.growth} note={t.report.growthNote} delay={0.3}>
        <ul className="grid gap-3">
          {(paid ? report.growth : report.growth.slice(0, 1)).map((g, i) => (
            <li key={i} className="rounded-2xl border border-lavender/35 bg-lavender/10 px-4 py-3 leading-relaxed text-pearl/90">
              <span className="mr-2">🌱</span>{g[lang]}
            </li>
          ))}
        </ul>
      </Section>

      {/* Ikigai */}
      <Section title={t.report.ikigai} note={t.report.ikigaiNote} delay={0.35}>
        <IkigaiVenn labels={[t.report.ikigaiLove, t.report.ikigaiGood, t.report.ikigaiWorld, t.report.ikigaiPaid]} />
        <h4 className="mt-6 font-display text-xl text-champagne">{t.report.directions}</h4>
        <ul className="mt-3 grid gap-3">
          {report.directions[lang].map((d, i) => (
            <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 leading-relaxed text-pearl/90">
              <span className="mr-2 text-gold">→</span>{d}
            </li>
          ))}
        </ul>
      </Section>

      {/* Balance */}
      <Section title={t.report.balance} delay={0.4}>
        <RadarChart values={report.balance} labels={t.report.balanceAxes} />
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {report.balance.map((v, i) => (
            <ProgressRing key={i} value={v} label={t.report.balanceAxes[i]} />
          ))}
        </div>
      </Section>

      {/* Resources table */}
      <Section title={t.report.resources} delay={0.45}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="text-lavender">
                {t.report.resourceCols.map((c) => <th key={c} className="border-b border-lavender/40 pb-2 pr-4 font-medium">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {report.resources.map((r, i) => (
                <tr key={i} className="align-top">
                  <td className="border-b border-lavender/20 py-3 pr-4 font-semibold text-champagne">{r.name[lang]}</td>
                  <td className="border-b border-lavender/20 py-3 pr-4 text-pearl/85">{r.shows[lang]}</td>
                  <td className="border-b border-lavender/20 py-3 text-pearl/85">{r.feed[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Period energy */}
      <Section title={t.report.energy} delay={0.5}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/80 bg-white/50 p-5">
            <p className="text-sm uppercase tracking-widest text-lavender">{t.report.energyYear}</p>
            <p className="mt-2 leading-relaxed text-pearl/90">{report.energyYear[lang]}</p>
          </div>
          <div className="rounded-2xl border border-white/80 bg-white/50 p-5">
            <p className="text-sm uppercase tracking-widest text-lavender">{t.report.energyMonth}</p>
            <p className="mt-2 leading-relaxed text-pearl/90">{report.energyMonth[lang]}</p>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-white/50 p-5 sm:col-span-2">
            <p className="text-sm uppercase tracking-widest text-lavender">{t.report.yearArcanaTitle}</p>
            <p className="gold-text mt-1 font-display text-3xl">{report.yearArcana} · {archetypes[report.yearArcana].name[lang]}</p>
            <p className="mt-2 leading-relaxed text-pearl/90">{arcanaTexts[report.yearArcana].long[lang]}</p>
          </div>
        </div>
      </Section>

      {/* Week & affirmations */}
      <Section title={t.report.week} delay={0.55}>
        <ul className="grid gap-3">
          {report.weekly.map((w, i) => (
            <li key={i} className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-pearl/90">
              <span className="mr-2">{['🕯️', '💌', '🌿'][i]}</span>{w[lang]}
            </li>
          ))}
        </ul>
      </Section>

      <Locked><Section title={t.report.plan7} note={t.report.plan7Note} delay={0.58}>
        <ol className="grid gap-3">
          {plan7.map((w, i) => (
            <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-pearl/90">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/50 text-xs font-semibold text-gold">{i + 1}</span>
              <span><span className="mr-1 text-xs uppercase tracking-wider text-lavender">{t.report.dayN(i + 1)}.</span> {w[lang]}</span>
            </li>
          ))}
        </ol>
      </Section></Locked>

      <Section title={t.report.affirmations} delay={0.6}>
        <div className="grid gap-3 text-center">
          {report.affirmations.map((a, i) => (
            <p key={i} className="font-display text-xl italic text-pearl/90">«{a[lang]}»</p>
          ))}
        </div>
      </Section>

      {/* Motto */}
      <section className="glass glass-glow animate-fadeUp mt-6 p-8 text-center md:p-12" style={{ animationDelay: '0.65s' }}>
        <p className="text-sm uppercase tracking-[0.3em] text-lavender">{t.report.motto}</p>
        <p className="gold-text mt-4 font-display text-4xl leading-snug md:text-5xl">«{report.motto[lang]}»</p>
      </section>

      <p className="mt-6 text-center text-xs text-pearl/50">{t.report.disclaimerInline}</p>

      {/* Actions */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-3">
        {/* Free print-to-PDF. FUTURE: premium PDF via jsPDF or a serverless
            endpoint; gate behind payment (Stripe/Paddle) for premium tier. */}
        <button className="btn-primary" onClick={() => { click(); if (paid) window.print(); else openPay(); }}>{t.report.btnDownload}</button>
        <button className="btn-ghost" onClick={doShare}>{t.report.btnShare}</button>
        <button
          className="btn-ghost"
          onClick={() => { click(); downloadShareCard({ name: report.name, archetype: arch.name[lang], motto: report.motto[lang], title: t.report.shareTitle, url }); }}
        >{t.report.btnGift} 🎁</button>
        <button
          className="btn-ghost"
          onClick={async () => { click(); await navigator.clipboard.writeText(storyText); say(t.report.copied); }}
        >{t.report.btnCopy}</button>
        <button className="btn-ghost" onClick={toggleListen} aria-pressed={listening}>{listening ? t.report.btnListenStop : t.report.btnListen}</button>
        <button className="btn-ghost" onClick={() => { click(); onRestart(); }}>{shared ? t.report.sharedCta : t.report.btnAgain}</button>
        <Link className="btn-ghost" to="/pair" onClick={click}>{t.report.btnPair} 💞</Link>
        <Link className="btn-ghost" to="/day" state={{ dob: report.dob }} onClick={click}>{t.report.btnDay} ☀️</Link>
        <Link className="btn-ghost" to="/group" onClick={click}>{t.report.btnGroup} 👥</Link>
        {!shared && <button className="btn-ghost !border-lavender/30 !text-pearl/60" onClick={clearData}>{t.report.clearData}</button>}
      </div>

      <PayModal />

      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-gold/50 bg-indigoDeep px-6 py-3 text-champagne shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
