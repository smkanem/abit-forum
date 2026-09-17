<script setup lang="ts">
import { forumPrograms } from '~/utils/forum-data'

const university = ref<string | null>(null)
const faculty = ref<string | null>(null)
const direction = ref<string | null>(null)

const universities = [...new Set(forumPrograms.map(p => p.university))]
const faculties = [...new Set(forumPrograms.map(p => p.faculty))]
const directions = [...new Set(forumPrograms.map(p => p.direction))]

const recentPrograms = forumPrograms.slice(0, 3)
const popularPrograms = forumPrograms.slice(3, 6)

function goToForum() {
  const match = forumPrograms.find(p =>
    (!university.value || p.university === university.value)
    && (!faculty.value || p.faculty === faculty.value)
    && (!direction.value || p.direction === direction.value),
  ) ?? forumPrograms[0]

  navigateTo(`/forum/${match.id}`)
}
</script>

<template>
  <v-container class="py-8">
    <h1 style="font-size: 32px; font-weight: 600; max-width: 700px;" class="mb-8">
      Узнай любую мелочь прямо от студентов
    </h1>

    <v-row class="mb-8">
      <v-col cols="12" sm="6">
        <v-select
          v-model="university" :items="universities" label="ВУЗ" variant="solo" bg-color="#eaeaea" flat
          rounded="lg" density="comfortable" hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="faculty" :items="faculties" label="Факультет" variant="solo" bg-color="#eaeaea" flat
          rounded="lg" density="comfortable" hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="direction" :items="directions" label="Направление" variant="solo" bg-color="#eaeaea" flat
          rounded="lg" density="comfortable" hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn color="primary" size="large" block @click="goToForum">Зайти</v-btn>
      </v-col>
    </v-row>

    <h2 style="font-size: 32px; font-weight: 600;" class="mb-4">Вы недавно посещали</h2>
    <v-row class="mb-8">
      <v-col v-for="program in recentPrograms" :key="program.id" cols="12" sm="6" md="4">
        <ForumProgramCard :program="program" />
      </v-col>
    </v-row>

    <h2 style="font-size: 32px; font-weight: 600;" class="mb-4">Популярно</h2>
    <v-row>
      <v-col v-for="program in popularPrograms" :key="program.id" cols="12" sm="6" md="4">
        <ForumProgramCard :program="program" />
      </v-col>
    </v-row>
  </v-container>
</template>
