#!/usr/bin/env node

const webpack = require("webpack")

const config = Object.assign(
  {},
  require("./webpack.config"),
  require(`${process.cwd()}/${process.argv[2]}`)
)

webpack(config, (err, stats) => {
  console.log(stats.toString({
    chunks: false, // Makes the build much quieter
    colors: true
  }))
})
