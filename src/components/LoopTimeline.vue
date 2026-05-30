<!-- src/components/LoopTimeline.vue -->

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  duration: number;
  start: number;
  end: number;
}>();

const emit = defineEmits<{
  (e: "update", payload: { start: number; end: number }): void;
}>();

const timeline = ref<HTMLElement | null>(null);

const dragging = ref<"left" | "right" | "body" | null>(null);

const startPercent = computed(() => {
  if (!props.duration) return 0;
  return (props.start / props.duration) * 100;
});

const widthPercent = computed(() => {
  if (!props.duration) return 0;
  return ((props.end - props.start) / props.duration) * 100;
});

/*
|--------------------------------------------------------------------------
| POINTER DOWN (FIX: pointer capture)
|--------------------------------------------------------------------------
*/
function onLeftPointerDown(e: PointerEvent) {
  console.log("[Loop] LEFT down");
  dragging.value = "left";
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}

function onRightPointerDown(e: PointerEvent) {
  console.log("[Loop] RIGHT down");
  dragging.value = "right";
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}

function onBodyPointerDown(e: PointerEvent) {
  console.log("[Loop] BODY down");

  dragging.value = "body";
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}
/*
|--------------------------------------------------------------------------
| POINTER MOVE (GLOBAL)
|--------------------------------------------------------------------------
*/

function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !timeline.value) return;

  const rect = timeline.value.getBoundingClientRect();
  const x = e.clientX - rect.left;

  const percent = Math.max(0, Math.min(1, x / rect.width));
  const time = percent * props.duration;

  if (dragging.value === "left") {
    const newStart = Math.min(time, props.end - 1000);

    emit("update", {
      start: newStart,
      end: props.end,
    });
  }

  if (dragging.value === "right") {
    const newEnd = Math.max(time, props.start + 1000);

    emit("update", {
      start: props.start,
      end: newEnd,
    });
  }

  if (dragging.value === "body") {
    const regionDuration = props.end - props.start;

    let nextStart = percent * props.duration;

    nextStart = Math.max(
      0,
      Math.min(props.duration - regionDuration, nextStart)
    );

    emit("update", {
      start: nextStart,
      end: nextStart + regionDuration,
    });
  }
}

/*
|--------------------------------------------------------------------------
| POINTER UP
|--------------------------------------------------------------------------
*/

function onPointerUp() {
  dragging.value = null;
}

/*
|--------------------------------------------------------------------------
| LIFECYCLE
|--------------------------------------------------------------------------
*/

onMounted(() => {
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
});
</script>

<template>
  <div ref="timeline" class="timeline">
    <div class="timeline-track" />

    <div
      class="loop-region"
      :style="{
        left: `${startPercent}%`,
        width: `${widthPercent}%`,
      }"
    >
      <div class="handle left" @pointerdown="onLeftPointerDown" />
      <div class="region-body" @pointerdown="onBodyPointerDown" />
      <div class="handle right" @pointerdown="onRightPointerDown" />
    </div>
  </div>
</template>

<style scoped>
.timeline {
background: red;
  position: relative;
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  user-select: none;

  /* 🔥 IMPORTANT: supaya gak ketutup AlphaTab */
  z-index: 9999;
}

.timeline-track {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
}

.loop-region {
  position: absolute;
  height: 28px;
  border-radius: 999px;
  background: rgba(0, 255, 136, 0.2);
  border: 2px solid #00ff88;
  display: flex;
  align-items: center;
  cursor: grab;

  pointer-events: auto;
}

.region-body {
  flex: 1;
  height: 100%;
  pointer-events: auto;
}

.handle {
  width: 12px;
  height: 100%;
  background: #00ff88;
  cursor: ew-resize;

  pointer-events: auto;
}

.handle.left {
  border-radius: 999px 0 0 999px;
}

.handle.right {
  border-radius: 0 999px 999px 0;
}
</style>