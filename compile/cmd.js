#!/usr/bin/env node
const webpack = require("webpack")
const baseConfig = require("./webpack.config")
const inputConfig = require("../webpack")

const config = Object.assign({}, baseConfig, inputConfig)

webpack(config, (err, stats) => {
  console.log('[webpack:build]', stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }));
});
