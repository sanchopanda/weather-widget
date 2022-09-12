<template>
  <div class="settings" :class="{ isVisible: isVisible }">
    <span class="settings__title">Settings</span>
    <button class="settings__close" @click="close">
      <img v-svg-inline src="@/assets/icons/close.svg" />
    </button>
    <div class="settings__cities">
      <div
        class="settings__city city"
        @dragover="(e) => onDragOver(city, i, e)"
        @dragend="(e) => finishDrag(city, i, e)"
        @dragstart="(e) => startDrag(city, e)"
        draggable="true"
        v-for="(city, i) in cities"
        :key="city.id"
      >
        <span class="city__burger">
          <img v-svg-inline src="@/assets/icons/burger.svg"
        /></span>
        <div class="city__name">{{ city.city }}, {{ city.country_code }}</div>
        <button class="city__delete" @click="deleteCity(city)">
          <img v-svg-inline src="@/assets/icons/basket.svg" />
        </button>
      </div>
    </div>
    <div class="settings__add-city">
      <AddCity @addCity="addCity" :cities="cities" />
    </div>
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import AddCity from "@/components/AddCity/AddCity.vue";
import { ICity } from "@/types/ICity";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AppSettings",
  components: { AddCity },
  props: {
    cities: {
      type: Array as PropType<ICity[]>,
      required: true,
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {
      over: {} as any,
      startLoc: 0,
      dragging: false,
      dragFrom: {},
    };
  },
  methods: {
    addCity(city: ICity) {
      const newCities: Array<ICity> = [...this.cities, city];
      this.updateCities(newCities);
    },
    updateCities(cities: Array<ICity>) {
      this.$emit("updateCities", cities);
    },
    deleteCity(city: ICity) {
      const newCities = this.cities.filter((c) => c.id !== city.id);
      this.$emit("updateCities", newCities);
    },
    startDrag(city: ICity, e: MouseEvent) {
      this.startLoc = e.clientY;
      this.dragging = true;
      this.dragFrom = city;
    },
    finishDrag(city: ICity, pos: number) {
      const newCities = [...this.cities];
      newCities.splice(pos, 1);
      newCities.splice(this.over.pos, 0, city);
      this.updateCities(newCities);
      this.over = {};
    },

    onDragOver(city: ICity, pos: number, e: MouseEvent) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      setTimeout(() => {
        this.over = { city, pos, dir };
      }, 50);
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
