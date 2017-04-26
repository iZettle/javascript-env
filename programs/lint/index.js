#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(__dirname, "..", "..", "node_modules", ".bin", "eslint")
const baseArgs = [
  "--config",
  path.join(__dirname, ".eslintrc.json"),
  "--ignore-path",
  path.join(process.cwd(), ".gitignore"),
  jsEnvConfig.lint ? jsEnvConfig.lint.files : ""
]

const eslint = jsEnvConfig.lint ? args => ({ command, args: baseArgs.concat(args) }) : null

module.exports = eslint
