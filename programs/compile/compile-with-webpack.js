const fs = require("fs-extra")
const webpack = require("webpack")
const devServer = require("./dev-server")
const createWebpackConfig = require("./webpack.config")

function createCompiler(config, buildNumber) {
  return {
    run() {
      webpack(config).run((err, stats) => {
        console.log(stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true
        }))
      })
    },
    profile() {
      webpack(config).run((err, stats) => {
        const filePath = `${process.cwd()}/webpack-stats-${buildNumber}.json`
        fs.writeFileSync(filePath, JSON.stringify(stats.toJson()))
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

function modifyForProduction(config, args) {
  config.devtool = "cheap-module-source-map"
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  )

  if (!args.includes("--no-uglify")) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        comments: false,
        minimize: true
      })
    )
  }

  return config
}

function removeBuildArtifacts(config) {
  return function () {
    fs.removeSync(config.output.path)
    console.log("Removed build artifacts at:", config.output.path)
    process.exit()
  }
}

// If you have multiple build configs specified in your config file,
// `buildNumber` will be the index of each build config.
module.exports = function compileWithWebpack(config, args = [], buildNumber) {
  if (!config) {
    throw new Error("No webpack config passed")
  }

  let webpackConfig = createWebpackConfig(args, config).build()

  if (args.includes("--production")) {
    webpackConfig = modifyForProduction(webpackConfig, args)
  }

  const compiler = createCompiler(webpackConfig, buildNumber)

  if (args.includes("--return-config")) {
    return webpackConfig
  } else if (args.includes("--dev-server")) {
    compiler.devServer()
  } else if (args.includes("--watch")) {
    compiler.watch()

    process.on("SIGINT", removeBuildArtifacts(config))
    process.on("uncaughtException", removeBuildArtifacts(config))
  } else if (args.includes("--profile")) {
    compiler.profile()
  } else {
    compiler.run()
  }
}
