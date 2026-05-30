<!-- src/components/DebugPanel.vue -->

<script setup lang="ts">

import {
  usePlayerStore
} from '../stores/playerStore'

const store = usePlayerStore()

</script>

<template>

  <v-card
    rounded="0"
    elevation="0"
  >

    <v-card-text>

      <div>
        Time:
        {{ store.currentTime }}
      </div>

      <div>
        Duration:
        {{ store.duration }}
      </div>

      <div>
        Playing:
        {{ store.isPlaying }}
      </div>

      <div>
        Speed:
        {{ store.playbackSpeed }}
      </div>

      <div>
        Loop:
        {{ store.isLooping }}
      </div>

      <div>
        Loop Start:
        {{ store.loopStart }}
      </div>

      <div>
        Loop End:
        {{ store.loopEnd }}
      </div>

      <div>
        Progress:
        {{
          store.progressPercentage
            .toFixed(2)
        }}%
      </div>

    </v-card-text>

  </v-card>

</template>