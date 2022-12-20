<script>
import axios from "axios";

export default {
  name: "FlightData",
  data() {
    return {
      flightData: [],
    };
  },
  mounted() {},
  methods: {
    getFlightData(flightFile) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/flights/${flightFile}`)
        .then((response) => {
          this.flightData = response.data;
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
    <h3 v-else>{{flightData[1]}}</h3>
  </div>
</template>
