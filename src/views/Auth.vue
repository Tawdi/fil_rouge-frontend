<template>
  <div class="py-16"></div>

  <div class="container mx-auto px-4 flex-1 flex items-center justify-center">
    <div class="w-full max-w-md bg-[#1a1a1a] rounded-xl shadow-lg overflow-hidden">
      <div class="flex border-b border-[#333]">
        <button class="flex-1 py-4 text-center font-medium transition-colors"
          :class="activeTab === 'login' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
          @click="toggleTab('login')">
          Login
        </button>
        <button class="flex-1 py-4 text-center font-medium transition-colors"
          :class="activeTab === 'register' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'"
          @click="toggleTab('register')">
          Register
        </button>
      </div>

      <!-- Login Form -->
      <div v-if="activeTab === 'login'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        <form @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="login-email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input id="login-email" type="email" v-model="loginForm.email"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="your@email.com" required />
              <p v-if="submitted && !loginEmailValid" class="text-red-500 text-sm">Please enter a valid email address
              </p>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="login-password" class="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" class="text-xs text-red-400 hover:text-red-300">Forgot Password?</a>
              </div>
              <input id="login-password" type="password" v-model="loginForm.password"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••" required />
            </div>


            <button type="submit"
              class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
              Sign In
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#333]"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-[#1a1a1a] text-gray-400">Or continue with</span>
            </div>
          </div>

          <div class="mt-6">
            <button
            @click="handleGoogleLogin"
              class="flex w-full justify-center items-center py-2 px-4 border border-[#333] rounded-lg hover:bg-[#272727] transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Register Form -->
      <div v-if="activeTab === 'register'" class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form @submit.prevent="handleRegister">
          <div class="space-y-4">
            <div>
              <label for="full-name" class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input id="full-name" type="text" v-model="registerForm.name"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="your name" required />
            </div>
            <div>
              <label for="register-email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input id="register-email" type="email" v-model="registerForm.email"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="your@email.com" required />
              <p v-if="submitted && !registerEmailValid" class="text-red-500 text-sm">Please enter a valid email address
              </p>
            </div>

            <div>
              <label for="register-password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input id="register-password" type="password" v-model="registerForm.password"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••" required />
            </div>
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-300 mb-1">Confirm
                Password</label>
              <input id="confirm-password" type="password" v-model="registerForm.password_confirmation"
                class="w-full px-4 py-2 bg-[#272727] border border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="••••••••" required />
              <p v-if="submitted && passwordMismatch" class="mt-1 text-sm text-red-500">Passwords do not match</p>
            </div>

            <button type="submit"
              class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors">
              Create Account
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[#333]"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-[#1a1a1a] text-gray-400">Or register with</span>
            </div>
          </div>

          <div class="mt-6">
            <button
            @click="handleGoogleLogin"
              class="flex justify-center w-full items-center py-2 px-4 border border-[#333] rounded-lg hover:bg-[#272727] transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div v-if="successMessage" class="mb-4 p-3 rounded bg-green-100 text-green-700">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router'

const router = useRouter()
const successMessage = ref('')
const errorMessage = ref('')
const loading = ref(false)

const activeTab = ref('login')
const submitted = ref(false);
const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'user'
})

const toggleTab = (tabName) => {
  activeTab.value = tabName
  successMessage.value = ''
  errorMessage.value = ''
  submitted.value = false
}

const auth = useAuthStore()

const handleLogin = async () => {
  submitted.value = true
  if (!loginFormValid.value) {
    console.log('Login form error')
    return
  }
  try {
    await auth.login(loginForm)
    const role = auth.user?.role
    successMessage.value = 'Login successful!'
    if (role === 'super_admin') {
      router.push('/admin/dashboard')
    } else if (role === 'cinema_admin') {
      router.push('/cinema-admin/dashboard')
    } else {
      router.push('/')
    }
  } catch (err) {
    console.log('Login error:', err)
    errorMessage.value = 'Login failed. Please check your credentials.'
  }
}

const passwordMismatch = computed(() => {
  return registerForm.password &&
    registerForm.password_confirmation &&
    registerForm.password !== registerForm.password_confirmation
})

const loginEmailValid = computed(() => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(loginForm.email);
});

const registerEmailValid = computed(() => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(registerForm.email);
});

const loginFormValid = computed(() => {
  return loginEmailValid.value && loginForm.password.trim() !== '';
});

const registerFormValid = computed(() => {
  return (
    registerForm.name.trim() !== '' &&
    registerEmailValid.value &&
    registerForm.password.trim() !== '' &&
    registerForm.password_confirmation.trim() !== '' &&
    !passwordMismatch.value
  );
});

const handleRegister = async () => {
  submitted.value = true
  if (!registerFormValid.value) {
    console.log('Register form error')
    return
  }
  try {
    await auth.register(registerForm)
    successMessage.value = 'Registration successful!'
    toggleTab('login');
  } catch (err) {
    console.log('Register error:', err)
    errorMessage.value = 'Registration failed. Please try again.'
  }
}
const handleGoogleLogin = () => {
  window.location.href = 'http://127.0.0.1:8000/api/auth/google/redirect'
}
</script>

<style></style>