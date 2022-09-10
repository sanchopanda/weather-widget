<template>
  <div class="weather">
    <button class="weather__settings-toggle"></button>
    <div class="weather__settings">
      <Settings :cities="cities" @updateCities="updateCities" />
    </div>
    <div class="weather__cards">
      <Card v-for="city in cities" :key="city" :city="city" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import Settings from "@/components/Settings/Settings.vue";
import { fetchCurrentCity } from "@/api";

export default {
  name: "App",
  components: {
    Card,
    Settings,
  },
  data() {
    return {
      cities: [],
    };
  },
  async mounted() {
    this.cities = localStorage.getItem("weather-cities") || [
      await fetchCurrentCity(),
    ];
  },
  methods: {
    updateCities(value) {
      this.cities = value;
    },
  },
};
</script>

<style>
@import "@/styles/weather.scss";
</style>
