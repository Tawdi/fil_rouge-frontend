<template>
    <header class="sticky top-0 z-50 bg-[#0f0f0f]/50 backdrop-blur-sm py-4">
        <div class=" navbar mx-auto flex items-center justify-between py-4">
          <!-- <div class="flex items-center gap-12"> -->
            <a href="/" class="flex items-center gap-2">
              <div class="relative h-8 w-8 rounded-full bg-[#e50000] flex items-center justify-center">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5"></div>
              </div>
              <span class="text-xl font-bold">MovieSeat</span>
            </a>
            <div >
            <nav class="border-4 border-[#1a1a1a] rounded-[12px] p-2 ">
              <ul class="flex items-center gap-6 ">
                  <li class="py-2 px-4 bg-[#1a1a1a] rounded-md "><router-link to="/" class="    text-white ">Home</router-link></li>
                  <li class="py-2 px-4"><router-link to="/movies" class="  text-[#999999] hover:text-white transition-colors">Movies</router-link></li>
                  <li class="py-2 px-4"><router-link to="/cinemas" class="  text-[#999999] hover:text-white transition-colors">Cinemas</router-link></li>
                  <li class="py-2 px-4"><router-link to="/support" class="  text-[#999999] hover:text-white transition-colors">Support</router-link></li>
                  <li class="py-2 px-4"><router-link to="/about" class="  text-[#999999] hover:text-white transition-colors">About</router-link></li>
              </ul>

            </nav>
            </div>
          <!-- </div> -->
          <div class="flex items-center gap-4">
            <button class="text-[#999999] hover:text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button class="text-[#999999] hover:text-white p-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#e50000]"></span>
            </button>
            <button class="text-[#999999] hover:text-white p-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#e50000] text-[10px] flex items-center justify-center">2</span>
            </button>
            <button class="text-[#999999] hover:text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
        </div>
      </header>
</template>
<script></script>