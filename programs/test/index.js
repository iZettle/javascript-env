#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(process.cwd(), "node_modules", ".bin", "karma")
const baseArgs = ["start", path.join(__dirname, "karma.conf.js")]
const karma = jsEnvConfig.test ? args => ({ command, args: baseArgs.concat(args) }) : null

module.exports = karma
