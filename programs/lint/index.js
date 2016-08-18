#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(process.cwd(), "node_modules", ".bin", "eslint")
const baseArgs = [
  "--config", path.join(__dirname, ".eslintrc.json"),
  "--ignore-path", path.join(process.cwd(), ".gitignore"),
  jsEnvConfig.lint.files
]

const eslint = args => ({ command, args: baseArgs.concat(args) })

module.exports = eslint
