#!/usr/bin/env node
const jsEnvConfig = require("../../config")
const compileWithWebpack = require("./compile-with-webpack")

if (jsEnvConfig.compile instanceof Array) {
  jsEnvConfig.compile.forEach((config, index) =>
    compileWithWebpack(config, process.argv, index)
  )
} else {
  compileWithWebpack(jsEnvConfig.compile, process.argv)
}
