// stores/metronomeStore.ts
import { defineStore } from "pinia";

export const useMetronomeStore = defineStore("metronome", {
  state: () => ({
    audioCtx: null as AudioContext | null,

    isPlaying: false,
    tempo: 120, // dari AlphaTab nanti di-sync ke sini

    nextNoteTime: 0,
    currentBeat: 0,

    intervalId: null as number | null,

    // scheduling tweak
    scheduleAheadTime: 0.1, // 100ms lookahead
    lookahead: 25, // ms
  }),

  actions: {
    initAudio() {
      if (this.audioCtx) return;

      this.audioCtx = new AudioContext();
    },

    setTempo(bpm: number) {
      this.tempo = bpm;
    },

    start() {
      this.initAudio();
      if (!this.audioCtx) return;

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.isPlaying = true;
      this.currentBeat = 0;

      this.nextNoteTime = this.audioCtx.currentTime + 0.05;

      this.intervalId = window.setInterval(() => {
        this.scheduler();
      }, this.lookahead);
    },

    stop() {
      this.isPlaying = false;

      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    scheduler() {
      if (!this.audioCtx) return;

      while (
        this.nextNoteTime <
        this.audioCtx.currentTime + this.scheduleAheadTime
      ) {
        this.scheduleBeat(this.nextNoteTime);
        this.nextNote();
      }
    },

    nextNote() {
      const secondsPerBeat = 60.0 / this.tempo;
      this.nextNoteTime += secondsPerBeat;
      this.currentBeat++;
    },

    scheduleBeat(time: number) {
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      // high = downbeat, low = normal beat
      const isAccent = this.currentBeat % 4 === 0;

      osc.frequency.value = isAccent ? 1000 : 700;
      gain.gain.value = 0.2;

      osc.start(time);
      osc.stop(time + 0.05);
    },

    syncFromAlphaTabTempo(tempo: number) {
      this.setTempo(tempo);
    },
  },
});
