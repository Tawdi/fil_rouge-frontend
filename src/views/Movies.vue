<template>
    <div class=""></div>
    <section class="container  relative w-full h-screen overflow-hidden">
    <!-- Slides -->
    <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        v-show="currentSlide === index"
        class="w-full h-full object-cover  transition-all duration-700 ease-in-out"
        >
        <img
      :src="slide.image"
      :alt="slide.title"
      class="w-full h-full object-cover "
      />
      <!-- Overlay Content -->
      <div class="absolute  inset-0 bg-gradient-to-b to-[#141414] via-[#14141414] from-[#0000]"></div>
      <div class="absolute bottom-28 left-0 right-0  text-center flex justify-center items-center ">
          <div class="text-white max-w-xl">
              <h1 class="text-3xl md:text-5xl font-bold mb-4">{{ slide.title }}</h1>
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
</template>
<script setup></script>