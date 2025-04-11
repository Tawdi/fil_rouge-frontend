<template>
  <div class="mt-24">
    <div class="flex items-center justify-between">
    <div>
    <h2 class="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
    <p class="text-[#999999] mb-8">
      Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions
      about MovieSeat.
    </p>
  </div>
    <slot></slot>
  </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- FAQ Items -->
      <div v-for="(faq, index) in faqs" :key="index" class="border-bottom-gradient">
        <div class="flex items-center justify-between py-4">
          <div class="flex items-center gap-4">
            <span
              class="bg-[#1f1f1f] text-white w-8 h-8 rounded-md p-4 border-2 border-[#272727] flex items-center justify-center">
              {{ faq.num }}
            </span>
            <h3 class="font-medium">{{ faq.question }}</h3>
          </div>
          <button class="p-2 bg-transparent" @click="toggleFaq(index)">
            <div v-if="!faq.isOpen" class="px-4 py-1 rounded-md text-xl font-bold hover:bg-[#1a1a1a]">+</div>
            <div v-else class="w-5 h-5 text-xl font-bold">-</div>
          </button>
        </div>
        <div v-if="faq.isOpen" class="pl-12 pb-4 text-[#999999]">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';


// FAQ data
const faqs = ref([
    {
      num: '01',
      question: 'What is MovieSeat?',
      answer: 'MovieSeat is an application that allows you to book cinema ticket.',
      isOpen: true
    },
    {
      num: '02',
      question: 'How do I book a movie ticket?',
      answer: 'You can book a movie ticket by selecting a movie, choosing a cinema location, selecting your preferred showtime, and completing the payment process.',
      isOpen: false
    },
    {
      num: '03',
      question: 'Can I choose my seats?',
      answer: 'Yes, you can select your preferred seats from the available seating chart during the booking process.',
      isOpen: false
    },
    {
      num: '04',
      question: 'How do I modify or cancel my reservation?',
      answer: 'You can modify or cancel your reservation by logging into your account, navigating to your bookings, and selecting the modify or cancel option.',
      isOpen: false
    },
    {
      num: '05',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit/debit cards, digital wallets, and gift cards as payment methods.',
      isOpen: false
    },
    {
      num: '06',
      question: 'Do I need an account to book tickets?',
      answer: 'Yes, you need to create an account to book tickets. This helps you manage your bookings and receive updates.',
      isOpen: false
    },
    {
      num: '07',
      question: 'How do I find cinema locations?',
      answer: 'You can find cinema locations by using the location search feature in the app or website.',
      isOpen: false
    },
    {
      num: '08',
      question: 'How can I contact support?',
      answer: 'You can contact support through the contact form on this page, or by emailing support@movieseat.com.',
      isOpen: false
    }
  ])
  
  // Toggle FAQ open/close
  const toggleFaq = (index) => {
    faqs.value[index].isOpen = !faqs.value[index].isOpen
  }

</script>
<style>
  .border-bottom-gradient {
    position: relative;
    padding-bottom: 20px;
  }

  .border-bottom-gradient::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px; 
    background: radial-gradient(circle, rgba(251, 63, 63, 0.8) 0%, rgba(255, 0, 24, 0) 100%);
  }
</style>