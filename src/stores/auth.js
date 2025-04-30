// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'
import axios from '@/utils/axios'
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    const response = await authService.login(credentials)
    token.value = response.token
    user.value = response.user
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
  }

  async function register(data) {
    const response = await authService.register(data)
    token.value = response.token
    user.value = response.user
    localStorage.setItem('user', JSON.stringify(response.user))
    localStorage.setItem('token', response.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`
  }

  async function fetchUser() {
    if (!token.value) return
  const  userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      user.value = userData;
      console.log("user : ",userData);
    }else{
      const response = await authService.getUser()
      localStorage.setItem('user', JSON.stringify(response))
      user.value = response
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    router.push('/connecte')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    fetchUser,
    logout
  }
})
