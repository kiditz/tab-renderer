<script setup lang="ts">
import { usePlayerStore } from "../stores/playerStore";

const store = usePlayerStore();

const selectTrack = (track: any) => {
  store.renderTrack(track);
};
</script>

<template>
  <v-navigation-drawer
    width="300"
    permanent
    class="track-drawer"
  >
    <!-- HEADER -->
    <v-list-item class="px-2 py-2">
      <template #prepend>
        <v-icon size="18">mdi-music-box-multiple</v-icon>
      </template>

      <v-list-item-title class="font-weight-medium">
        Tracks
      </v-list-item-title>
    </v-list-item>

    <v-divider />

    <!-- TRACK LIST -->
    <v-list density="compact" nav>
      <v-list-item
        v-for="track in store.tracks"
        :key="track.id"
        :active="store.currentTrack?.id === track.id"
        class="track-item"
        @click="selectTrack(track)"
      >
        <!-- icon -->
        <template #prepend>
          <v-icon>
            {{ track.percussion ? "mdi-drum" : "mdi-guitar-electric" }}
          </v-icon>
        </template>

        <!-- name -->
        <v-list-item-title class="text-truncate">
          {{ track.name }}
        </v-list-item-title>

        <!-- actions -->
        <template #append>
          <v-btn
            icon
            size="small"
            variant="text"
            @click.stop="store.toggleMute(track)"
          >
            <v-icon :color="track.muted ? 'error' : ''">
              {{ track.muted ? "mdi-volume-off" : "mdi-volume-high" }}
            </v-icon>
          </v-btn>

          <v-btn
            icon
            size="small"
            variant="text"
            @click.stop="store.toggleSolo(track)"
          >
            <v-icon :color="track.solo ? 'warning' : ''">
              {{ track.solo ? "mdi-account-off" : "mdi-account" }}
            </v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.track-drawer {
  background: rgba(var(--v-theme-surface), 0.85);
  /* backdrop-filter: blur(18px); */
  border-right: 1px solid rgba(var(--v-border-color), 0.2);
}

</style>