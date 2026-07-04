// A friend's live report: all data is decoded from the link itself —
// no server, nothing stored. The report regenerates deterministically.
import { useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useLang } from '../i18n';
import { decodeShare } from '../lib/share';
import { generateReport } from '../lib/report';
import ReportScreen from './ReportScreen';

export default function SharedReport() {
  const { data } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();
  const dec = data ? decodeShare(data) : null;
  const report = useMemo(
    () => dec ? generateReport({ name: dec.name, dob: dec.dob, ikigai: { love: '', good: '', thanks: '', inspire: '', grow: '', life: '', focus: dec.focus } }) : null,
    [data], // eslint-disable-line
  );
  if (!dec || !report) return <Navigate to="/" replace />;
  return (
    <>
      <div className="relative z-10 mx-auto mt-2 max-w-3xl px-5">
        <div className="glass animate-fadeUp flex flex-wrap items-center justify-between gap-3 px-5 py-3">
          <p className="text-sm text-pearl/85">{t.report.sharedBanner(report.name)}</p>
          <button className="btn-primary !px-5 !py-2 text-sm" onClick={() => navigate('/')}>{t.report.sharedCta}</button>
        </div>
      </div>
      <ReportScreen report={report} onRestart={() => navigate('/')} shared />
    </>
  );
}
