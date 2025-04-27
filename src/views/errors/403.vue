<template>
    <main class="h-screen w-full flex flex-col justify-center items-center relative bg-[#361010]">
      <!-- 403 Title -->
      <h1 class="text-9xl font-extrabold text-white tracking-widest">403</h1>
      <div class="bg-[#FF3B30] px-2 font-bold rounded rotate-12 absolute">
        Access Denied
      </div>
      <button class="mt-5">
        <a
          class="relative inline-block text-sm font-medium text-[#FF3B30] group active:text-red-600 focus:outline-none focus:ring"
        >
          <span
            class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF3B30] group-hover:translate-y-0 group-hover:translate-x-0"
          ></span>
          <span class="relative block px-8 py-3 bg-[#7F1D1D] border border-current font-bold">
            <router-link to="/"><span class="text-white">Go Home</span></router-link>
          </span>
        </a>
      </button>
    </main>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>