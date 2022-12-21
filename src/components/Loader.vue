<script>
export default {
  name: "LoaderComponent",
  props: {
    loadingText: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: "125",
    },
    height: {
      type: String,
      default: "125",
    },
  },
};
</script>

<template>
  <img
    alt="Aerialoop logo"
    class="logo"
    src="@/assets/loader.svg"
    :width="width"
    :height="height"
  />
  <p class="blue">{{ loadingText }}</p>
</template>

<style scoped></style>
