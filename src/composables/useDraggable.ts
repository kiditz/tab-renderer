import { ref, onUnmounted } from "vue";

interface Position {
  x: number;
  y: number;
}

interface Options {
  width: number;
  height: number;
  snapDistance?: number;
  initialX?: number;
  initialY?: number;
}

export function useDraggable(options: Options) {
  const {
    width,
    height,
    snapDistance = 50,
    initialX = 16,
    initialY = 140,
  } = options;

  const pos = ref<Position>({
    x: initialX,
    y: initialY,
  });

  const dragging = ref(false);

  const offset = ref<Position>({
    x: 0,
    y: 0,
  });

  function snapToEdge(x: number, y: number): Position {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let nx = x;
    let ny = y;

    if (x <= snapDistance) {
      nx = 10;
    }

    if (vw - (x + width) <= snapDistance) {
      nx = vw - width - 10;
    }

    if (y <= snapDistance) {
      ny = 10;
    }

    if (vh - (y + height) <= snapDistance) {
      ny = vh - height - 10;
    }

    return {
      x: nx,
      y: ny,
    };
  }

  function onpointermove(e: MouseEvent) {
    if (!dragging.value) return;

    pos.value = {
      x: e.clientX - offset.value.x,
      y: e.clientY - offset.value.y,
    };
  }

  function onpointerup() {
    dragging.value = false;

    pos.value = snapToEdge(pos.value.x, pos.value.y);

    window.removeEventListener("pointermove", onpointermove);

    window.removeEventListener("pointerup", onpointerup);
  }

  function onMouseDown(e: MouseEvent) {
    dragging.value = true;

    offset.value = {
      x: e.clientX - pos.value.x,
      y: e.clientY - pos.value.y,
    };

    window.addEventListener("pointermove", onpointermove);

    window.addEventListener("pointerup", onpointerup);
  }

  onUnmounted(() => {
    window.removeEventListener("pointermove", onpointermove);

    window.removeEventListener("pointerup", onpointerup);
  });

  return {
    pos,
    dragging,
    onMouseDown,
  };
}
