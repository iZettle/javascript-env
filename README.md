# javascript-env
A collection of programs and configuration files that is meant to be shared between our JavaScript projects.

## Install
```sh
$ npm install git+ssh://git@github.com:iZettle/javascript-env.git
```

## Usage
Run a program from command line:
```sh
$ `npm bin`/javascript-env [programName] [args]
```
or from your `package.json`:
```js
{
  "scripts": {
    "lint": "javascript-env [programName] [args]"
  }
}
```

Everything following the `programName` will be passed as arguments to the program. So check the documentation of the program to find out what it can do.

## Programs
The following programs exist currently:

### lint - one code style to rule them all
Uses `eslint` and the `programs/lint/.eslintrc` rule file and the files glob specified in your `javascript-env.js` config file. Any other arguments supplied will just be passed to eslint.

Configure what files to lint by specifing it in your projects `javascript-env.js` config file.
```js
module.exports = {
  lint: {
    files: "**/*.js"
  }
}
```

And run it like so:
```sh
$ javascript-env lint
```

You can make the **Atom** `linter-eslint` package use this projects `.eslintrc` file by putting `./node_modules/javascript-env/programs/lint/.eslintrc` into the `.eslintrc Path` text field.

### test - without tests you might brick the TV

We're using the following test suite

- [Karma](https://karma-runner.github.io/1.0/index.html) as a test running on
    phantomjs and in the future on Chrome/Firefox/Safari
- [Jasmine](http://jasmine.github.io/) - as a test framework for writing the
    tests.
- [Mocha reporter](https://www.npmjs.com/package/karma-mocha-reporter) - for
    lovely output

Currently there's no way to provide a path to the test, it'll only run the
current directories tests.

```sh
$ javascript-env test
```

:ring:
:fish_cake:

