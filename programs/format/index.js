#!/usr/bin/env node
const path = require("path")
const jsEnvConfig = require("../../config")

const command = path.join(__dirname, "..", "..", "node_modules", ".bin", "prettier")

const baseArgs = [
  "--write",
  "--no-semi",
  "--jsx-bracket-same-line",
  "--print-width", "100"
]

const configFilesArgs = [
  jsEnvConfig.format ? jsEnvConfig.format.files : ""
]

const getCommand = args => {
  const noFilesIndex = args.indexOf("--files")
  if (noFilesIndex > -1) {
    const filesArgs = args.splice(noFilesIndex -1, 1)
    return { command, args: baseArgs.concat(filesArgs) }
  }
  return { command, args: baseArgs.concat(configFilesArgs) }
}

const format = jsEnvConfig.format ? args => (getCommand(args)) : null

module.exports = format
