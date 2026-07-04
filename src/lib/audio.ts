// All sound is generated with the free Web Audio API — no paid assets.
// Music is OFF by default and starts only after explicit user consent.
let ctx: AudioContext | null = null;
let musicNodes: { stop: () => void } | null = null;

const getCtx = () => (ctx ??= new (window.AudioContext || (window as any).webkitAudioContext)());

/** Soft UI click: a short, quiet sine blip. */
export function playClick(enabled: boolean) {
  if (!enabled) return;
  try {
    const c = getCtx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.value = 660;
    o.type = 'sine';
    g.gain.setValueAtTime(0.05, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
    o.connect(g).connect(c.destination);
    o.start();
    o.stop(c.currentTime + 0.13);
  } catch { /* audio unavailable — stay silent */ }
}

/** Gentle chime for the report reveal. */
export function playChime(enabled: boolean) {
  if (!enabled) return;
  try {
    const c = getCtx();
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = c.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 1.3);
    });
  } catch { /* silent */ }
}

/** Ambient pad: two slowly detuned sines + LFO, very quiet (~ -26 dB). */
export function startMusic() {
  if (musicNodes) return;
  try {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
    const master = c.createGain();
    master.gain.value = 0;
    master.connect(c.destination);
    master.gain.linearRampToValueAtTime(0.045, c.currentTime + 3);
    const oscs: OscillatorNode[] = [];
    [130.81, 196.0, 261.63].forEach((f, i) => {
      const o = c.createOscillator();
      o.type = i === 2 ? 'triangle' : 'sine';
      o.frequency.value = f;
      const g = c.createGain();
      g.gain.value = 0.33;
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 0.05 + i * 0.03;
      lfoGain.gain.value = 0.15;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      oscs.push(o, lfo);
    });
    musicNodes = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0, c.currentTime + 1);
        setTimeout(() => oscs.forEach((o) => { try { o.stop(); } catch {} }), 1200);
      },
    };
  } catch { /* silent */ }
}

export function stopMusic() {
  musicNodes?.stop();
  musicNodes = null;
}
