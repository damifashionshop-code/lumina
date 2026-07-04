import { useEffect, useState } from 'react';
import { useLang } from '../i18n';

/** A tiny show instead of a boring loader: rotating rings + step texts. */
export default function LoadingShow({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const steps = t.loading.steps;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= steps.length) { onDone(); return; }
    const id = setTimeout(() => setI((v) => v + 1), 1100);
    return () => clearTimeout(id);
  }, [i, steps.length, onDone]);

  return (
    <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-5 text-center" aria-live="polite">
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 animate-spinSlow rounded-full border border-gold/40" style={{ animationDuration: '9s' }} />
        <div className="absolute inset-4 animate-spinSlow rounded-full border border-lavender/40 border-dashed" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
        <div className="absolute inset-10 animate-glowPulse rounded-full bg-white/60" />
        <div className="absolute inset-0 flex items-center justify-center text-5xl">✦</div>
      </div>
      <p className="mt-10 min-h-[2rem] font-display text-2xl text-champagne transition-opacity duration-500">
        {steps[Math.min(i, steps.length - 1)]}
      </p>
      <div className="mt-6 flex gap-2" aria-hidden="true">
        {steps.map((_, k) => (
          <span key={k} className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${k <= i ? 'bg-gold' : 'bg-white/15'}`} />
        ))}
      </div>
    </section>
  );
}
