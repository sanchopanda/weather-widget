<template>
  <div class="container">
    <span class="location">London, UK</span>
    <button class="settings-toggle"></button>
    <div class="main">
      <div class="image"></div>
      <div class="temperature">7°C</div>
    </div>
    <div class="description">Feels like -3°C. Broken clouds. Light breeze</div>
    <div class="details">
      <div class="detail" v-for="detail in details" :key="detail">
        {{ detail }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      details: ["detail1", "detail2", "detail3"],
    };
  },
};
</script>
