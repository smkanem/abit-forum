<script setup lang="ts">
const { app: { baseURL } } = useRuntimeConfig()

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} – Форум` : 'Форум'
  },
  link: [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: `${baseURL}logo.svg`,
    },
  ],
})

useSeoMeta({
  description: 'Описание',
  ogTitle: 'Форум',
  ogDescription: 'Описание',
  ogImage: 'https://site.com/og-image.jpg',
  ogUrl: 'https://site.com/',
  ogLocale: 'ru-RU',
  twitterTitle: 'Форум',
  twitterDescription: 'Описание',
  twitterImage: 'https://site.com/og-image.jpg',
  twitterCard: 'summary',
  applicationName: 'Форум',
})
</script>

<template>
  <v-app>
    <NuxtLayout />
  </v-app>
</template>
