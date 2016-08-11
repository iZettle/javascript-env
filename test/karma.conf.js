const path = require("path");
const webpackConfig = require("../compile/webpack.config")
const webpack = require("webpack")
const workingDir = path.join(process.cwd(), "**", "*test.js");

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
  });
};
