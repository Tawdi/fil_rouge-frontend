<template>
  <div class="flex gap-2 justify-center mt-6">
    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="px-3 py-1 border border-[#333333] rounded-md text-white bg-[#262626] hover:bg-[#333333] transition-colors duration-200 disabled:opacity-50"
    >
      Prev
    </button>
    
    <div class="flex gap-2">
      <button 
        v-for="page in totalPages" 
        :key="page" 
        @click="changePage(page)"
        :class="[
          'px-3 py-1 border border-[#333333] rounded-md text-white transition-colors duration-200',
          page === currentPage ? 'bg-red-600 hover:bg-red-700' : 'bg-[#262626] hover:bg-[#333333]'
        ]"
      >
        {{ page }}
      </button>
    </div>
    
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border border-[#333333] rounded-md text-white bg-[#262626] hover:bg-[#333333] transition-colors duration-200 disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>


<script setup>

const props = defineProps({
  currentPage: Number,
  totalPages: Number
});
const emit = defineEmits(['page-change']);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page);
  }
};
</script>
  