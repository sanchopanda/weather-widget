<template>
  <div class="cities">
    <div
      class="cities__city city"
      @dragover="(e) => onDragOver(city, i, e)"
      @dragend="(e) => finishDrag(city, i, e)"
      @dragstart="(e) => startDrag(city, e)"
      draggable="true"
      v-for="(city, i) in cities"
      :key="city.id"
    >
      <span class="city__burger"> <IconBurger /></span>
      <div class="city__name">{{ city.city }}, {{ city.country_code }}</div>
      <button class="city__delete" @click="deleteCity(city)">
        <IconBasket />
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import IconBasket from "@/assets/icons/basket.svg";
import IconBurger from "@/assets/icons/burger.svg";
import { PropType } from "vue";
import { ICity } from "@/types/ICity";
import { IOver } from "@/types/IOver";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "AppCities",
  components: { IconBasket, IconBurger },
  props: {
    cities: {
      type: Array as PropType<ICity[]>,
      required: true,
    },
  },
  data: function () {
    return {
      over: {} as IOver | null,
      startLoc: 0,
      dragging: false,
      dragFrom: {},
    };
  },
  methods: {
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
      if (this.over) {
        newCities.splice(this.over.pos, 0, city);
      }
      this.updateCities(newCities);
      this.over = null;
    },

    onDragOver(city: ICity, pos: number, e: MouseEvent) {
      const dir = this.startLoc < e.clientY ? "down" : "up";
      setTimeout(() => {
        this.over = { city, pos, dir };
      }, 50);
    },
  },
});
</script>

<style lang="scss">
@import "./Cities.scss";
</style>
