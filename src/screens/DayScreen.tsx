import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { dayArcana, BRIGHT_ARCANA } from '../lib/matrix';
import { archetypes } from '../content/library';
import { arcanaTexts } from '../content/arcana';
import { downloadIcs } from '../lib/share';
import { playClick, playChime } from '../lib/audio';
import { haptic } from '../lib/haptics';

export default function DayScreen() {
  const { t, lang } = useLang();
  const { sound } = useSettings();
  const loc = useLocation() as { state?: { dob?: string } };
  const [dob, setDob] = useState(loc.state?.dob ?? '');
  const [shown, setShown] = useState(Boolean(loc.state?.dob));
  const valid = /^\d{4}-\d{2}-\d{2}$/.test(dob);
  const now = new Date();

  const monthDays: Date[] = [];
  if (valid) {
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= days; d++) monthDays.push(new Date(now.getFullYear(), now.getMonth(), d));
  }
  const brightDates = monthDays.filter((d) => BRIGHT_ARCANA.has(dayArcana(dob, d)));
  const today = valid ? dayArcana(dob, now) : 1;
  const a = archetypes[today];
  const x = arcanaTexts[today];

  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 py-8">
      <section className="glass glass-glow animate-fadeUp p-7 md:p-10">
        <h2 className="font-display text-4xl text-champagne">{t.day.title}</h2>
        <p className="mt-2 text-sm text-lavender/90">{t.day.subtitle}</p>
        <div className="mt-5 flex flex-wrap items-end gap-3">
          <div className="grow">
            <label htmlFor="day-dob" className="label">{t.day.dob}</label>
            <input id="day-dob" className="field" type="date" min="1900-01-01" max="2026-12-31" value={dob} onChange={(e) => { setDob(e.target.value); setShown(false); }} />
          </div>
          <button
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!valid}
            onClick={() => { playClick(sound); playChime(sound); haptic(12); setShown(true); }}
          >{t.day.show}</button>
        </div>
      </section>

      {shown && valid && (
        <>
          <section className="glass glass-glow animate-fadeUp mt-6 p-6 text-center md:p-9">
            <p className="text-xs uppercase tracking-widest text-lavender">{t.day.today} · {now.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}</p>
            <p className="gold-text mt-2 font-display text-5xl">{today} · {a.name[lang]}</p>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-pearl/85">{x.long[lang]}</p>
            <div className="mx-auto mt-5 max-w-md rounded-2xl border border-gold/40 bg-white/50 p-4">
              <p className="text-xs uppercase tracking-widest text-lavender">{t.day.ritual}</p>
              <p className="mt-1 text-pearl/90">{x.tip[lang]}</p>
            </div>
          </section>

          <section className="glass glass-glow animate-fadeUp mt-6 p-6 md:p-9">
            <h3 className="font-display text-2xl text-champagne">{t.day.calendar}</h3>
            <p className="mt-1 text-sm text-lavender/80">{t.day.brightNote}</p>
            <div className="mt-5 grid grid-cols-7 gap-2">
              {monthDays.map((d) => {
                const v = dayArcana(dob, d);
                const bright = BRIGHT_ARCANA.has(v);
                const isToday = d.getDate() === now.getDate();
                return (
                  <div
                    key={d.getDate()}
                    title={`${v} · ${archetypes[v].name[lang]}`}
                    className={`flex flex-col items-center rounded-xl border p-2 text-center ${bright ? 'border-gold/70 bg-white/70' : 'border-white/60 bg-white/30'} ${isToday ? 'ring-2 ring-gold' : ''}`}
                    style={bright ? { boxShadow: '0 4px 16px rgba(232,183,116,0.25)' } : undefined}
                  >
                    <span className="text-sm font-semibold text-pearl">{d.getDate()}</span>
                    <span className={`text-[10px] ${bright ? 'text-gold' : 'text-lavender/70'}`}>{bright ? '✨' : v}</span>
                  </div>
                );
              })}
            </div>
            <button
              className="btn-ghost mt-6"
              onClick={() => { playClick(sound); downloadIcs(brightDates, t.day.icsSummary, t.day.icsDesc); }}
            >{t.day.ics}</button>
          </section>
        </>
      )}

      <div className="no-print mt-8 text-center">
        <Link className="btn-ghost" to="/">{t.nav.back}</Link>
      </div>
    </div>
  );
}
