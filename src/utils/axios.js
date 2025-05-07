import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true,
})

let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

//  Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }


    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => Promise.reject(error)
)

//  Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return instance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const authStore = useAuthStore()

      try {
        const refreshResponse = await authService.refreshToken()
        const newToken = refreshResponse.token

        localStorage.setItem('token', newToken)
        instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        authStore.token = newToken
        authStore.user = refreshResponse.user

        processQueue(null, newToken)
        return instance(originalRequest)
      } catch (err) {
        processQueue(err, null)
        authStore.logout()
        router.push('/connecte')
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    if (error.response && error.response.status === 404) {
      console.error('Resource not found:', originalRequest.url)
      router.push('/404')
    }
    if (error.response && error.response.status === 403) {
      console.error('Resource not found:', originalRequest.url)
      router.push('/403')
    }
    return Promise.reject(error)
  }
)

export default instance
