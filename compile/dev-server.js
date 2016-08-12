const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")

const host = "0.0.0.0"
const port = 8000

function devServer(config) {
  config.entry.unshift(
    `webpack-dev-server/client?http://${host}:${port}`,
    "webpack/hot/only-dev-server"
  )

  const server = new WebpackDevServer(webpack(config))

  server.listen(port, host, (error) => {
    if (error) return console.log(error)

    console.log(`Listening at http://${host}:${port}/`)
  })
}

module.exports = devServer
