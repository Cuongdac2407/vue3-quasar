<template>
  <q-page class="q-pa-md column justify-start items-start chat-page">

    <div class="row items-center q-mb-md">
      <q-checkbox v-model="showThink" label="Show Think" />
      <q-btn label="New Chat" color="secondary" class="q-ml-md" @click="newChat" />
    </div>


    <div class="chat-container">
      <div v-for="(msg, idx) in conversation" :key="idx" class="q-mb-md">
        <div class="q-mb-xs">
          <strong>{{ msg.role === 'user' ? 'Bạn' : 'AI' }}</strong>
        </div>
        <div v-html="renderContent(msg.content)" />
      </div>
    </div>


    <div class="q-mt-md prompt-box">
      <q-input v-model="prompt" label="Nhập prompt" filled @keyup.enter="sendPrompt" />
      <q-btn label="Gửi" color="primary" class="q-ml-sm" @click="sendPrompt" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const conversation = ref([])
const prompt = ref('')
const showThink = ref(false) //


marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
})

function renderContent(content) {
  let text = content
  if (!showThink.value) {

    text = text.replace(/###THINK([\s\S]*?)###ENDTHINK/g, '')
  }
  return marked.parse(text)
}


const GROQ_API_KEY = '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'
const endpoint = 'https://api.groq.com/openai/v1/chat/completions'


async function sendPrompt() {
  if (!prompt.value.trim()) return


  conversation.value.push({ role: 'user', content: prompt.value })

  try {
    const payload = {
      model: 'qwen-2.5-32b',
      messages: conversation.value.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      max_tokens: 1000,
      temperature: 0.7,
    }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    }
    const res = await axios.post(endpoint, payload, { headers })
    console.log('Response data:', res.data)
    let aiContent = ''
    if (
      res.data.choices &&
      res.data.choices.length > 0 &&
      res.data.choices[0].message &&
      res.data.choices[0].message.content
    ) {
      aiContent = res.data.choices[0].message.content
    } else if (res.data.answer) {
      aiContent = res.data.answer
    } else {
      aiContent = 'Không nhận được phản hồi từ API.'
    }
    conversation.value.push({ role: 'assistant', content: aiContent })
  } catch (err) {
    console.error('Lỗi khi gọi API:', err)
    conversation.value.push({ role: 'assistant', content: 'Lỗi: ' + err.message })
  }
  prompt.value = ''


  nextTick(() => {
    const container = document.querySelector('.chat-container')
    if (container) container.scrollTop = container.scrollHeight
  })
}


function newChat() {
  if (conversation.value.length > 0) {
    const now = new Date()
    const item = {
      timestamp: now.toLocaleString(),
      title: 'Chat ' + now.getTime(),
      conversation: JSON.parse(JSON.stringify(conversation.value)),
    }
    
    emit('save-history', item)
  }
  conversation.value = []
}
const emit = defineEmits(['save-history'])
</script>

<style scoped>
.chat-container {
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 16px;
}
.prompt-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
</style>
