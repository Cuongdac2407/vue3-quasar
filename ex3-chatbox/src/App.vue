<template>
  <q-layout view="hHh lpR fFf">
    <!-- Navbar (Header) -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Nút Menu để mở Drawer -->
        <q-btn flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title> Groq ChatBot </q-toolbar-title>

        <q-btn flat label="Home" class="q-ml-md" />
        <q-btn flat label="About" class="q-ml-sm" />
        <q-btn flat label="Contact" class="q-ml-sm" />

        <q-space />

        <!-- Nút Search (có thể đã có) -->
        <q-btn flat round icon="search" @click="toggleSearchInput" />

        <!-- Avatar có QMenu khi click -->
        <q-avatar size="32px" class="q-ml-sm" style="cursor: pointer" @click="menu = true">
          <img src="https://cdn.quasar.dev/img/avatar.png" alt="User" />
          <q-menu v-model="menu" anchor="bottom right" self="top right">
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup @click="onProfile">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onSettings">
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Settings</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <!-- Left Pane (Drawer): Lịch sử hỏi đáp -->
    <q-drawer v-model="leftDrawerOpen" side="left" bordered class="bg-grey-2">
      <div class="q-pa-md">
        <h6 class="text-h6">Lịch sử hỏi đáp</h6>
        <q-list>
          <q-item
            v-for="(item, index) in history"
            :key="index"
            clickable
            @click="loadConversation(item)"
          >
            <q-item-section>
              <div class="text-subtitle2">{{ item.title }}</div>
              <div class="text-caption">{{ item.timestamp }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <!-- Right Pane -->
    <q-page-container>
      <router-view @save-history="handleSaveHistory" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const menu = ref(false)
const history = ref([])

function toggleSearchInput() {
  // Hàm mở input tìm kiếm (nếu cần)
}

function onProfile() {
  console.log('Profile clicked')
  // Logic mở trang Profile
}

function onSettings() {
  console.log('Settings clicked')
  // Logic mở trang Settings
}

function onLogout() {
  console.log('Logout clicked')
  // Logic thực hiện Logout
}

function handleSaveHistory(item) {
  history.value.unshift(item)
}

function loadConversation(item) {
  console.log('Load conversation:', item)
  // Logic load lại hội thoại cũ (có thể sử dụng store hoặc chuyển hướng)
}
</script>

<style scoped>
/* Tùy chỉnh thêm style nếu cần */
</style>
