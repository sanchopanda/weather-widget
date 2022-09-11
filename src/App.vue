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

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card/Card.vue";
import Settings from "@/components/Settings/Settings.vue";
import { fetchCurrentCity } from "@/api";

export default defineComponent({
  name: "App",
  components: {
    Card,
    Settings,
  },
  data() {
    return {
      cities: [] as Array<string>,
    };
  },
  async mounted() {
    this.cities = JSON.parse(
      localStorage.getItem("weather-cities") as string
    ) ?? [await fetchCurrentCity()];
  },
  methods: {
    updateCities(value: Array<string>) {
      this.cities = value;
      console.log(this.cities, value);
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/weather.scss";
</style>
