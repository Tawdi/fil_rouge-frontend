<template>
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#333333]">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">{{ isEdit ? 'Edit Genre' : 'Add New Genre' }}</h3>
            <button 
              @click="$emit('close')"
              class="p-1 rounded-md text-[#999999] hover:bg-[#262626] hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <label class="block text-sm font-medium text-[#999999] mb-1">Name</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
            </div>
          </div>

          <div class="mt-6 flex justify-end space-x-3">
            <button 
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 border border-[#333333] rounded-md text-[#999999] hover:bg-[#262626]"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-[#e50000] hover:bg-[#cc0000] text-white rounded-md"
            >
              {{ isEdit ? 'Update Genre' : 'Add Genre' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onMounted } from 'vue';
  const emit = defineEmits(['close', 'save']);
  
  const props = defineProps({
    genre: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  });
  const defaultForm = {
    name: '',
  };
  
  const form = ref({ ...defaultForm });

  onMounted( async () => {
    if (props.genre) {
      form.value = { ...props.genre };
    }
  });
  const handleSubmit = () => {
    emit('save', { ...form.value });
  };
  </script>