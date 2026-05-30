<script setup lang="ts">
import { ref } from "vue";
import { useYoutubeStore } from "../stores/youtubeStore";
import { useYoutubePlayer } from "../composables/useYoutubePlayer";
import { usePlayerStore } from "../stores/playerStore";
import { useDraggable } from "../composables/useDraggable";

declare global {
  interface Window {
    YT: any;
    onYouTubePlayerAPIReady?: () => void;
  }
}

const panelOpen = ref<boolean>(false);
const dialog = ref<boolean>(false);
const input = ref<string>("");
const playerElement = ref<HTMLDivElement | null>(null);
useYoutubePlayer(playerElement);
const player = usePlayerStore();
const yt = useYoutubeStore();
const { pos, onMouseDown } = useDraggable({
  width: 320,
  height: 200,
});

/* ----------------------------------------
 * UI
 * ---------------------------------------- */

function saveUrl(): void {
  yt.setUrl(input.value);
  dialog.value = false;
  input.value = "";
}
</script>

<template>
  <div
    class="yt-float"
    :style="{
      transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    }"
  >
    <div class="yt-header" @pointerdown="onMouseDown">
      <v-icon size="18">mdi-youtube</v-icon>

      <span class="text-caption ml-1">Video</span>

      <v-spacer />

      <v-btn icon size="x-small" variant="text" @click="panelOpen = !panelOpen">
        <v-icon>
          {{ panelOpen ? "mdi-chevron-down" : "mdi-chevron-up" }}
        </v-icon>
      </v-btn>

      <v-btn
        :disabled="!player.currentFile"
        icon
        size="x-small"
        variant="text"
        @click="dialog = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>

    <div v-show="panelOpen" class="yt-body">
      <div class="yt-frame">
        <div ref="playerElement" class="yt-inner"></div>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="420">
      <v-card>
        <v-card-title>Add YouTube URL</v-card-title>

        <v-card-text>
          <v-text-field v-model="input" label="YouTube URL" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="saveUrl">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.yt-frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  border-radius: 8px;
}

/* mount target (tempat YT inject iframe) */
.yt-inner {
  width: 100%;
  height: 100%;
}
.yt-frame iframe {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  inset: 0;
  border-radius: 8px;
}

.yt-float {
  position: fixed;
  left: 16px;
  bottom: 280px;
  width: 320px;

  background: rgba(var(--v-theme-surface), 0.9);
  /* backdrop-filter: blur(20px); */

  border: 1px solid rgba(var(--v-border-color), 0.15);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  overflow: hidden;
  z-index: 99;
}

.yt-float.collapsed {
  width: 140px;
  height: 44px;
}

.yt-header {
  touch-action: none;
  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px 8px;

  font-size: 12px;
}

.yt-title {
  font-size: 12px;
  font-weight: 500;
}

.yt-body {
  padding: 6px;
}

.yt-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
:deep(iframe) {
  width: 100% !important;
  height: 100% !important;
  position: absolute;
  inset: 0;
  border: 0;
}
</style>
