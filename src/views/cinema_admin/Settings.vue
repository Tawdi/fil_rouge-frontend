<template>
        <div class="flex flex-col overflow-hidden min-h-screen">
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Settings Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white">Cinema Settings</h1>
          <p class="text-[#999999] mt-2">Update your cinema's information</p>
        </div>


         <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
            <!-- cinema info -->
            <div class="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333] max-w-2xl">
            <div class="space-y-6">
                <!-- Cinema Name -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">Cinema Name</label>
                <input
                    v-model="cinemaInfo.name"
                    type="text"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="Enter cinema name"
                />
                </div>

                <!-- Address -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">Address</label>
                <textarea
                    v-model="cinemaInfo.address"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="Enter cinema address"
                    rows="4"
                ></textarea>
                </div>

                <!-- Image Upload -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">Cinema Image</label>
                <div class="bg-[#222222] rounded-lg p-6 border border-[#333333] text-center">
                    <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                    id="imageUpload"
                    />
                    <div v-if="img.imagePreview">
                    <img :src="img.imagePreview" class="w-32 h-32 object-cover rounded-lg mx-auto mb-4 border border-[#e50000]" alt="Image preview" />
                    <p class="text-[#999999] text-sm mb-2">{{ img.imageName }}</p>
                    <label for="imageUpload" class="text-[#e50000] hover:text-[#45a049] cursor-pointer font-medium">
                        Replace Image
                    </label>
                    </div>
                    <div v-else>
                    <svg class="w-12 h-12 text-[#999999] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p class="text-[#999999] text-sm mb-4">Upload a cinema image</p>
                    <label for="imageUpload" class="bg-[#e50000] text-white px-4 py-2 rounded-md font-medium hover:bg-[#ff0000] cursor-pointer inline-block">
                        Choose Image
                    </label>
                    </div>
                </div>
                </div>


                <div>
                    <button
                        @click="submitCinemaForm"
                        class="bg-[#e50000] text-white px-6 py-3 rounded-md font-medium hover:bg-[#ff0000] transition-colors"
                    >
                        Save Cinema Changes
                    </button>
                </div>
            </div>
            </div>
            <!-- cinema admin info -->
            <div class="bg-[#1a1a1a] rounded-lg h-fit p-6 border border-[#333333] max-w-2xl">
                <div class="space-y-6">
                <!-- Email -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">Email</label>
                <input
                    v-model="adminInfo.email"
                    type="email"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="Enter email address"
                />
                </div>

                <!-- Current Password -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">current Password</label>
                <input
                    v-model="adminInfo.current_password"
                    type="password"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="Enter current password"
                />
                </div>
                <!-- Password -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">New Password</label>
                <input
                    v-model="adminInfo.password"
                    type="password"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="Enter new password"
                />
                </div>

                <!-- confirm -->
                <div>
                <label class="text-[#999999] text-sm mb-1 block">Confirm Password</label>
                <input
                    v-model="adminInfo.password_confirmation"
                    type="password"
                    class="w-full bg-[#222222] text-white rounded-md p-3 border border-[#333333] focus:outline-none focus:border-[#e50000]"
                    placeholder="confirm password"
                />
                </div>

                <div>
                    <button
                        @click="submitAdminForm"
                        class="bg-[#e50000] text-white px-6 py-3 rounded-md font-medium hover:bg-[#ff0000] transition-colors"
                    >
                        Save Admin Changes
                    </button>
                </div>

                </div>
            </div>
         </div>
      </main>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/utils/axios'; 
const storageUrl = import.meta.env.VITE_STORAGE_URL;

const img = ref({
  imageName: '',
  imagePreview: null,
});

const cinemaInfo = ref({
  name: '',
  address: '',
  image: null,
});

const adminInfo = ref({
  email: '',
  current_password: '',
  password: '',
  password_confirmation: '',
});

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    cinemaInfo.value.image = file;
    img.value.imageName = file.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      img.value.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

async function submitCinemaForm() {
  try {
    const formData = new FormData();
    formData.append('name', cinemaInfo.value.name);
    formData.append('address', cinemaInfo.value.address);
    if (cinemaInfo.value.image) {
      formData.append('image', cinemaInfo.value.image);
    }

    await axios.post('/cinema-admin/cinema/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('Cinema information updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Failed to update cinema information.');
  }
}

async function submitAdminForm() {
  try {
    await axios.post('/cinema-admin/account/update', {
      email: adminInfo.value.email,
      current_password: adminInfo.value.current_password,
      new_password: adminInfo.value.password,
      new_password_confirmation: adminInfo.value.password_confirmation,
    });

    alert('Admin account updated successfully!');
  } catch (error) {
    console.error(error);
    alert('Failed to update admin account.');
  }
}

const fetchInfo = async () => {
  try {
    const { data } = await axios.get('/cinema-admin/info');

    cinemaInfo.value.name = data.cinema?.name || '';
    cinemaInfo.value.address = data.cinema?.address || '';
    if (data.cinema?.image) {
      img.value.imagePreview = storageUrl + data.cinema.image;
      img.value.imageName = 'current image ';
    }

    // Populate admin info
    adminInfo.value.email = data.admin?.email || '';
  } catch (error) {
    console.error('Failed to fetch info:', error);
  }
};

onMounted(fetchInfo);
</script>

