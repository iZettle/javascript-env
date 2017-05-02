const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const host = "0.0.0.0"
const defaultPort = 8000

const getPort = config => {
  if (config.devServer && config.devServer.port) {
    return config.devServer.port
  }
  return defaultPort
}

const createDevServer = config => {
  const port = getPort(config)

  config.entry.main.unshift(
    `webpack-dev-server/client?http://${host}:${port}`,
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch"
  )

  config.output.filename = "[name].js"
  config.output.publicPath = `http://${host}:${port}/`

  config.plugins.push(new webpack.HotModuleReplacementPlugin())

  return {
    webpackDevServer: new WebpackDevServer(webpack(config), config.devServer),
    port
  }
}

const startDevServer = devServer =>
  devServer.webpackDevServer.listen(devServer.port, host, error => {
    if (error) return console.log(error)
    console.log(`Listening at http://${host}:${devServer.port}/`)
  })

module.exports = config => startDevServer(createDevServer(config))
