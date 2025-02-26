<template>
  <div class="audio-container">
    <img src="/data/aaaa.jpg" alt="Hai người đang nói" class="aaa-image" />

    <audio ref="audioRef" controls @timeupdate="syncHighlight">
      <source src="/data/jameslan.ogg" type="audio/ogg" />
      Trình duyệt của bạn không hỗ trợ phát audio.
    </audio>

    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercent + '%' }"></div>
    </div>

    <!-- Sử dụng v-html để render câu với các thẻ span -->
    <p v-if="displaySentence" v-html="displaySentence"></p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

const audioRef = ref(null)
const transcript = ref([])
const currentWordIndex = ref(-1)
const displaySentence = ref('')
const offsetDelay = 800

let updateTimeout = null // Biến lưu timeout để debounce

// Hàm load transcript từ JSON
const loadTranscript = async () => {
  try {
    const response = await axios.get('/data/jameslan.json')
    const data = response.data
    transcript.value = data.timestamp.map(([start, duration, text]) => ({
      start: start + offsetDelay,
      end: start + duration + offsetDelay,
      text,
    }))
  } catch (error) {
    console.error('Lỗi tải transcript:', error)
  }
}

// Hàm kiểm tra ký tự kết thúc câu
const isPunctuation = (char) => {
  return ['.', '!', '?', '…'].includes(char)
}

// Hàm cập nhật câu hiển thị với từ hiện tại được bọc trong span có class "highlight"
const updateDisplayedSentence = (index) => {
  const words = transcript.value
  if (!words.length) return

  let startIndex = index
  while (startIndex > 0 && !isPunctuation(words[startIndex - 1].text)) {
    startIndex--
  }
  let endIndex = index
  while (endIndex < words.length - 1 && !isPunctuation(words[endIndex].text)) {
    endIndex++
  }

  const sentenceArr = []
  for (let i = startIndex; i <= endIndex; i++) {
    let word = words[i].text
    if (i === index) {
      // Bọc từ hiện tại trong span highlight
      word = `<span class="highlight">${word}</span>`
    }
    sentenceArr.push(word)
  }
  displaySentence.value = sentenceArr.join(' ')
}

// Hàm đồng bộ chỉ số từ hiện tại dựa trên thời gian audio, sử dụng debounce 200ms
const syncHighlight = () => {
  if (!audioRef.value) return
  const currentTime = audioRef.value.currentTime * 1000 // ms
  const newIndex = transcript.value.findIndex(
    (word) => currentTime >= word.start && currentTime <= word.end,
  )
  if (newIndex === -1) return

  if (newIndex !== currentWordIndex.value) {
    if (updateTimeout) clearTimeout(updateTimeout)
    updateTimeout = setTimeout(() => {
      currentWordIndex.value = newIndex
      updateDisplayedSentence(newIndex)
      updateTimeout = null
    }, 200)
  }
}

// Tính phần trăm tiến trình của audio
const progressPercent = computed(() => {
  if (!audioRef.value || !audioRef.value.duration) return 0
  return (audioRef.value.currentTime / audioRef.value.duration) * 100
})

// Các phím tắt: p: pause/resume, s: stop, q: quit
function handleKeyDown(event) {
  if (!audioRef.value) return
  const key = event.key.toLowerCase()
  if (key === 'p') {
    if (audioRef.value.paused) {
      audioRef.value.play()
      console.log('Resumed audio')
    } else {
      audioRef.value.pause()
      console.log('Paused audio')
    }
  } else if (key === 's') {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
    console.log('Stopped audio')
  } else if (key === 'q') {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
    displaySentence.value = ''
    console.log('Quit audio')
  }
}

onMounted(() => {
  loadTranscript()
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.audio-container {
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  max-width: 800px;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.aaa-image {
  width: 100%;
  max-width: 400px;
  height: 200px;
  margin: 0 auto 20px;
  display: block;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

audio {
  width: 100%;
  margin-bottom: 20px;
}

.progress-bar {
  width: 100%;
  height: 5px;
  background: #ddd;
  border-radius: 3px;
  margin-bottom: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4caf50;
  transition: width 0.1s linear;
}

p {
  font-size: 26px;
  font-family: Arial, sans-serif;
  margin: 20px;
  line-height: 1.6;
  color: #333;
}

/* Dùng deep selector để áp dụng style cho .highlight trong nội dung render qua v-html */
:deep(.highlight) {
  background-color: yellow;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
