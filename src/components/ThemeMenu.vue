<script setup lang="ts">
import { useThemeStore } from "../stores/themeStore";

const themeStore = useThemeStore();
</script>

<template>
  <v-menu location="top">
    <template #activator="{ props }">
      <v-tooltip text="Change Theme" location="top">
        <template #activator="{ props: tooltipProps }">
          <v-btn
            v-bind="{ ...props, ...tooltipProps }"
            icon="mdi-palette-outline"
            variant="text"
            density="comfortable"
          />
        </template>
      </v-tooltip>
    </template>

    <v-card min-width="220">
      <v-card-text>
        <div class="text-subtitle-2 mb-3">
          Theme
        </div>

        <v-btn-toggle
          :model-value="themeStore.currentTheme"
          mandatory
          divided
          @update:model-value="themeStore.setTheme"
        >
          <v-btn value="light">
            ☀️ Light
          </v-btn>

          <v-btn value="dark">
            🌙 Dark
          </v-btn>

          <v-btn value="studio">
            🎸 Studio
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>