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
    <div class="add-city__error" v-if="errorMessage !== ''">
      {{ this.errorMessage }}
    </div>
    <ul class="add-city__results" v-if="results.length">
      <li
        class="add-city__result"
        v-for="result in results"
        :key="result.id"
        @click="selectAutocomplete(result)"
        @keydown.enter="selectAutocomplete(result)"
        tabindex="0"
      >
        {{ result.city }}, {{ result.country_code }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ICity } from "@/types/ICity";
import { fetchAutocompleteCities } from "@/api";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AppAddCity",
  components: {},
  props: {
    cities: {
      type: Array as PropType<ICity[]>,
      required: true,
    },
  },
  data() {
    return {
      value: "",
      city: null as null | ICity,
      results: [] as Array<ICity[]>,
      errorMessage: "",
    };
  },
  methods: {
    async inputHandler() {
      this.city = null;
      if (this.value.length > 2) {
        try {
          this.results = await fetchAutocompleteCities(this.value);
          this.errorMessage = "";
        } catch {
          this.errorMessage = "something went wrong";
        }
      } else {
        this.results = [];
        this.errorMessage = "";
      }
    },

    addCity() {
      if (this.city) {
        this.results = [];
        this.$emit("addCity", this.city);
        this.value = "";
        this.city = null;
        return;
      }

      if (this.value === "") {
        this.errorMessage = "required";
        return;
      }

      if (!this.city) {
        this.errorMessage = "choose valid city";
      }
    },

    selectAutocomplete(result: ICity) {
      if (this.cities.find((c) => c.id == result.id)) {
        this.errorMessage = "this city has already been chosen";
        return;
      }
      this.value = result.city;
      this.city = result;
      this.results = [];
      (this.$refs["input"] as HTMLInputElement).focus();
      this.errorMessage = "";
    },
  },
});
</script>

<style scoped lang="scss">
@import "./AddCity.scss";
</style>
