<template>
  <div class="weather">
    <button class="weather__settings-toggle"></button>
    <div class="weather__cards">
      <Card v-for="card in cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "App",
  components: {
    Card,
  },
  data() {
    return {
      cards: [
        { city: "london", id: "1" },
        { city: "moscow", id: "2" },
      ],
    };
  },
};
</script>
