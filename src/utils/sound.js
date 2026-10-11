// Interface sounds, made in the browser with the Web Audio API — there are no
// audio files to load. The palette is small and organic to suit the park:
// a fingertip on wood for presses, moving air for anything that travels,
// soft keys while typing, and a short kalimba phrase when an inquiry is sent.
// Everything is quiet by design; the header has a switch to turn it off.

const STORAGE_KEY = 'qetsiyah-sound';
const MASTER_LEVEL = 0.85;
const SILENCE = 0.0001;

let context = null;
let output = null;
let enabled = readPreference();
let gestureSeen = false;
const listeners = new Set();
const lastPlayedAt = {};
const noiseBuffers = new WeakMap();

function readPreference() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off';
  } catch {
    return true;
  }
}

// Browsers only allow sound after the visitor has touched the page.
if (typeof window !== 'undefined') {
  const markGesture = () => { gestureSeen = true; };
  ['pointerdown', 'keydown', 'touchend'].forEach((type) => {
    window.addEventListener(type, markGesture, { capture: true, passive: true });
  });
}

function getContext() {
  if (context) return context;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  context = new AudioContextClass({ latencyHint: 'interactive' });
  output = context.createGain();
  output.gain.value = MASTER_LEVEL;

  // Keeps overlapping sounds (a press, then the curtain) from adding up.
  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -14;
  limiter.knee.value = 10;
  limiter.ratio.value = 6;
  limiter.attack.value = 0.003;
  limiter.release.value = 0.12;

  output.connect(limiter);
  limiter.connect(context.destination);
  return context;
}

function noiseFor(ctx) {
  let buffer = noiseBuffers.get(ctx);
  if (!buffer) {
    buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
    noiseBuffers.set(ctx, buffer);
  }
  return buffer;
}

// Rise to `level` over `attack`, then fall away by the end of `dur`.
function shape(gain, t, { level, attack, dur }) {
  gain.gain.setValueAtTime(SILENCE, t);
  gain.gain.linearRampToValueAtTime(level, t + Math.min(attack, dur * 0.9));
  gain.gain.exponentialRampToValueAtTime(SILENCE, t + dur);
}

// A pitched voice; `from` to `to` bends the pitch across the note.
function tone(ctx, out, t, { type = 'sine', from, to = from, dur, level, attack = 0.002 }) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  shape(gain, t, { level, attack, dur });
  osc.connect(gain);
  gain.connect(out);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

// Filtered noise: breath, air and the click of a contact.
function air(ctx, out, t, { type = 'bandpass', from, to = from, q = 0.9, dur, level, attack = 0.003 }) {
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = noiseFor(ctx);
  source.loop = true;
  filter.type = type;
  filter.Q.value = q;
  filter.frequency.setValueAtTime(from, t);
  if (to !== from) filter.frequency.exponentialRampToValueAtTime(to, t + dur);
  shape(gain, t, { level, attack, dur });
  source.connect(filter);
  filter.connect(gain);
  gain.connect(out);
  source.start(t, Math.random() * 0.5);
  source.stop(t + dur + 0.03);
}

// One tine of a kalimba.
function pluck(ctx, out, t, freq, level) {
  tone(ctx, out, t, { from: freq, dur: 0.6, level, attack: 0.004 });
  tone(ctx, out, t, { type: 'triangle', from: freq * 2, dur: 0.16, level: level * 0.28 });
  air(ctx, out, t, { from: 3000, q: 1, dur: 0.012, level: level * 0.5 });
}

// No two taps sound exactly alike.
const vary = (value, amount = 0.06) => value * (1 + (Math.random() * 2 - 1) * amount);

