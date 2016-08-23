const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")

const loaders = {
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel",
    query: {
      presets: ["es2015-loose", "react", "stage-1"]
    }
  },
  json: {
    test: /\.json$/,
    loader: "json"
  },
  raw: {
    test: /\.svg$/,
    loader: "raw"
  },
  sass: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style",
      "css?modules&localIdentName=[local]---[hash:base64:5]&sourceMap!postcss!sass"
    )
  }
}

function createWebpackConfig(opts = {}) {
  const config = {
    target: "web",
    devtool: "eval",
    module: { loaders },
    resolve: {},
    plugins: [
      new ExtractTextPlugin("styles.css", { allChunks: true })
    ],
    sassLoader: {},
    postcss() {
      return [autoprefixer({ browsers: ["last 5 versions"] })]
    },
    node: {
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    }
  }

  if (opts.entry && opts.output) {
    config.entry = [opts.entry]
    config.output = opts.output
  }

  if (opts.target) {
    config.target = opts.target
  }

  if (config.target === "node") {
    config.node = { __dirname: false }
  }

  if (opts.includes) {
    config.resolve.modulesDirectories = opts.includes
    config.sassLoader.includePaths = opts.includes
  }

  if (opts.exclude) {
    config.module.loaders.babel.exclude = opts.exclude
  }

  if (opts.alias) {
    config.resolve.alias = opts.alias
  }

  if (opts.externals) {
    config.externals = opts.externals
  }

  return {
    config,
    build() {
      this.config.module.loaders = Object.keys(this.config.module.loaders)
        .map(key => this.config.module.loaders[key])

      return this.config
    }
  }
}

module.exports = createWebpackConfig
