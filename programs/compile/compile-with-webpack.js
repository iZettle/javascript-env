module.exports = function compileWithWebpack(config) {
  if (!config) {
    throw new Error("No webpack config passed")
  }

  webpack(config, (err, stats) => {
    console.log(stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true
    }))
  })
}
