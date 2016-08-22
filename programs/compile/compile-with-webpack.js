const webpack = require("webpack")
const devServer = require("./dev-server")
const createWebpackConfig = require("./webpack.config")

function createCompiler(config) {
  return {
    run() {
      webpack(config).run((err, stats) => {
        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
        }))
      })
    },
    watch() {
      webpack(config).watch({}, (err, stats) => {
        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
        }))
      })
    },
    devServer() {
      devServer(config)
    }
  }
}

function modifyForProduction(config) {
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
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  )

  return config
}

module.exports = function compileWithWebpack(config, args = []) {
  if (!config) {
    throw new Error("No webpack config passed")
  }

  let webpackConfig = createWebpackConfig(config).build()

  if (args.includes("--production")) {
    webpackConfig = modifyForProduction(webpackConfig)
  }

  const compiler = createCompiler(webpackConfig)

  if (args.includes("--dev-server")) {
    compiler.devServer()
  } else if (args.includes("--watch")) {
    compiler.watch()
  } else {
    compiler.run()
  }
}

