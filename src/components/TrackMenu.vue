<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";

const store = usePlayerStore();

const menu = ref(false);

const selectTrack = (track: any) => {
  store.renderTrack(track);
  menu.value = false; // auto close
};
</script>

<template>
  <v-menu v-model="menu" offset-y :scrim="false" transition="none">
    <!-- ACTIVATOR -->
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="tonal" class="track-btn">
        <v-icon start>mdi-music-box-multiple</v-icon>

        <div class="track-text">
          <div class="track-title text-truncate">
            {{ store.currentTrack?.name || "Select Track" }}
          </div>

          <div class="track-subtitle text-caption text-medium-emphasis">
            {{ store.currentTrack?.shortName || "No instrument" }}
          </div>
        </div>

        <!-- <v-icon end>mdi-chevron-down</v-icon> -->
      </v-btn>
    </template>

    <!-- MENU CONTENT -->
    <v-card class="track-menu" min-width="300">
      <v-list density="compact">
        <v-list-item
          v-for="track in store.tracks"
          :key="track.id"
          :active="store.currentTrack?.id === track.id"
          @click="selectTrack(track)"
        >
          <!-- <template #prepend>
            <v-icon>
              {{ track.percussion ? "mdi-drum" : "mdi-guitar-electric" }}
            </v-icon>
          </template> -->

          <template #title>
            {{ track.name }}
          </template>
          <template #subtitle> {{ track.shortName }} </template>
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
    </v-card>
  </v-menu>
</template>

<style scoped>
.track-btn {
  display: flex;
  align-items: center;
  width: 100%;
}

.track-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 👈 ini kunci */
  justify-content: center;
  max-width: 140px;
  margin: 0 8px;
}

.track-title {
  text-align: left;
  font-size: 14px;
  line-height: 1.2;
}

.track-subtitle {
  text-align: left;
  font-size: 11px;
  line-height: 1.1;

  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
