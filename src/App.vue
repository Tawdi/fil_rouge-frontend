<template>
  <div class="min-h-screen bg-[#141414] text-white">
    <!-- Header -->
    <Header></Header>

    <main>
      <router-view></router-view>
    </main>

    <!-- Footer -->
     <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
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
    padding: 1rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 2rem 1rem;
  }

  .navbar {
    padding: 0.5rem 2rem;
  }
}
</style>
