// // Generates a Netflix-inspired cinematic "ta-dum" sound using the Web Audio API.
// // No external audio files or copyrighted material needed.
// // Returns a Promise that resolves when the sound finishes playing.

// export function playNetflixSound() {
//   return new Promise((resolve) => {
//     try {
//       const AudioContext = window.AudioContext || window.webkitAudioContext;
//       if (!AudioContext) {
//         resolve();
//         return;
//       }

//       const ctx = new AudioContext();
//       const now = ctx.currentTime;

//       // Total duration of the sound
//       const totalDuration = 2.8;

//       // ---- First hit: deep sub-bass thud ----
//       const osc1 = ctx.createOscillator();
//       const gain1 = ctx.createGain();
//       osc1.type = "sine";
//       osc1.frequency.setValueAtTime(90, now);
//       osc1.frequency.exponentialRampToValueAtTime(40, now + 0.6);
//       gain1.gain.setValueAtTime(0.7, now);
//       gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
//       osc1.connect(gain1);
//       gain1.connect(ctx.destination);
//       osc1.start(now);
//       osc1.stop(now + 0.8);

//       // ---- Second hit: the iconic "dum" ----
//       const osc2 = ctx.createOscillator();
//       const gain2 = ctx.createGain();
//       osc2.type = "sine";
//       osc2.frequency.setValueAtTime(80, now + 0.9);
//       osc2.frequency.exponentialRampToValueAtTime(35, now + 2.2);
//       gain2.gain.setValueAtTime(0, now);
//       gain2.gain.setValueAtTime(0.8, now + 0.9);
//       gain2.gain.exponentialRampToValueAtTime(0.01, now + 2.5);
//       osc2.connect(gain2);
//       gain2.connect(ctx.destination);
//       osc2.start(now + 0.9);
//       osc2.stop(now + 2.5);

//       // ---- Harmonic overtone on second hit ----
//       const osc3 = ctx.createOscillator();
//       const gain3 = ctx.createGain();
//       osc3.type = "sine";
//       osc3.frequency.setValueAtTime(160, now + 0.9);
//       osc3.frequency.exponentialRampToValueAtTime(70, now + 2.0);
//       gain3.gain.setValueAtTime(0, now);
//       gain3.gain.setValueAtTime(0.25, now + 0.9);
//       gain3.gain.exponentialRampToValueAtTime(0.01, now + 1.8);
//       osc3.connect(gain3);
//       gain3.connect(ctx.destination);
//       osc3.start(now + 0.9);
//       osc3.stop(now + 2.0);

//       // ---- Noise burst for texture on each hit ----
//       const createNoiseBurst = (startTime, duration, volume) => {
//         const bufferSize = ctx.sampleRate * duration;
//         const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
//         const data = buffer.getChannelData(0);
//         for (let i = 0; i < bufferSize; i++) {
//           data[i] = (Math.random() * 2 - 1) * 0.5;
//         }
//         const noise = ctx.createBufferSource();
//         noise.buffer = buffer;

//         const noiseGain = ctx.createGain();
//         noiseGain.gain.setValueAtTime(volume, startTime);
//         noiseGain.gain.exponentialRampToValueAtTime(
//           0.001,
//           startTime + duration,
//         );

//         const filter = ctx.createBiquadFilter();
//         filter.type = "lowpass";
//         filter.frequency.setValueAtTime(200, startTime);

//         noise.connect(filter);
//         filter.connect(noiseGain);
//         noiseGain.connect(ctx.destination);
//         noise.start(startTime);
//         noise.stop(startTime + duration);
//       };

//       createNoiseBurst(now, 0.3, 0.15);
//       createNoiseBurst(now + 0.9, 0.4, 0.2);

//       // Resolve the promise and close context after sound finishes
//       setTimeout(() => {
//         ctx.close();
//         resolve();
//       }, totalDuration * 1000);
//     } catch (error) {
//       console.log("Audio playback error:", error);
//       resolve(); // Always resolve so navigation isn't blocked
//     }
//   });
// }

// let audio;

// export function playNetflixSound() {
//   return new Promise((resolve) => {
//     if (!audio) {
//       audio = new Audio("/netflix-intro.mp3");
//       audio.preload = "auto";
//       audio.volume = 0.8;
//     }

//     audio.pause();
//     audio.currentTime = 0;

//     audio.onended = () => resolve();

//     audio.play().catch((err) => {
//       console.error(err);
//       resolve();
//     });
//   });
// }

let audio;

export function playNetflixSound() {
  console.log("PLAY SOUND");

  if (!audio) {
    audio = new Audio("/netflix-intro.mp3");
    audio.volume = 1;
  }

  audio.currentTime = 0;

  return audio.play();
}
