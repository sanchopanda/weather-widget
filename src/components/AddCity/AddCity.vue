<template>
  <div class="add-city">
    <span class="add-city__title">Add Location:</span>
    <input
      type="text"
      class="add-city__input"
      v-model="value"
      @input="inputHandler"
      @keydown.enter="addCity"
      ref="input"
    />
    <button type="submit" class="add-city__submit" @click="addCity">
      <img v-svg-inline src="@/assets/icons/enter.svg" />
    </button>
    <div class="add-city__results" v-if="results.length">
      <div
        class="add-city__result"
        v-for="result in results"
        :key="result.id"
        @click="selectAutocomplete(result)"
      >
        {{ result.city }}, {{ result.country_code }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ICity } from "@/types/ICity";
import { fetchAutocompleteCities } from "@/api";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppAddCity",
  components: {},
  data() {
    return {
      value: "",
      city: {} as ICity,
      results: [] as Array<ICity[]>,
    };
  },
  methods: {
    async inputHandler() {
      this.results = await fetchAutocompleteCities(this.value);
    },

    addCity() {
      this.results = [];
      this.$emit("addCity", this.city);
      this.value = "";
    },

    selectAutocomplete(result: ICity) {
      this.value = result.city;
      this.city = result;
      this.results = [];
      //this.$refs.input.focus();
    },
  },
});
</script>

<style scoped lang="scss">
@import "./AddCity.scss";
</style>
