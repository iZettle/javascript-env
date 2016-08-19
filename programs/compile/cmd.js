#!/usr/bin/env node
const jsEnvConfig = require("../../config")
const compileWithWebpack = require("./compile-with-webpack")

if (jsEnvConfig.compile instanceof Array) {
  jsEnvConfig.compile.forEach(config =>
    compileWithWebpack(config, process.argv)
  )
} else {
  compileWithWebpack(jsEnvConfig.compile, process.argv)
}
