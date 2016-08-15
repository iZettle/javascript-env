const webpack = require("webpack")

module.exports = config => ({
  devtool: "eval",
  entry: [config.source],
  output: {
    path: config.output,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: config.exclude,
      loader: "babel",
      query: {
        presets: ["es2015", "react", "stage-1"]
      }
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
      test: /\.svg$/,
      loader: "raw"
    }, {
      test: /\.scss$/,
      loaders: [
        "style",
        "css?modules&localIdentName=[local]---[hash:base64:5]&sourceMap",
        "sass?sourceMap"
      ]
    }]
  },
  plugins: [],
  resolve: {
    modulesDirectories: config.includes,
    alias: config.alias
  },
  sassLoader: {
    includePaths: config.includes
  }
})
