<script setup lang="ts">
import { mdiAccount, mdiBatteryLow, mdiPaperclip, mdiSend } from '@mdi/js'
import { forumPrograms } from '~/utils/forum-data'

interface ForumTopic {
  id: string
  label: string
}

interface ForumMessage {
  id: string
  author: string
  time: string
  text: string
}

const route = useRoute()
const program = computed(() => forumPrograms.find(p => p.id === route.params.id) ?? forumPrograms[0])

const topics: ForumTopic[] = [
  { id: '1', label: 'Нагрузка' },
  { id: '2', label: 'Нагрузка' },
  { id: '3', label: 'Нагрузка' },
  { id: '4', label: 'Нагрузка' },
]
const activeTopic = ref(topics[0].id)

const messages = ref<ForumMessage[]>(
  Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    author: 'Иванов Иван',
    time: '13:12 вчера',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  })),
)

const newMessage = ref('')

function sendMessage() {
  if (!newMessage.value.trim())
    return

  messages.value.push({
    id: String(messages.value.length),
    author: 'Иванов Иван',
    time: 'сейчас',
    text: newMessage.value,
  })
  newMessage.value = ''
}
</script>

<template>
  <v-container class="py-6">
    <BackButton />

    <h1 style="font-size: 24px; font-weight: 600;" class="mb-4">
      {{ program.faculty }} {{ program.university }} — {{ program.direction }}
    </h1>

    <v-row>
      <v-col cols="12" md="3">
        <v-card color="#ebf6fb" rounded="xl" class="pa-4">
          <div style="font-size: 18px; font-weight: 600;" class="mb-3">Темы</div>

          <div class="d-flex flex-column" style="gap: 8px;">
            <v-btn
              v-for="topic in topics" :key="topic.id"
              :color="topic.id === activeTopic ? 'primary' : '#dcecf4'"
              variant="flat" rounded="lg" block class="justify-start"
              @click="activeTopic = topic.id"
            >
              <v-icon :icon="mdiBatteryLow" start />
              {{ topic.label }}
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card color="#ebf6fb" rounded="xl" class="pa-4 d-flex flex-column" style="gap: 12px;">
          <div v-for="message in messages" :key="message.id" class="d-flex align-start" style="gap: 12px;">
            <v-avatar color="primary" size="42">
              <v-icon :icon="mdiAccount" />
            </v-avatar>

            <v-sheet color="#dcecf4" rounded="lg" class="pa-3 flex-grow-1">
              <div class="d-flex align-center" style="gap: 8px;">
                <span style="font-size: 14px; font-weight: 500;">{{ message.author }}</span>
                <span style="font-size: 14px;" class="text-medium-emphasis">{{ message.time }}</span>
              </div>
              <div class="mt-1" style="font-size: 16px;">{{ message.text }}</div>
            </v-sheet>
          </div>

          <v-text-field
            v-model="newMessage"
            placeholder="Сообщение"
            variant="solo"
            bg-color="#dcecf4"
            flat
            rounded="lg"
            hide-details
            :prepend-inner-icon="mdiPaperclip"
            :append-inner-icon="mdiSend"
            @click:append-inner="sendMessage"
            @keyup.enter="sendMessage"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
