import { useState, type ChangeEvent } from 'react';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { playClick } from '../lib/audio';
import { haptic } from '../lib/haptics';
import type { UserInput } from '../lib/report';

const FOCUS_KEYS = ['confidence', 'calm', 'creativity', 'money', 'love', 'health', 'discipline'] as const;

export default function FormScreen({ onSubmit }: { onSubmit: (data: UserInput) => void }) {
  const { t } = useLang();
  const { sound } = useSettings();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState('');
  const [ans, setAns] = useState({ love: '', good: '', thanks: '', inspire: '', grow: '', life: '', focus: 'confidence' });
  const valid = name.trim().length > 0 && /^\d{4}-\d{2}-\d{2}$/.test(dob);

  const upd = (k: keyof typeof ans) => (e: ChangeEvent<HTMLInputElement>) =>
    setAns((s) => ({ ...s, [k]: e.target.value }));

  const questions: [keyof typeof ans, string, string][] = [
    ['love', t.form.q_love, t.form.q_love_ph],
    ['good', t.form.q_good, t.form.q_good_ph],
    ['thanks', t.form.q_thanks, t.form.q_thanks_ph],
    ['inspire', t.form.q_inspire, t.form.q_inspire_ph],
    ['grow', t.form.q_grow, t.form.q_grow_ph],
    ['life', t.form.q_life, t.form.q_life_ph],
  ];

  return (
    <section className="relative z-10 mx-auto max-w-2xl px-5 py-10">
      <form
        className="glass glass-glow animate-fadeUp p-7 md:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          playClick(sound); haptic([12, 50, 12]);
          onSubmit({ name: name.trim(), dob, time: time || undefined, city: city.trim() || undefined, ikigai: ans });
        }}
      >
        <h2 className="font-display text-4xl text-champagne">{t.form.title}</h2>
        <p className="mt-2 text-sm text-lavender/80">{t.form.subtitle}</p>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-name" className="label">{t.form.name} *</label>
            <input id="f-name" className="field" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.form.namePh} maxLength={40} />
          </div>
          <div>
            <label htmlFor="f-dob" className="label">{t.form.dob} *</label>
            <input id="f-dob" className="field" required type="date" value={dob} min="1900-01-01" max="2026-12-31" onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <label htmlFor="f-time" className="label">{t.form.time}</label>
            <input id="f-time" className="field" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-city" className="label">{t.form.city}</label>
            <input id="f-city" className="field" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t.form.cityPh} maxLength={60} />
          </div>
        </div>

        <h3 className="mt-9 font-display text-2xl text-champagne">{t.form.ikigaiTitle}</h3>
        <p className="mt-1 text-sm text-lavender/80">{t.form.ikigaiNote}</p>
        <div className="mt-5 grid gap-5">
          {questions.map(([k, q, ph]) => (
            <div key={k}>
              <label htmlFor={`f-${k}`} className="label">{q}</label>
              <input id={`f-${k}`} className="field" value={ans[k]} onChange={upd(k)} placeholder={ph} maxLength={120} />
            </div>
          ))}
          <div>
            <label htmlFor="f-focus" className="label">{t.form.q_focus}</label>
            <select id="f-focus" className="field" value={ans.focus} onChange={(e) => setAns((s) => ({ ...s, focus: e.target.value }))}>
              {FOCUS_KEYS.map((k) => (
                <option key={k} value={k} className="bg-white text-pearl">{t.form.focus[k]}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-xs text-pearl/50">{t.form.required}</p>
        <button type="submit" disabled={!valid} className="btn-primary mt-5 w-full text-lg disabled:cursor-not-allowed disabled:opacity-35">
          {t.form.submit}
        </button>
      </form>
    </section>
  );
}
