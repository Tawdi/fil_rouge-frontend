<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
        <h2 class="text-xl font-semibold text-white mb-4">Reservations Trend</h2>
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
    data: Array // { date, count }
})

const chartRef = ref(null)
let chartInstance = null

const renderChart = () => {
    if (chartInstance) chartInstance.destroy()

    chartInstance = new Chart(chartRef.value, {
    type: 'line',
    data: {
        labels: props.data.map(item => item.date),
        datasets: [{
        label: 'Reservations',
        data: props.data.map(item => item.count),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
        fill: true,
        }],
    },
    options: {
        responsive: true,
        plugins: {
        legend: { display: false },
        },
        scales: {
        y: {
            beginAtZero: true,
            grid: { color: '#333333' },
            ticks: { color: '#999999' },
        },
        x: {
            grid: { display: false },
            ticks: { color: '#999999' },
        },
        },
    }
    })
}

onMounted(() => {
    if (props.data?.length) renderChart()
})

watch(() => props.data, () => {
    if (props.data?.length) renderChart()
}, { deep: true })
</script>
