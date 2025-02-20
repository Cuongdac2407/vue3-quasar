<template>
  <q-page class="q-pa-md column justify-start items-start">
    <div class="q-mb-md">
      <h2>Groq ChatBot</h2>
    </div>
    <div class="row items-center q-mb-md" style="width: 100%">
      <q-input
        filled
        v-model="prompt"
        label="Nhập prompt"
        @keyup.enter="sendPrompt"
        class="col-grow"
      />
      <q-btn label="Gửi đi" color="primary" class="q-ml-sm" @click="sendPrompt" />
    </div>
    <div class="q-mt-md" style="width: 100%">
      <h6>Kết quả AI:</h6>
      <div v-if="aiResponse" class="response-box">
        {{ aiResponse }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const prompt = ref('')
const aiResponse = ref('')

const GROQ_API_KEY = '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'

const endpoint = 'https://api.groq.com/openai/v1/chat/completions'

const sendPrompt = async () => {
  if (!prompt.value.trim()) return

  try {
    const requestBody = {
      model: 'qwen-2.5-32b',
      messages: [{ role: 'user', content: prompt.value }],
      max_tokens: 100,
      temperature: 0.7,
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    }

    const response = await axios.post(endpoint, requestBody, { headers })

    const result =
      response.data.answer ||
      (response.data.choices && response.data.choices[0]?.message?.content) ||
      'Không nhận được phản hồi từ API.'
    aiResponse.value = result
  } catch (error) {
    console.error('Lỗi khi gọi Groq API:', error)
    aiResponse.value = 'Có lỗi xảy ra khi gọi API.'
  }
}
</script>

<style scoped>
.response-box {
  background: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
  min-height: 100px;
  white-space: pre-wrap;
  width: 100%;
}
</style>
