#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(__dirname, "..", "..", "node_modules", ".bin", "sass-lint")
const baseArgs = [
  "--config",
  path.join(__dirname, ".sass-lint.yml"),
  "--verbose",
  "--no-exit",
  jsEnvConfig.sasslint ? jsEnvConfig.sasslint.files : ""
]

const sasslint = jsEnvConfig.sasslint ? args => ({ command, args: baseArgs.concat(args) }) : null

module.exports = sasslint
