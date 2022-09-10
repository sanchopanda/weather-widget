<template>
  <div class="add-city">
    <input type="text" class="add-city__input" v-model="value" />
    <div class="add-city__results" v-if="results.length">
      <div class="add-city__result" v-for="result in results" :key="result">
        {{ result }}
      </div>
    </div>
    <button type="submit" class="add-city__submit"></button>
  </div>
</template>
<script>
export default {
  name: "AppAddCity",
  components: {},
  data() {
    return {
      value: "",
      results: [],
    };
  },
};
</script>

<style scoped lang="scss">
@import "./AddCity.scss";
</style>
