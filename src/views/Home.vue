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

</template>

<script setup></script>

<style scoped></style>
