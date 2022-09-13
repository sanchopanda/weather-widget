<template>
  <div class="app">
    <div class="app__inner">
      <button class="app__settings-toggle" @click="settingsVisible = true">
        <SettingsIcon />
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
        <div class="app__error-message" v-else-if="errorMessage">
          {{ errorMessage }}
        </div>
        <Card v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SettingsIcon from "@/assets/icons/settings.svg";
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
    SettingsIcon,
  },
  data() {
    return {
      cities: [] as Array<ICity | null>,
      settingsVisible: false as boolean,
      errorMessage: null as null | string,
    };
  },
  async mounted() {
    const storageValue = JSON.parse(
      localStorage.getItem("weather-cities") as string
    );

    this.cities = storageValue.length
      ? storageValue
      : await this.currentCityArray();
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
      try {
        const currentCity = await fetchCurrentCity();
        this.errorMessage = null;
        return [currentCity];
      } catch (e) {
        if (e instanceof Error) {
          this.errorMessage = e.message;
        }
        return [];
      }
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/global.scss";
@import "@/styles/app.scss";
</style>
