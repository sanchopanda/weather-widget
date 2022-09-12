<template>
  <div class="settings">
    <span class="settings__title">Settings</span>
    <button class="settings__close" @click="close">
      <IconClose />
    </button>
    <div class="settings__cities">
      <Cities :cities="cities" @updateCities="updateCities" />
    </div>
    <div class="settings__add-city">
      <AddCity @addCity="addCity" :cities="cities" />
    </div>
  </div>
</template>
<script lang="ts">
import IconClose from "@/assets/icons/close.svg";
import { PropType } from "vue";
import AddCity from "@/components/AddCity/AddCity.vue";
import Cities from "@/components/Cities/Cities.vue";

import { ICity } from "@/types/ICity";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AppSettings",
  components: { AddCity, Cities, IconClose },
  props: {
    cities: {
      type: Array as PropType<ICity[]>,
      required: true,
    },
  },
  methods: {
    addCity(city: ICity) {
      const newCities: Array<ICity> = [...this.cities, city];
      this.updateCities(newCities);
    },
    updateCities(cities: Array<ICity>) {
      this.$emit("updateCities", cities);
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss">
@import "./Settings.scss";
</style>
