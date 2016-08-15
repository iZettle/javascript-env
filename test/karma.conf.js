const path = require("path")
const jsEnvConfig = require("../config")
const createWebpackConfig = require("../compile/webpack.config")

const workingDir = path.join(process.cwd(), "!(node_modules)/**", "*test.js")
const webpackConfig = createWebpackConfig(jsEnvConfig.compile)

module.exports = function webpackTestConfig(config) {
  config.set({
    browsers: ["PhantomJS"],
    files: [
      workingDir
    ],
    frameworks: [
      "jasmine",
      "jasmine-expect-jsx",
      "es6-shim"
    ],
    preprocessors: {
      [workingDir]: ["webpack", "sourcemap"]
    },
    reporters: [
      "jasmine-expect-jsx",
      "mocha"
    ],
    singleRun: false,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
