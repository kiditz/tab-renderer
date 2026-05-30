<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
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
  <v-sheet
    style="overflow: hidden; height: 100%;"
    v-if="!store.currentFile"
    class="d-flex flex-column align-center justify-center border-dashed cursor-pointer"
    height="500"
    rounded="lg"
    @click="fileInput?.click()"
  >
    <v-icon size="56" color="grey-lighten-1">mdi-music-note-plus</v-icon>
    <h3 class="text-h6 text-grey-darken-2 mt-4 font-weight-medium">
      Belum Ada File Guitar Pro
    </h3>
    <p class="text-body-2 text-grey-darken-1 mt-1 text-center px-4">
      Klik di sini atau gunakan tombol upload di atas untuk memuat file
      <br />
      <strong>(.gp, .gpx, .gp3, .gp4, .gp5)</strong>
    </p>

    <!-- Hidden Native File Input untuk area klik placeholder -->
    <input
      type="file"
      ref="fileInput"
      accept=".gp,.gpx,.gp3,.gp4,.gp5"
      style="display: none"
      @change="handleFileUpload"
    />
  </v-sheet>
</template>
