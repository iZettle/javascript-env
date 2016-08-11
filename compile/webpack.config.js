const webpack = require('webpack')
const path = require('path')
const root = path.resolve('./app/ui')

module.exports = {
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true
  }
}
