const path = require("path")

module.exports = {
  lint: {
    files: path.join(__dirname, "**", "*.js")
  },
  sasslint: {
    files: path.join(__dirname, "**", "*.scss")
  },
  test: {
    files: path.join(process.cwd(), "!(node_modules)/**", "*test.js")
  }
}
