<template>
     <div 
         :class="[
           'px-3 h-8 mx-1 rounded flex items-center justify-center text-xs',
           seat.type === 'Standard' ? 'bg-blue-500/20 text-blue-300 border border-blue-500' :
           seat.type === 'VIP' ? 'bg-purple-500/20 text-purple-300 border border-purple-500' :
           'bg-green-500/20 text-green-300 border border-green-500'
         ]"
         role="button" >
      {{ label  }}
    </div>
</template>

<script setup>

defineProps({   
    seat: {
        type: Object,
        required: true
    },
    label:{
        type:String,
        required: true
    }
});

</script>
  