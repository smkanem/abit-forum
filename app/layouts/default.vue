<script lang="ts" setup>
import { mdiAccountCircleOutline, mdiHome } from '@mdi/js'
</script>

<template>
  <div class="header">
    <v-container class="d-flex align-center justify-space-between pt-0 pb-0"
      style="height: 60px; position: relative;">
      <div @click="navigateTo('/')" class="d-flex flex-row justify-center align-center cursor-pointer logo h-100">
        <v-icon :icon="mdiHome" color="#1A95AD" size="40" />

        <div class="font-weight-bold" style="font-size: 22px; margin-left: 13px;">Форум</div>
      </div>

      <div class="d-flex flex-row align-center" style="gap: 8px;">
        <span style="font-size: 16px;">Иванов Иван</span>
        <v-icon :icon="mdiAccountCircleOutline" size="34" />
      </div>
    </v-container>
  </div>

  <NuxtPage />
</template>

<style lang="postcss" scoped>
.logo,
.logo * {
  user-select: none;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  transition: all .15s;
}
</style>
