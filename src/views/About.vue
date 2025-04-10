<template>
    <div class="">

      <!-- Hero Section -->
      <section class="relative py-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
          <div class="absolute inset-0 bg-[url('/images/about_hero.jpeg')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">Redefining the Cinema Experience</h1>
            <p class="text-xl text-gray-300 mb-8">MovieSeat is revolutionizing how people discover, book, and experience movies in theaters around the world.</p>
            
          </div>
        </div>
      </section>
  
      <!-- Mission Section -->
      <section class="py-16 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center mb-16">
            <h2 class="text-3xl font-bold mb-4">Our Mission</h2>
            <p class="text-xl text-gray-300">
              To connect movie lovers with the perfect cinema experience, making every film viewing memorable and accessible.
            </p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-[#1a1a1a] p-8 rounded-xl">
              <div class="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Innovation</h3>
              <p class="text-gray-400">
                We're constantly pushing the boundaries of technology to enhance the movie booking experience, from virtual seat previews to personalized recommendations.
              </p>
            </div>
            
            <div class="bg-[#1a1a1a] p-8 rounded-xl">
              <div class="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Community</h3>
              <p class="text-gray-400">
                We believe in the power of shared experiences. Our platform connects film enthusiasts, creating communities around the movies they love.
              </p>
            </div>
            
            <div class="bg-[#1a1a1a] p-8 rounded-xl">
              <div class="w-14 h-14 bg-red-600/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Accessibility</h3>
              <p class="text-gray-400">
                Cinema should be for everyone. We're committed to making movie experiences accessible to all, regardless of location or ability.
              </p>
            </div>
          </div>
        </div>
      </section>
  

      <!-- Our Story Section -->
      <section class="py-16 bg-[#0a0a0a]">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-12 items-center">
            <div class="md:w-1/2">
              <h2 class="text-3xl font-bold mb-6">Our Story</h2>
              <p class="text-gray-300 mb-4">
                Founded in 2024, MovieSeat began with a simple idea: make booking movie tickets as enjoyable as watching the film itself.
              </p>
              <p class="text-gray-300 mb-4">
                What started as a small startup in Youcode - Safi has grown into a global platform connecting millions of moviegoers with theaters worldwide. Our journey has been defined by a passion for cinema and a commitment to technological innovation.
              </p>
              
            </div>
            <div class="md:w-1/2">
              <div class="relative">
                <div class="absolute -inset-4 bg-red-500/20 rounded-xl blur-xl"></div>
                <img 
                  src="/images/about.jpeg" 
                  alt="MovieSeat team" 
                  class="relative rounded-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </template>
  
  <script setup>

  </script>
