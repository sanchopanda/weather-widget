<template>
  <div class="app">
    <div class="app__inner">
      <button class="app__settings-toggle" @click="settingsVisible = true">
        <img v-svg-inline src="@/assets/icons/settings.svg" />
      </button>
      <div class="app__settings" :class="{ isVisible: settingsVisible }">
        <Settings
          :cities="cities"
          @updateCities="updateCities"
          @close="settingsVisible = false"
        />
      </div>
      <div class="app__cards">
        <template v-if="cities.length">
          <Card v-for="city in cities" :key="city" :city="city" />
        </template>
        <Card v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card/Card.vue";
import Settings from "@/components/Settings/Settings.vue";
import { fetchCurrentCity } from "@/api";
import { ICity } from "./types/ICity";

export default defineComponent({
  name: "App",
  components: {
    Card,
    Settings,
  },
  data() {
    return {
      cities: [] as Array<ICity>,
      settingsVisible: false as boolean,
    };
  },
  async mounted() {
    this.cities =
      JSON.parse(localStorage.getItem("weather-cities") as string) ??
      (await this.currentCityArray());
  },
  methods: {
    async updateCities(value: Array<ICity>) {
      if (value.length > 0) {
        this.cities = value;
      } else {
        this.cities = await this.currentCityArray();
      }

      localStorage.setItem("weather-cities", JSON.stringify(this.cities));
    },

    async currentCityArray() {
      const currentCity = await fetchCurrentCity();
      return currentCity ? [currentCity] : [];
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "@/styles/app.scss";
</style>
