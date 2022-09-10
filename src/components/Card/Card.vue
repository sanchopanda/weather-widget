<template>
  <div class="card" v-if="data">
    <span class="card__location">{{ data.city }}, {{ data.country_code }}</span>
    <div class="card__main">
      <img
        class="card__image"
        :src="`https://openweathermap.org/img/wn/${data.icon}@2x.png`"
        alt="weather"
      />
      <span class="card__temperature">{{ stringifyTemp(data.temp) }}</span>
    </div>
    <div class="card__description">{{ this.description }}</div>
    <div class="card__details">
      <div class="card__detail" v-if="data.speed">
        <img v-svg-inline src="@/icons/wind.svg" /> {{ wind }}
      </div>
      <div class="card__detail" v-if="data.pressure">
        <img v-svg-inline src="@/icons/barometer.svg" /> {{ data.pressure }}hPa
      </div>
      <div class="card__detail" v-if="data.pressure">
        Humidity: {{ data.humidity }}%
      </div>
      <div class="card__detail" v-if="data.pressure">
        Visibility:
        {{
          visibility.toLocaleString(undefined, {
            minimumFractionDigits: 1,
          })
        }}km
      </div>
    </div>
  </div>
</template>
<script>
import { fetchWeather } from "@/api";

export default {
  name: "AppCard",
  components: {},
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      data: null,
    };
  },
  async mounted() {
    this.data = await fetchWeather(this.city);
  },
  methods: {
    stringifyTemp(temp) {
      return `${Math.round(temp)}°C`;
    },

    stringifyRoseOfWind(degree) {
      if (degree > 337.5 || degree < 22.5) return "N";
      if (degree >= 22.5 && degree < 67.5) return "NE";
      if (degree >= 67.5 && degree < 112.5) return "E";
      if (degree >= 112.5 && degree < 157.5) return "SE";
      if (degree >= 157.5 && degree < 202.5) return "S";
      if (degree >= 202.5 && degree < 247.5) return "SW";
      if (degree >= 247.5 && degree < 292.5) return "W";
      if (degree >= 292.5 && degree < 337.5) return "NW";
    },
  },
  computed: {
    description() {
      return `Feels like ${this.stringifyTemp(this.data.feels_like)}. ${
        this.data.description.charAt(0).toUpperCase() +
        this.data.description.slice(1)
      }.`;
    },
    wind() {
      return `${this.data.speed}m/s ${this.stringifyRoseOfWind(
        this.data.degree
      )}`;
    },
    visibility() {
      return this.data.visibility / 1000;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Card.scss";
</style>
