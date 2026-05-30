import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useYoutubeStore = defineStore("youtube", () => {
  const url = ref<string | null>(null);

  const videoId = computed(() => {
    if (!url.value) return null;

    const match = url.value.match(
      /(?:youtube\.com.*v=|youtu\.be\/)([^&?/]+)/,
    );

    return match?.[1] ?? null;
  });

  const setUrl = (newUrl: string) => {
    url.value = newUrl;
  };

  const clear = () => {
    url.value = null;
  };

  return {
    url,
    videoId,
    setUrl,
    clear,
  };
});