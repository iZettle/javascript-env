module.exports = {
  compile: {
    // the webpack entry file
    entry: "app/ui",

    // if provided with multiple compile configs this shows what config to use for testing
    useForTest: true,

    // webpack puts its bundles in this dir
    output: {
      path: "public",
      filename: "bundle.js"
    },

    // paths that webpack will look under
    // when resolving modules
    includes: ["app/ui", "node_modules/inugami/src", "node_modules"],

    // Whether or not to separate output in
    //
    // Default is true.
    // chunks: false

    // glob pattern that babel will ignore
    exclude: /node_modules/,

    // webpack aliases
    alias: {
      inugami: "node_modules/inugami/src",
      react: "node_modules/react"
    },

    // settings for dev server
    // See settings: https://webpack.github.io/docs/webpack-dev-server.html
    devServer: {
      // e.g. redirect all calls to /api/ to another
      // server at port 3100
      proxy: {
        "/api/**": {
          target: "http://0.0.0.0:3100",
          secure: false
        }
      },

      // Change from default dev server port 8000
      port: 8001
    },

    // Define global variables which will be available in your
    // entire codebase. E.g. for adding values from env vars.
    define: {
      __MYHOST__: JSON.stringify(process.env.MYHOST)
    }
  },

  lint: {
    // eslint will lint files matching this glob
    files: "app/ui/**/*.js"
  }
}
