#!/usr/bin/env node
const webpack = require("webpack")
const devServer = require("./dev-server")
const createWebpackConfig = require("./webpack.config")
const jsEnvConfig = require("../../config")

const webpackConfig = createWebpackConfig(jsEnvConfig.compile)

if (process.argv.includes("--dev-server")) {
  devServer(webpackConfig)
} else {
  webpack(webpackConfig, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}
