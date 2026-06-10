<template>
    <div class="countdown-container">
      <v-container fluid class="text-center">
        <v-row justify="center">
          <v-col cols="12">
            <h1 class="countdown-title">До Нового року залишилося:</h1>
            <div class="countdown-timer">
              <span class="time">{{ timeLeft.days }}</span><small>днів</small>
              <span class="time">{{ timeLeft.hours }}</span><small>годин</small>
              <span class="time">{{ timeLeft.minutes }}</span><small>хвилин</small>
              <span class="time">{{ timeLeft.seconds }}</span><small>секунд</small>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "NewYearCountdown",
    data() {
      return {
        timeLeft: {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        },
        countdownInterval: null,
      };
    },
    methods: {
      updateCountdown() {
        const now = new Date();
        const nextYear = new Date(now.getFullYear() + 1, 0, 1); // 1 січня наступного року
        const diff = nextYear - now;
  
        if (diff <= 0) {
          clearInterval(this.countdownInterval);
          this.timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          return;
        }
  
        this.timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        this.timeLeft.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        this.timeLeft.minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.timeLeft.seconds = Math.floor((diff / 1000) % 60);
      },
    },
    mounted() {
      this.updateCountdown();
      this.countdownInterval = setInterval(this.updateCountdown, 1000);
    },
    beforeUnmount() {
      clearInterval(this.countdownInterval);
    },
  };
  </script>
  
  <style scoped>
  .countdown-container {
    background: url("path/to/new-year-bg.jpg") no-repeat center center;
    background-size: cover;
    padding: 20px;
    color: white;
  }
  
  .countdown-title {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  
  .countdown-timer {
    display: flex;
    justify-content: center;
    gap: 15px;
    font-size: 1.5rem;
  }
  
  .time {
    font-size: 2rem;
    font-weight: bold;
    margin-right: 5px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }
  </style>
  