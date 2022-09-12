const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/mixins.scss";`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  publicPath: process.env.NODE_ENV === "production" ? "/weather-widget/" : "/",
});
