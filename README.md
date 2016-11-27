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

[npm-image]: https://img.shields.io/npm/v/tokio-core.svg?style=flat
[npm-url]: https://www.npmjs.com/package/tokio-core
[travis-image]: https://travis-ci.org/jorgemsrs/tokio-rest.svg?branch=master
[travis-url]: https://travis-ci.org/jorgemsrs/tokio-rest
[coveralls-image]: https://coveralls.io/repos/github/jorgemsrs/tokio-rest/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/jorgemsrs/tokio-rest?branch=master