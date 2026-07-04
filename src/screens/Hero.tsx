import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { playClick } from '../lib/audio';
import { haptic } from '../lib/haptics';
import { Link } from 'react-router-dom';

export default function Hero({ onStart }: { onStart: () => void }) {
  const { t } = useLang();
  const { sound } = useSettings();
  return (
    <section className="relative z-10 mx-auto flex min-h-[78vh] max-w-4xl flex-col items-center justify-center px-5 text-center">
      <div className="animate-floatSlow">
        <div
          aria-hidden="true"
          className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/80 bg-white/45 backdrop-blur-xl"
          style={{ boxShadow: '0 12px 40px rgba(107,91,181,0.25), inset 0 1px 0 rgba(255,255,255,0.95)' }}
        >
          <div className="h-20 w-20 animate-spinSlow rounded-full border-2 border-gold" style={{ borderTopColor: 'transparent', animationDuration: '14s' }} />
        </div>
      </div>
      <p className="animate-fadeUp tracking-[0.35em] text-lavender/80 uppercase text-sm">{t.hero.tagline}</p>
      <h1 className="animate-fadeUp gold-text font-display text-7xl font-semibold md:text-8xl" style={{ animationDelay: '0.15s' }}>
        {t.hero.title}
      </h1>
      <p className="animate-fadeUp mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pearl/85" style={{ animationDelay: '0.3s' }}>
        {t.hero.subtitle}
      </p>
      <button
        className="btn-primary animate-fadeUp mt-10 text-lg"
        style={{ animationDelay: '0.45s' }}
        onClick={() => { playClick(sound); haptic(15); onStart(); }}
      >
        {t.hero.cta} ✨
      </button>
      <p className="animate-fadeUp mt-6 text-xs text-pearl/50" style={{ animationDelay: '0.6s' }}>{t.hero.note}</p>
      <Link to="/how" className="animate-fadeUp mt-3 text-sm text-lavender underline-offset-4 hover:underline" style={{ animationDelay: '0.7s' }}>
        {t.nav.how}
      </Link>
    </section>
  );
}
