<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "FlightData",
  data() {
    return {
      flightData: [],
      options: {
        chart: {
          id: "wats-consumption",
        },
        xaxis: {
          categories: [],
        },
        annotations: {
          points: [],
        },
      },
      series: [
        {
          name: "WATS (W)",
          data: [],
        },
      ],
    };
  },
  components: {
    apexchart: VueApexCharts,
  },
  mounted() {},
  methods: {
    getFlightData(flightFile) {
      if (this.options.xaxis.categories.length > 0) {
        this.options.xaxis.categories = [];
        this.series[0].data = [];
      }
      axios
        .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/flights/${flightFile}`)
        .then((response) => {
          this.flightData = response.data;
          for (const flightData of response.data) {
            const day = new Date(+flightData.TIME_StartTime)
              .toISOString()
              .split("T")[0];
            const time = new Date(+flightData.TIME_StartTime)
              .toISOString()
              .split("T")[1]
              .split(".")[0];
            this.options.xaxis.categories.push(`${day} ${time}`);
            this.series[0].data.push(
              (+flightData.BATT_VFilt * +flightData.BATT_CFilt).toFixed(2)
            );
            if (+flightData.BATT_Warning !== 0) {
              this.options.annotations.points.push({
                x: this.options.xaxis.categories.length - 1,
                y: +flightData.BATT_VFilt * +flightData.BATT_CFilt,
                marker: {
                  size: 8,
                  fillColor: "#fff",
                  strokeColor: "#FF4560",
                  radius: 2,
                },
                label: {
                  borderColor: "black",
                  offsetY: 0,
                  style: {
                    color: "#fff",
                    background: "#775DD0",
                  },
                  text: `BATTERY VOLTAGE WARNING`,
                },
              });
            }
          }
        })
        .catch((error) => {
          console.error(
            "file: FlightData.vue:28 ~ getFlightData ~ error",
            error.message
          );
        });
    },
  },
};
</script>

<template>
  <div>
    <h3 v-if="flightData.length === 0">Flight data will appear here.</h3>
    <apexchart v-else type="line" :options="options" :series="series" />
  </div>
</template>
