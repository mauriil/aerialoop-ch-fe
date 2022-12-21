<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
import Loader from "@/components/Loader.vue";

export default {
  name: "FlightData",
  data() {
    return {
      loading: false,
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
    Loader,
  },
  mounted() {},
  methods: {
    getFlightData(flightFile) {
      this.loading = true;
      this.flightData = [];
      this.options.xaxis.categories = [];
      this.series[0].data = [];
      this.options.annotations.points = [];
      setTimeout(() => {
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
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            console.error(
              "file: FlightData.vue:28 ~ getFlightData ~ error",
              error.message
            );
          });
      }, 1000);
    },
  },
};
</script>

<template>
  <div class="parent">
    <Loader v-if="loading" loadingText="Loading flight data..." />
    <h3 class="child" v-if="flightData.length === 0 && !loading" >
      Flight data will appear here.
    </h3>
    <apexchart
      class="child"
      v-else-if="flightData.length > 0"
      type="line"
      :options="options"
      :series="series"
    />
  </div>
</template>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.child {
  width: 100%;
  height: 100%;
}
</style>
