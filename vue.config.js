const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
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
});
