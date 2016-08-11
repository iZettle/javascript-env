#!/usr/bin/env node

const eslint = require('../eslint')
const cmd = process.argv[2]
const args = process.argv.slice(3)

const command = run(cmd, args)

command.stdout.pipe(process.stdout)
command.stderr.pipe(process.stderr)

function run (command, args) {
  switch (command) {
    case 'eslint':
      return eslint(args)

    default:
      if (args.run) {
        console.log(`There's nothing to run called '${args.run}'.`)
      } else {
        console.log("You need to provide something to run with '--run'")
      }

      return process.exit(0)
  }
}

