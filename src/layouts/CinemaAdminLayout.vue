<template>
    <div class="flex">
      <AdminSidebar />
      <main class="ml-64 w-full p-6">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import AdminSidebar from '../components/cinemaAdmin/Sidebar.vue'
  </script>