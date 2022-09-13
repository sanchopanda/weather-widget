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
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
    },
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
    config.module.rules.delete("svg");

    config.module
      .rule("svg")
      .test(/\.(svg)(\?.*)?$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  },
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.GH_PAGES_ROOT : "/",
});
