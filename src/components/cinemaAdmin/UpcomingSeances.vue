<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
      <h2 class="text-xl font-semibold text-white mb-4">Upcoming Seances</h2>
      <div v-for="seance in seances" :key="seance.id" class="py-2 border-b border-[#333333] last:border-0">
        <p class="text-white">{{ seance.movie.titre }}</p>
        <p class="text-[#999999] text-sm">{{ formatDateTime(seance.start_time) }} • Room {{ seance.room.name }}</p>
      </div>
    </div>
</template>

<script setup>
const props = defineProps({
    seances: Array
})

const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    });
};
</script>
  