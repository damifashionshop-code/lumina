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

/** Ambient music: a warm, low pad plus a slow pentatonic "music box"
    arpeggio through a soft low-pass filter. Quiet and calm by design. */
export function startMusic() {
  if (musicNodes) return;
  try {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
    const master = c.createGain();
    master.gain.value = 0;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;
    master.connect(filter).connect(c.destination);
    master.gain.linearRampToValueAtTime(0.05, c.currentTime + 4);

    // Warm pad: A2 + E3 + A3, slightly detuned, breathing via LFO
    const oscs: OscillatorNode[] = [];
    [110, 164.81, 220.0].forEach((f, i) => {
      const o = c.createOscillator();
      o.type = i === 0 ? 'triangle' : 'sine';
      o.frequency.value = f;
      o.detune.value = i * 3;
      const g = c.createGain();
      g.gain.value = 0.3;
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 0.04 + i * 0.025;
      lfoGain.gain.value = 0.12;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      oscs.push(o, lfo);
    });

    // Gentle "music box": A-major pentatonic, one soft note every ~2.4 s
    const notes = [440.0, 493.88, 554.37, 659.25, 739.99, 880.0];
    let step = 0;
    const playNote = () => {
      const t = c.currentTime;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      // wander up and down the scale instead of pure randomness
      step = Math.max(0, Math.min(notes.length - 1, step + (Math.random() > 0.5 ? 1 : -1)));
      o.frequency.value = notes[step];
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.035, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 2.3);
    };
    const interval = window.setInterval(playNote, 2400);
    playNote();

    musicNodes = {
      stop: () => {
        window.clearInterval(interval);
        master.gain.linearRampToValueAtTime(0, c.currentTime + 1.2);
        setTimeout(() => oscs.forEach((o) => { try { o.stop(); } catch {} }), 1400);
      },
    };
  } catch { /* silent */ }
}

export function stopMusic() {
  musicNodes?.stop();
  musicNodes = null;
}
