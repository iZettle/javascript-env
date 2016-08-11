#!/usr/bin/env node

const path = require('path')

const command = path.join(process.cwd(), 'node_modules', '.bin', 'eslint')
const baseArgs = ['--config', path.join(__dirname, '.eslintrc.json')]

module.exports = function eslint (args) {
  return {command, args: baseArgs.concat(args)}
}
