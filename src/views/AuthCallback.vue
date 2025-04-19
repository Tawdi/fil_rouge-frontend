<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  const token = route.query.token

  if (token) {
    localStorage.setItem('token', token)
    auth.token = token

    await auth.fetchUser()
    console.log('user after fetchUser():', auth.user) 

    if (auth.user?.role === 'super_admin') {
      router.push('/admin/dashboard')
    } else if (auth.user?.role === 'cinema_admin') {
      router.push('/cinema-admin/dashboard')
    } else if (auth.user?.role === 'user') {
      router.push('/')
    } else {
      router.push('/else')
    }
  } else {
    router.push('/connecte')
  }
})

</script>

<template>
  <div class="text-center mt-20 text-gray-700">
    Redirecting...
  </div>
</template>
