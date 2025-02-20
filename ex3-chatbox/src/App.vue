<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>AI ChatBot</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Left Pane: Lịch sử hỏi đáp -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <div class="q-pa-sm">
        <h6>Lịch sử hỏi đáp</h6>
        <q-list>
          <q-item
            v-for="(item, index) in history"
            :key="index"
            clickable
            @click="loadConversation(item)"
          >
            <q-item-section> {{ item.timestamp }} - {{ item.title }} </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <!-- Right Pane -->
    <q-page-container>
      <!-- Lắng nghe sự kiện lưu lịch sử từ ChatPage -->
      <router-view @save-history="handleSaveHistory" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
const leftDrawerOpen = ref(true)
const history = ref([])

function handleSaveHistory(item) {
  history.value.unshift(item)
}

function loadConversation(item) {
  console.log('Load conversation:', item)
}
</script>
