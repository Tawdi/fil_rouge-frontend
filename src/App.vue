<template>
  <router-view />
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

onBeforeMount(() => {
  auth.fetchUser();
});
</script>