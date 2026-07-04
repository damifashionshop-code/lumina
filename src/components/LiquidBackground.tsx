/** Animated liquid-glass background: pastel iridescent blobs that slowly
    morph and drift (pure CSS, free). Pauses when animations are off. */
export default function LiquidBackground() {
  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="liquid-blob" style={{ width: '46vmax', height: '40vmax', left: '-10vmax', top: '-6vmax', background: 'conic-gradient(from 80deg, #ffd6ec, #cdc2f7, #c8ece4, #ffd6ec)', animation: 'lgblob1 18s ease-in-out infinite' }} />
      <div className="liquid-blob" style={{ width: '38vmax', height: '34vmax', right: '-8vmax', top: '22%', background: 'conic-gradient(from 240deg, #d8ccfa, #ffe1ef, #d3f0e8, #d8ccfa)', animation: 'lgblob2 22s ease-in-out infinite' }} />
      <div className="liquid-blob" style={{ width: '40vmax', height: '36vmax', left: '18%', bottom: '-14vmax', background: 'conic-gradient(from 0deg, #cdc2f7, #ffd6ec, #d3f0e8, #cdc2f7)', animation: 'lgblob1 26s ease-in-out infinite reverse' }} />
    </div>
  );
}
