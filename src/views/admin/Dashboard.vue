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
import DashboardHeader from '../../components/admin/DashboardHeader.vue'
import StatsCards from '../../components/admin/StatsCards.vue'
import RevenueChart from '../../components/admin/RevenueChart.vue'
import TopMovies from '../../components/admin/TopMovies.vue'


const stats = [
    {
        name: 'Total Revenue',
        value: '$24,567',
    },
    {
        name: 'Bookings',
        value: '1,234',
    },
    {
        name: 'Active Users',
        value: '5,678',
    },

];

const revenueData = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 30 },
  { label: 'Wed', value: 60 },
  { label: 'Thu', value: 40 },
  { label: 'Fri', value: 70 },
  { label: 'Sat', value: 90 },
  { label: 'Sun', value: 80 }
];

const topMovies = [
  {
    title: 'Avengers: Endgame',
    image: 'https://via.placeholder.com/100x150/333333/ffffff?text=Avengers',
    bookings: 1245,
    occupancy: 92
  },
  {
    title: 'The Batman',
    image: 'https://via.placeholder.com/100x150/333333/ffffff?text=Batman',
    bookings: 987,
    occupancy: 85
  },
  {
    title: 'Dune',
    image: 'https://via.placeholder.com/100x150/333333/ffffff?text=Dune',
    bookings: 876,
    occupancy: 78
  },
  {
    title: 'No Time to Die',
    image: 'https://via.placeholder.com/100x150/333333/ffffff?text=Bond',
    bookings: 765,
    occupancy: 70
  }
];

</script>

<style></style>