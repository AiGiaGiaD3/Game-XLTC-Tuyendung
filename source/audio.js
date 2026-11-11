// Original arcade melody and cues, synthesized locally for online and offline play.
const melody = [
  72, 0, 76, 79, 76, 0, 74, 0,
  72, 0, 74, 76, 79, 0, 81, 0,
  77, 0, 76, 72, 74, 0, 76, 0,
  74, 0, 71, 74, 67, 0, 0, 0,
  72, 0, 76, 79, 84, 0, 79, 0,
  76, 0, 74, 76, 81, 0, 79, 0,
  77, 0, 81, 79, 76, 0, 74, 0,
  71, 0, 74, 76, 72, 0, 0, 0
];
const bassNotes = [48, 45, 41, 43, 48, 45, 41, 43];
const effects = {
  jump: [[62, 0, .12, 12]],
  coin: [[81, 0, .08], [88, .07, .15]],
  correct: [[72, 0, .13], [76, .08, .13], [79, .16, .22]],
  wrong: [[60, 0, .11], [56, .1, .17]],
  bad: [[55, 0, .22, -15]],
  shield: [[67, 0, .16, 9], [81, .08, .22]],
  win: [[72, 0, .19], [76, .13, .19], [79, .26, .19], [84, .39, .42]]
};
let audioCtx, musicBus, nextNote = 0, musicStep = 0;

function unlockAudio() {
  if (!save.music && !save.sound) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    if (!audioCtx) {
      audioCtx = new Audio();
      musicBus = audioCtx.createGain();
      musicBus.gain.value = 0;
      musicBus.connect(audioCtx.destination);
    }
    if (audioCtx.state !== 'running') audioCtx.resume().catch(() => {});
  } catch {}
}

function note(pitch, time, duration, volume, type, output, bend = 0) {
  const oscillator = audioCtx.createOscillator();
  const envelope = audioCtx.createGain();
  const hz = 440 * 2 ** ((pitch - 69) / 12);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(hz, time);
  if (bend) oscillator.frequency.exponentialRampToValueAtTime(hz * 2 ** (bend / 12), time + duration);
  envelope.gain.setValueAtTime(.0001, time);
  envelope.gain.exponentialRampToValueAtTime(volume, time + .016);
  envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
  oscillator.connect(envelope);
  envelope.connect(output);
  oscillator.start(time);
  oscillator.stop(time + duration + .02);
}

function tone(type = 'coin') {
  if (!save.sound || audioCtx?.state !== 'running') return;
  const start = audioCtx.currentTime + .01;
  for (const [pitch, delay, duration, bend] of effects[type]) {
    note(pitch, start + delay, duration, .075, 'triangle', audioCtx.destination, bend);
  }
}

function updateMusic() {
  if (audioCtx?.state !== 'running') return;
  const now = audioCtx.currentTime;
  const playing = save.music && !document.hidden && (state === 'play' || state === 'quiz');
  const volume = playing ? (state === 'quiz' ? .28 : .65) : 0;
  if (volume !== updateMusic.volume) {
    musicBus.gain.setTargetAtTime(volume, now, .06);
    updateMusic.volume = volume;
  }
  if (!playing) {
    nextNote = 0;
    return;
  }
  if (nextNote < now) nextNote = now + .03;
  while (nextNote < now + .11) {
    const beat = musicStep % 8;
    const pitch = melody[musicStep];
    const bass = bassNotes[Math.floor(musicStep / 8)];
    if (pitch) note(pitch, nextNote, .20, .039, 'triangle', musicBus);
    if (beat === 0 || beat === 4) note(bass + (beat === 4 ? 7 : 0), nextNote, .29, .055, 'sine', musicBus);
    if (beat === 2 || beat === 6) note(bass + 19, nextNote, .18, .018, 'sine', musicBus);
    nextNote += .278;
    musicStep = (musicStep + 1) % melody.length;
  }
}

document.addEventListener('pointerdown', unlockAudio, {capture: true});
document.addEventListener('keydown', unlockAudio, {capture: true});
document.addEventListener('visibilitychange', updateMusic);
