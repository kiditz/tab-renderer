// src/composables/useAlphaTab.ts

import {
  AlphaTabApi,
  LayoutMode,
  PlayerMode,
  ScrollMode,
  Settings,
  StaveProfile,
} from "@coderline/alphatab";

import { watch, type Ref } from "vue";

import {
  usePlayerStore,
  type SongTrack,
  type Tempo,
} from "../stores/playerStore";
import { useTheme } from "vuetify";
import { useMetronomeStore } from "../stores/metronomeStore";
import { getInstrumentName } from "./mapProgram";


export function useAlphaTab(
  element: Ref<HTMLElement | null>,
  wrapperRef: Ref<HTMLElement | null>,
) {
  const store = usePlayerStore();
  const metronome = useMetronomeStore();
  const theme = useTheme();
  let api: AlphaTabApi | null = null;
  function init() {
    console.log("init");
    if (!element.value) return;
    console.log("start alpha tab");
    api = new AlphaTabApi(element.value, {
      core: {
        file: store.currentFile ?? "song.gp",
        fontDirectory: "/font/",
      },

      player: {
        playerMode: PlayerMode.EnabledAutomatic,
        soundFont: "/soundfont/sonivox.sf3",
        scrollMode: ScrollMode.Continuous,
        scrollElement: wrapperRef.value?.querySelector(".at-viewport"),
      },
      display: {
        staveProfile: StaveProfile.TabMixed,
        layoutMode: LayoutMode.Page
        
      }
    } as Settings);

    store.setApi(api);

    api.scoreLoaded.on((score) => {
      const mappedTracks: SongTrack[] = score.tracks.map((track) => ({
        id: track.index,
        name: getInstrumentName(track.playbackInfo.program),
        shortName: track.name,
        percussion: track.isPercussion,
        muted: false,
        solo: false,
        alphaTabTrack: track,
      }));

      store.setTracks(mappedTracks);
      store.setTempo({ label: score.tempoLabel, number: score.tempo } as Tempo);
      console.log("set duration: " + api?.endTime);
    });

    api.playerPositionChanged.on((position) => {
      // store.currentTime = position.currentTime;
      store.updatePlayerPosition(position.currentTime);
      // const cursor = wrapperRef.value?.querySelector(
      //   ".at-cursor-bar",
      // ) as HTMLElement;

      // if (!cursor || !wrapperRef.value) return;

      // cursor.scrollIntoView({
      //   behavior: "smooth",
      //   block: "nearest",
      //   inline: "center",
      // });
    });

    /*
     |--------------------------------------------------------------------------
     | Player State
     |--------------------------------------------------------------------------
     */
    api.playerStateChanged.on((state) => {
      console.log({...state}, 'changed')
      if(!store.isPlaying){
        store.duration = api?.endTime!;
      }
      store.isPlaying = state.state === 1;
      if (!store.isMetronome) return;
      if (state.state === 1) {
        metronome.start();
      } else {
        metronome.stop();
      }
    });


    /*
     |--------------------------------------------------------------------------
     | Initial Render
     |--------------------------------------------------------------------------
     */

    if (store.currentFile) {
      store.applyAlphaTabTheme(theme.global.current.value.dark);
    }
  }

  watch(
    () => store.currentFile,
    (newFile) => {
      if (!newFile) return;

      if (api) {
        destroy();
      }
      if (element.value) {
        element.value.innerHTML = "";
      }
      setTimeout(() => {
        init();
      }, 50);
    },
  );
  watch(
    () => store.isLooping,
    (looping) => {
      if (!api) return;
      api.isLooping = looping;
    },
  );

  function destroy() {
    store.api?.destroy();
  }

  return {
    init,
    destroy,
  };
}
