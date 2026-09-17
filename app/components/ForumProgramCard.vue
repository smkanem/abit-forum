<script lang="ts" setup>
import { mdiChevronRight } from '@mdi/js'
import type { ForumProgram } from '~/utils/forum-data'

defineProps<{ program: ForumProgram }>()
</script>

<template>
  <v-card
    :to="`/forum/${program.id}`"
    color="#dcecf4"
    rounded="lg"
    class="pa-4 d-flex align-center justify-space-between"
  >
    <div>
      <div class="university-name">{{ program.faculty }} {{ program.university }}</div>
      <div class="mt-1" style="font-size: 20px;">{{ program.direction }}</div>
    </div>

    <v-icon :icon="mdiChevronRight" />
  </v-card>
</template>

<style lang="postcss" scoped>
.university-name {
  font-size: clamp(1.1rem, 4vw, 1.625rem);
  font-weight: 600;
  line-height: 1.15;
}
</style>
