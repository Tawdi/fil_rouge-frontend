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
        :price="10.0" 
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

const bookingDate = '2025-05-15'
const bookingTime = '18:00'

const reservation = ref({})

const getSeatLabel = ( row , col ,rowNaming = 'letters' ) => {
     row++; col++;
    if (rowNaming === 'letters') {
      let label = '';
    while (row > 0) {
      let remainder = (row - 1) % 26;
      label = String.fromCharCode(65 + remainder) + label;
      row = Math.floor((row - 1) / 26);
    }
    return label+'-'+col.toString();
    } else {
      return `${row}-${col}`;
    }
  };

onMounted(async () => {
  reservationId.value = route.params.id ;
  const { data } = await reservationService.show(reservationId.value)
  reservation.value = data
  selectedSeats.value = data.seats.map(seat => getSeatLabel(seat.row ,seat.col,data.rowNaming))
})

</script>
