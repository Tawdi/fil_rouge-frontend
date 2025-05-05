<template>
  <div class="pt-16 ">
    <!-- Hero Section -->
    <section class="container kk mx-auto  px-4">
      <div class="relative rounded-xl overflow-hidden lg:h-[600px] ">
        <!-- Background Image -->
        <div class="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30">
          <div  class="w-full h-full bg-cover bg-center opacity-50"
          :style="{ backgroundImage: `url(${movie.background})` }"></div>
        </div>

        <!-- Content Overlay -->
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center h-full justify-center  sm:px-16 py-8 backdrop-blur-sm">
          <!-- Movie Poster -->
          <div class="w-64 h-96 col-start-1  sm:col-end-6 lg:col-end-4 rounded-xl overflow-hidden bg-gray-800 justify-self-center">
            <img :src="movie.poster" :alt="movie.titre" class="w-full h-full object-cover" />
          </div>

          <!-- Movie Info -->
          <div class="ml-8 max-w-md lg:col-start-4 sm:col-start-6 sm:col-end-12 lg:col-end-9 justify-self-center ">
            <h1 class="text-4xl font-bold mb-1">{{ movie.titre }}</h1>
            <p class="text-sm mb-2">Release date: {{formatDate(movie.release_date)}}</p>

            <p class="text-sm text-gray-300 mb-4">
              with {{ movie.actors }}
            </p>

            <p class="text-sm">
              {{ movie.description }}
            </p>
          </div>

          <!-- Play Button -->
          <div class=" mt-10 lg:col-start-9 lg:col-end-12 sm:col-span-full justify-self-center">
            <button class="w-16 h-16 bg-white/20 hover:bg-red-600/30 backdrop-blur-sm rounded-md flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M55.0007 38.7363C55.0006 39.8317 54.4257 40.8467 53.4863 41.4101L31.0565 54.8639C28.3902 56.4632 24.9986 54.5423 24.999 51.4332L25.002 28.8289C25.0024 25.89 28.0661 23.9549 30.7201 25.2173L53.2217 35.9198C54.3085 36.4368 55.0009 37.5329 55.0007 38.7363Z" fill="#D9D9D9"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

        <!-- Date Selection -->
    <section class="container mx-auto  px-4">
      <div class="bg-[#1f1f1f] rounded-xl p-4">
        <div class="flex justify-center items-center flex-wrap  gap-8">

            <button 
              v-for="(day, index) in days" 
              :key="index"
              class="w-20 h-20 rounded-lg flex flex-col items-center justify-center text-[#272727] bg-[#D9D9D9]"
              :class="{ 'border-b-8 border-yellow-400': index === selectedDay }"
              @click="selectedDay = index"
            >
              <span class="text-xs">{{ day.name }}</span>
              <span class="text-xl font-bold">{{ day.date }}</span>
              <span class="text-xs">{{ day.month }}</span>
            </button>
            <!-- <div class="text-[#272727] w-20 h-20 bg-[#D9D9D9] p-3 rounded-lg flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-xs block text-center mt-1">Calendar</span>
          </div> -->
          </div>
      </div>
    </section>
    <section 
  class="container mx-auto px-4" 
  v-for="cinema in filteredCinemaSeances" 
  :key="cinema.cinema_id"
>
  <div class="bg-[#1f1f1f] rounded-xl p-6">
    <h2 class="text-2xl font-bold mb-1">{{ cinema.cinema_name }}</h2>
    <p class="text-gray-400 mb-6">{{ cinema.cinema_address }}</p>
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <button
        v-for="seance in cinema.seances"
        :key="seance.id"
        class="bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg"
      >
        <router-link :to="`/booking/${seance.id}`" >
          <div class="text-xl">{{ new Date(seance.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</div>
        </router-link>
      </button>
    </div>
  </div>
</section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import seanceService from '@/services/seanceService'
import { useNotificationStore } from "@/stores/notificationStore";
const route = useRoute();
const notificationStore = useNotificationStore();
const selectedMovieId = ref(null);
const movie = ref({})
const cinemaSeances = ref([]);
const days = ref([]);
const selectedDay = ref(null);
const fetchData = async ()=>{
  try {
    const response = await seanceService.getForMovie(selectedMovieId.value)
    cinemaSeances.value = response.data.cinemas; 
    movie.value = response.data.movie ;
    const allSeances = response.data.cinemas.flatMap(cinema => cinema.seances);

    const uniqueDates = Array.from(
      new Set(
        allSeances.map(seance =>
          new Date(seance.start_time).toISOString().split("T")[0]
        )
      )
    ).sort();

    days.value = uniqueDates.map(dateStr => {
      const date = new Date(dateStr);
      return {
        iso: dateStr,
        name: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
        date: date.toLocaleDateString("en-US", { day: "2-digit" }),
        month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
      };
    });
    selectedDay.value = 0;
    
  } catch (error) {
    console.error("Error fetching seance:", error);

    notificationStore.pushNotification({
      message: "Erreur fetching data for this movie.",
      type: "error",
    });
  }
}
const filteredCinemaSeances = computed(() => {
  if (!days.value.length || selectedDay.value === null) return [];

  const selectedDateISO = days.value[selectedDay.value].iso;

  return cinemaSeances.value.map(cinema => {
    const filteredSeances = cinema.seances.filter(seance => {
      const seanceDate = new Date(seance.start_time).toISOString().split("T")[0];
      return seanceDate === selectedDateISO;
    });

    return {
      ...cinema,
      seances: filteredSeances
    };
  }).filter(cinema => cinema.seances.length > 0); 
});

const formatDate = (date) => {
  if (!date) return ''
  const Options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-GB', Options)
}

onMounted( async ()=>{
    selectedMovieId.value = route.params.id ;

    await fetchData();

});

</script>

<style>
</style>