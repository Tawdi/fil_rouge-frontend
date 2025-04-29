<template>
    <div class="py-16"></div>
    <div class="min-h-screen text-white p-4 flex flex-col items-center justify-center ">
        <div class="w-full max-w-7xl ">
            <div class="flex flex-col gap-6">
                <!--  -->
                <div class="w-full rounded-lg overflow-hidden relative bg-cover bg-center"
                    :style="{ backgroundImage: `url(/images/home.png)` }">
                    <div class=" w-full flex flex-col sm:flex-row p-4 items-center backdrop-blur-sm">
                        <div class="aspect-[2/3] w-full max-w-[150px] sm:max-w-[200px] mx-auto mb-4 sm:mb-0 rounded-lg overflow-hidden">
                            <img src="/images/support.webp" alt=""
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 text-center sm:text-left sm:pl-4 ">
                            <h1 class="text-2xl font-bold">Cenima Alpha</h1>
                            <p class="text-gray-300 text-sm sm:text-base">Casablanca CT 1029 Ain Chock</p>
                        </div>
                        <div class="mt-4 sm:mt-0 w-24 bg-white text-black rounded-md overflow-hidden">
                            <div class="p-2 text-center">
                                <div class="text-xs sm:text-sm font-medium">THU</div>
                                <div class="text-xl sm:text-2xl font-bold">25</div>
                                <div class="text-xs sm:text-sm font-medium">MAR</div>
                            </div>
                            <div class="bg-yellow-400 text-black text-center py-1 font-medium">
                                12:30
                            </div>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class=" flex-1 bg-[#272727] rounded-lg p-2 h-fit overflow-auto">

                    <Room
                    :room-data="room"
                    :seance-data="seance"
                    @select="handleSeatSelect"
                    @unselect="handleSeatUnselect"
                    />

                </div>
            </div>
            <!--  -->
            <div class="mt-6 bg-[#272727] rounded-lg p-6">

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Room from '@/components/user/Room.vue'
import seanceService from '@/services/seanceService'
import { useNotificationStore } from "@/stores/notificationStore";
import seatService from '../services/seatService';
import { useAuthStore } from '@/stores/auth'; 
const auth = useAuthStore();
const notificationStore = useNotificationStore();
const selectedSeanceId = ref(null);
const seance = ref({});
const room = ref({});
const fetchSeance = async ()=>{
    try {
        const response = await seanceService.getSeance(selectedSeanceId.value)
        seance.value = response.data
        room.value = seance.value.room
        room.value.layout= JSON.parse(room.value.layout)
        room.value.layout[2][2].etat='taken'
    } catch (error) {
        console.error("Error fetching seance:", error);
        notificationStore.pushNotification({
          message: "Erreur fetching seance.",
          type: "error",
        });
    }

}

const handleSeatSelect = (seatData) => {
    console.log(`Selected seat at row ${seatData.row}, col ${seatData.col}`);
    if (room.value.layout[seatData.row][seatData.col].etat !== 'selected') {
        room.value.layout[seatData.row][seatData.col].etat = 'selected';
        console.log(room.value.layout[seatData.row][seatData.col]);
    }
};

const handleSeatUnselect = (seatData) => {
    if (room.value.layout[seatData.row][seatData.col]?.etat === 'selected') {
        room.value.layout[seatData.row][seatData.col].etat = '';
        console.log(room.value.layout[seatData.row][seatData.col]);
    }
};
onMounted(()=>{
    selectedSeanceId.value =8 ;
     fetchSeance()
})
</script>

<style>
</style>