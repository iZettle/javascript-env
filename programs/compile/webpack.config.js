const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")
const webpack = require("webpack")
const AssetsPlugin = require("assets-webpack-plugin")

const createBabelOptions = args => {
  const babelConfig = {
    presets: [["es2015", { loose: true }], "react", "stage-1"],
    plugins: []
  }

  if (args.includes("--coverage")) {
    babelConfig.plugins.push(
      ["__coverage__", { ignore: "*.test.js" }]
    )
  }

  if (args.includes("--dev-server")) {
    babelConfig.plugins.push("react-hot-loader/babel")
  }

  return babelConfig
}

const createStyleLoader = (args, opts) => {
  const styleLoader = {
    fallbackLoader: "style-loader",
    loader: [{
      loader: "css-loader",
      query: {
        modules: true,
        sourceMap: true,
        localIdentName: "[local]---[hash:base64:5]"
      }
    }, {
      loader: "postcss-loader",
      options: {
        plugins() {
          return [
            autoprefixer({ browsers: ["last 5 versions"] })
          ]
        }
      }
    }, {
      loader: "sass-loader",
      query: {
        sourceMap: true
      }
    }]
  }

  if (opts.includes) {
    const sassLoader = styleLoader.loader.find(c => c.loader === "sass-loader")
    if (sassLoader) {
      sassLoader.query.includePaths = opts.includes
    }
  }

  return styleLoader
}

const createRules = (args, opts) => ({
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{
      loader: "babel-loader",
      options: createBabelOptions(args)
    }]
  },
  json: {
    test: /\.json$/,
    use: [{
      loader: "json-loader"
    }]
  },
  svg: {
    test: /\.svg$/,
    use: [{
      loader: "raw-loader"
    }]
  },
  sass: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(createStyleLoader(args, opts))
  }
})

function createWebpackConfig(args = [], opts = {}) {
  const rules = createRules(args, opts)

  if (args.includes("--dev-server")) {
    delete rules.sass.loader
    rules.sass.use = [{
      loader: "style-loader"
    }, {
      loader: "css-loader",
      query: {
        modules: true,
        sourceMap: true,
        localIdentName: "[local]---[hash:base64:5]"
      }
    }, {
      loader: "postcss-loader",
      options: {
        plugins() {
          return [
            autoprefixer({ browsers: ["last 5 versions"] })
          ]
        }
      }
    }, {
      loader: "sass-loader",
      query: {
        sourceMap: true
      }
    }]

    if (opts.includes) {
      const sassLoader = rules.sass.use.find(c => c.loader === "sass-loader")

      if (sassLoader) {
        sassLoader.query.includePaths = opts.includes
      }
    }
  }

  const config = {
    target: "web",
    entry: ["babel-polyfill"],
    devtool: "eval",
    module: { rules },
    resolve: {},
    externals: {},
    plugins: [
      new ExtractTextPlugin({
        filename: opts.outputCss || "styles.css",
        allChunks: true
      })
    ],
    devServer: {
      inline: true,
      hot: true,
      stats: {
        colors: true,
        chunkModules: false
      }
    },
    performance: {
      hints: false
    }
  }

  if (opts.entry && opts.output) {
    config.entry = {
      main: ["babel-polyfill", opts.entry]
    }
    config.output = opts.output
  }

  if (opts.vendor && args.includes("--production")) {
    config.entry.vendor = opts.vendor
    config.plugins = config.plugins.concat([
      new webpack.optimize.CommonsChunkPlugin({
        names: ["vendor", "manifest"],
        minChunks: Infinity
      }),
      new AssetsPlugin()
    ])
  }

  if (opts.target) {
    config.target = opts.target
  }

  if (config.target === "node") {
    config.node = { __dirname: false }
  }

  if (opts.includes) {
    config.resolve.modules = opts.includes
  }

  if (opts.exclude) {
    config.module.rules.babel.exclude = opts.exclude
  }

  if (opts.alias) {
    config.resolve.alias = opts.alias
  }

  if (opts.externals) {
    Object.assign(config.externals, opts.externals)
  }

  if (opts.devServer) {
    Object.assign(config.devServer, opts.devServer)
  }

  return {
    config,
    build() {
      this.config.module.rules = Object.keys(this.config.module.rules)
        .map(key => this.config.module.rules[key])

      return this.config
    }
  }
}

module.exports = createWebpackConfig
