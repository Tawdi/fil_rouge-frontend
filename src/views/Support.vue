<template>
  <div class="max-w-7xl mx-auto pt-44 px-4">
    <!-- Support Section -->
    <div class="grid md:grid-cols-2 gap-5 lg:gap-12 ">
      <div class="flex flex-col justify-between">
        <h1 class="text-5xl font-bold mb-4">Welcome to our<br> support page!</h1>
        <p class="text-[#999999] mb-8">
          We're here to help you with any problems you may be having with our product.
        </p>

        <div class="w-full h-[477px] border-[#1a1a1a] border-4 rounded-lg">
          <img src="/images/support.webp" alt="support" class="h-full w-full object-cover">
        </div>
      </div>

      <!-- Contact Form -->
      <div
        class="bg-[#0F0F0F]  border-[#1a1a1a] border-4 rounded-lg  p-8 lg:p-12 flex flex-col justify-between gap-5 md:gap-10">
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4 ">
          <div>
            <label class="block mb-2">First Name</label>
            <input type="text" placeholder="Enter First Name"
              class="w-full bg-[#141414] border-[#262626] border-2 rounded-md  p-3 text-white"
              v-model="form.firstName" />
          </div>
          <div>
            <label class="block mb-2">Last Name</label>
            <input type="text" placeholder="Enter Last Name"
              class="w-full bg-[#141414] border-[#262626] border-2 rounded-md p-3 text-white" v-model="form.lastName" />
          </div>
        </div>

        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
          <div>
            <label class="block mb-2">Email</label>
            <input type="email" placeholder="Enter your Email"
              class="w-full bg-[#141414] border-[#262626] border-2 rounded-md p-3 text-white" v-model="form.email" />
          </div>
          <div>
            <label class="block mb-2">Phone Number</label>
            <input type="tel" placeholder="Enter Phone Number"
              class="w-full bg-[#141414] border-[#262626] border-2 rounded-md p-3 text-white" v-model="form.phone" />
          </div>
        </div>

        <div class="mb-6">
          <label class="block mb-2">Message</label>
          <textarea placeholder="Enter your Message" rows="5"
            class="w-full bg-[#141414] border-[#262626] border-2 rounded-md p-3 text-white resize-none"
            v-model="form.message"></textarea>
        </div>
        <div class="flex flex-col sm:flex-row justify-between items-start  gap-4">
          <div class="flex items-center gap-2 mb-6">
            <input type="checkbox" id="terms" v-model="form.termsAccepted"
              class="rounded border-[#999999] text-[#e50000] focus:ring-[#e50000]" />
            <label for="terms" class="text-sm text-[#999999]">
              I agree with Terms of Use and Privacy Policy
            </label>
          </div>

          <button class="bg-[#e50000] text-white py-3 px-6 text-nowrap rounded md:w-fit w-full" @click="sendMessage">
            Send Message
          </button>
        </div>
      </div>
    </div>
     <!-- FAQ Section -->
      <FAQ></FAQ>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import FAQ from '../components/FAQ.vue';

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  termsAccepted: false
})
</script>

<style></style>