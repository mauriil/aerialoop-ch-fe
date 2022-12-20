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
    async getFlightData(flightFile) {
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
    <h3>Flight data will appear here.</h3>
  </div>
</template>
