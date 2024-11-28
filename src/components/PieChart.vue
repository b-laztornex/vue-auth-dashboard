<template>
  <div class="pie-chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
// Use `import type` for type-only imports
import type { ChartConfiguration } from 'chart.js';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

// Register necessary Chart.js components
Chart.register(ArcElement, Tooltip, Legend, PieController);

export default defineComponent({
  name: 'PieChart',
  props: {
    /**
     * The data for the pie chart (dynamic asset data from the backend)
     * Includes labels and datasets
     */
    data: {
      type: Object as () => ChartConfiguration['data'],
      required: true,
    },
    /**
     * Optional chart options for customizing the pie chart behavior
     */
    options: {
      type: Object as () => ChartConfiguration['options'],
      default: () => ({}),
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chart | null = null;

    const renderChart = () => {
      if (canvas.value) {
        if (chart) {
          chart.destroy(); // Destroy any existing chart before creating a new one
        }
        chart = new Chart(canvas.value, {
          type: 'pie', // Define pie chart
          data: props.data,
          options: props.options,
        });
      }
    };

    // Re-render the chart if the data prop changes
    watch(() => props.data, renderChart, { deep: true });

    // Render the chart after mounting
    onMounted(() => {
      renderChart();
    });

    return { canvas };
  },
});
</script>

<style>
.pie-chart-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

canvas {
  display: block;
  width: 100%;
  height: auto;
}
</style>
