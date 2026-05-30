<script setup lang="ts">
import { usePlayerStore } from '../../stores/playerStore';

const store = usePlayerStore()
</script>
<template>
  <div class="section-center">
    <v-btn
      icon="mdi-reload"
      variant="text"
      density="comfortable"
      :color="store.isLoopSelectionMode ? 'primary' : undefined"
      @click="store.toggleLoop"
    />

    <v-btn
      icon
      @click="store.playPause"
      color="primary"
      variant="elevated"
      size="large"
      class="mx-2 play-btn"
    >
      <v-icon size="28">
        {{ store.isPlaying ? "mdi-pause" : "mdi-play" }}
      </v-icon>
    </v-btn>

    <v-btn icon @click="store.stop" variant="text" density="comfortable">
      <v-icon size="22">mdi-stop</v-icon>
    </v-btn>
  </div>
</template>
