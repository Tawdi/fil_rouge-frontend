<template>
    <div class="py-16"></div>
    <div class="min-h-screen  text-white p-4 flex flex-col items-center justify-center">
        <div class="w-full max-w-5xl">
            <div class="flex flex-col md:flex-row gap-6">
                <!--  -->
                <div class="w-full md:w-1/4 rounded-lg overflow-hidden  relative"
                    :style="{ backgroundImage: `url(/images/home.png)` }">
                    <div class=" w-full flex flex-col sm:flex-row md:flex-col p-4 items-center backdrop-blur-sm">
                        <div class="aspect-[2/3] max-w-[200px] mx-auto mb-4 rounded-lg overflow-hidden">
                            <img src="/images/support.webp" alt=""
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="text-center md:text-left ">
                            <h1 class="text-2xl font-bold">Cenima Alpha</h1>
                            <p class="text-gray-300">Casablanca CT 1029 Ain Chock</p>
                        </div>
                        <div class="mt-4 mx-auto md:mx-0 w-24 bg-white text-black rounded-md overflow-hidden">
                            <div class="p-2 text-center">
                                <div class="text-sm font-medium">THU</div>
                                <div class="text-2xl font-bold">25</div>
                                <div class="text-sm font-medium">MAR</div>
                            </div>
                            <div class="bg-yellow-400 text-black text-center py-1 font-medium">
                                12:30
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class="w-full md:w-3/4 bg-[#272727] rounded-lg p-6"></div>
            </div>
            <!--  -->
            <div class="mt-6 bg-[#272727] rounded-lg p-6">

            </div>
        </div>
    </div>
</template>

<script setup></script>

<style>
</style>