// import basic Vue app
import { createApp } from "vue";
import App from "./App.vue";

// import Vue plugin
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

// import polyfills for IE if you want to support it
import "vue-svg-inline-plugin/src/polyfills";

// initialize Vue app
const app = createApp(App);

// use Vue plugin without options
app.use(VueSvgInlinePlugin);

// use Vue plugin with options
app.use(VueSvgInlinePlugin, {
  attributes: {
    data: ["src"],
    remove: ["alt"],
  },
});

// mount Vue app
app.mount("#app");
