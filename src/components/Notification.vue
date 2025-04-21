<template>
    <transition-group name="toast" tag="div" class="fixed top-5 right-5 z-50 space-y-2">
  <div
    v-for="notif in notifications"
    :key="notif.id"
    :class="[
      'px-4 py-2 rounded-lg shadow-md text-white',
      notif.type === 'success' ? 'bg-green-500' : 'bg-red-500'
    ]"
  >
    {{ notif.message }}
  </div>
</transition-group>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<script setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>
