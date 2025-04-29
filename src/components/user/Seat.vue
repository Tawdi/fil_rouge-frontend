<template>
     <div v-if="seat.type === 'None'" class="w-8 h-8 mx-1"></div>
    <div v-else-if="seat.etat === 'taken'" class=" cursor-not-allowed w-8 h-8 mx-1 rounded flex items-center justify-center text-xs text-gray-400 bg-gray-500/50 border border-gray-500">
        {{ getSeatLabel(seatIndex + 1) }}
    </div>
    <div v-else 
         @click="handleSeatClick"
         class="hover:scale-90 cursor-pointer "
         :class="[
           'w-8 h-8 mx-1 rounded flex items-center justify-center text-xs',
           seat.etat === 'selected' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500' :
           seat.type === 'Standard' ? 'bg-blue-500/20 text-blue-300 border border-blue-500' :
           seat.type === 'VIP' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
           'bg-green-500/20 text-green-300 border border-green-500'
         ]"
         role="button" >
      {{ getSeatLabel(seatIndex + 1) }}
    </div>
</template>

<script setup>
const emit = defineEmits();
const props = defineProps({
    seat: {
    type: Object,
    required: true
    },
    seatIndex: {
    type: Number,
    required: true
    }
});

const handleSeatClick = () => {
if (props.seat.etat === 'selected') {
    emit('unselect');
} else {
    emit('select');
}
};

const getSeatLabel = (index) => {
    return index.toString();
};
</script>
  