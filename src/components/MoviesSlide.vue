<template>
    <section class="py-16 container mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">{{ title }}</h2>
  
        <div class="flex items-center gap-2">
          <button
            @click="prevSlide"
            class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-left">
            <path d="m15 18-6-6 6-6" />
          </svg>
          </button>
  
          <div class="w-24 h-1 bg-[#333333] rounded-full overflow-hidden relative">
            <div
              class="absolute top-0 left-0 h-full bg-[#e50000] transition-all duration-300"
              :style="{
                width: `${100 / totalSlides}%`,
                marginLeft: `${(100 / totalSlides) * currentSlide}%`
              }"
            ></div>
          </div>
  
          <button
            @click="nextSlide"
            class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-chevron-right">
            <path d="m9 18 6-6-6-6" />
          </svg>
          </button>
        </div>
      </div>
  
      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
          >
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
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import MovieCard from './MovieCard.vue';
  
  const props = defineProps({
    movies: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Currently in the cinema'
    }
  });
  
  const itemsPerPage = ref(4);
  const currentSlide = ref(0);
  
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) itemsPerPage.value = 1;
    else if (width < 1024) itemsPerPage.value = 2;
    else itemsPerPage.value = 4;
  };
  
  const totalSlides = computed(() =>
    Math.ceil(props.movies.length / itemsPerPage.value)
  );
  
  const nextSlide = () => {
    if (currentSlide.value < totalSlides.value - 1) currentSlide.value++;
  };
  
  const prevSlide = () => {
    if (currentSlide.value > 0) currentSlide.value--;
  };
  
  onMounted(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
  });
  </script>
  