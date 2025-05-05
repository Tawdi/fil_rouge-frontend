<template>
  <section class="container  text-white min-h-screen">
    <!-- Cinema Header / Banner -->
    <div class="relative w-full h-[400px] md:h-[500px] lg:h-[800px]">
      <img :src="storageUrl+cinema.image" :alt="cinema.name" class="w-full h-full object-cover opacity-60" />
      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center">
        <h1 class="text-3xl md:text-5xl font-bold">{{ cinema.name }}</h1>
        <p class="text-sm md:text-base text-gray-300 mt-2">{{ cinema.address }}</p>
      </div>
    </div>

    <!-- Now Showing -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6">Now Showing</h2>

      <div v-if="cinema.movies && cinema.movies.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="movie in cinema.movies" :key="movie.id" class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg">
          <MovieCard
              :title="movie.titre"
              :image="movie.poster"
              :id="movie.id"
              :duration="movie.duration"
              :rating="movie.rating"
              :genre="movie.genre?.name"
              :release-date="movie.release_date"
            />
        </div>
      </div>

      <div v-else class="text-gray-400 text-center mt-10">
        No movies currently showing at this cinema.
      </div>
    </div>
  </section>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import MovieCard from '../components/MovieCard.vue';
import cinemaService from '@/services/cinemaService'
import { useNotificationStore } from "@/stores/notificationStore";
const storageUrl = import.meta.env.VITE_STORAGE_URL;
const notificationStore = useNotificationStore();
import { onMounted, ref } from 'vue';

const selectedCinemaId =ref(null);
const router = useRouter();
const route = useRoute();
const cinema = ref({});
function goToMovie(id) {
  router.push(`/movie/${id}`)
}
const fetchData = async ()=>{
  try {
    const response = await cinemaService.getCinema(selectedCinemaId.value)
    cinema.value = response.data;
  } catch (error) {
    notificationStore.pushNotification({
      message: "Erreur fetching data for this cinema.",
      type: "error",
    });
  }
}
onMounted(async ()=>{
  selectedCinemaId.value = route.params.id ;
  await fetchData();
});
</script>