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

</section>
</template>
<script setup></script>