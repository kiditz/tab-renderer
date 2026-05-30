<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import PlayerDesktopActions from "./PlayerDesktopActions.vue";
import PlayerTabletActions from "./PlayerTabletActions.vue";
import PlayerMobileActions from "./PlayerMobileActions.vue";
const { md, lgAndUp } = useDisplay();
const isMd = computed(() => md.value);
const isDesktop = computed(() => lgAndUp.value);
</script>
<template>

  <PlayerDesktopActions
    v-if="isDesktop"
  />

  <PlayerTabletActions
    v-else-if="isMd"
  />

  <PlayerMobileActions
    v-else
  />

</template>