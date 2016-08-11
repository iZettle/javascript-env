#!/usr/bin/env node
const path = require("path")

const command = path.join(process.cwd(), "node_modules", ".bin", "karma")
const baseArgs = ["start", path.join(__dirname, "karma.conf.js")]
const karma = args => ({ command, args: baseArgs.concat(args) })

module.exports = karma
