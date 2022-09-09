<template>
  <div class="settings">
    <span class="settings__title">Settings</span>
    <button class="settings__close"></button>
    <div class="settings__cities"></div>
    <div class="settings__add-new"></div>
  </div>
</template>
<script>
import { fetchWeather } from "@/api";

export default {
  name: "Settings",
  components: {},
  props: {},
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import "./Settings.scss";
</style>
