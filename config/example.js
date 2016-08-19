const path = require("path")

const p = subPath => path.resolve(__dirname, subPath)

module.exports = {

  compile: {

    // the webpack entry file
    entry: p("app/ui"),

    // wehpack puts its bundles in this dir
    output: {
      path: p("public"),
      filename: "bundle.js"
    },

    // paths that webpack will look under
    // when resolving modules
    includes: [
      p("app/ui"),
      p("node_modules/inugami/src"),
      "node_modules"
    ],

    // glob pattern that babel will ignore
    exclude: /node_modules/,

    // webpack aliases
    alias: {
      inugami: p("node_modules/inugami/src"),
      react: p("node_modules/react")
    }

  },

  lint: {

    // eslint will lint files matching this glob
    files: p("app/ui/**/*.js")

  },

  test: {

    // karma will look for test files
    // using this glob pattern
    files: p("app/ui/**/*test.js")

  }
}
