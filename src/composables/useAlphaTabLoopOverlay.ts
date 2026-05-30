// src/composables/useAlphaTabLoopOverlay.ts
import { onMounted, onUnmounted, ref, watch } from "vue";
import { usePlayerStore } from "../stores/playerStore";

interface LoopSegment {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface HandlePosition {
  top: number;
  left: number;
  height: number;
}

type DragMode = "start" | "end" | null;

export function useAlphaTabLoop(wrapperRef: any) {
  const store = usePlayerStore();

  const startBeat = ref<any | null>(null);
  const endBeat = ref<any | null>(null);
  const dragMode = ref<DragMode>(null);

  const loopSegments = ref<LoopSegment[]>([]);
  const startHandle = ref<HandlePosition | null>(null);
  const endHandle = ref<HandlePosition | null>(null);
  const overlayStyle = ref<Record<string, string>>({
    width: "0px",
    height: "0px",
  });

  function getWrapper() {
    return wrapperRef?.value ?? wrapperRef;
  }
  function syncOverlaySize() {
    const wrapper = getWrapper();
    if (!wrapper) return;

    const viewport = wrapper.querySelector(".alphaTab") as HTMLElement;
    if (!viewport) return;

    const rect = viewport.getBoundingClientRect();

    overlayStyle.value = {
      width: `${rect.width}px`,
      height: `${rect.height}px`,
    };
  }

  /*
   |--------------------------------------------------------------------------
   | Beat Helpers
   |--------------------------------------------------------------------------
   */
  function getAllBeatBounds() {
    if (!store.api?.boundsLookup) return [];

    const result: any[] = [];
    const systems = store.api.boundsLookup.staffSystems;

    for (const system of systems) {
      for (const masterBar of system.bars) {
        for (const bar of masterBar.bars) {
          for (const beat of bar.beats) {
            result.push(beat);
          }
        }
      }
    }

    return result;
  }

  function getBeatAt(clientX: number, clientY: number) {
    const wrapper = getWrapper();
    if (!wrapper || !store.api?.boundsLookup) return null;

    const surface = wrapper.querySelector(".at-surface") as HTMLElement;
    if (!surface) return null;

    const rect = surface.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const beat = store.api.boundsLookup.getBeatAtPos(x, y);
    if (!beat) return null;

    return store.api.boundsLookup.findBeat(beat);
  }

  /*
   |--------------------------------------------------------------------------
   | Rebuild Overlay
   |--------------------------------------------------------------------------
   */
  function rebuildSegments() {
    console.log("systems", store.api?.boundsLookup?.staffSystems?.length);
    
    if (!startBeat.value || !endBeat.value) {
      loopSegments.value = [];
      startHandle.value = null;
      endHandle.value = null;
      return;
    }

    const all = getAllBeatBounds();

    const startIndex = all.findIndex(
      (x: any) => x.beat.id === startBeat.value.beat.id,
    );

    const endIndex = all.findIndex(
      (x: any) => x.beat.id === endBeat.value.beat.id,
    );

    if (startIndex === -1 || endIndex === -1) return;

    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);

    const selected = all.slice(min, max + 1);

    const grouped = new Map<number, any[]>();

    for (const beat of selected) {
      const rect = beat.realBounds;
      const targetY = rect.y;

      // Group rows with a 5px buffer to bridge rounding anomalies
      const existingKey = Array.from(grouped.keys()).find(
        (y) => Math.abs(y - targetY) < 5,
      );

      const key = existingKey !== undefined ? existingKey : targetY;

      if (!grouped.has(key)) {
        grouped.set(key, []);
      }

      grouped.get(key)?.push(beat);
    }

    const segments: LoopSegment[] = [];

    for (const beats of grouped.values()) {
      beats.sort((a, b) => a.realBounds.x - b.realBounds.x);

      const first = beats[0];
      const last = beats[beats.length - 1];

      const firstRect = first.realBounds;
      const lastRect = last.realBounds;

      segments.push({
        top: firstRect.y,
        left: firstRect.x,
        width: lastRect.x + lastRect.w - firstRect.x,
        height: firstRect.h,
      });
    }

    loopSegments.value = segments;

    /*
     |--------------------------------------------------------------------------
     | Handles
     |--------------------------------------------------------------------------
     */
    const firstBeatInSelection = selected[0].realBounds;

    const lastBeatInSelection = selected[selected.length - 1].realBounds;

    startHandle.value = {
      top: firstBeatInSelection.y,
      left: firstBeatInSelection.x,
      height: firstBeatInSelection.h,
    };

    endHandle.value = {
      top: lastBeatInSelection.y,
      left: lastBeatInSelection.x + lastBeatInSelection.w,
      height: lastBeatInSelection.h,
    };

    /*
     |--------------------------------------------------------------------------
     | Sync Store
     |--------------------------------------------------------------------------
     */
    const start = selected[0].beat.absolutePlaybackStart;

    const lastBeat = selected[selected.length - 1].beat;

    const end = lastBeat.absolutePlaybackStart + lastBeat.playbackDuration;

    store.setLoop({ start, end });
  }

  /*
   |--------------------------------------------------------------------------
   | Sync Playback Range
   |--------------------------------------------------------------------------
   */
  watch(
    () => store.loopRange,
    (newRange) => {
      if (!store.api?.player) return;

      if (!newRange) {
        store.api.player.playbackRange = null;
        return;
      }

      store.api.player.playbackRange = {
        startTick: newRange.start,
        endTick: newRange.end,
      };
    },
    { deep: true, immediate: true },
  );

  watch(
    () => store.isLoopSelectionMode,
    (selected) => {
      if (!store.api?.player) return;
      if (!selected) {
        store.api.player.playbackRange = null;
        
        startBeat.value = null;
        endBeat.value = null;
        
        loopSegments.value = [];
        
        startHandle.value = null;
        endHandle.value = null;
        
        return;
      }
      syncOverlaySize()
    },
    { deep: true, immediate: true },
  );

  /*
   |--------------------------------------------------------------------------
   | Mouse Actions
   |--------------------------------------------------------------------------
   */
  function beginSelection(e: MouseEvent) {
    if (!store.isLoopSelectionMode) return;

    const beat = getBeatAt(e.clientX, e.clientY);
    if (!beat) return;

    startBeat.value = beat;
    endBeat.value = beat;

    dragMode.value = "end";

    rebuildSegments();
  }

  function dragStartHandle() {
    dragMode.value = "start";
  }

  function dragEndHandle() {
    dragMode.value = "end";
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragMode.value) return;

    const beat = getBeatAt(e.clientX, e.clientY);
    if (!beat) return;

    if (dragMode.value === "start") {
      startBeat.value = beat;
    }

    if (dragMode.value === "end") {
      endBeat.value = beat;
    }
    console.log("Mouse MOVE");
    store.isLooping = false;

    rebuildSegments();
  }

  function onMouseUp() {
    if (store.isLoopSelectionMode) {
      dragMode.value = null;
      console.log("Mouse UP");
      store.isLooping = true;
    }
  }

  /*
   |--------------------------------------------------------------------------
   | Lifecycle Hooks
   |--------------------------------------------------------------------------
   */
  onMounted(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  });

  return {
    loopSegments,
    startHandle,
    endHandle,

    overlayStyle,
    beginSelection,

    dragStartHandle,
    dragEndHandle,
  };
}
