<template>
  <div class="pt-16 ">
    <!-- Profile Header -->
    <section class="bg-gradient-to-b from-[#1a1a1a] to-[#141414] py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div class="relative">
            <img :src="Profile.image" :alt="Profile.name" class="w-32 h-32 rounded-full border-4 border-[#e50000]" />
            <button
              class="absolute bottom-0 right-0 bg-[#262626] p-2 rounded-full border-2 border-[#141414] hover:bg-[#333333] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-camera">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </button>
          </div>
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold mb-2">{{ Profile.name }}</h1>
            <p class="text-[#999999] mb-4">{{ Profile.profile_image }}</p>
            <p class="text-[#999999] mb-4">Member since {{ Profile.created_at }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="max-w-7xl mx-auto px-4 py-8">
      <!-- Tabs -->
      <div class="border-b border-[#333333] mb-8">
        <div class="flex overflow-x-auto scrollbar-hide">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            'px-6 py-4 font-medium whitespace-nowrap transition-colors',
            activeTab === tab.id
              ? 'text-[#e50000] border-b-2 border-[#e50000]'
              : 'text-[#999999] hover:text-white'
          ]">
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Personal Information Tab -->
      <div v-if="activeTab === 'personal'" class=" gap-8">
        <div class="">
          <div class="bg-[#1a1a1a] rounded-lg border border-[#333333] mb-8">
            <div class="p-6 border-b border-[#333333]">
              <h2 class="text-xl font-bold">Personal Information</h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="savePersonalInfo">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Full Name</label>
                    <input type="text" v-model="Profile.name"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Email Address</label>
                    <input type="email" v-model="Profile.email"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>

                </div>

                <div class="flex justify-end">
                  <button type="submit"
                  @click="updateProfile"
                    class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="bg-[#1a1a1a] rounded-lg border border-[#333333]">
            <div class="p-6 border-b border-[#333333]">
              <h2 class="text-xl font-bold">Password & Security</h2>
            </div>
            <div class="px-6">
              <div v-if="changePassword_success" class="text-green-500 mb-4">
              {{ changePassword_success }}
              </div>
              <div v-if="changePassword_error" class="text-red-500 mb-4">
                {{ changePassword_error }}
              </div>
            </div>
            <div class="p-6">
              <form @submit.prevent="changePassword">
                <div class="space-y-4 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Current Password</label>
                    <input type="password" v-model="passwordForm.current_password"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">New Password </label>
                    <input type="password" v-model="passwordForm.new_password"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#999999] mb-2">Confirm New Password</label>
                    <input type="password" v-model="passwordForm.new_password_confirmation"
                      class="w-full bg-[#262626] border border-[#333333] rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#e50000]" />
                  </div>
                </div>
                <div class="flex justify-end">
                  <button type="submit"
                    class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'" class="space-y-8">
        <!-- Upcoming Bookings -->
        <div class="bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="p-6 border-b border-[#333333]">
            <h2 class="text-xl font-bold">Upcoming Bookings</h2>
          </div>
          <div class="p-6">
            <div v-if="upcomingBookings.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="booking in upcomingBookings" :key="booking.id"
                class="bg-[#262626] rounded-lg overflow-hidden border border-[#333333] hover:border-[#e50000] transition-colors">
                <div class="relative h-40">
                  <img :src="booking.movieImage" :alt="booking.movieTitle" class="w-full h-full object-cover" />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 class="font-bold text-lg">{{ booking.movieTitle }}</h3>
                    <p class="text-sm text-[#999999]">{{ booking.cinema }}</p>
                  </div>
                </div>
                <div class="p-4 space-y-3">
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#e50000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-calendar">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>{{ booking.date }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#e50000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-clock">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{{ booking.time }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="#e50000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      class="lucide lucide-armchair">
                      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                      <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                      <path d="M5 18v2" />
                      <path d="M19 18v2" />
                    </svg>
                    <span>{{ booking.seats.join(", ") }}</span>
                  </div>
                  <div class="pt-3 flex justify-between border-t border-[#333333]">
                    <button class="text-[#e50000] hover:text-[#ff0707] font-medium transition-colors">
                      View Ticket
                    </button>
                    <button class="text-[#999999] hover:text-white transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-ticket mx-auto mb-4 text-[#666666]">
                <path
                  d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              <h3 class="text-xl font-medium mb-2">No Upcoming Bookings</h3>
              <p class="text-[#999999] mb-4">You don't have any upcoming movie bookings</p>
              <button
                class="bg-[#e50000] hover:bg-[#ff0707] text-white font-medium py-2 px-6 rounded-md transition-colors">
                Book a Movie
              </button>
            </div>
          </div>
        </div>

        <!-- Past Bookings -->
        <div class="bg-[#1a1a1a] rounded-lg border border-[#333333]">
          <div class="p-6 border-b border-[#333333]">
            <h2 class="text-xl font-bold">Booking History</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left text-xs text-[#999999] border-b border-[#333333]">
                  <th class="px-6 py-3 font-medium">Movie</th>
                  <th class="px-6 py-3 font-medium">Cinema</th>
                  <th class="px-6 py-3 font-medium">Date & Time</th>
                  <th class="px-6 py-3 font-medium">Seats</th>
                  <th class="px-6 py-3 font-medium">Amount</th>
                  <th class="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#333333]">
                <tr v-for="booking in pastBookings" :key="booking.id" class="text-sm">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <img :src="booking.movieImage" :alt="booking.movieTitle"
                        class="w-10 h-14 object-cover rounded-md mr-3" />
                      <span>{{ booking.movieTitle }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">{{ booking.cinema }}</td>
                  <td class="px-6 py-4">{{ booking.date }}<br>{{ booking.time }}</td>
                  <td class="px-6 py-4">{{ booking.seats.join(", ") }}</td>
                  <td class="px-6 py-4">${{ booking.amount.toFixed(2) }}</td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button class="text-[#e50000] hover:underline">View</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-[#333333] flex justify-center">
            <button class="text-[#999999] hover:text-white transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from '@/utils/axios';
const auth = useAuthStore()
const changePassword_success = ref('');
const changePassword_error = ref('');
const activeTab = ref('personal');
const tabs = [
  { id: 'personal', name: 'Personal Information' },
  { id: 'bookings', name: 'My Bookings' },
];

const Profile = ref({
  'name': "",
  'email': "",
  'profile_image': "",
  'created_at': ""
});

onMounted(() => {
  if (auth.user) {
    Profile.value.name = auth.user.name;
    Profile.value.email = auth.user.email;
    Profile.value.image = auth.user.profile_image ?? "/images/support.webp" ;
    Profile.value.created_at = new Date(auth.user.created_at).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });
  }
});

const updateProfile = async () => {
  try {
    const response = await axios.put('/user/profile', Profile.value);
    auth.user = response.data.user;
    localStorage.setItem('user', JSON.stringify(auth.user));  // Update local storage
    alert('Profile updated successfully!');
  } catch (error) {
    console.error('Error updating profile:', error);
    alert('Failed to update profile');
  }
};

const passwordForm = ref({
  current_password: '',
  new_password: '',
  new_password_confirmation: ''
});

const changePassword = async () => {
  if (passwordForm.value.new_password !== passwordForm.value.new_password_confirmation) {
    changePassword_error.value = 'New password and confirm password do not match';
    return;
  }

  try {
    const response = await axios.post('/password/change', {
      current_password: passwordForm.value.current_password,
      new_password: passwordForm.value.new_password,
      new_password_confirmation: passwordForm.value.new_password_confirmation
    });

    changePassword_success.value = response.data.message;
    changePassword_error.value = ''; 
    passwordForm.value = { current_password: '', new_password: '', new_password_confirmation: '' };

  } catch (error) {
    console.error('Error changing password:', error);
    changePassword_error.value = error.response?.data?.message || 'An error occurred while changing the password';
    changePassword_success.value = '';  
  }
};
const upcomingBookings = ref([
  {
    id: 1,
    movieTitle: 'Avengers: Endgame',
    movieImage: '/images/support.webp',
    cinema: 'Cineplex Odeon',
    date: 'April 15, 2023',
    time: '7:30 PM',
    seats: ['G12', 'G13']
  },
  {
    id: 2,
    movieTitle: 'The Batman',
    movieImage: '/images/support.webp',
    cinema: 'AMC Theatres',
    date: 'April 22, 2023',
    time: '8:00 PM',
    seats: ['F5', 'F6', 'F7']
  }
]);
const pastBookings = ref([
  {
    id: 1,
    movieTitle: 'Dune',
    movieImage: '/images/support.webp',
    cinema: 'Regal Cinemas',
    date: 'March 10, 2023',
    time: '6:45 PM',
    seats: ['H8', 'H9'],
    amount: 32.50
  },
  {
    id: 2,
    movieTitle: 'No Time to Die',
    movieImage: '/images/support.webp',
    cinema: 'Landmark Theatres',
    date: 'February 25, 2023',
    time: '9:15 PM',
    seats: ['J10', 'J11'],
    amount: 30.25
  },
  {
    id: 3,
    movieTitle: 'Spider-Man: No Way Home',
    movieImage: '/images/support.webp',
    cinema: 'Alamo Drafthouse',
    date: 'February 12, 2023',
    time: '5:30 PM',
    seats: ['D15', 'D16'],
    amount: 35.00
  },
  {
    id: 4,
    movieTitle: 'Black Widow',
    movieImage: '/images/support.webp',
    cinema: 'Cineplex Odeon',
    date: 'January 28, 2023',
    time: '7:00 PM',
    seats: ['E7', 'E8'],
    amount: 28.75
  }
]);
</script>