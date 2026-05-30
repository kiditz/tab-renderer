<script lang="ts" setup>
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import TrackMenu from "../TrackMenu.vue";
import { usePlayerStore } from "../../stores/playerStore.ts";
import TempoMenu from "./TempoMenu.vue";
const { smAndDown } = useDisplay();
const isMobile = computed(() => smAndDown.value);
const store = usePlayerStore();
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files[0]) {
    store.changeFile(target.files[0]);
  }
};
</script>
<template>
  <div class="section-left">
    <input
      ref="fileInput"
      type="file"
      accept=".gp,.gpx,.gp3,.gp4,.gp5"
      hidden
      @change="handleFileUpload"
    />
    <v-btn
      icon
      rounded="lg"
      color="primary"
      variant="tonal"
      size="40"
      @click="fileInput?.click()"
    >
      <v-icon>mdi-upload</v-icon>
    </v-btn>
    <div v-if="!isMobile" class="track-metadata">
      <track-menu />
    </div>
    <tempo-menu  v-if="!isMobile" />
    
  </div>
</template>
