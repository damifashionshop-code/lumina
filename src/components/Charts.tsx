// Pure-SVG visualizations — zero chart dependencies, fully free.
import type { MatrixPoint } from '../lib/matrix';
import { archetypes } from '../content/library';
import { useLang } from '../i18n';

const GOLD = '#6b5bb5';
const LAV = '#8a7cc9';

/** Radial "destiny matrix": 8 points around a glowing centre. */
export function MatrixWheel({ points, center }: { points: MatrixPoint[]; center: number }) {
  const { lang } = useLang();
  const R = 150, C = 190;
  return (
    <svg viewBox="0 0 380 380" role="img" aria-label="Matrix wheel" className="mx-auto w-full max-w-[380px]">
      <defs>
        <radialGradient id="mw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.5" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={C} cy={C} r={R + 22} fill="url(#mw-glow)" />
      <circle cx={C} cy={C} r={R} fill="none" stroke={LAV} strokeOpacity="0.3" />
      <line x1={C + Math.cos(Math.PI * 1.25) * R} y1={C + Math.sin(Math.PI * 1.25) * R} x2={C + Math.cos(Math.PI * 0.25) * R} y2={C + Math.sin(Math.PI * 0.25) * R} stroke="#8f6bd6" strokeOpacity="0.5" strokeWidth="1.5"><title>♂</title></line>
      <line x1={C + Math.cos(Math.PI * -0.25) * R} y1={C + Math.sin(Math.PI * -0.25) * R} x2={C + Math.cos(Math.PI * 0.75) * R} y2={C + Math.sin(Math.PI * 0.75) * R} stroke="#d4537e" strokeOpacity="0.5" strokeWidth="1.5"><title>♀</title></line>
      <text x={C + Math.cos(Math.PI * 0.25) * R * 0.42} y={C + Math.sin(Math.PI * 0.25) * R * 0.42 + 4} textAnchor="middle" fontSize="13" fill="#d4537e">♥</text>
      <text x={C + Math.cos(Math.PI * 0.25) * R * 0.72} y={C + Math.sin(Math.PI * 0.25) * R * 0.72 + 4} textAnchor="middle" fontSize="13" fill={GOLD} fontWeight="700">$</text>
      <circle cx={C} cy={C} r={R - 34} fill="none" stroke={LAV} strokeOpacity="0.15" strokeDasharray="2 8" />
      {points.map((p, i) => {
        const a = (i / points.length) * Math.PI * 2 - Math.PI / 2;
        const x = C + Math.cos(a) * R, y = C + Math.sin(a) * R;
        return (
          <g key={p.key}>
            <line x1={C} y1={C} x2={x} y2={y} stroke={LAV} strokeOpacity="0.15" />
            <circle cx={x} cy={y} r={17} fill="#ffffff" stroke={GOLD} strokeOpacity="0.7"><title>{p.value} · {archetypes[p.value].name[lang]}</title></circle>
            <text x={x} y={y + 5} textAnchor="middle" fill="#4a3f8c" fontSize="14" fontWeight="600">{p.value}</text>
            <text
              x={C + Math.cos(a) * (R + 30)} y={C + Math.sin(a) * (R + 30) + 4}
              textAnchor="middle" fill={LAV} fontSize="9" opacity="0.85"
            >{archetypes[p.value].name[lang].split(' ').slice(-1)[0]}</text>
          </g>
        );
      })}
      <circle cx={C} cy={C} r={40} fill="#ffffff" stroke={GOLD} strokeWidth="1.5" />
      <text x={C} y={C + 7} textAnchor="middle" fill={GOLD} fontSize="22" fontWeight="700">{center}</text>
    </svg>
  );
}

/** 7-axis radar chart for the balance diagram. */
export function RadarChart({ values, labels }: { values: number[]; labels: string[] }) {
  const C = 190, R = 120;
  const pt = (i: number, v: number) => {
    const a = (i / values.length) * Math.PI * 2 - Math.PI / 2;
    return [C + Math.cos(a) * R * (v / 100), C + Math.sin(a) * R * (v / 100)];
  };
  const poly = values.map((v, i) => pt(i, v).join(',')).join(' ');
  return (
    <svg viewBox="0 0 380 380" role="img" aria-label="Balance radar chart" className="mx-auto w-full max-w-[380px]">
      {[25, 50, 75, 100].map((r) => (
        <polygon
          key={r}
          points={values.map((_, i) => pt(i, r).join(',')).join(' ')}
          fill="none" stroke={LAV} strokeOpacity="0.15"
        />
      ))}
      {values.map((_, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke={LAV} strokeOpacity="0.15" />;
      })}
      <polygon points={poly} fill={GOLD} fillOpacity="0.22" stroke={GOLD} strokeWidth="2" />
      {values.map((v, i) => {
        const [x, y] = pt(i, v);
        return <circle key={i} cx={x} cy={y} r={4} fill={GOLD} />;
      })}
      {labels.map((l, i) => {
        const [x, y] = pt(i, 128);
        return <text key={l} x={x} y={y + 4} textAnchor="middle" fill="#4a3f8c" fontSize="11" opacity="0.9">{l}</text>;
      })}
    </svg>
  );
}

/** Four-circle ikigai venn. */
export function IkigaiVenn({ labels }: { labels: [string, string, string, string] }) {
  const cs: [number, number, string][] = [
    [150, 130, 'rgba(205,194,247,0.55)'],
    [230, 130, 'rgba(255,214,236,0.55)'],
    [150, 210, 'rgba(211,240,232,0.55)'],
    [230, 210, 'rgba(216,204,250,0.55)'],
  ];
  const lpos = [[100, 70], [280, 70], [100, 280], [280, 280]];
  return (
    <svg viewBox="0 0 380 350" role="img" aria-label="Ikigai venn diagram" className="mx-auto w-full max-w-[360px]">
      {cs.map(([x, y, f], i) => (
        <circle key={i} cx={x} cy={y} r={82} fill={f} stroke="#ffffff" strokeOpacity="0.9" />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={lpos[i][0]} y={lpos[i][1]} textAnchor="middle" fill="#4a3f8c" fontSize="13" fontWeight="600">{l}</text>
      ))}
      <text x={190} y={175} textAnchor="middle" fill={GOLD} fontSize="17" fontWeight="700">生き甲斐</text>
      <text x={190} y={195} textAnchor="middle" fill={GOLD} fontSize="12">ikigai</text>
    </svg>
  );
}

/** Small progress ring with a number. */
export function ProgressRing({ value, label }: { value: number; label: string }) {
  const R = 34, CIRC = 2 * Math.PI * R;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 90 90" className="h-20 w-20" role="img" aria-label={`${label}: ${value}`}>
        <circle cx="45" cy="45" r={R} fill="none" stroke={LAV} strokeOpacity="0.2" strokeWidth="6" />
        <circle
          cx="45" cy="45" r={R} fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${(value / 100) * CIRC} ${CIRC}`} transform="rotate(-90 45 45)"
        />
        <text x="45" y="51" textAnchor="middle" fill="#4a3f8c" fontSize="18" fontWeight="700">{value}</text>
      </svg>
      <span className="max-w-[90px] text-center text-xs text-pearl/80">{label}</span>
    </div>
  );
}
