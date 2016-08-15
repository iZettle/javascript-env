#!/usr/bin/env node
const webpack = require("webpack")
const devServer = require("./dev-server")
const createWebpackConfig = require("./webpack.config")
const jsEnvConfig = require("../../config")

const webpackConfig = createWebpackConfig(jsEnvConfig.compile)

if (process.argv.includes("--dev-server")) {
  devServer(webpackConfig)
} else if (process.argv.includes("--production")) {
  webpackConfig.devtool = "cheap-module-source-map"
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  )

  webpack(webpackConfig, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
} else {
  webpack(webpackConfig, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}
