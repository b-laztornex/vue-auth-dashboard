<template>
  <div class="asset-distribution">
    <h2 class="chart-title">Asset Distribution</h2>
    <PieChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import PieChart from '@/components/PieChart.vue';
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
    // Compute the chart data
    const chartData = computed(() => {
      const labels = props.assets.map((asset) => asset.type);
      const data = props.assets.map(
        (asset) => asset.valuation_history[asset.valuation_history.length - 1].value
      );
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colorPalette.slice(0, props.assets.length), // Use the color palette
            hoverBackgroundColor: colorPalette.map((color) => `${color}B3`), // Add transparency on hover
          },
        ],
      };
    });

    // Define chart options
    const chartOptions = ref({
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#333',
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
        tooltip: {
          backgroundColor: '#fff',
          bodyColor: '#333',
          borderColor: '#ddd',
          borderWidth: 1,
          bodyFont: {
            size: 14,
          },
        },
      },
    });

    return { chartData, chartOptions };
  },
});
</script>

<style scoped>
.asset-distribution {
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.8rem;
  text-align: center;
  color: #007bff;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.chart-title:hover {
  color: #0056b3;
}

canvas {
  max-width: 100%;
  margin: 0 auto;
}
</style>
