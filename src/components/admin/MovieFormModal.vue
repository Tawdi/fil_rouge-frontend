<template>
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div class="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-[#333333]">
          <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold">{{ isEdit ? 'Edit Movie' : 'Add New Movie' }}</h3>
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
            <!-- Left Column -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Titre</label>
                <input 
                  v-model="form.titre"
                  type="text" 
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Director</label>
                <input 
                  v-model="form.director"
                  type="text" 
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Release Date</label>
                <input 
                  v-model="form.release_date"
                  type="date" 
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Duration (minutes)</label>
                <input 
                  v-model.number="form.duration"
                  type="number" 
                  min="1"
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Rating</label>
                <input 
                  v-model.number="form.rating"
                  type="number" 
                  min="0"
                  max="10"
                  step="0.1"
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
            </div>
            
            <!-- Right Column -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Poster URL</label>
                <input 
                  v-model="form.poster"
                  type="url" 
                  placeholder="http://"
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Background Image URL</label>
                <input 
                  v-model="form.background"
                  type="url" 
                  placeholder="http://"
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Trailer URL</label>
                <input 
                  v-model="form.trailer"
                  type="url" 
                  placeholder="http://"
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Actors</label>
                <input 
                  v-model="form.actors"
                  type="text" 
                  placeholder="actor 1,actor 2 ,..."
                  required
                  class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-[#999999] mb-1">Genre</label>
               <select v-model="form.genre_id" class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]">

                <option v-for="genre in availableGenres" :key="genre.id" :value="genre.id" 
                >{{ genre.name }}</option>
               </select>
              </div>

            </div>
          </div>
          
          <div class="mt-6">
            <label class="block text-sm font-medium text-[#999999] mb-1">Description</label>
            <textarea 
              v-model="form.description"
              rows="4"
              required
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]"
            ></textarea>
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
              {{ isEdit ? 'Update Movie' : 'Add Movie' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits, onMounted } from 'vue';
  import axios from "@/utils/axios";
  const emit = defineEmits(['close', 'save']);
  
  const props = defineProps({
    movie: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  });

  const availableGenres = ref([]);
  const defaultForm = {
    titre: '',
    director: '',
    actors: '',
    release_date: '',
    duration: 120,
    rating: 7.0,
    poster: '',
    background:'',
    trailer:'',
    genre_id:'',
    description: ''
  };
  
  const form = ref({ ...defaultForm });
  
  onMounted( async () => {
    const response = await axios.get("/admin/genres");
    availableGenres.value = response.data
    if (props.movie) {
      form.value = { ...props.movie };
    }

  });
  const handleSubmit = () => {
    emit('save', { ...form.value });
  };
  </script>