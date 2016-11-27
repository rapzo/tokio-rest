  [![Build status][travis-image]][travis-url]
  [![NPM version][npm-image]][npm-url]
  [![Test coverage][coveralls-image]][coveralls-url]

  Opinionated, light-weight HTTP container for [node.js](https://nodejs.org/).
  It brings a design by contract approach to Web API development. 
  
  Makes Web APIs arguably cheaper to write by allowing developers to focus on 
  the business logic as opposed to having to worry about non-functional requirements.

## Installation

```
$ npm install -g tokio-rest
```

  tokio-rest is supported in node v4+.

## Hello World

In your projects folder, create a NPM module

```
$ mkdir hello-tokio
$ cd hello-tokio
$ npm init -y
```

Create an `index.js` file 

```js
const myProgram = {
  $do() {
    return 'Hello World!';
  }
};

module.exports = function myProgramFactory() {
  return myProgram;
}
```

Save it and, in your project folder, run

```
$ tokio-rest -m .
```

Point your browser to http://localhost:8080.


## Run

```
$ tokio-rest -m path_to_your_module
```

### With restart on change

Install a process supervisor, e.g. `nodemon`

```
$ npm i -g nodemon
```

Run with supervisor, e.g. `nodemon`

```
$ nodemon -w path_to_your_module tokio-rest -m path_to_your_module
```

# License

  MIT

[npm-image]: https://img.shields.io/npm/v/tokio-rest.svg?style=flat
[npm-url]: https://www.npmjs.com/package/tokio-rest
[travis-image]: https://travis-ci.org/jorgemsrs/tokio-rest.svg?branch=master
[travis-url]: https://travis-ci.org/jorgemsrs/tokio-rest
[coveralls-image]: https://coveralls.io/repos/github/jorgemsrs/tokio-rest/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/jorgemsrs/tokio-rest?branch=master