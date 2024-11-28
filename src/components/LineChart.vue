<template>
  <div class="line-chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import type { ChartConfiguration } from 'chart.js';

// Register necessary Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default defineComponent({
  name: 'LineChart',
  props: {
    /**
     * The data for the line chart (dynamic data from the backend)
     * Should include labels (dates) and datasets (values)
     */
    data: {
      type: Object as () => ChartConfiguration['data'],
      required: true,
    },
    /**
     * Additional options for customizing the chart's behavior and style
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
          type: 'line', // Line chart type
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
.line-chart-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

canvas {
  display: block;
  width: 100%;
  height: auto;
}
</style>
