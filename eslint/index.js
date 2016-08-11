#!/usr/bin/env node

const spawn = require('child_process').spawn
const path = require('path')

const ESLINT_CMD = path.join(process.cwd(), "node_modules", ".bin", "eslint");

module.exports = function eslint() {
  return spawn(
    ESLINT_CMD,
    ["--config", path.join(__dirname, ".eslintrc"), "."]
  );
}

