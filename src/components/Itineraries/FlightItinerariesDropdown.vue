<script>
import axios from "axios";

export default {
  name: "FlightItinerariesDropdown",
  data() {
    return {
      itineraries: [],
    };
  },
  mounted() {
    this.getItineraries();
  },
  methods: {
    getItineraries() {
      axios
        .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/itineraries`)
        .then((response) => {
          this.itineraries = response.data;
          this.itineraries = this.itineraries.map((itinerarie) => {
            return {
              id: itinerarie["itinerary ID"],
              from: itinerarie["from location"],
              to: itinerarie["to location"],
              path: itinerarie["flight data file"],
            };
          });
        })
        .catch((error) => {
          console.error(
            "file: FlightItinerariesDropdown.vue:28 ~ getItineraries ~ error",
            error.message
          );
        });
    },
    onChange(event) {
      this.$root.$emit("flightIdSelected", event.target.value);
      this.$emit("flightIdSelected", event.target.value);
    },
  },
};
</script>

<template>
  <div>
    <select @change="onChange($event)">
      <option disabled selected>Select an itinerary</option>
      <option v-if="itineraries.length === 0" disabled value="">
        No itineraries to show
      </option>
      <option
        v-else
        v-for="itinerarie in itineraries"
        :value="itinerarie.path"
        v-bind:key="itinerarie.id"
      >
        (#{{ itinerarie.id }}) {{ itinerarie.from }} -> {{ itinerarie.to }}
      </option>
    </select>
  </div>
</template>