const voices = {
  // A fingertip on wood: links, list rows, the phone dock.
  tap(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: vary(820), to: 430, dur: 0.055, level: 0.17 });
    air(ctx, out, t, { type: 'highpass', from: 2400, dur: 0.012, level: 0.09 });
  },

  // A fuller knock for the solid buttons.
  press(ctx, out, t) {
    tone(ctx, out, t, { from: vary(340), to: 160, dur: 0.11, level: 0.24 });
    tone(ctx, out, t, { type: 'triangle', from: 940, to: 520, dur: 0.04, level: 0.13 });
    air(ctx, out, t, { type: 'highpass', from: 1800, dur: 0.016, level: 0.1 });
  },

  // The lightest mark: tabs, picture lines, dropdown choices.
  tick(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: vary(1500), to: 1150, dur: 0.028, level: 0.1 });
    air(ctx, out, t, { from: 4200, q: 1.4, dur: 0.01, level: 0.12 });
  },

  // Typing: a soft key with a little weight under it.
  key(ctx, out, t) {
    air(ctx, out, t, { from: vary(3000, 0.14), q: 1.3, dur: 0.018, level: 0.2 });
    tone(ctx, out, t, { from: vary(185, 0.1), to: 110, dur: 0.03, level: 0.06 });
  },

  keySpace(ctx, out, t) {
    air(ctx, out, t, { from: vary(1300, 0.1), q: 1, dur: 0.03, level: 0.2 });
    tone(ctx, out, t, { from: 120, to: 78, dur: 0.05, level: 0.08 });
  },

  keyBack(ctx, out, t) {
    air(ctx, out, t, { from: vary(1700, 0.1), q: 1.2, dur: 0.02, level: 0.18 });
    tone(ctx, out, t, { from: 140, to: 90, dur: 0.035, level: 0.06 });
  },

  // Something unfolds or folds away: menus, the offers panel, answers.
  open(ctx, out, t) {
    air(ctx, out, t, { from: 420, to: 1700, q: 0.8, dur: 0.24, level: 0.27, attack: 0.09 });
  },

  close(ctx, out, t) {
    air(ctx, out, t, { from: 1700, to: 380, q: 0.8, dur: 0.22, level: 0.23, attack: 0.03 });
  },

  // A picture or chapter slides across.
  slideNext(ctx, out, t) {
    air(ctx, out, t, { from: 800, to: 2600, q: 1, dur: 0.18, level: 0.27, attack: 0.05 });
  },

  slidePrev(ctx, out, t) {
    air(ctx, out, t, { from: 2600, to: 800, q: 1, dur: 0.18, level: 0.25, attack: 0.05 });
  },

  // The page moves to another section.
  glide(ctx, out, t) {
    air(ctx, out, t, { from: 500, to: 1300, q: 0.7, dur: 0.42, level: 0.16, attack: 0.2 });
  },

  // A camera shutter when a photograph opens.
  shutter(ctx, out, t) {
    air(ctx, out, t, { from: 3400, q: 1.6, dur: 0.022, level: 0.4 });
    tone(ctx, out, t, { from: 210, to: 130, dur: 0.03, level: 0.08 });
    air(ctx, out, t + 0.075, { from: 2100, q: 1.2, dur: 0.035, level: 0.32 });
    tone(ctx, out, t + 0.075, { from: 170, to: 110, dur: 0.03, level: 0.06 });
  },

  // Ticking an activity on and off: two small notes, up or down.
  checkOn(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: 620, dur: 0.07, level: 0.1 });
    tone(ctx, out, t + 0.055, { type: 'triangle', from: 930, dur: 0.1, level: 0.1 });
  },

  checkOff(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: 930, dur: 0.06, level: 0.07 });
    tone(ctx, out, t + 0.05, { type: 'triangle', from: 620, dur: 0.09, level: 0.08 });
  },

  // Guest counter.
  stepUp(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: 980, to: 1040, dur: 0.05, level: 0.11 });
  },

  stepDown(ctx, out, t) {
    tone(ctx, out, t, { type: 'triangle', from: 740, to: 690, dur: 0.05, level: 0.11 });
  },

  // The inquiry is sent: four rising kalimba notes.
  success(ctx, out, t) {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
      pluck(ctx, out, t + index * 0.095, freq, 0.15);
    });
  },

  // A field still needs attention: two muted knocks.
  error(ctx, out, t) {
    [0.09, 0.21].forEach((offset) => {
      tone(ctx, out, t + offset, { from: 190, to: 120, dur: 0.08, level: 0.24 });
      air(ctx, out, t + offset, { type: 'lowpass', from: 700, dur: 0.02, level: 0.1 });
    });
  },

  // The title card rises over the page and lands…
  curtainIn(ctx, out, t) {
    air(ctx, out, t, { from: 240, to: 1900, q: 0.8, dur: 0.66, level: 0.32, attack: 0.5 });
    tone(ctx, out, t + 0.54, { from: 92, to: 46, dur: 0.5, level: 0.26, attack: 0.012 });
    air(ctx, out, t + 0.54, { type: 'lowpass', from: 320, dur: 0.14, level: 0.12, attack: 0.01 });
  },

  // …then lifts away from the new page.
  curtainOut(ctx, out, t) {
    air(ctx, out, t, { from: 1800, to: 300, q: 0.8, dur: 0.9, level: 0.22, attack: 0.08 });
  },

  // Confirmation when sound is switched back on.
  soundOn(ctx, out, t) {
    pluck(ctx, out, t, 659.25, 0.13);
    pluck(ctx, out, t + 0.1, 987.77, 0.13);
  }
};

// Shortest gap between two plays of the same sound, in milliseconds.
const minimumGap = { key: 24, keySpace: 24, keyBack: 24 };
const DEFAULT_GAP = 45;

/** Schedule one sound on any audio context (also used to render them offline). */
export function scheduleSound(ctx, destination, name, time = ctx.currentTime) {
  const voice = voices[name];
  if (!voice) return false;
  voice(ctx, destination, time);
  return true;
}

export const soundNames = Object.keys(voices);

/** Play an interface sound. Does nothing when sound is off or not yet allowed. */
export function playSound(name, { delay = 0 } = {}) {
  if (!enabled || !gestureSeen || !voices[name]) return;

  const now = performance.now();
  if (now - (lastPlayedAt[name] || 0) < (minimumGap[name] ?? DEFAULT_GAP)) return;
  lastPlayedAt[name] = now;

  const ctx = getContext();
  if (!ctx) return;

  const run = () => {
    try {
      scheduleSound(ctx, output, name, ctx.currentTime + 0.004 + delay);
    } catch {
      // A sound that cannot play is never worth breaking the page for.
    }
  };

  if (ctx.state === 'running') {
    run();
    return;
  }

  // First touch, or the tab was in the background: wake the context, and only
  // play if that happens at once — a late sound is worse than none.
  ctx.resume().then(() => {
    if (performance.now() - now < 250) run();
  }).catch(() => {});
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value) {
  enabled = Boolean(value);
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  } catch {
    // Private windows may refuse storage; the choice still holds for this visit.
  }
  listeners.forEach((listener) => listener());
  if (enabled) playSound('soundOn');
}

export function subscribeSound(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
