<script setup lang="ts">
import { toRef } from "vue";
import { useAlphaTabLoop } from "../composables/useAlphaTabLoopOverlay";
import { usePlayerStore } from "../stores/playerStore";
const store = usePlayerStore();
const props = defineProps<{
  wrapperRef: HTMLElement | null;
}>();

const {
  loopSegments,
  overlayStyle,
  beginSelection,
  startHandle,
  endHandle,

  dragStartHandle,
  dragEndHandle,
} = useAlphaTabLoop(toRef(props, "wrapperRef"));
</script>
<template>
  <div
    class="loop-overlay"
    :style="overlayStyle"
    @mousedown="beginSelection"
    v-if="store.isLoopSelectionMode"
  >
    <!-- SEGMENTS -->
    <div
      v-for="(segment, index) in loopSegments"
      :key="index"
      class="loop-segment"
      :style="{
        top: `${segment.top}px`,
        left: `${segment.left}px`,
        width: `${segment.width}px`,
        height: `${segment.height}px`,
      }"
    ></div>

    <!-- LEFT HANDLE -->
    <div
      v-if="startHandle"
      class="loop-handle left"
      :style="{
        top: `${startHandle.top}px`,
        left: `${startHandle.left}px`,
        height: `${startHandle.height}px`,
      }"
      @mousedown.stop="dragStartHandle()"
    ></div>

    <!-- RIGHT HANDLE -->
    <div
      v-if="endHandle"
      class="loop-handle right"
      :style="{
        top: `${endHandle.top}px`,
        left: `${endHandle.left}px`,
        height: `${endHandle.height}px`,
      }"
      @mousedown.stop="dragEndHandle()"
    ></div>
  </div>
</template>
<style scoped>
.loop-overlay {
  position: absolute;
  inset: 0;
  top: 0;
  left: 0;

  z-index: 999;
}

.loop-segment {
  position: absolute;

  background: rgba(var(--v-theme-primary), 0.15);

  pointer-events: auto;
}

.loop-handle {
  position: absolute;
  width: 14px;
  height: 80px;
  background: rgb(var(--v-theme-primary));

  border-radius: 999px;

  cursor: ew-resize;
}

.loop-handle::after {
  content: "";

  position: absolute;

  bottom: -8px;

  left: 50%;

  transform: translateX(-50%);

  border-left: 8px solid transparent;

  border-right: 8px solid transparent;

  border-top: 8px solid rgb(var(--v-theme-primary));
}

.loop-handle.left {
  left: -1px;
}

.loop-handle.right {
  right: -1px;
}
</style>
