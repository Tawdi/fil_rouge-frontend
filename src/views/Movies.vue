<template>
    <div class=""></div>
    <section class="container  relative w-full h-screen overflow-hidden mb-10">
    <!-- Slides -->
    <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        v-show="currentSlide === index"
        class="w-full h-full object-cover  transition-all duration-700 ease-in-out"
        >
        <img
      :src="slide.poster"
      :alt="slide.titre"
      class="w-full h-full object-cover "
      />
      <!-- Overlay Content -->
      <div class="absolute  inset-0 bg-gradient-to-b to-[#141414] via-[#14141414] from-[#0000]"></div>
      <div class="absolute bottom-28 left-0 right-0  text-center flex justify-center items-center ">
          <div class="text-white max-w-xl">
              <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ slide.titre }}</h1>
              <p class="text-sm md:text-base mb-6 text-gray-200">{{ slide.description }}</p>
              <button @click="goToMovie(slide.id)" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold">
                  Book Now
                </button>
            </div>
        </div>
    </div>
    
<!-- Bottom Navigation Controls -->
<div class="absolute bottom-6 right-0 flex items-center justify-between w-full gap-4 px-10 z-10">
    
    <button @click="prevSlide" class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <!-- Dots -->
        <div class="flex gap-2 ">
            <span
            v-for="(dot, i) in slides"
            :key="i"
            @click="goToSlide(i)"
            class=" h-1 rounded-md cursor-pointer transition-all duration-300"
            :class="currentSlide === i ? 'bg-red-600 scale-110 w-4' : 'bg-white/50 w-2.5'"
            ></span>
        </div>
        
        <button @click="nextSlide" class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </button>
        
</div>
</section>
<section class="container h-10" ></section>
<section class=" container rounded-2xl border-2 border-[#333333]">
  <GenreSlide :categories="categories" title="Our Categories" subtitle=""></GenreSlide>
  <MoviesSlide :movies="movies" title="Trending Now"></MoviesSlide>
</section>
<section class="bg-[#141414] text-white py-10 px-4 md:px-10">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold mb-8">Search </h2>
    <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a movie..."
        class="w-full md:w-1/2 px-4 py-2 rounded-md bg-[#1f1f1f] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-red-600"
      />


      <select
        v-model="selectedCategory"
        class="w-full md:w-1/4 px-4 py-2 rounded-md bg-[#1f1f1f] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="flex  flex-wrap ">
      <div
            v-for="movie in filteredMovies"
            :key="movie.id"
            class="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
          >
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
  </div>
</section>

</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import movieService from "@/services/movieService";
import genreService from "@/services/genreService";
import GenreSlide from '../components/GenreSlide.vue';
import MoviesSlide from '../components/MoviesSlide.vue';
import MovieCard from '../components/MovieCard.vue';
import { useNotificationStore } from "@/stores/notificationStore";
const slides = ref([])
const currentSlide = ref(0)
const categories =ref( []);
const movies = ref([]);
const notificationStore = useNotificationStore();
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }
  
  const prevSlide = () => {
    currentSlide.value =
      (currentSlide.value - 1 + slides.value.length) % slides.value.length
  }
  
  const goToSlide = (index) => {
    currentSlide.value = index
  }
  
  const fetchData =async ()=>{
    try {
      const response = await movieService.getMoviesInCinema();
    const response2 = await genreService.getGenresImg();

    slides.value = response.data 
    movies.value = response.data
    categories.value =response2.data

    } catch (error) {
       notificationStore.pushNotification({
          message: "Erreur fetching data.",
          type: "error",
        });
    }
  }

  let autoSlideInterval

  onMounted(async () => {
    await fetchData();
    autoSlideInterval = setInterval(nextSlide, 5000)
  })
  
  const router = useRouter();
  const goToMovie = (id)=>{
    router.push(`movie/${id}`)
  }



  onBeforeUnmount(() => {
    clearInterval(autoSlideInterval)
  })
const searchQuery = ref('')
const selectedCategory = ref('')

const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const matchesCategory =
      selectedCategory.value === '' || movie.genre?.name.toLowerCase() === selectedCategory.value.toLowerCase()
    const matchesSearch = movie.titre
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})
  </script>
