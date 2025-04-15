<template>
    <div class=" flex flex-col overflow-hidden">
        <main class="flex-1 overflow-y-auto p-6">
            <DashboardHeader />

            <StatsCards :stats="stats" />
        </main>
    </div>

</template>

<script setup>
import DashboardHeader from '../../components/admin/DashboardHeader.vue'
import StatsCards from '../../components/admin/StatsCards.vue'


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

</script>

<style></style>