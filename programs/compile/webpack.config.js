const loaders = {
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel",
    query: {
      presets: ["es2015", "react", "stage-1"]
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
    loaders: [
      "style",
      "css?modules&localIdentName=[local]---[hash:base64:5]&sourceMap",
      "sass?sourceMap"
    ]
  }
}

function createWebpackConfig(opts = {}) {
  const config = {
    devtool: "eval",
    module: { loaders },
    resolve: {},
    plugins: [],
    sassLoader: {}
  }

  if (opts.source && opts.output) {
    config.entry = [opts.source]
    config.output = { path: opts.output, filename: "bundle.js" }
  }

  if (opts.includes) {
    config.resolve.modulesDirectories = opts.includes
    config.sassLoader.includePaths = opts.includes
  }

  if (opts.exclude) {
    config.module.loaders.js.exclude = opts.exclude
  }

  if (opts.alias) {
    config.resolve.alias = opts.alias
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
