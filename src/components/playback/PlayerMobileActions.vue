<script setup lang="ts">
import { usePlayerStore } from "../../stores/playerStore";
import TrackMenu from "../TrackMenu.vue";
const store = usePlayerStore();
</script>

<template>
  <v-menu location="top end" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon="mdi-dots-vertical"
        variant="text"
        density="comfortable"
      />
    </template>

    <v-card min-width="260">
      <v-list density="comfortable">
        <!-- TRACK MENU -->
        <v-list-subheader>Track Menu</v-list-subheader>
        <track-menu />

        <v-divider class="my-1" />

        <!-- SETTINGS ITEMS -->
        <v-list-subheader>Playback</v-list-subheader>

        <v-list-item @click="store.toggleMetronome">
          <template #prepend>
            <v-icon :color="store.isMetronome ? 'primary' : undefined"
              >mdi-metronome</v-icon
            >
          </template>

          <v-list-item-title> Metronome </v-list-item-title>
        </v-list-item>

        <v-list-item @click="store.toggleCountIn">
          <template #prepend>
            <v-icon :color="store.isCountIn ? 'primary' : undefined"
              >mdi-music-note-plus</v-icon
            >
          </template>

          <v-list-item-title> Count In </v-list-item-title>
        </v-list-item>

        <v-divider class="my-1" />
        <v-list-subheader>Zoom</v-list-subheader>
        <v-list-item>
          <v-list-item-title> Zoom In </v-list-item-title>
          <template #append>
            <v-btn
              @click="store.zoomIn"
              icon="mdi-magnify-plus-outline"
              variant="flat"
              density="comfortable"
            />
          </template>
        </v-list-item>
        <v-list-item>
          <v-list-item-title> Zoom Out </v-list-item-title>
          <template #append>
            <v-btn
              @click="store.zoomOut"
              icon="mdi-magnify-minus-outline"
              variant="flat"
              density="comfortable"
            />
          </template>
        </v-list-item>
        <v-list-item>
          <v-list-item-title> Reset Zoom </v-list-item-title>
          <template #append>
            <v-btn
              @click="store.resetZoom"
              icon="mdi-loupe"
              variant="flat"
              density="comfortable"
            />
          </template>
        </v-list-item>
        <!-- SPEED -->
        <v-list-subheader>Speed</v-list-subheader>

        <v-menu location="top end">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              density="comfortable"
              class="text-none"
            >
              {{ store.playbackSpeed.toFixed(2) }}x
              <v-icon end size="16">mdi-chevron-up</v-icon>
            </v-btn>
          </template>

          <v-card min-width="180">
            <v-list density="compact">
              <v-list-subheader>Speed</v-list-subheader>

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
          </v-card>
        </v-menu>
      </v-list>
    </v-card>
  </v-menu>
</template>
