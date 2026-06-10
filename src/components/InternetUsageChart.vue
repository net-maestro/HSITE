<template>
    <v-card class="card-animate">
      <v-card-title class="text-center">Internet Usage Statistics</v-card-title>
      <v-card-subtitle class="text-center text-h6 text-uppercase mt-1 mb-4">Data Over Time</v-card-subtitle>
      <v-card-text>
        <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
  );
  
  export default defineComponent({
    name: 'InternetUsageChart',
    components: {
      LineChart: Line,
    },
    setup() {
      const chartData = ref({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data Usage (GB)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      });
  
      const chartOptions = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Internet Usage Over Time',
          },
        },
      });
  
      return {
        chartData,
        chartOptions,
      };
    },
  });
  </script>
  
  <style scoped>
  .card-animate {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(110px);
    animation: slideUp 1s forwards;
  }
  
  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  