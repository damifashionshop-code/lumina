import { useState } from 'react';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { playClick } from '../lib/audio';
import { haptic } from '../lib/haptics';

export default function Consent({ onAccept, onBack }: { onAccept: () => void; onBack: () => void }) {
  const { t } = useLang();
  const { sound } = useSettings();
  const [fun, setFun] = useState(false);
  const [age, setAge] = useState(false);
  const ok = fun && age;
  return (
    <section className="relative z-10 mx-auto max-w-2xl px-5 py-10">
      <div className="glass glass-glow animate-fadeUp p-7 md:p-10">
        <h2 className="font-display text-4xl text-champagne">{t.consent.title}</h2>
        <p className="mt-4 leading-relaxed text-pearl/85">{t.consent.text}</p>
        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/80 bg-white/50 p-4 transition-colors hover:border-gold/40">
          <input type="checkbox" checked={fun} onChange={(e) => { setFun(e.target.checked); playClick(sound); }} className="mt-1 h-5 w-5 shrink-0 accent-[#6b5bb5]" />
          <span className="text-sm leading-relaxed text-pearl/90">{t.consent.checkbox}</span>
        </label>
        <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/80 bg-white/50 p-4 transition-colors hover:border-gold/40">
          <input type="checkbox" checked={age} onChange={(e) => { setAge(e.target.checked); playClick(sound); }} className="mt-1 h-5 w-5 shrink-0 accent-[#6b5bb5]" />
          <span className="text-sm leading-relaxed text-pearl/90">{t.consent.age}</span>
        </label>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-35"
            disabled={!ok}
            onClick={() => { playClick(sound); haptic([10, 40, 10]); onAccept(); }}
          >{t.consent.continue}</button>
          <button className="btn-ghost" onClick={() => { playClick(sound); onBack(); }}>{t.consent.back}</button>
        </div>
      </div>
    </section>
  );
}
