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
            <div class=" mx-auto mt-5 bg-[#262626] rounded-lg p-4 border border-[#333333]">
              <div >
                <h2 class="text-base font-semibold text-[#E5E5E5] mb-3">Your selected seats :</h2>
                <div v-if="selectedSeats.length === 0" class="text-[#999999] text-sm italic text-center">
                  No seats selected.
                </div>
                <div v-else>
                  <transition-group name="fade" tag="div" class="flex flex-wrap gap-2 mb-4">
                    <div
                    v-for="seat in selectedSeats"
                    :key="`${seat.row}-${seat.col}`"
                    class="transition"
                    >
                    <ReservedSeat
                    :key="`${seat.row}-${seat.col}`"
                    :seat="seat"
                    :label="getSeatLabel(seat.row , seat.col )"
                    />
                  </div>
                </transition-group>
                <div class="bg-[#333333] rounded-md p-3 my-2 flex items-center gap-2 text-sm text-[#E5E5E5]">
                  <svg class="w-4 h-4 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Your seats are reserved for 'Now' Complete payment to secure them!</span>
                </div>
                  <div class="bg-[#333333] rounded-md p-3 mb-4">
                    <span class="text-base font-semibold text-[#E5E5E5]">Total Price: {{ calculePrice() }} USD</span>
                  </div>
                </div>
                <div v-if="selectedSeats.length > 0" class="mt-4">
                  <div class="rounded-md ">
                    <div id="payment-element" class="rounded"> waiting for you </div>
                  </div>
                </div>
              </div>
              <button
                v-if="!isPaymentElementMounted"
                v-show="selectedSeats.length > 0"
                class="w-full bg-blue-500 hover:bg-blue-600 text-[#E5E5E5] px-4 py-2 rounded-md text-sm font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500"
                :disabled="isProcessing"
                @click="initializePayment"
              >
                <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin w-4 h-4 text-[#E5E5E5]" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
                  </svg>
                  Processing...
                </span>
                <span v-else>Continue to Checkout</span>
              </button>
              <button
                v-if="isPaymentElementMounted"
                class="w-full bg-green-500 hover:bg-green-600 text-[#E5E5E5] px-4 py-2 rounded-md text-sm font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-500"
                :disabled="isProcessing"
                @click="confirmPayment"
              >
                <span v-if="isProcessing" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin w-4 h-4 text-[#E5E5E5]" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    ></path>
                  </svg>
                  Processing...
                </span>
                <span v-else>Confirm Payment</span>
              </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Room from '@/components/user/Room.vue'
import seanceService from '@/services/seanceService'
import { useNotificationStore } from "@/stores/notificationStore";
import reservationService from '@/services/reservationService';
import { useAuthStore } from '@/stores/auth'; 
import { useRoute } from 'vue-router';
import axios from '@/utils/axios';

import { loadStripe } from '@stripe/stripe-js';

import { io } from "socket.io-client";
import ReservedSeat from '@/components/user/ReservedSeat.vue';
const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:9999', {
  withCredentials: true,
});

let stripe = null;
const elements = ref(null);
const paymentElement = ref(null);

const route = useRoute();
const auth = useAuthStore();
const userId = auth.user.id;
const notificationStore = useNotificationStore();
const selectedSeanceId = ref(null);
const seance = ref({});
const room = ref({});
const selectedSeats = ref([]); 
const isProcessing =ref(false)
const isInPayment =ref(false)
const isPaymentElementMounted = ref(false);
const clientSecret = ref(null);

const fetchSeance = async ()=>{
    try {
        const response = await seanceService.getSeance(selectedSeanceId.value)
        const response2 = await reservationService.getForSeance(selectedSeanceId.value)
        const reservetions = response2.data ;
        seance.value = response.data
        room.value = seance.value.room
        room.value.layout= JSON.parse(room.value.layout)

        reservetions.forEach((rsv)=> { room.value.layout[rsv.row][rsv.col].etat='taken' } )
        

    } catch (error) {
        console.error("Error fetching seance:", error);
        notificationStore.pushNotification({
          message: "Erreur fetching seance.",
          type: "error",
        });
    }

}

const handleSeatSelect = (seatData) => {
  if( isInPayment.value )return;
    console.log(`Selected seat (${seatData.row},${seatData.col})  by user-${userId}`);
    const seat = room.value.layout[seatData.row][seatData.col];
    if (seat.etat !== 'selected') {
        // seat.etat = 'selected';
        // console.log(seat);
        // console.log("Emitting seat:select with userId:", userId);
        socket.emit("seat:select", {
            seanceId: selectedSeanceId.value,
            row: seatData.row,
            col: seatData.col,
            userId: auth.user.id
        });
    }
};

const handleSeatUnselect = (seatData) => {
    if( isInPayment.value )return;
    const seat = room.value.layout[seatData.row][seatData.col];
    if (seat?.etat === 'selected') {
        // seat.etat = '';
        console.log(`Release seat (${seatData.row},${seatData.col}) by user-${userId}`);
        socket.emit("seat:release", {
            seanceId: selectedSeanceId.value,
            row: seatData.row,
            col: seatData.col,
            userId: auth.user.id
        });
    }
};

