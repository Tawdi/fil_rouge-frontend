<template>
  <router-view />
  <Notification />
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Notification from '@/components/Notification.vue';
const auth = useAuthStore();

onBeforeMount(() => {
  auth.fetchUser();
});
</script>