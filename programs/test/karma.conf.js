const jsEnvConfig = require("../../config")
const createWebpackConfig = require("../compile/webpack.config")

const webpackConfig = createWebpackConfig(jsEnvConfig.compile).build()

delete webpackConfig.entry // The tests are all the entry points
delete webpackConfig.output // The output is the test result
webpackConfig.devtool = "inline-source-map" // Produces more quiet error output

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