const getSeatLabel = ( row , col  ) => {
     row++; col++;
    if (room.value.row_naming === 'letters') {
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

const calculePrice = ()=>{
  let price=0;
  const pricing = JSON.parse(seance.value.pricing)
  selectedSeats.value.forEach(s=> price+= +pricing[s.type] )
  return price.toFixed(2);
} 

const initializePayment = async () => {
  if (selectedSeats.value.length === 0) return;
  isProcessing.value = true;
  isInPayment.value =true ;

  try {
    // Create PaymentIntent
    const amount = Math.round(parseFloat(calculePrice()) * 100);
    console.log('Creating PaymentIntent with:', { amount, seance_id: selectedSeanceId.value });
    const res = await axios.post('/create-payment-intent', {
      amount,
      currency: 'usd',
      seance_id: selectedSeanceId.value,
      seats: selectedSeats.value.map((s) => ({ row: s.row, col: s.col, type: s.type })),
    });

    if (!res.data.clientSecret) {
      throw new Error('No client secret returned from server');
    }
    clientSecret.value = res.data.clientSecret;
    console.log('Received clientSecret:', clientSecret.value);

    // Initialize Payment Element
    if (!elements.value && stripe) {
      elements.value = stripe.elements({
        clientSecret: clientSecret.value,
        appearance: {
          theme: 'night',
          variables: {
            colorBackground: '#333333',
            colorText: '#E5E5E5',
            borderRadius: '6px',
            colorPrimary: '#22C55E',
            fontFamily: 'Inter, sans-serif',
          },
        },
      });
      paymentElement.value = elements.value.create('payment');
      paymentElement.value.mount('#payment-element');
      console.log('Payment Element mounted');
      isPaymentElementMounted.value = true;
    }

    if (!elements.value) {
      throw new Error('Payment form failed to initialize');
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    let message = 'Failed to initialize payment. Please try again.';
    notificationStore.pushNotification({
      message,
      type: 'error',
    });
    // Reset state on error
    if (paymentElement.value) {
      paymentElement.value.destroy();
      elements.value = null;
      paymentElement.value = null;
      isPaymentElementMounted.value = false;
      clientSecret.value = null;
    }
  } finally {
    isProcessing.value = false;
  }
};

const confirmPayment = async () => {
  if (!elements.value || !clientSecret.value) {
    notificationStore.pushNotification({
      message: 'Payment form not initialized. Please try again.',
      type: 'error',
    });
    return;
  }
  isProcessing.value = true;
  isInPayment.value = true;

  try {
    console.log('Attempting to confirm payment');
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements: elements.value,
      redirect: 'if_required',
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: auth.user.name,
            email: auth.user.email,
          },
        },
      },
    });

    if (error) {
      console.error('Payment confirmation error:', error);
      throw new Error(error.message);
    }

    // Payment succeeded (no redirect needed)
    console.log('PaymentIntent status:', paymentIntent.status);
    if (paymentIntent.status === 'succeeded') {

      console.log('Reserving seats');
      const response = await reservationService.reserve({
        seance_id: selectedSeanceId.value,
        seats: selectedSeats.value,
      });

      if (response.status == 201) {
        selectedSeats.value.forEach((seat) => {
          socket.emit('seat:confirm', {
            seanceId: selectedSeanceId.value,
            row: seat.row,
            col: seat.col,
            userId: auth.user.id,
          });
          room.value.layout[seat.row][seat.col].etat = 'taken';
        });

        notificationStore.pushNotification({
          message: 'Payment successful! Your seats are confirmed.',
          type: 'success',
        });

        selectedSeats.value = [];
        // Destroy Payment Element after success
        if (paymentElement.value) {
          paymentElement.value.destroy();
          elements.value = null;
          paymentElement.value = null;
          isPaymentElementMounted.value = false;
          clientSecret.value = null;
        }
      } else {
        throw new Error('Failed to reserve seats');
      }
    } else {
      throw new Error('Payment not completed. Please try again.');
    }
  } catch (error) {
    console.error('Payment error:', error);
    let message = 'Payment failed. Please try again.';
    notificationStore.pushNotification({
      message,
      type: 'error',
    });
  } finally {
    isInPayment.value = false;
    isProcessing.value = false;
  }
};

onMounted( async  ()=>{

    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    if (!stripe) {
      notificationStore.pushNotification({
        message: 'Failed to load payment system. Please refresh the page.',
        type: 'error',
      });
      return;
    }
    
    selectedSeanceId.value =route.params.id ;
    socket.emit("seance:join", { seanceId: selectedSeanceId.value });
    console.log(selectedSeanceId.value);
     await fetchSeance();

    socket.emit("seat:getHeld", { seanceId: selectedSeanceId.value ,userId:auth.user.id });

    socket.on("seat:heldList", ({ heldByUser, heldByOthers }) => {
    console.log("by me",heldByUser ,"by other ",heldByOthers);
    heldByUser.forEach(({ row, col }) => {
      if (room.value.layout[row][col].etat !== 'taken') {
        room.value.layout[row][col].etat = 'selected';
        selectedSeats.value.push({ row: row, col: col , type:room.value.layout[row][col].type }); 

      }
    });

    heldByOthers.forEach(({ row, col }) => {
      if (room.value.layout[row][col].etat !== 'taken') {
        room.value.layout[row][col].etat = 'held';
      }
    });
  });


  socket.on("seat:selected", ({ row, col, userId: otherUserId }) => {

    if (room.value.layout[row][col].etat !== 'taken' && otherUserId !== auth.user.id) {
      room.value.layout[row][col].etat = 'held';
    }else{
      room.value.layout[row][col].etat = 'selected';
      selectedSeats.value.push({ row: row, col: col , type:room.value.layout[row][col].type }); 
    }
  });

  socket.on("seat:released", ({ row, col }) => {
    if (room.value.layout[row][col].etat === 'held' || room.value.layout[row][col].etat === 'selected') {
        room.value.layout[row][col].etat = '';  
      selectedSeats.value = selectedSeats.value.filter((s) => !(s.col === col && s.row === row))
    }
  });

  socket.on("seat:confirmed", ({ seanceId, row, col, userId }) => {

    if (room.value.layout[row][col].etat !== 'taken') {
    room.value.layout[row][col].etat = 'taken';
  }

});

})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>