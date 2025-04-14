<template>
  <!-- hero section  -->
  <section class="relative h-screen">
    <!-- Single background image -->
    <div class="absolute inset-0 z-0">
      <img src="/images/home.png" alt="Movie posters background" class="w-full h-full object-cover opacity-90" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#141414]"></div>

    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Book Your Movie Experience in Seconds!</h1>
      <p class="text-[#999999] text-lg mb-8 max-w-2xl">
        Find your favorite movies, pick your seats, and enjoy the show.
      </p>
      <button
       @click="goToPage('/movies')"
        class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-3 px-8 rounded-md flex items-center gap-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
          <path fill-rule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clip-rule="evenodd" />
        </svg>
        <span>Book Now</span>
      </button>
    </div>
  </section>
  <!-- currently in cinema -->
  <MoviesSlide :movies="movies" title="Currently in the cinema" />
      <!-- Categories Section -->
  <section class="max-w-7xl mx-auto px-4 py-20">
      <GenreSlide :categories="categories"></GenreSlide>
      <FAQ> 
        <button 
        @click="goToPage('/support')"
        class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-3 px-8 rounded-md flex items-center gap-2 transition-colors">
         Ask a Question
       </button>
      </FAQ>
  </section>
</template>

<script setup>

import { ref } from 'vue';
import FAQ from '../components/FAQ.vue';
import { useRouter } from 'vue-router';
import GenreSlide from '../components/GenreSlide.vue';
import MoviesSlide from '../components/MoviesSlide.vue';


const router = useRouter();

const movies = ref([
  { id:1, title: "KANTARA", image: "https://picsum.photos/400/600?random=1", duration: "1h 57min", rating: 5, genre: "action", releaseDate: "12 Mar 2024" },
  { id:2, title: "BLADE RUNNER 2049", image: "https://picsum.photos/400/600?random=2", duration: "2h 43min", rating: 5, genre: "sci-fi", releaseDate: "14 Mar 2024" },
  { id:3, title: "PUSHPA", image: "https://picsum.photos/400/600?random=3", duration: "2h 10min", rating: 4, genre: "action", releaseDate: "16 Mar 2024" },
  { id:4, title: "ADIPURUSH", image: "https://picsum.photos/400/600?random=4", duration: "1h 45min", rating: 3, genre: "drama", releaseDate: "18 Mar 2024" },
  { id:5, title: "INCEPTION", image: "https://picsum.photos/400/600?random=5", duration: "2h 28min", rating: 5, genre: "sci-fi", releaseDate: "20 Mar 2024" },
  { id:6, title: "THE BATMAN", image: "https://picsum.photos/400/600?random=6", duration: "2h 56min", rating: 4, genre: "action", releaseDate: "22 Mar 2024" },
]);

const categories =ref( [
        {
          name: 'Action',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
        {
          name: 'Adventure',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
        {
          name: 'Comedy',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
        {
          name: 'Drama',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
        {
          name: 'Horror',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },{
          name: 'Drama',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
        {
          name: 'Horror',
          posters: [
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5',
            'https://picsum.photos/400/600?random=5'
          ]
        },
      ]);

const goToPage = (path)=>{
  router.push(path);
}

</script>

<style scoped></style>
