<template>
  <div class="asset-overview">
    <h2>Asset Overview</h2>
    <button @click="toggleChartVisibility" class="toggle-chart-button">
      {{ showChart ? 'Hide' : 'Show' }} Asset Distribution
    </button>
    <div v-if="showChart" class="chart-container">
      <PieChart :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import PieChart from './PieChart.vue';
import type { Asset } from '@/types/types';
import { colorPalette } from '@/constants/colors';

export default defineComponent({
  components: { PieChart },
  props: {
    assets: {
      type: Array as () => Asset[],
      required: true,
    },
  },
  setup(props) {
    const showChart = ref(true);

    const toggleChartVisibility = () => {
      showChart.value = !showChart.value;
    };

    const chartData = computed(() => {
      const labels = props.assets.map((asset) => asset.type);
      const data = props.assets.map(
        (asset) => asset.valuation_history[asset.valuation_history.length - 1]?.value || 0
      );

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colorPalette.slice(0, props.assets.length),
            hoverBackgroundColor: colorPalette.slice(0, props.assets.length),
          },
        ],
      };
    });

    const chartOptions = computed(() => ({
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              weight: 'bold',
            },
            color: '#333',
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#000',
          bodyColor: '#000',
          borderColor: '#ddd',
          borderWidth: 1,
          titleFont: {
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            size: 12,
          },
        },
      },
    }));

    return {
      showChart,
      toggleChartVisibility,
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
.asset-overview {
  text-align: center;
  margin: 20px 0;
}

.toggle-chart-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

.toggle-chart-button:hover {
  background-color: #0056b3;
}

.chart-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
