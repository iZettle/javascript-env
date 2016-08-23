const path = require("path")

module.exports = {
  lint: {
    files: path.join(__dirname, "**", "*.js")
  },
  test: {
    files: path.join(process.cwd(), "programs/**/*test.js")
  }
}
