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
The following programs exist currently

### eslint - one code style to rule them all
Will use the `eslint/.eslintrc` rule file. Any other arguments supplied will just be passed to eslint.

```sh
$ javascript-env eslint /path/to/javascript
```

Happy Hacking! :ring:
