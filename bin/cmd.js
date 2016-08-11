#!/usr/bin/env node
const spawn = require('child_process').spawn
const lint = require("../lint")

const programs = { lint }

const name = process.argv[2]
const args = process.argv.slice(3)

const programError = (program) =>  console.error(` - javascript-env ${program}`)

if (!name) {
  console.error("You need to supply a program to run. Existing programs are:")
  Object.keys(programs).forEach(programError)
  process.exit(0)
}

if (!programs[name]) {
  console.error(`There's no program called "${name}"`)
  process.exit(0)
}

const program = programs[name](args)
const prog = spawn(program.command, program.args, {stdio: "inherit"});

prog.on("exit", () => {
  process.exit(0)
})
