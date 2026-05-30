<script setup lang="ts">
import { computed } from "vue";
import { usePlayerStore } from "../../stores/playerStore";
import { PlayerMode } from "@coderline/alphatab";
import ThemeMenu from "../ThemeMenu.vue";

const store = usePlayerStore();

const isYoutube = computed(
  () =>
    store.api?.settings.player.playerMode == PlayerMode.EnabledExternalMedia,
);
const currentLayoutIcon = computed(() => {
  switch (store.layoutMode) {
    case "horizontal":
      return "mdi-view-carousel-outline";

    case "parchment":
      return "mdi-view-stream-outline";

    default:
      return "mdi-file-document-outline";
  }
});
</script>
<template>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-metronome"
        variant="text"
        density="comfortable"
        class="mx-1"
        :color="store.isMetronome ? 'primary' : undefined"
        @click="store.toggleMetronome"
      />
    </template>
    Metronome
  </v-tooltip>
  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn
        :disabled="isYoutube"
        v-bind="props"
        icon="mdi-music-note-plus"
        variant="text"
        density="comfortable"
        class="mx-1"
        :color="store.isCountIn ? 'primary' : undefined"
        @click="store.toggleCountIn"
      />
    </template>
    Count In
  </v-tooltip>

  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-magnify-minus-outline"
        variant="text"
        density="comfortable"
        class="mx-1"
        @click="store.zoomOut"
      />
    </template>
    Zoom Out
  </v-tooltip>

  <v-tooltip location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-magnify-plus-outline"
        variant="text"
        density="comfortable"
        class="mx-1"
        @click="store.zoomIn"
      />
    </template>
    Zoom In
  </v-tooltip>
  <v-menu location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        density="comfortable"
        class="mx-1"
        :icon="currentLayoutIcon"
      />
    </template>

    <v-list density="compact" nav>
      <v-list-item @click="store.setLayout('page')">
        <template #prepend>
          <v-icon>mdi-file-document-outline</v-icon>
        </template>

        <v-list-item-title> Page Layout </v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setLayout('horizontal')">
        <template #prepend>
          <v-icon>mdi-view-carousel-outline</v-icon>
        </template>

        <v-list-item-title> Horizontal Layout </v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setLayout('parchment')">
        <template #prepend>
          <v-icon>mdi-view-stream-outline</v-icon>
        </template>

        <v-list-item-title> Line Layout </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <theme-menu/>
</template>
