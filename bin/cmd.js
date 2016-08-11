#!/usr/bin/env node

const args = require('optimist').argv
const eslint = require('../eslint')

const command = run(args.run)

command.stdout.pipe(process.stdout)
command.stderr.pipe(process.stderr)

function run(command) {
  switch (command) {
    case "eslint":
      return eslint()

    default:
      if (args.run) {
        console.log(`There's nothing to run called '${args.run}'.`)
      } else {
        console.log("You need to provide something to run with '--run'")
      }

      return process.exit(0);
  }
}

