<template>
  <div class="charts-container">
    <div
      v-for="asset in user.assets"
      :key="asset.type"
      class="asset"
      @click="toggleFullSize(asset)"
    >
      <!-- Asset Title -->
      <h3 class="asset-title">{{ asset.type }}</h3>
      <!-- Line Chart -->
      <LineChart :data="formatChartData(asset)" :options="chartOptions" />
    </div>

    <!-- Full-size Chart Modal -->
    <div v-if="fullSizeAsset" class="modal-overlay" @click="closeFullSize">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeFullSize">&times;</button>
        <h3 class="modal-title">{{ fullSizeAsset.type }}</h3>
        <LineChart :data="formatChartData(fullSizeAsset)" :options="chartOptions" />
      </div>
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
    const fullSizeAsset = ref<Asset | null>(null); // Asset to preview in full size

    const formatChartData = (asset: Asset) => {
      return {
        labels: asset.valuation_history.map((vh) => vh.date),
        datasets: [
          {
            label: asset.type,
            data: asset.valuation_history.map((vh) => vh.value),
            borderColor: colorPalette[Math.floor(Math.random() * colorPalette.length)],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            tension: 0.4,
          },
        ],
      };
    };

    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          display: false,
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

    const toggleFullSize = (asset: Asset) => {
      fullSizeAsset.value = asset; // Set the clicked asset as full-size
    };

    const closeFullSize = () => {
      fullSizeAsset.value = null; // Reset the full-size asset to close modal
    };

    return { formatChartData, chartOptions, fullSizeAsset, toggleFullSize, closeFullSize };
  },
});
</script>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Fit 3 charts per row */
  gap: 20px; /* Space between charts */
}

.asset-title {
  background-color: #7cbcff;
  padding: 2px;
  border-radius: 10px;
}

.asset {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
}

.asset:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content */
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 800px;
  text-align: center;
  position: relative;
}

.modal-title {
  font-size: 1.8rem;
  color: #007bff;
  margin-bottom: 15px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
}

.close-button:hover {
  color: #007bff;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .charts-container {
    grid-template-columns: repeat(2, 1fr); /* 2 charts per row for medium screens */
  }
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr; /* 1 chart per row for small screens */
  }
}
</style>
