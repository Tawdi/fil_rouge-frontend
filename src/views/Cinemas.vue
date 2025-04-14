<template>
    <div class="py-16"></div>
    <section class=" container text-white  px-4 md:px-10 min-h-screen">
        <div class="max-w-6xl mx-auto">
            <!-- Page Title -->
            <div class="text-center mb-10">
                <h1 class="text-3xl md:text-4xl font-bold">Our Cinemas</h1>
                <p class="text-gray-400 mt-2">Explore all available cinemas</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div v-for="cinema in cinemas" :key="cinema.id"
                    class="bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden  duration-300">
                    <img :src="cinema.image" :alt="cinema.name" class="w-full h-40 object-cover" />
                    <div class="p-4">
                        <h2 class="text-lg font-semibold mb-1">{{ cinema.name }}</h2>
                        <p class="text-sm text-gray-400">{{ cinema.location }}</p>
                        <button @click="goToCinema(cinema.id)"
                            class="mt-4 bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-md">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();
const cinemas = [
    {
        id: 1,
        name: 'Cinema One',
        location: 'Downtown City',
        image: '/images/support.webp'
    },
    {
        id: 2,
        name: 'Galaxy Cinemas',
        location: 'Uptown Center',
        image: '/images/support.webp'
    },
]

function goToCinema(id) {
   router.push(`/cinema/${id}`);
}

</script>
