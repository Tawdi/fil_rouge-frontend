<template>
  <section class=" text-white min-h-screen">
    <!-- Cinema Header / Banner -->
    <div class="relative w-full h-64 md:h-96">
      <img :src="cinema.image" :alt="cinema.name" class="w-full h-full object-cover opacity-60" />
      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center">
        <h1 class="text-3xl md:text-5xl font-bold">{{ cinema.name }}</h1>
        <p class="text-sm md:text-base text-gray-300 mt-2">{{ cinema.location }}</p>
      </div>
    </div>

    <!-- Now Showing -->
    <div class="max-w-6xl mx-auto px-4 py-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6">Now Showing</h2>

      <div v-if="cinema.movies && cinema.movies.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="movie in cinema.movies" :key="movie.id" class="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg">
          <MovieCard
              :title="movie.title"
              :image="movie.image"
              :id="movie.id"
              :duration="movie.duration"
              :rating="movie.rating"
              :genre="movie.genre"
              :release-date="movie.releaseDate"
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
import MovieCard from '../components/MovieCard.vue';


const router = useRouter();
const cinema = {
  id: 1,
  name: 'Cinema One',
  location: 'Downtown City',
  image: '/images/support.webp',
  movies: [
    { id: 4, title: "ADIPURUSH", image: "https://picsum.photos/400/600?random=4", duration: "1h 45min", rating: 3, genre: "drama", releaseDate: "18 Mar 2024" },
    { id: 5, title: "INCEPTION", image: "https://picsum.photos/400/600?random=5", duration: "2h 28min", rating: 5, genre: "sci-fi", releaseDate: "20 Mar 2024" },
    { id: 6, title: "THE BATMAN", image: "https://picsum.photos/400/600?random=6", duration: "2h 56min", rating: 4, genre: "action", releaseDate: "22 Mar 2024" },

  ]
}
function goToMovie(id) {
  router.push(`/movie/${id}`)
}

</script>