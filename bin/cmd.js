#!/usr/bin/env node

const programs = {
  lint: require('../lint')
}

const name = process.argv[2]
const args = process.argv.slice(3)

if (!name) {
  console.error('You need to supply a program to run')
  process.exit(0)
}

if (!programs[name]) {
  console.error(`There's no program called "${name}"`)
  process.exit(0)
}

console.log(`Running: ${name}`)

const program = programs[name](args)

program.stdout.pipe(process.stdout)
program.stderr.pipe(process.stderr)
program.on('exit', () => {
  process.exit(0)
})
