<template>
    <div class=" flex flex-col overflow-hidden">
        <main class="flex-1 overflow-y-auto p-6">
            <DashboardHeader />

            <StatsCards :stats="stats" />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <RevenueChart :revenue-data="revenueData" />
                <TopMovies :movies="topMovies" />
            </div>
        </main>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import DashboardHeader from '../../components/admin/DashboardHeader.vue'
import StatsCards from '../../components/admin/StatsCards.vue'
import RevenueChart from '../../components/admin/RevenueChart.vue'
import TopMovies from '../../components/admin/TopMovies.vue'
import statsServise from '@/services/statsService';

const stats = ref([]);
const revenueData = ref([]);
const topMovies = ref([]);

const loadStats = async () => {
    try {
        const response = await statsServise.adminStats();
        const overview = response.data.stats;
        const movies = response.data.top_movies;
        const cineams = response.data.top_cinemas;

        stats.value = [
            {
                name: 'Total Revenue',
                value: `$${overview.total_revenue}`, 
            },
            {
                name: 'Bookings',
                value: overview.total_reservations,
            },
            {
                name: 'Total Users',
                value: overview.total_users,
            },
            {
                name: 'Total Cinemas',
                value: overview.total_cinemas,
            },
        ];

        revenueData.value = overview.weekly_revenue; 
        topMovies.value = movies;
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
};
onMounted(() => {
    loadStats();
});
</script>