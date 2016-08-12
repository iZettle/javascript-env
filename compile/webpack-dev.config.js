const path = require("path")

module.exports = {
  entry: [
    path.resolve("../")
  ],
  output: {
    path: path.resolve("./public"),
    filename: "bundle.js"
  }
}
