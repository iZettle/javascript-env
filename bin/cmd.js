#!/usr/bin/env node

const spawn = require("child_process").spawn
const programs = require("../programs")

const name = process.argv[2]
const args = process.argv.slice(3)
const programError = program => console.error(` - javascript-env ${program}`)

if (!name) {
  console.error("You need to supply a program to run. Existing programs are:")
  Object.keys(programs).forEach(programError)
  process.exit(1)
}

if (!programs[name]) {
  console.error(`There's no program called "${name}"`)
  process.exit(1)
}

const program = programs[name](args)

if (name === "test") {
  program.args.unshift(program.command)
  program.args.unshift("--max_old_space_size=4096")
  program.command = "node"
}

const programProcess = spawn(program.command, program.args, { stdio: "inherit" })
  .on("exit", code => process.exit(code))

process
  .on("SIGINT", () => {
    console.log("***")
    process.kill(programProcess.pid, "SIGINT")
  })
  .on("uncaughtException", () => {
    console.log("***")
    process.kill(programProcess.pid, "uncaughtException")
  })
