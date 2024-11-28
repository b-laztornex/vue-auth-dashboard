<template>
  <div>
    <div v-for="asset in user.assets" :key="asset.type" class="asset">
      <!-- Asset Title -->
      <h3 class="asset-title">{{ asset.type }}</h3>
      <!-- Line Chart -->
      <LineChart :data="formatChartData(asset)" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LineChart from './LineChart.vue';
import type { Asset, User } from '@/types/types';
import { colorPalette } from '@/constants/colors';

export default defineComponent({
  components: { LineChart },
  props: {
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  setup(props) {
    const formatChartData = (asset: Asset) => {
      return {
        labels: asset.valuation_history.map((vh) => vh.date),
        datasets: [
          {
            label: asset.type,
            data: asset.valuation_history.map((vh) => vh.value),
            borderColor: colorPalette[Math.floor(Math.random() * colorPalette.length)], // Randomized color
            backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            tension: 0.4, // Smooth curve
          },
        ],
      };
    };

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide legend for cleaner look
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#fff',
          titleColor: '#333',
          bodyColor: '#333',
          borderColor: '#ddd',
          borderWidth: 1,
          titleFont: { size: 16, weight: 'bold' },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#666',
            font: { size: 12 },
          },
          grid: {
            color: '#f3f3f3',
          },
        },
        y: {
          ticks: {
            color: '#666',
            font: { size: 12 },
          },
          grid: {
            color: '#f3f3f3',
          },
        },
      },
    });

    return { formatChartData, chartOptions };
  },
});
</script>

<style scoped>
.asset {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.asset:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.asset-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #007bff;
  transition: color 0.2s ease;
  text-align: center;
}

.asset-title:hover {
  color: #0056b3;
}

canvas {
  max-width: 100%;
}
</style>
