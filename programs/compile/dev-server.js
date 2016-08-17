const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const host = "0.0.0.0"
const port = 8000

const createDevServer = config => {
  config.entry.unshift(
    `webpack-dev-server/client?http://${host}:${port}`,
    "webpack/hot/only-dev-server"
  )

  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devServer = {
    inline: true,
    hot: true
  }

  return new WebpackDevServer(webpack(config))
}

const startDevServer = devServer => (
  devServer.listen(port, host, (error) => {
    if (error) return console.log(error)
    console.log(`Listening at http://${host}:${port}/`)
  })
)

module.exports = config => startDevServer(createDevServer(config))
