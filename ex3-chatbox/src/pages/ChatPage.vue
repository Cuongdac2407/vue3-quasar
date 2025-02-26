<template>
  <q-page class="q-pa-md column chat-page">
    <!-- Thanh điều khiển trên cùng -->
    <div class="row items-center q-mb-md justify-between">
      <div class="text-h5">Hội thoại</div>
      <div class="row items-center">
        <q-checkbox v-model="showThink" label="Show Think" class="q-mr-md" />
        <q-btn label="New Chat" color="secondary" @click="newChat" />
      </div>
    </div>

    <!-- Khu vực hiển thị hội thoại -->
    <div class="chat-container q-mb-md">
      <q-card v-for="(msg, idx) in conversation" :key="idx" class="q-mb-sm">
        <q-card-section>
          <div class="text-subtitle2">{{ msg.role === 'user' ? 'Bạn' : 'AI' }}</div>
          <div v-html="renderContent(msg.content)" />
        </q-card-section>
      </q-card>
    </div>

    <!-- Ô nhập prompt và nút gửi -->
    <div class="prompt-box">
      <q-input v-model="prompt" label="Nhập prompt" filled @keyup.enter="sendPrompt" class="col" />
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
// Nếu cần render công thức toán học, bạn có thể cài và import katex và plugin tương ứng

// Biến lưu hội thoại hiện tại
const conversation = ref([])
// Biến lưu nội dung nhập từ người dùng
const prompt = ref('')
// Biến để bật/tắt hiển thị "suy nghĩ" của AI
const showThink = ref(false)

// Cấu hình API Key và endpoint (đảm bảo tài khoản đã kích hoạt Chat API)
const GROQ_API_KEY = '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'
const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
// Cấu hình marked để parse Markdown và highlight code
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
})

// Hàm render nội dung tin nhắn
function renderContent(content) {
  let text = content
  if (!showThink.value) {
    // Loại bỏ đoạn "suy nghĩ" nếu có, ví dụ: "###THINK ... ###ENDTHINK"
    text = text.replace(/###THINK([\s\S]*?)###ENDTHINK/g, '')
  }
  return marked.parse(text)
}

// Hàm gửi prompt đến API và cập nhật hội thoại
async function sendPrompt() {
  if (!prompt.value.trim()) return

  // Thêm tin nhắn của người dùng
  conversation.value.push({ role: 'user', content: prompt.value })

  try {
    const payload = {
      model: 'qwen-2.5-32b', // Thay đổi theo quyền và tài liệu
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

  // Auto scroll xuống cuối khung chat
  nextTick(() => {
    const container = document.querySelector('.chat-container')
    if (container) container.scrollTop = container.scrollHeight
  })
}

// Hàm "New Chat": lưu phiên chat hiện tại và reset hội thoại (Bước 7)
function newChat() {
  if (conversation.value.length > 0) {
    const now = new Date()
    const historyItem = {
      timestamp: now.toLocaleString(),
      title: 'Chat ' + now.getTime(),
      conversation: JSON.parse(JSON.stringify(conversation.value)),
    }
    // Phát ra sự kiện lưu lịch sử cho App.vue (bạn cần cấu hình emit ở App.vue)
    emit('save-history', historyItem)
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
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 16px;
}
.prompt-box {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
