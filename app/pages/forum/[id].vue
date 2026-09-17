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
  { id: 'workload', label: 'Нагрузка', icon: mdiBatteryLow },
  { id: 'dorm', label: 'Общежитие', icon: mdiHomeCity },
  { id: 'pe', label: 'Физ-ра', icon: mdiRun },
  { id: 'admission', label: 'Поступление', icon: mdiSchool },
]
const activeTopic = ref(topics[0].id)

const messagesByTopic = reactive<Record<string, ForumMessage[]>>({
  workload: [
    {
      id: '0',
      author: 'Иванов Иван',
      time: '13:12 вчера',
      text: 'На первом курсе нагрузка ощутимая — почти каждый день пары до вечера плюс домашки по матану и программированию. Ко второму курсу привыкаешь, становится полегче.',
    },
  ],
  dorm: [
    {
      id: '0',
      author: 'Иванов Иван',
      time: 'вчера',
      text: 'Общежитие в 15 минутах от корпусов, живём по 2-3 человека в комнате. На этаже есть кухня, но лучше сразу брать свою посуду и чайник.',
    },
  ],
  pe: [
    {
      id: '0',
      author: 'Иванов Иван',
      time: '2 дня назад',
      text: 'Физра два раза в неделю, можно выбрать секцию — я хожу на плавание. Нормативы ГТО никто не заставляет сдавать, если что.',
    },
  ],
  admission: [
    {
      id: '0',
      author: 'Иванов Иван',
      time: '3 дня назад',
      text: 'Я подавал документы через Госуслуги — сильно упростило жизнь. Из советов: следите за приказами о зачислении, они выходят волнами.',
    },
  ],
})

const messages = computed(() => messagesByTopic[activeTopic.value] ?? [])

const newMessage = ref('')

function sendMessage() {
  if (!newMessage.value.trim())
    return

  messagesByTopic[activeTopic.value].push({
    id: String(messagesByTopic[activeTopic.value].length),
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
