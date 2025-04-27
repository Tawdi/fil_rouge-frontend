<template>
    <div class="bg-[#1a1a1a] rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <button 
            @click="$emit('previous-week')"
            class="p-1 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h3 class="text-lg font-medium">{{ formatDateRange(currentWeekStart, 6) }}</h3>
          <button 
            @click="$emit('next-week')"
            class="p-1 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <button 
          @click="$emit('set-current-week')"
          class="px-3 py-1.5 border border-[#333333] rounded-md text-sm text-white hover:bg-[#262626]"
        >
          Today
        </button>
      </div>
      
      <!-- Timeline Container -->
      <div class="overflow-x-auto">
        <div class="min-w-[1200px]">
          <!-- Time Scale Header -->
          <div class="flex mb-2 ml-[100px]">
            <div v-for="hour in timeScale" :key="hour" class="flex-shrink-0 w-[100px] text-center">
              <div class="text-xs text-[#999999]">{{ formatHour(hour) }}</div>
            </div>
          </div>
          
          <!-- Vertical Grid Lines -->
          <div class="relative ml-[100px] h-4 mb-2 border-b border-[#333333]">
            <div 
              v-for="hour in timeScale" 
              :key="`grid-${hour}`" 
              class="absolute h-full border-l border-[#333333]"
              :style="{ left: `${(hour - timeScale[0]) * 100}px` }"
            ></div>
          </div>
          
          <!-- Day Rows -->
          <div class="space-y-4">
            <div 
              v-for="(day, dayIndex) in weekDays" 
              :key="dayIndex"
              class="flex"
            >
              <!-- Day Label -->
              <div 
                :class="[
                  'w-[100px] flex-shrink-0 p-2 rounded-l-md bg-[#262626] flex flex-col justify-center',
                  isToday(addDays(currentWeekStart, dayIndex)) ? 'bg-[#e50000]/20 border-y border-l border-[#e50000]' : ''
                ]"
              >
                <div class="text-sm font-medium">{{ day }}</div>
                <div class="text-xs text-[#999999]">{{ formatDate(addDays(currentWeekStart, dayIndex)) }}</div>
              </div>
              
              <!-- Timeline Track -->
              <div 
                class="relative flex-grow h-20 bg-[#262626] rounded-r-md overflow-hidden"
                @click="handleTimelineClick($event, addDays(currentWeekStart, dayIndex))"
              >
                <!-- Vertical Grid Lines -->
                <div 
                  v-for="hour in timeScale" 
                  :key="`grid-day-${dayIndex}-${hour}`" 
                  class="absolute h-full border-l border-[#333333]/50"
                  :style="{ left: `${(hour - timeScale[0]) * 100}px` }"
                ></div>
                
                <div 
                  v-for="seance in getSeancesForDay(addDays(currentWeekStart, dayIndex))"
                  :key="`seance-${seance.id}`"
                  :style="{
                    left: `${getLeftOffset(seance.start_time)}px`,
                    width: `${getWidthByDuration(seance.start_time, seance.end_time)}px`,
                    backgroundColor: getMovieColor(seance.movie_id)
                  }"
                  class="absolute top-0 h-full rounded-md p-2 overflow-hidden cursor-pointer transition-all hover:z-10 hover:shadow-lg hover:scale-y-[1.05]"
                  @click.stop="$emit('edit-seance', seance)"
                >
                  <div class="text-xs font-medium truncate">{{ getMovieTitle(seance.movie_id) }}</div>
                  <div class="text-xs opacity-80 truncate">{{ formatTime(seance.start_time) }} - {{ formatTime(seance.end_time) }}</div>
                  <div class="text-xs opacity-80 truncate">{{ getRoomName(seance.room_id) }}</div>
                  
                </div>

                <div class="absolute inset-0 bg-white/0 hover:bg-white/5 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate, formatDateRange, formatTime, formatHour, isToday, addDays } from '@/utils/dateTime';

const props = defineProps({
  currentWeekStart: {
    type: Date,
    required: true
  },
  weekDays: {
    type: Array,
    required: true
  },
  timeScale: {
    type: Array,
    required: true
  },
  seances: {
    type: Array,
    required: true
  },
  movies: {
    type: Array,
    required: true
  },
  rooms: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['previous-week', 'next-week', 'set-current-week', 'edit-seance', 'create-seance-at-time']);

// Methods
const getSeancesForDay = (date) => {
  const dateString = date.toISOString().split('T')[0];
  return props.seances.filter(seance => {
    const seanceDate = new Date(seance.start_time).toISOString().split('T')[0];
    return seanceDate === dateString;
  });
};

const handleTimelineClick = (event, date) => {

  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const totalWidth = rect.width;
  const totalMinutes = (props.timeScale[props.timeScale.length - 1] - props.timeScale[0]) * 60;
  const clickedMinutes = Math.floor((clickX / totalWidth) * totalMinutes);
  const hours = Math.floor(clickedMinutes / 60) + props.timeScale[0];
  const minutes = clickedMinutes % 60;

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  emit('create-seance-at-time', { time: formattedTime }, date);
};

const getLeftOffset = (startTime) => {
  const date = new Date(startTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const startHour = props.timeScale[0];
  const minutesSinceStart = (hours - startHour) * 60 + minutes;
  return (minutesSinceStart / 60) * 100;
};

const getWidthByDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMinutes = (end - start) / 60000; 
  return (durationMinutes / 60) * 100;
};

const getMovieColor = (movieId) => {
  const colors = [
    'rgba(229, 0, 0, 0.7)',    // Red
    'rgba(0, 112, 224, 0.7)',   // Blue
    'rgba(76, 175, 80, 0.7)',   // Green
    'rgba(156, 39, 176, 0.7)',  // Purple
    'rgba(255, 152, 0, 0.7)',   // Orange
    'rgba(0, 188, 212, 0.7)',   // Cyan
    'rgba(233, 30, 99, 0.7)',   // Pink
    'rgba(255, 235, 59, 0.7)',  // Yellow
    'rgba(121, 85, 72, 0.7)',   // Brown
    'rgba(96, 125, 139, 0.7)'   // Blue Grey
  ];
  
  return colors[movieId % colors.length];
};

const getMovieTitle = (movieId) => {
  const movie = props.movies.find(movie => movie.id === movieId);
  return movie ? movie.titre : 'Unknown Movie';
};

const getRoomName = (roomId) => {
  const room = props.rooms.find(room => room.id === roomId);
  return room ? room.name : 'Unknown Room';
};
</script>

<style scoped>

.timeline-track {
  position: relative;
  height: 80px;
  overflow-x: auto;
}

.timeline-track::-webkit-scrollbar {
  height: 8px;
}

.timeline-track::-webkit-scrollbar-track {
  background: #262626;
  border-radius: 4px;
}

.timeline-track::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

.timeline-track::-webkit-scrollbar-thumb:hover {
  background: #444444;
}
</style>