<template>
  <transition-group
    name="toast"
    tag="div"
    class="fixed bottom-6 right-6 z-[200] space-y-3 max-w-[90%] sm:max-w-md"
  >
    <div
      v-for="notif in notifications"
      :key="notif.id"
      :class="[
        'relative flex items-center gap-3 p-4 rounded-md shadow-lg text-white',
        'backdrop-blur-md bg-opacity-90 overflow-hidden',
        notif.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"
    >

      <svg
        v-if="notif.type === 'success'"
        class="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span class="flex-1 text-sm font-medium">{{ notif.message }}</span>

      <button
        @click="notificationStore.removeNotification(notif.id)"
        class="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        class="absolute bottom-1 left-1 h-1 bg-white/90 "
        :style="{ width: notif.progress + '%' }"
      ></div>
    </div>
</transition-group>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<script setup>
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);

notifications.value.forEach((notif) => {
  if (!notif.progress) notif.progress = 100;
  const interval = setInterval(() => {
    notif.progress -= 100 / (5 * 60); 
    if (notif.progress <= 0) {
      notificationStore.removeNotification(notif.id);
      clearInterval(interval);
    }
  }, 1000 / 60);
});
</script>
