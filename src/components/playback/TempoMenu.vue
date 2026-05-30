<script setup lang="ts">
import { computed } from "vue";
import { usePlayerStore } from "../../stores/playerStore";

const store = usePlayerStore();
const actualTempo = computed(() => {
  return Math.round(store.tempo.number * store.playbackSpeed);
});
</script>
<template>
  <v-menu location="top">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        append-icon="mdi-chevron-up"
        class="text-none mr-2"
      >
        {{ actualTempo || 1 }} BPM
      </v-btn>
    </template>
    <v-list density="compact">
      <v-list-item @click="store.setPlaybackSpeed(0.5)">
        <v-list-item-title>0.5x</v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setPlaybackSpeed(0.75)">
        <v-list-item-title>0.75x</v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setPlaybackSpeed(1)">
        <v-list-item-title>1.0x (Normal)</v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setPlaybackSpeed(1.25)">
        <v-list-item-title>1.25x</v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setPlaybackSpeed(1.5)">
        <v-list-item-title>1.5x</v-list-item-title>
      </v-list-item>

      <v-list-item @click="store.setPlaybackSpeed(2)">
        <v-list-item-title>2.0x</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
