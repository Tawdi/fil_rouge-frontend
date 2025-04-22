<template>
    <section class="max-w-7xl mx-auto px-4 py-">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 class="text-3xl font-bold mb-2">{{ title }}</h2>
          <p class="text-[#999999]">{{ subtitle }}</p>
        </div>
  
        <!-- Slider Navigation -->
        <div class="flex items-center gap-2">
          <button @click="prevSlide" class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-left">
                <path d="m15 18-6-6 6-6" />
              </svg>
          </button>
          <div class="w-24 h-1 bg-[#333333] rounded-full overflow-hidden relative">
            <div class="absolute top-0 left-0 h-full bg-[#e50000] transition-all duration-300"
                 :style="{ width: `${100 / totalSlides}%`, marginLeft: `${(100 / totalSlides) * currentSlide}%` }"></div>
          </div>
          <button @click="nextSlide" class="rounded-md border border-[#333333] text-[#999999] hover:text-white hover:border-[#e50000] p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-chevron-right">
                <path d="m9 18 6-6-6-6" />
              </svg>
          </button>
        </div>
      </div>
  
      <!-- Category Cards -->
      <div class="relative overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out"
             :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="category in categories" :key="category.name" class="w-1/2 sm:w-1/3 lg:w-1/5 flex-shrink-0 px-2">
            <CategoryCard :name="category.name" :posters="category.posters" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import CategoryCard from './CategoryCard.vue';
  
  const props = defineProps({
    categories: Array,
    title: {
      type: String,
      default: 'Explore our wide variety of categories'
    },
    subtitle: {
      type: String,
      default: `Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new`
    }
  });
  
  const currentSlide = ref(0);
  const itemsPerPage = ref(5);
  
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      itemsPerPage.value = 2;
    } else if (width < 1024) {
      itemsPerPage.value = 3;
    } else {
      itemsPerPage.value = 5;
    }
  };
  
  onMounted(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
  });
  
  const totalSlides = computed(() => Math.ceil(props.categories.length / itemsPerPage.value));
  
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
  </script>
  