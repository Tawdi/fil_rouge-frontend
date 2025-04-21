<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <DashboardHeader />

    <!-- Main Users Content -->
    <main class="flex-1 overflow-y-auto p-6">
      <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold">Users</h1>
          <p class="text-[#999999]">Manage user accounts and permissions</p>
        </div>
      </div>
      <!-- Filters and Search -->
      <div class="bg-[#1a1a1a] rounded-lg p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div class="relative w-full sm:w-64">
              <input v-model="searchQuery" type="text" placeholder="Search users..."
                class="bg-[#262626] border border-[#333333] rounded-md py-2 px-4 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#e50000]" />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-search absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666666]">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <span class="text-xs text-[#999999]">Joined:</span>
              <input v-model="dateFilter" type="date"
                class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#e50000]" />
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <select v-model="roleFilter"
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#e50000]">
              <option value="">All Roles</option>
              <option value="super_admin">Admin</option>
              <option value="cinema_admin">Cinema Admin</option>
              <option value="user">Customer</option>
            </select>
            <select v-model="statusFilter"
              class="bg-[#262626] border border-[#333333] rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#e50000]">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="suspended">Suspended</option>
            </select>
            <button @click="showAddUserModal = true"
              class="bg-[#e50000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-md flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-plus mr-2">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add User
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-[#1a1a1a] rounded-lg overflow-hidden mb-6">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left text-xs text-[#999999] border-b border-[#333333]">
                <th class="px-4 py-3 font-medium">ID</th>
                <th class="px-4 py-3 font-medium">User</th>
                <th class="px-4 py-3 font-medium">Email</th>
                <th class="px-4 py-3 font-medium">Role</th>
                <th class="px-4 py-3 font-medium">Status</th>
                <th class="px-4 py-3 font-medium">Joined</th>
                <th class="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#333333]">
              <tr v-for="user in users" :key="user.id" class="text-sm hover:bg-[#262626]">
                <td class="px-4 py-3 font-medium">{{ user.id }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center overflow-hidden">
                      <img v-if="user.profile_image" :src="user.profile_image" :alt="user.name"
                        class="w-full h-full object-cover" />
                      <span v-else>{{ getUserInitials(user.name) }}</span>
                    </div>
                    <div>{{ user.name }}</div>
                  </div>
                </td>
                <td class="px-4 py-3">{{ user.email }}</td>
                <td class="px-4 py-3">
                  <span :class="[
                    'px-2 py-1 text-xs rounded-md',
                    user.role === 'super_admin'
                      ? 'bg-purple-900/30 text-purple-500'
                      : user.role === 'cinema_admin'
                        ? 'bg-blue-900/30 text-blue-500'
                        : 'bg-gray-900/30 text-gray-500',
                  ]">
                    {{ user.role === 'super_admin' ? 'Admin' : user.role === 'cinema_admin' ? 'Cinema Admin' : 'Customer' }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <span :class="[
                    'px-2 py-1 text-xs rounded-full',
                    user.status === 'active'
                      ? 'bg-green-900/30 text-green-500'
                      : user.status === 'suspended'
                        ? 'bg-yellow-900/30 text-yellow-500'
                        : 'bg-red-900/30 text-red-500',
                  ]">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-4 py-3">{{ formatDate(user.created_at) }}</td>
                <td class="px-4 py-3">
                  <div class="flex space-x-2">
                    <button @click="viewUserDetails(user)"
                      class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-white" title="View Details">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-eye">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    <button @click="editUser(user)"
                      class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-white" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-pencil">
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
                    <button v-if="user.status !== 'Suspended'" @click="confirmSuspendUser(user)"
                      class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-yellow-500" title="Suspend">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-ban">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.9 4.9 14.2 14.2" />
                      </svg>
                    </button>
                    <button v-else @click="activateUser(user)"
                      class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-green-500" title="Activate">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-check-circle">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                    </button>
                    <button @click="confirmDeleteUser(user)"
                      class="p-1 rounded-md text-[#999999] hover:bg-[#333333] hover:text-red-500" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-trash-2">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="8" class="px-4 py-6 text-center text-[#999999]">
                  No users found matching your criteria
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  <!-- Confirmation Modal -->
  <ConfirmationModal v-if="showSuspendModal" title="Suspend User"
    :message="`Are you sure you want to suspend ${currentUser?.name}? They will not be able to log in until reactivated.`"
    @confirm="suspendUser" @cancel="showSuspendModal = false" />
  <ConfirmationModal v-if="showDeleteModal" title="Delete User"
    :message="`Are you sure you want to delete ${currentUser?.name}? This action cannot be undone.`"
    confirm-text="Delete" confirm-class="bg-red-600 hover:bg-red-700" @confirm="deleteUser"
    @cancel="showDeleteModal = false" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/utils/axios';

const users =ref([]);

onMounted( async ()=>{
  try {
    const response = await axios.get("/admin/users");
    users.value = response.data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
})

const getUserInitials = (name) => {
  if (!name) return '';
  
  const nameParts = name.split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  
  return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
};
</script>
