#!/usr/bin/env node
const path = require("path")

const command = path.join(process.cwd(), "node_modules", ".bin", "eslint")
const baseArgs = ["--config", path.join(__dirname, ".eslintrc.json")]
const eslint = args => ({ command, args: baseArgs.concat(args) })

module.exports = eslint
