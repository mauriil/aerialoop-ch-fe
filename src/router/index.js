import { createRouter, createWebHistory } from "vue-router";
import FlightDetailView from "../views/FlightDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "flightDetail",
      component: FlightDetailView,
    },
  ],
});

export default router;
