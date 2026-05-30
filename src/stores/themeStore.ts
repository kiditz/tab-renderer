import { defineStore } from "pinia";
import { ref } from "vue";

export type AppTheme = "light" | "dark" | "studio";

export const useThemeStore = defineStore(
  "theme",
  () => {
    const currentTheme = ref<AppTheme>("studio");

    const setTheme = (theme: AppTheme) => {
      currentTheme.value = theme;
    };

    const toggleTheme = () => {
      currentTheme.value = currentTheme.value === "dark" ? "light" : "dark";
    };

    return {
      currentTheme,
      setTheme,
      toggleTheme,
    };
  },
  {
    persist: true,
  },
);
