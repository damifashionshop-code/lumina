import { Link } from 'react-router-dom';
import { useLang } from '../i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative z-10 mx-auto mt-16 max-w-4xl px-5 pb-10 text-center text-xs leading-relaxed text-pearl/50">
      <p className="mx-auto max-w-3xl">{t.footer.disclaimer}</p>
      <nav className="no-print mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-pearl/70">
        <Link className="hover:text-champagne" to="/how">{t.nav.how}</Link>
        <Link className="hover:text-champagne" to="/terms">{t.nav.terms}</Link>
        <Link className="hover:text-champagne" to="/privacy">{t.nav.privacy}</Link>
        <Link className="hover:text-champagne" to="/disclaimer">{t.nav.disclaimer}</Link>
      </nav>
      <p className="mt-4">{t.footer.made}</p>
      {/* FUTURE (monetization, keep it ethical & non-pushy):
          - "Support the project" donation link (Buy Me a Coffee / Ko-fi)
          - Curated affiliate shelf: journals, planners, meditation apps —
            clearly labelled as recommendations, no false promises. */}
    </footer>
  );
}
