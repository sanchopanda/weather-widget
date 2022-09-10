<template>
  <div class="settings">
    <span class="settings__title">Settings</span>
    <button class="settings__close"></button>
    <div class="settings__cities">
      <div class="settings__city city" v-for="city in cities" :key="city">
        <span class="city__burger"> </span>
        <div class="city__name">
          {{ city }}
        </div>
        <button class="city__delete"></button>
      </div>
    </div>
    <div class="settings__add">
      <AddCity />
    </div>
  </div>
</template>
<script>
import { fetchCurrentCity } from "@/api";
import AddCity from "@/components/AddCity/AddCity.vue";

export default {
  name: "AppSettings",
  components: { AddCity },
  props: {},
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
};
</script>

<style scoped lang="scss">
@import "./Settings.scss";
</style>
