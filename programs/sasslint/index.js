#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(process.cwd(), "node_modules", ".bin", "sass-lint")
const baseArgs = [
  "--config", path.join(__dirname, ".sass-lint.yml"),
  "--verbose",
  "--no-exit",
  jsEnvConfig.sasslint.files
]

const sasslint = args => ({ command, args: baseArgs.concat(args) })

module.exports = sasslint
