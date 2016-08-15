#!/usr/bin/env node
const path = require("path")

const command = path.join(__dirname, "cmd.js")
const compile = args => ({ command, args })

module.exports = compile
