<template>
  <div class="add-city">
    <span class="add-city__title">Add Location:</span>
    <input
      type="text"
      class="add-city__input"
      v-model="value"
      @input="inputHandler"
      @keydown.enter="addCity"
    />
    <button type="submit" class="add-city__submit" @click="addCity"></button>
    <div class="add-city__results" v-if="results.length">
      <div
        class="add-city__result"
        v-for="result in results"
        :key="result"
        @click="selectAutocomplete(result)"
      >
        {{ result }}
      </div>
    </div>
  </div>
</template>
<script>
import { fetchAutocompleteCities } from "@/api";
export default {
  name: "AppAddCity",
  components: {},
  data() {
    return {
      value: "",
      results: [],
    };
  },
  methods: {
    async inputHandler() {
      this.results = await fetchAutocompleteCities(this.value);
    },

    addCity() {
      this.results = [];
      console.log(this.value);
      this.$emit("addCity", this.value);
      this.value = "";
    },

    selectAutocomplete(result) {
      this.value = result;
      this.results = [];
    },
  },
};
</script>

<style scoped lang="scss">
@import "./AddCity.scss";
</style>
