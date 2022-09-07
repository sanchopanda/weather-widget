<template>
  <div class="weather">
    <span class="weather__location">London, UK</span>
    <button class="weather__settings-toggle"></button>
    <div class="weather__main">
      <div class="weather__image"></div>
      <div class="weather__temperature">7°C</div>
    </div>
    <div class="weather__description">
      Feels like -3°C. Broken clouds. Light breeze
    </div>
    <div class="weather__details">
      <div class="weather__detail" v-for="detail in details" :key="detail">
        {{ detail }}
      </div>
    </div>
  </div>
</template>

<script>
import { fetchWeather } from "@/api";

export default {
  name: "App",
  data() {
    return {
      details: ["detail1", "detail2", "detail3"],
    };
  },
  async created() {
    this.data = await fetchWeather("london");
    console.log(this.data);
  },
};
</script>
