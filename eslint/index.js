#!/usr/bin/env node

const spawn = require('child_process').spawn
const path = require('path')

const command = path.join(process.cwd(), "node_modules", ".bin", "eslint")
const args = ["--config", path.join(__dirname, ".eslintrc"), "."]

module.exports = function eslint() {
  return spawn(command, args);
}

