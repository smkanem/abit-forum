<script setup lang="ts">
import { forumPrograms } from '~/utils/forum-data'

const catalog = useUniversityCatalog()
const selection = useForumSelection()

const selectedUniversity = ref<string | null>(null)
const selectedFaculty = ref<string | null>(null)
const selectedDirection = ref<string | null>(null)

const universityItems = computed(() => catalog.value.map(u => u.name))

const facultyItems = computed(() => {
  const university = catalog.value.find(u => u.name === selectedUniversity.value)
  return university ? university.faculties.map(f => f.name) : []
})

const directionItems = computed(() => {
  const university = catalog.value.find(u => u.name === selectedUniversity.value)
  const faculty = university?.faculties.find(f => f.name === selectedFaculty.value)
  return faculty ? faculty.directions : []
})

watch(selectedUniversity, () => {
  selectedFaculty.value = null
  selectedDirection.value = null
})

watch(selectedFaculty, () => {
  selectedDirection.value = null
})

const canSubmit = computed(() => !!selectedUniversity.value && !!selectedFaculty.value && !!selectedDirection.value)

function goToForum() {
  if (!canSubmit.value)
    return

  selection.value = {
    university: selectedUniversity.value!,
    faculty: selectedFaculty.value!,
    direction: selectedDirection.value!,
  }
  navigateTo('/forum/search')
}

const recentPrograms = forumPrograms.slice(0, 3)
const popularPrograms = forumPrograms.slice(3, 6)
</script>

<template>
  <v-container class="py-8">
    <h1 class="text-center forum-heading" style="max-width: 700px; margin-inline: auto;">
      Узнай любую мелочь прямо от студентов
    </h1>

    <v-row class="mb-8 mt-4">
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="selectedUniversity" :items="universityItems" label="ВУЗ" variant="solo" bg-color="#eaeaea"
          flat rounded="lg" density="comfortable" hide-details
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="selectedFaculty" :items="facultyItems" label="Факультет" variant="solo" bg-color="#eaeaea"
          flat rounded="lg" density="comfortable" hide-details :disabled="!selectedUniversity"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="selectedDirection" :items="directionItems" label="Направление" variant="solo" bg-color="#eaeaea"
          flat rounded="lg" density="comfortable" hide-details :disabled="!selectedFaculty"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn color="primary" size="large" block :disabled="!canSubmit" @click="goToForum">Зайти</v-btn>
      </v-col>
    </v-row>

    <h2 class="text-center forum-heading mb-4">Вы недавно посещали</h2>
    <v-row class="mb-8">
      <v-col v-for="program in recentPrograms" :key="program.id" cols="12" sm="6" md="4">
        <ForumProgramCard :program="program" />
      </v-col>
    </v-row>

    <h2 class="text-center forum-heading mb-4">Популярно</h2>
    <v-row>
      <v-col v-for="program in popularPrograms" :key="program.id" cols="12" sm="6" md="4">
        <ForumProgramCard :program="program" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="postcss" scoped>
.forum-heading {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
}
</style>
