<template>
  <div class="p-16"></div>

<section class="container  min-h-screen">
    <div class="flex flex-wrap gap-4">
      <Ticket
        v-for="(seat, index) in selectedSeats"
        :key="index"
        :movieTitle=reservation.movieTitle
        :movieImage=reservation.movieImage
        :cinemaName=reservation.cinemaName
        :cinemaAddress=reservation.cinemaAddress
        roomName="Room A"
        :date="bookingDate"
        :time="bookingTime"
        :seat="seat"
        :price=reservation.pricing[seat.type] 
      />
    </div> 
</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import reservationService from '@/services/reservationService.js'
import Ticket from '@/components/user/Ticket.vue'
const route = useRoute();
const selectedSeats =ref([])
const reservationId =ref(null)

const bookingDate = ref('')
const bookingTime = ref('')

const reservation = ref({})



onMounted(async () => {
  reservationId.value = route.params.id ;
  const { data } = await reservationService.show(reservationId.value)
  reservation.value = data
  selectedSeats.value = data.seats
  bookingDate.value = new Date(data.date).toLocaleDateString("en-US", {year:'numeric', month: 'short',day: "2-digit" })
  bookingTime.value = new Date(data.date).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' ,hour12:false })
})

</script>
