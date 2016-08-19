const webpack = require("webpack")
const devServer = require("./dev-server")
const createWebpackConfig = require("./webpack.config")

function start(config) {
  webpack(config, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}

function development(config) {
  devServer(config)
}

function production(config) {
  config.devtool = "cheap-module-source-map"
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      minimize: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  )

  start(config)
}

module.exports = function compileWithWebpack(config, args = []) {
  if (!config) {
    throw new Error("No webpack config passed")
  }

  const webpackConfig = createWebpackConfig(config).build()

  if (args.includes("--production")) {
    production(webpackConfig)
  } else if (args.includes("--dev-server")) {
    development(webpackConfig)
  } else {
    start(webpackConfig)
  }
}

