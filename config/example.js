module.exports = {

  compile: {

    // the webpack entry file
    entry: "app/ui",

    // wehpack puts its bundles in this dir
    output: {
      path: "public",
      filename: "bundle.js"
    },

    // paths that webpack will look under
    // when resolving modules
    includes: [
      "app/ui",
      "node_modules/inugami/src",
      "node_modules"
    ],

    // glob pattern that babel will ignore
    exclude: /node_modules/,

    // webpack aliases
    alias: {
      inugami: "node_modules/inugami/src",
      react: "node_modules/react"
    }

  },

  lint: {

    // eslint will lint files matching this glob
    files: "app/ui/**/*.js"

  },

  test: {

    // karma will look for test files
    // using this glob pattern
    files: "app/ui/**/*test.js"

  }
}
