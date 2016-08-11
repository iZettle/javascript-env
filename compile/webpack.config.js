const webpack = require("webpack")

module.exports = {
  devtool: "eval",
  module: {
    loaders: [{
      test: /\.js$/,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true
  }
}
