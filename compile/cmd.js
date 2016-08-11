#!/usr/bin/env node
const path = require("path")
const webpack = require("webpack")
const baseConfig = require("./webpack.config")
const inputConfig = require(path.join(process.cwd(), process.argv[2]));

const config = Object.assign({}, baseConfig, inputConfig)

webpack(config, (err, stats) => {
  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }));
});
