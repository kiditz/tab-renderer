<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useAlphaTab } from "../composables/useAlphaTab";
import { usePlayerStore } from "../stores/playerStore";
import AlphaTabLoopOverlay from "./AlphaTabLoopOverlay.vue";
import UploadPlaceholder from "./UploadPlaceholder.vue";

const element = ref<HTMLElement | null>(null);
const wrapperRef = ref<HTMLElement | null>(null);

const { init, destroy } = useAlphaTab(element, wrapperRef);
const store = usePlayerStore();

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
    <UploadPlaceholder/>
    <div v-if="store.currentFile" ref="wrapperRef" class="alpha-wrapper">
      <div class="at-viewport">
        <div ref="element"></div>
        <AlphaTabLoopOverlay :wrapper-ref="wrapperRef" />
      </div>
    </div>
  </div>
</template>
<style>
.at-wrap {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  min-height: 0;
}

/* ===== SCROLL AREA ===== */
.alpha-wrapper {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  padding: 8px;
}
.at-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
/* ===== PLACEHOLDER ===== */
.border-dashed {
  border-style: dashed !important;
  border-width: 2px !important;
  border-color: rgb(var(--v-theme-outline)) !important;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.border-dashed:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.cursor-pointer {
  cursor: pointer;
}

/* ===== CURSOR ===== */
.at-cursor-bar {
  background: rgba(255, 242, 0, 0.2);
}

.at-cursor-beat {
  background: rgb(var(--v-theme-primary)) !important;
}
.at-highlight * {
  fill: #0078ff;
  stroke: #0078ff;
}

/* ===== SURFACE ===== */
.at-surface {
  position: relative !important;
  background: transparent !important;
}

.at-cursor {
  background: transparent !important;
}

/* ===== TEXT ===== */
.text-truncate {
  max-width: 250px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: inline-block;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
  .alpha-wrapper {
    padding: 4px;
  }

  .at-cursor-beat {
    width: 14px;
  }

  .text-truncate {
    max-width: 140px;
  }
}
</style>
