<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section class="container mx-auto mt-4 px-4">
      <div class="relative rounded-xl overflow-hidden lg:h-[600px] ">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30">
          <div  class="w-full h-full bg-cover bg-center opacity-50"
          :style="{ backgroundImage: `url(${movie.background})` }"></div>
        </div>

        <!-- Content Overlay -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center h-full justify-center  sm:px-16 py-8 backdrop-blur-sm">
          <!-- Movie Poster -->
          <div class="w-64 h-96 col-start-1  sm:col-end-6 lg:col-end-4 rounded-xl overflow-hidden bg-gray-800 justify-self-center">
            <img :src="movie.poster" alt="Kantara movie poster" class="w-full h-full object-cover" />
          </div>

          <!-- Movie Info -->
          <div class="ml-8 max-w-md lg:col-start-4 sm:col-start-6 sm:col-end-12 lg:col-end-9 justify-self-center ">
            <h1 class="text-4xl font-bold mb-1">{{ movie.title }}</h1>
            <p class="text-sm mb-2">Release date: {{movie.releaseDate}}</p>

            <p class="text-sm text-gray-300 mb-4">
              with {{ movie.actors }}
            </p>

            <p class="text-sm">
              {{ movie.desc }}
            </p>
          </div>

          <!-- Play Button -->
          <div class=" mt-10 lg:col-start-9 lg:col-end-12 sm:col-span-full justify-self-center">
            <button class="w-16 h-16 bg-white/20 hover:bg-red-600/30 backdrop-blur-sm rounded-md flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M55.0007 38.7363C55.0006 39.8317 54.4257 40.8467 53.4863 41.4101L31.0565 54.8639C28.3902 56.4632 24.9986 54.5423 24.999 51.4332L25.002 28.8289C25.0024 25.89 28.0661 23.9549 30.7201 25.2173L53.2217 35.9198C54.3085 36.4368 55.0009 37.5329 55.0007 38.7363Z" fill="#D9D9D9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const movie = ref({
  id : 1,
  title: "kantara",
  releaseDate: "22 jan 2025",
  poster: "/images/support.webp",
  actors: "Mark Wahlberg, Monib Abhat, Michelle Dockery, Topher Grace, by Mel Gibson",
  background: "/images/support.webp",
  genre: "action",
  desc :" A fiery young man clashes with an unflinching forest officer in a south Indian village where spirituality, fate and folklore rule the lands.",
})

</script>

<style>
</style>