import { Link } from 'react-router-dom';
import { useLang } from '../i18n';
import { useSettings } from '../lib/settings';
import { playClick } from '../lib/audio';
import { haptic } from '../lib/haptics';

export default function TopBar() {
  const { lang, setLang, t } = useLang();
  const s = useSettings();
  const toggle = (fn: () => void) => () => { playClick(s.sound); haptic(8); fn(); };

  return (
    <header className="no-print relative z-20 flex items-center justify-between px-5 py-4 md:px-10">
      <Link to="/" className="font-display text-2xl tracking-[0.3em] text-champagne">LUMINA</Link>
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={toggle(() => setLang(lang === 'ru' ? 'en' : 'ru'))}
          className="btn-ghost !px-4 !py-2"
          aria-label="Switch language / Переключить язык"
        >{lang === 'ru' ? 'EN' : 'RU'}</button>
        <button
          onClick={toggle(() => s.setMusic(!s.music))}
          className="btn-ghost !px-4 !py-2"
          aria-pressed={s.music}
          aria-label={t.settings.music}
          title={t.settings.music}
        >{s.music ? '🎵' : '🔇'}</button>
        <button
          onClick={toggle(() => s.setSound(!s.sound))}
          className="btn-ghost !px-4 !py-2"
          aria-pressed={s.sound}
          aria-label={t.settings.sound}
          title={t.settings.sound}
        >{s.sound ? '🔔' : '🔕'}</button>
        <button
          onClick={toggle(() => s.setAnim(!s.anim))}
          className="btn-ghost hidden !px-4 !py-2 sm:inline-flex"
          aria-pressed={s.anim}
          aria-label={t.settings.anim}
          title={t.settings.anim}
        >{s.anim ? '✨' : '▪️'}</button>
      </div>
    </header>
  );
}
