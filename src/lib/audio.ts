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

/** Soft warm swell for the report reveal — a slow rise, no bell sound. */
export function playChime(enabled: boolean) {
  if (!enabled) return;
  try {
    const c = getCtx();
    [220.0, 329.63].forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = c.currentTime + i * 0.15;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.045, t + 1.2);
      g.gain.linearRampToValueAtTime(0.0001, t + 3.2);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + 3.4);
    });
  } catch { /* silent */ }
}

/** Meditation ambient: a deep, slowly breathing drone (A1–A2–E3–A3)
    through a gently sweeping low-pass filter. No melody, no plucks —
    just calm space for relaxation. All generated, fully free. */
export function startMusic() {
  if (musicNodes) return;
  try {
    const c = getCtx();
    if (c.state === 'suspended') c.resume();
    const master = c.createGain();
    master.gain.value = 0;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 650;
    filter.Q.value = 0.4;
    master.connect(filter).connect(c.destination);
    master.gain.linearRampToValueAtTime(0.06, c.currentTime + 6);

    // very slow filter sweep — the "breath" of the pad
    const fLfo = c.createOscillator();
    const fLfoGain = c.createGain();
    fLfo.frequency.value = 0.015;
    fLfoGain.gain.value = 180;
    fLfo.connect(fLfoGain).connect(filter.frequency);
    fLfo.start();

    const oscs: OscillatorNode[] = [fLfo];
    const voices: [number, number, OscillatorType][] = [
      [55.0, 0.5, 'sine'],    // A1 — deep root
      [110.0, 0.34, 'sine'],  // A2
      [164.81, 0.16, 'sine'], // E3 — soft fifth
      [220.0, 0.07, 'triangle'], // A3 — faint shimmer
    ];
    voices.forEach(([f, vol, type], i) => {
      const o = c.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.detune.value = i * 2;
      const g = c.createGain();
      g.gain.value = vol;
      const lfo = c.createOscillator();
      const lfoGain = c.createGain();
      lfo.frequency.value = 0.02 + i * 0.017; // 30–60 s breathing cycles
      lfoGain.gain.value = vol * 0.35;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      oscs.push(o, lfo);
    });

    musicNodes = {
      stop: () => {
        master.gain.linearRampToValueAtTime(0, c.currentTime + 2);
        setTimeout(() => oscs.forEach((o) => { try { o.stop(); } catch {} }), 2300);
      },
    };
  } catch { /* silent */ }
}

export function stopMusic() {
  musicNodes?.stop();
  musicNodes = null;
}

// ── Audio report: the browser's free Web Speech API reads the report ──
let speakingNow = false;

export function speakReport(text: string, lang: 'ru' | 'en', onDone: () => void) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) { onDone(); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    u.rate = 0.95;
    u.pitch = 1.05;
    u.onend = () => { speakingNow = false; onDone(); };
    u.onerror = () => { speakingNow = false; onDone(); };
    speakingNow = true;
    synth.speak(u);
  } catch { onDone(); }
}

export function stopSpeaking() {
  try { window.speechSynthesis?.cancel(); } catch { /* ignore */ }
  speakingNow = false;
}

export const isSpeaking = () => speakingNow;
