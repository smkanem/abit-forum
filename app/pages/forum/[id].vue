<script setup lang="ts">
import { mdiAccount, mdiBatteryLow, mdiHomeCity, mdiPaperclip, mdiRun, mdiSchool, mdiSend } from '@mdi/js'
import { forumPrograms } from '~/utils/forum-data'

interface ForumTopic {
  id: string
  label: string
  icon: string
}

interface ForumMessage {
  id: string
  author: string
  time: string
  text: string
}

const route = useRoute()
const selection = useForumSelection()

const matchedProgram = forumPrograms.find(p => p.id === route.params.id)
if (matchedProgram) {
  selection.value = {
    university: matchedProgram.university,
    faculty: matchedProgram.faculty,
    direction: matchedProgram.direction,
  }
}

const title = computed(() => `${selection.value.faculty} ${selection.value.university} — ${selection.value.direction}`)

const topics: ForumTopic[] = [
  { id: '1', label: 'Нагрузка', icon: mdiBatteryLow },
  { id: '2', label: 'Общежитие', icon: mdiHomeCity },
  { id: '3', label: 'Физ-ра', icon: mdiRun },
  { id: '4', label: 'Поступление', icon: mdiSchool },
]
const activeTopic = ref(topics[0].id)

const messages = ref<ForumMessage[]>([
  {
    id: '0',
    author: 'Иванов Иван',
    time: '13:12 вчера',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  },
])

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

    <h1 class="forum-title mb-4">{{ title }}</h1>

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
              <v-icon :icon="topic.icon" start />
              {{ topic.label }}
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-card color="#ebf6fb" rounded="xl" class="pa-4 d-flex flex-column chat-window">
          <div class="chat-messages">
            <div v-for="message in messages" :key="message.id" class="d-flex align-start mb-3" style="gap: 12px;">
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
          </div>

          <v-text-field
            v-model="newMessage"
            placeholder="Сообщение"
            variant="solo"
            bg-color="#dcecf4"
            flat
            rounded="lg"
            hide-details
            class="chat-input"
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

<style lang="postcss" scoped>
.forum-title {
  font-size: clamp(1.1rem, 3.5vw, 1.5rem);
  font-weight: 600;
}

.chat-window {
  height: 60vh;
}

.chat-messages {
  flex: 1 1 auto;
  overflow-y: auto;
  margin-bottom: 12px;
}

.chat-input {
  flex: 0 0 auto;
}
</style>
