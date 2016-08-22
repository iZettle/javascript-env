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

To configure `javascript-env` put a `javascript-env.js` in your project's root directory. Each program as it's own section it this config file. There's an [example config](https://github.com/iZettle/javascript-env/blob/master/config/example.js) you can look at to get the idea.

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

### compile - 'cause configuring webpack is a pain

Gives us the ability to use es2015 and jsx without the hassle of setting up and configuring seventyeleven packages.

The only thing you need to get started is to specify `entry` and `output` in the compile section of your `javascript-env.js` file.

```js
module.exports = {
  compile: {
    entry: "./path/to/entry-file.js",
    output: {
      path: "./path/to/output-dir",
      filename: "bundle-file-name.js"
    }
  }
}
```

Have a look at the [example config](https://github.com/iZettle/javascript-env/blob/master/config/example.js) to find out about all the configuration options. There's however one thing that the example config does not describe, which is the possibility to have multiple compile configs in your `javascript-env.js` file. This is done by setting the value of the compile section to an array of configs rather that just one:

```js
module.exports = {
  compile: [{
    target: "web",
    entry: "./path/to/entry-file.js",
    output: {
      path: "./path/to/output-dir",
      filename: "bundle-file-name.js"
    }
  }, {
    target: "node",
    entry: "./path/to/node-entry-file.js",
    output: {
      path: "./path/to/output-dir",
      filename: "bundle-file-name.js"
    }
  }]
}
```

These multiple builds will run in parallell thank you very much.

There's a simple CLI for this program as well.
- `$ javascript-env compile` - A one-off run (runs all of your configs)
- `$ javascript-env compile --production` - Same as above but does [compression, minification, deduping](https://github.com/iZettle/javascript-env/blob/master/programs/compile/compile-with-webpack.js#L30-L44) and so on.
- `$ javascript-env compile --watch` - Compiles and then watches for changes and recompiles when they happen
- `$ javascript-env compile --dev-server` - Starts a [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html)

### test - without tests you might brick the TV

We're using the following test suite

- [Karma](https://karma-runner.github.io/1.0/index.html) as a test running on
    phantomjs and in the future on Chrome/Firefox/Safari
- [Jasmine](http://jasmine.github.io/) - as a test framework for writing the
    tests.
- [Mocha reporter](https://www.npmjs.com/package/karma-mocha-reporter) - for
    lovely output

Tell `javascript-env` where your test files live by specifying it in the test section of your project's `javascript-env.js` file.

```js
module.exports = {
  test: {
    files: "**/*.js"
  }
}
```

And run it like so:

```sh
$ javascript-env test
```

:ring:
:fish_cake:

