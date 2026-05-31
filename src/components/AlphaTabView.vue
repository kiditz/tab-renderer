<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useAlphaTab } from "../composables/useAlphaTab";
import { usePlayerStore } from "../stores/playerStore";
import AlphaTabLoopOverlay from "./AlphaTabLoopOverlay.vue";
import UploadPlaceholder from "./UploadPlaceholder.vue";
import { useThemeStore } from "../stores/themeStore.ts";

const element = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const { init, destroy } = useAlphaTab(element, wrapperRef);
const store = usePlayerStore();
const themeStore = useThemeStore();

watch(
  () => themeStore.currentTheme,
  (newTheme) => {
    switch (newTheme) {
      case "light":
        store.applyAlphaTabTheme(false);
        break;
      case "dark":
      case "studio":
        store.applyAlphaTabTheme(true);
        break;
    }
  },
);
onMounted(() => {
  if (store.currentFile) {
    init();
  }
});

onUnmounted(() => {
  destroy();
});
</script>

<template>
  <div class="at-wrap">
    <UploadPlaceholder />
    <div v-if="store.currentFile" ref="wrapperRef" class="alpha-wrapper">
      <div class="at-viewport">
        <div ref="element"></div>
        <AlphaTabLoopOverlay :wrapper-ref="wrapperRef" />
      </div>
    </div>
  </div>
</template>
