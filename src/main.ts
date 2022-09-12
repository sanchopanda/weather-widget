//import basic Vue app
import { createApp } from "vue";
import App from "./App.vue";

import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import "vue-svg-inline-plugin/src/polyfills";

const app = createApp(App);

app.use(VueSvgInlinePlugin);

app.use(VueSvgInlinePlugin, {
  attributes: {
    data: ["src"],
    remove: ["alt"],
  },
});

app.mount("weather-widget");
