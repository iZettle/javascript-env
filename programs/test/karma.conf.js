const path = require("path")
const jsEnvConfig = require("../../config")
const createWebpackConfig = require("../compile/webpack.config")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// TODO: Move nodeModulesPath to some config
const nodeModulesPath = path.join(process.cwd(), "/node_modules")
const config = Array.isArray(jsEnvConfig.compile) ?
                jsEnvConfig.compile.find(config => config.useForTest) :
                jsEnvConfig.compile

const webpackConfig = createWebpackConfig(["--coverage"], config).build()

delete webpackConfig.output // The output is the test result
delete webpackConfig.vendor // No vendor is needed
webpackConfig.entry = jsEnvConfig.test.files
webpackConfig.devtool = "inline-source-map" // Produces more quiet error output
webpackConfig.plugins = webpackConfig.plugins.filter(p => p instanceof ExtractTextPlugin)

Object.assign(webpackConfig.externals, {
  "react/addons": true,
  "react/lib/ExecutionEnvironment": true,
  "react/lib/ReactContext": true
})

module.exports = function webpackTestConfig(config) {
  config.set({
    browsers: ["PhantomJS"],
    files: [
      path.join(nodeModulesPath, "/babel-polyfill/dist/polyfill.js"),
      jsEnvConfig.test.files
    ],
    frameworks: [
      "jasmine-ajax",
      "jasmine",
      "jasmine-expect-jsx"
    ],
    preprocessors: {
      [jsEnvConfig.test.files]: ["webpack", "sourcemap"]
    },
    reporters: [
      "jasmine-expect-jsx",
      "mocha"
    ],
    singleRun: true,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    junitReporter: {
      outputDir: `${process.cwd()}/reports/junit`,
      useBrowserName: false
    },
    coverageReporter: {
      dir: `${process.cwd()}/reports/coverage`,
      reporters: [
        { type: "html", subdir: "report-html" },
        { type: "lcov", subdir: "report-lcov" },
        { type: "teamcity" }
      ]
    }
  })
}
