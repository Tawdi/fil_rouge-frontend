<template>
    <div class="flex flex-col overflow-hidden  min-h-screen">
      <main class="flex-1 overflow-y-auto p-6">
        <DashboardHeader
        title="Cinema Admin Dashboard"
        subtitle="Manage your cinema"
         />
        <!-- Stats Cards -->
        <StatsCards :stats="stats" />
        
      </main>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DashboardHeader from '../../components/admin/DashboardHeader.vue'
import StatsCards from '../../components/admin/StatsCards.vue'
import { Chart, registerables } from 'chart.js';
import statsServise from '@/services/statsService';

Chart.register(...registerables);

const stats = ref([]);
const revenueData = ref([]);
const currentMovies = ref([]);
const topMovies = ref([]);
const upcomingSeances = ref([]);

const fetchDashboardData = async () => {
  try {
    const response = await statsServise.cinemaStats();
    const data = response.data;

    stats.value = [
      { name: 'Total Reservations', value: data.reservations_count },
      { name: 'Total Rooms', value: data.rooms_count },
      { name: 'Total Seances', value: data.seances_count},
      { name: 'Total Movies', value: data.movies_count },
    ];

    revenueData.value = data.reservations_trend;
    currentMovies.value = data.current_movies;
    topMovies.value = data.top_movies;
    upcomingSeances.value = data.upcoming_seances;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>