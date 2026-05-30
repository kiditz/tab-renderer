```vue
<script setup lang="ts">
import { computed } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import PlayerControls from "./playback/PlayerControls.vue";
import PlayerTrackInfo from "./playback/PlayerTrackInfo.vue";
import PlayerActions from "./playback/PlayerActions.vue";
const store = usePlayerStore();



const currentTimeModel = computed({
  get: () => store.currentTime,
  set: (val) => {
    store.seek(val);
  },
});

const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
</script>

<template>
  <div class="player-container">
    <v-card flat class="player-card">
     
      <!-- TOP -->
      <div class="player-layout">
        <!-- LEFT -->
        <player-track-info />

        <!-- CENTER -->
        <player-controls />

        <div class="section-right">
          <player-actions/>
        </div>
      </div>

      <!-- PROGRESS -->
      <div class="progress-container">
        <span class="time-text text-medium-emphasis">
          {{ formatTime(currentTimeModel / 1000) }}
        </span>

        <div class="slider-wrapper">
          <v-slider
            v-model="currentTimeModel"
            :max="store.duration"
            hide-details
            density="compact"
            color="primary"
            class="player-slider"
          />
        </div>

        <span class="time-text text-medium-emphasis">
          {{ formatTime(store.duration / 1000) }}
        </span>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.no-drag {
  pointer-events: none;
}

/* ===== CONTAINER ===== */
.player-container {
  width: 100%;
  flex-shrink: 0;

  padding-bottom: env(safe-area-inset-bottom);

  background: rgba(var(--v-theme-surface), 0.85) !important;

  /* backdrop-filter: blur(30px); */

  border-top: 1px solid rgba(var(--v-border-color), 0.12) !important;

  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08) !important;
}

.player-card {
  width: 100%;
  padding: 14px 18px;

  border-radius: 0 !important;

  background: transparent !important;

  border: none !important;

  box-shadow: none !important;
}

/* ===== LAYOUT ===== */
.player-layout {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* ===== LEFT ===== */
.section-left {
  display: flex;
  align-items: center;
  gap: 10px;

  flex: 1 1 280px;

  min-width: 0;
}

.track-metadata {
  display: flex;
  flex-direction: column;

  overflow: hidden;
  min-width: 0;
}

.track-title {
  font-size: 0.95rem;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.track-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ===== CENTER ===== */
.section-center {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;
}

/* ===== RIGHT ===== */
.section-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 4px;

  flex: 1 1 280px;

  min-width: 0;
}

/* ===== PLAY BUTTON ===== */
.play-btn {
  transition: transform 0.2s ease;
}

.play-btn:hover {
  transform: scale(1.05);
}

/* ===== PROGRESS ===== */
.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;

  margin-top: 10px;
}

.slider-wrapper {
  flex: 1;
  min-width: 0;
}

.time-text {
  min-width: 42px;

  font-size: 12px;
  font-family: monospace;

  text-align: center;

  flex-shrink: 0;
}

/* ===== SLIDER ===== */
.player-slider :deep(.v-slider-thumb__surface) {
  transform: scale(0);

  transition: transform 0.2s ease-in-out;
}

.player-slider:hover :deep(.v-slider-thumb__surface) {
  transform: scale(1);
}

.player-slider :deep(.v-slider-track__background),
.player-slider :deep(.v-slider-track__fill) {
  height: 4px !important;

  transition: height 0.2s ease;
}

.player-slider:hover :deep(.v-slider-track__background),
.player-slider:hover :deep(.v-slider-track__fill) {
  height: 6px !important;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .player-card {
    padding: 8px 10px;
  }

  .player-layout {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 8px;
  }

  .section-left,
  .section-center,
  .section-right {
    min-width: 0;
  }

  .section-left {
    overflow: hidden;
    gap: 8px;
  }

  .section-center {
    justify-content: center;
  }

  .section-right {
    justify-content: flex-end;
    gap: 2px;
  }

  /* kecilin metadata */
  .track-title {
    font-size: 0.82rem;
  }

  .track-subtitle {
    display: none;
  }

  /* avatar kecil */
  .section-left .v-avatar {
    width: 32px !important;
    height: 32px !important;
  }

  /* controls compact */
  .play-btn {
    transform: scale(0.82);
    margin: 0 !important;
  }

  .section-center .v-btn,
  .section-right .v-btn {
    margin: 0 !important;
  }

  /* progress lebih rapat */
  .progress-container {
    margin-top: 4px;
    gap: 6px;
  }

  .time-text {
    min-width: 34px;
    font-size: 11px;
  }

  /* slider lebih tipis */
  .player-slider :deep(.v-slider-track__background),
  .player-slider :deep(.v-slider-track__fill) {
    height: 3px !important;
  }

  /* settings menu compact */
  .section-right .v-btn {
    width: 36px !important;
    height: 36px !important;
  }
}

/* ===== SMALL MOBILE ===== */
@media (max-width: 480px) {
  .player-card {
    padding: 10px;
  }

  .time-text {
    min-width: 36px;
    font-size: 11px;
  }

  .section-right {
    gap: 2px;
  }
}
.speed-container {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 220px;

  padding: 12px 0;
}

.speed-slider {
  height: 180px;
}
</style>
