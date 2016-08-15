const jsEnvConfig = require("../../config")
const createWebpackConfig = require("../compile/webpack.config")

const webpackConfig = createWebpackConfig(jsEnvConfig.compile)

module.exports = function webpackTestConfig(config) {
  config.set({
    browsers: ["PhantomJS"],
    files: [
      jsEnvConfig.test.files
    ],
    frameworks: [
      "jasmine",
      "jasmine-expect-jsx",
      "es6-shim"
    ],
    preprocessors: {
      [jsEnvConfig.test.files]: ["webpack", "sourcemap"]
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
