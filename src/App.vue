<!-- src/App.vue -->

<script setup lang="ts">
import { useTheme } from "vuetify";
import AlphaTabView from "./components/AlphaTabView.vue";

import PlaybackControls from "./components/PlaybackControls.vue";
import YoutubeFloatingPanel from "./components/YoutubeFloatingPanel.vue";
import { useThemeStore } from "./stores/themeStore.ts";
import { watch } from "vue";
const themeStore = useThemeStore()
const vuetifyTheme = useTheme()
watch(
  () => themeStore.currentTheme,
  (theme) => {
    vuetifyTheme.global.name.value = theme;
  },
  { immediate: true }
);

</script>

<template>
  <v-app>
  <div class="app-shell">
    <AlphaTabView class="viewer" />
    <PlaybackControls class="player" />
    <YoutubeFloatingPanel/>
  </div>
</v-app>
</template>
<style scoped>
.app-shell {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.viewer {
  flex: 1;
  min-height: 0;
}

.player {
  flex-shrink: 0;
}
</style>
