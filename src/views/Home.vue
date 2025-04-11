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
  <section class="py-16 container mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold">Currently in the cinema</h2>

      <!-- Slider Navigation -->
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

        <!-- Progress Bar -->
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

    <!-- movies  -->
    <div class="relative overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="movie in movies"
          :key="movie.title"
          class="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
        >
          <movie-card
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

      <!-- Categories Section -->
    <section class="max-w-7xl mx-auto px-4 py-20">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2 class="text-3xl font-bold mb-2">Explore our wide variety of categories</h2>
        <p class="text-[#999999]">
          Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to
          learn something new
        </p>
      </div>
      <!-- Slider Navigation - Categories -->
      <div class="flex items-center gap-2">
            <button
              @click="prevCategorySlide"
              class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div class="w-24 h-1 bg-[#333333] rounded-full overflow-hidden relative">
              <div
                class="absolute top-0 left-0 h-full bg-[#e50000] transition-all duration-300"
                :style="{
                  width: `${100 / totalCategorySlides}%`,
                  marginLeft: `${(100 / totalCategorySlides) * currentCategorySlide}%`
                }"
              ></div>
            </div>

            <button
              @click="nextCategorySlide"
              class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
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
            :style="{ transform: `translateX(-${currentCategorySlide * 100}%)` }"
          >
            <div
              v-for="category in categories"
              :key="category.name"
              class="w-1/2 sm:w-1/3 lg:w-1/5 flex-shrink-0 px-2"
            >
            <CategoryCard
              :name="category.name"
              :posters="category.posters"
            />
            </div>
          </div>
        </div>

         <!-- FAQ Section -->
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

import { ref, onMounted, watch, computed } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import CategoryCard from '../components/CategoryCard.vue';
import FAQ from '../components/FAQ.vue';
import { useRouter } from 'vue-router';


const router = useRouter();

onMounted(() => {
  
  updateItemsPerPage();
  window.addEventListener('resize', updateItemsPerPage);
});

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

const itemsPerPage = ref(4);
const itemsPerPageCategory =ref(5);

const updateItemsPerPage = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsPerPage.value = 1; 
    itemsPerPageCategory.value=2;
  } else if (width >= 640 && width < 1024) {
    itemsPerPage.value = 2;
    itemsPerPageCategory.value=3;

  } else {
    itemsPerPage.value = 4; 
    itemsPerPageCategory.value=5;
  }
};

const currentSlide = ref(0);
const totalSlides = computed(() => Math.ceil(movies.value.length / itemsPerPage.value));

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};


// category carousel 

const currentCategorySlide = ref(0);
const totalCategorySlides = computed(() =>
  Math.ceil(categories.value.length / itemsPerPageCategory.value)
);

const nextCategorySlide = () => {
  if (currentCategorySlide.value < totalCategorySlides.value - 1) {
    currentCategorySlide.value++;
  }
};

const prevCategorySlide = () => {
  if (currentCategorySlide.value > 0) {
    currentCategorySlide.value--;
  }
};

const goToPage = (path)=>{
  router.push(path);
}

</script>

<style scoped></style>
