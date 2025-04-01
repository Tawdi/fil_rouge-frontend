<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <!-- Header -->
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-[#0f0f0f] py-8"></footer>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>

<style>
.container,
.navbar {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}

@media (min-width: 640px) {
  .container,
  .navbar {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 4rem 2rem;
  }

  .navbar {
    padding: 0.5rem 2rem;
  }
}
</style>
