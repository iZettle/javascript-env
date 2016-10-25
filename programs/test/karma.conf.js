const path = require("path")
const jsEnvConfig = require("../../config")
const createWebpackConfig = require("../compile/webpack.config")

// TODO: Move nodeModulesPath to some config
const nodeModulesPath = path.join(process.cwd(), "/node_modules")
const webpackConfig = createWebpackConfig([], jsEnvConfig.compile).build()

delete webpackConfig.entry // The tests are all the entry points
delete webpackConfig.output // The output is the test result
webpackConfig.devtool = "inline-source-map" // Produces more quiet error output
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
      "mocha",
      "coverage"
    ],
    singleRun: false,
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: `${process.cwd()}/reports/coverage`,
      reporters: [
        { type: "html", subdir: "report-html" },
        { type: "lcov", subdir: "report-lcov "},
        { type: "teamcity", subdir: ".", file: "teamcity.txt" },
        { type: "text" }
      ]
    }
  })
}
