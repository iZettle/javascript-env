#!/usr/bin/env node
const path = require("path")

const command = path.join(process.cwd(), "node_modules", ".bin", "sass-lint")
const baseArgs = [
  "--config", path.join(__dirname, ".sass-lint.yml"),
  "--verbose"
]

const sasslint = args => ({ command, args: baseArgs.concat(args) })

module.exports = sasslint
