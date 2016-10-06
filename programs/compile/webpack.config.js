const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")

const loaders = {
  babel: {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ["babel?presets[]=es2015-loose,presets[]=react,presets[]=stage-1"]
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

function createWebpackConfig(args = [], opts = {}) {
  if (args.includes("--dev-server")) {
    loaders.sass = {
      test: /\.scss$/,
      loaders: [
        "style",
        "css?modules&localIdentName=[local]---[hash:base64:5]&sourceMap",
        "postcss",
        "sass"]
    }

    loaders.babel.loaders.unshift("react-hot")
  }

  const config = {
    target: "web",
    devtool: "eval",
    module: { loaders },
    resolve: {},
    externals: {},
    plugins: [
      new ExtractTextPlugin(opts.outputCss || "styles.css", { allChunks: true })
    ],
    sassLoader: {},
    postcss() {
      return [autoprefixer({ browsers: ["last 5 versions"] })]
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
    Object.assign(config.externals, opts.externals)
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
