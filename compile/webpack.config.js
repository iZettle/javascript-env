const webpack = require("webpack")

module.exports = {
  devtool: "eval",
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel",
      query: {
        presets: ["es2015"]
      }
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
