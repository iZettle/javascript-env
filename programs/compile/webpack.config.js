const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")

const createBabelOptions = args => {
  const babelConfig = {
    presets: ["es2015-loose", "react", "stage-1"]
  }

  if (args.includes("--coverage")) {
    babelConfig.plugins = [
      ["__coverage__", { ignore: "*.test.js" }]
    ]
  }

  return babelConfig
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
    loader: ExtractTextPlugin.extract({
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
          includePaths: opts.includes
        }
      }]
    })
  }
})

function createWebpackConfig(args = [], opts = {}) {
  const rules = createRules(args, opts)

  if (args.includes("--dev-server")) {
    rules.babel.use.unshift({ loader: "react-hot-loader" })
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
        sourceMap: true,
        includePaths: opts.includes
      }
    }]
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
    ]
  }

  if (opts.entry && opts.output) {
    config.entry = config.entry.concat([opts.entry])
    config.output = opts.output
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
