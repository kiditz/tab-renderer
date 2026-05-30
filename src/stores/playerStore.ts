import { defineStore } from "pinia";
import { computed, ref, toRaw } from "vue";
import { markRaw } from "vue";
import { LayoutMode, type AlphaTabApi } from "@coderline/alphatab";
import * as alphaTab from "@coderline/alphatab";
import { useMetronomeStore } from "./metronomeStore";

const c = (r: number, g: number, b: number, a = 255) =>
  new alphaTab.model.Color(r, g, b, a);

export interface SongTrack {
  id: number;
  name: string;
  shortName: string;
  percussion: boolean;
  muted: boolean;
  solo: boolean;
  alphaTabTrack: any;
}

export interface Loop {
  start: number;
  end: number;
}

export interface Tempo {
  label: string;
  number: number;
}

export const usePlayerStore = defineStore("player", () => {
  const api = ref<AlphaTabApi | null>(null);
  const tempo = ref<Tempo>({} as Tempo);
  // IMPORTANT: shallowRef is correct here
  const isYoutubePlay = ref(false);
  const tracks = ref<SongTrack[]>([]);

  const currentTrack = ref<SongTrack | null>(null);
  const metronomeStore = useMetronomeStore();

  const isSeeking = ref(false);
  const isLoopSelectionMode = ref(false);

  const loopRange = ref<Loop | null>(null);
  const currentTime = ref(0);
  const duration = ref(0);
  const isPlaying = ref(false);
  const isContinue = ref(false);
  const playbackSpeed = ref(1);

  const isLooping = ref(false);
  const loopStart = ref(0);
  const loopEnd = ref(0);

  const currentFile = ref<string | null>(null);

  const isCountIn = ref(false);
  const isMetronome = ref(false);
  const layoutMode = ref<"page" | "horizontal" | "parchment">("page");

  const zoom = ref(1);

  /*
   |--------------------------------------------------------------------------
   | Computed
   |--------------------------------------------------------------------------
   */

  const progressPercentage = computed(() => {
    if (duration.value <= 0) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  /*
   |--------------------------------------------------------------------------
   | Setup
   |--------------------------------------------------------------------------
   */
  function setYoutubePlay(val: boolean) {
    isYoutubePlay.value = val;
  }

  function setApi(instance: AlphaTabApi) {
    api.value = instance;
  }

  function setTracks(value: SongTrack[]) {
    // stabilize object references + protect alphaTab object
    tracks.value = value.map((t) => ({
      ...t,
      alphaTabTrack: markRaw(t.alphaTabTrack),
    }));

    // safe default selection
    if (!currentTrack.value && tracks.value.length > 0) {
      currentTrack.value = tracks.value[0];
      renderTrack(tracks.value[0]);
    }
  }

  function changeFile(file: File) {
    currentFile.value = URL.createObjectURL(file);
    currentTime.value = 0;
  }

  /*
   |--------------------------------------------------------------------------
   | Playback Controls
   |--------------------------------------------------------------------------
   */

  function play() {
    if (!api.value) return;
    api.value.play();
  }

  function pause() {
    if (!api.value) return;
    api.value.pause();
    console.log("pause");
  }

  function playPause() {
    if (!api.value) return;
    api.value.playPause();
  }

  function stop() {
    if (!api.value) return;
    api.value.stop();
  }

  /*
   |--------------------------------------------------------------------------
   | Seek
   |--------------------------------------------------------------------------
   */

  function seek(position: number) {
    if (!api.value) return;

    isSeeking.value = true;

    api.value.timePosition = position;
    requestAnimationFrame(() => {
      currentTime.value = position;
      isSeeking.value = false;
    });
  }
  function applyAlphaTabTheme(isDark: boolean) {
    if (!api.value) return;

    const r = api.value.settings.display.resources;

    r.staffLineColor = isDark ? c(255, 255, 255, 80) : c(165, 165, 165, 255);

    r.barSeparatorColor = isDark ? c(255, 255, 255, 255) : c(34, 34, 17, 255);

    r.mainGlyphColor = isDark ? c(255, 255, 255, 255) : c(0, 0, 0, 255);

    r.secondaryGlyphColor = isDark ? c(255, 255, 255, 100) : c(0, 0, 0, 100);

    r.scoreInfoColor = isDark ? c(255, 255, 255, 255) : c(0, 0, 0, 255);

    r.barNumberColor = isDark ? c(255, 255, 255, 255) : c(200, 0, 0, 255);

    api.value.render();
  }
  /*
   |--------------------------------------------------------------------------
   | Track Rendering (CORE FIX AREA)
   |--------------------------------------------------------------------------
   */

  function renderTrack(track: SongTrack) {
    if (!api.value) return;
    const rawTrack = toRaw(track);
    api.value.renderTracks([rawTrack.alphaTabTrack]);
    currentTrack.value = track;
  }

  /*
   |--------------------------------------------------------------------------
   | Mute / Solo (FIXED: controlled mutation only)
   |--------------------------------------------------------------------------
   */

  function toggleMute(track: SongTrack) {
    if (!api.value) return;

    track.muted = !track.muted;

    requestAnimationFrame(() => {
      api.value?.changeTrackMute([track.alphaTabTrack], track.muted);
    });
  }

  function toggleSolo(track: SongTrack) {
    if (!api.value) return;
    track.solo = !track.solo;

    requestAnimationFrame(() => {
      api.value?.changeTrackSolo([track.alphaTabTrack], track.solo);
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Playback Speed
   |--------------------------------------------------------------------------
   */

  function setPlaybackSpeed(speed: number) {
    if (!api.value) return;

    playbackSpeed.value = speed;
    api.value.playbackSpeed = speed;
  }

  /*
   |--------------------------------------------------------------------------
   | Loop
   |--------------------------------------------------------------------------
   */

  function toggleLoop() {
    isLoopSelectionMode.value = !isLoopSelectionMode.value;
    if (!isLoopSelectionMode.value) {
      isLooping.value = false;
      loopRange.value = null;
    }
  }

  function setLoopStart() {
    loopStart.value = currentTime.value;
  }

  function setLoopEnd() {
    loopEnd.value = currentTime.value;
  }

  function setTempo(tmp: Tempo) {
    console.log("sync tempo");
    tempo.value = tmp;
    metronomeStore.syncFromAlphaTabTempo(tempo.value.number);
  }

  function setLoop(payload: { start: number; end: number }) {
    loopRange.value = { ...payload };
  }

  /*
   |--------------------------------------------------------------------------
   | Player Events
   |--------------------------------------------------------------------------
   */
  let lastUiUpdate = 0;

  function updatePlayerPosition(position: number) {
    if (!api.value) return;
    const now = performance.now();

    if (!isSeeking.value && now - lastUiUpdate > 33) {
      currentTime.value = position;
      lastUiUpdate = now;
    }

    if (!isLooping.value) return;

    const range = loopRange.value;

    if (!range) return;

    if (position >= range.end) {
      console.log("update");
      api.value.timePosition = range.start;

      currentTime.value = range.start;
    }
  }

  /*
   |--------------------------------------------------------------------------
   | Cleanup
   |--------------------------------------------------------------------------
   */

  function reset() {
    tracks.value = [];
    currentTrack.value = null;

    currentTime.value = 0;
    duration.value = 0;
  }

  function resetLoop() {
    loopRange.value = null;
  }


  function toggleCountIn() {
    isCountIn.value = !isCountIn.value;

    if (!api.value) return;

    api.value.countInVolume = isCountIn.value ? 1 : 0;
  }
  function toggleMetronome() {
    isMetronome.value = !isMetronome.value;
    if (!isMetronome.value) {
      metronomeStore.stop();
    }
    if (isPlaying.value && isMetronome.value) {
      metronomeStore.start();
    }
  }

  function zoomIn() {
    if (!api.value) return;

    zoom.value = Math.min(2, zoom.value + 0.1);

    api.value.settings.display.scale = zoom.value;
    api.value.updateSettings();
    api.value.render();
  }

  function zoomOut() {
    if (!api.value) return;

    zoom.value = Math.max(0.5, zoom.value - 0.1);

    api.value.settings.display.scale = zoom.value;
    api.value.updateSettings();
    api.value.render();
  }
  function resetZoom() {
    if (!api.value) return;

    zoom.value = 1;

    api.value.settings.display.scale = zoom.value;
    api.value.updateSettings();
    api.value.render();
  }

  function setLayout(mode: "page" | "horizontal" | "parchment") {
    if (!api.value) return;

    layoutMode.value = mode;

    switch (mode) {
      case "horizontal":
        api.value.settings.display.layoutMode = LayoutMode.Horizontal;
        break;

      case "parchment":
        api.value.settings.display.layoutMode = LayoutMode.Parchment;
        break;

      default:
        api.value.settings.display.layoutMode = LayoutMode.Page;
    }

    api.value.updateSettings();
    api.value.render();
  }

  return {
    /*
     |--------------------------------------------------------------------------
     | State
     |--------------------------------------------------------------------------
     */
    api,
    tracks,
    currentTrack,
    isYoutubePlay,
    currentTime,
    duration,

    isPlaying,
    playbackSpeed,

    isLooping,
    isLoopSelectionMode,

    loopStart,
    loopEnd,
    loopRange,

    isSeeking,
    currentFile,

    progressPercentage,
    isContinue,
    isMetronome,
    isCountIn,
    zoom,

    layoutMode,
    tempo,
    resetLoop,
    setYoutubePlay,
    /*
     |--------------------------------------------------------------------------
     | Actions
     |--------------------------------------------------------------------------
     */
    setApi,
    setTracks,
    changeFile,

    play,
    pause,
    playPause,
    stop,

    seek,

    renderTrack,

    toggleMute,
    toggleSolo,

    setPlaybackSpeed,

    toggleLoop,
    setLoopStart,
    setLoopEnd,
    setLoop,
    setTempo,
    updatePlayerPosition,
    reset,
    applyAlphaTabTheme,
    toggleCountIn,
    toggleMetronome,
    zoomIn,
    zoomOut,
    resetZoom,
    setLayout,
  };
});
