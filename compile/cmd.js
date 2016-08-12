#!/usr/bin/env node
const webpack = require("webpack")
const devServer = require("./dev-server")

const config = Object.assign(
  {},
  require("./webpack.config"),
  require(`${process.cwd()}/${process.argv[2]}`)
)

if (process.argv.includes("--dev-server")) {
  devServer(config)
} else {
  webpack(config, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}
