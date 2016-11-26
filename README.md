[![Build Status](https://travis-ci.org/jorgemsrs/tokio-rest.svg?branch=master)](https://travis-ci.org/jorgemsrs/tokio-rest) [![Coverage Status](https://coveralls.io/repos/github/jorgemsrs/tokio-rest/badge.svg?branch=master)](https://coveralls.io/github/jorgemsrs/tokio-rest?branch=master)

  Opinionated, light-weight HTTP container for node.js to make APIs more enjoyable to write.

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

Install a capable process supervisor, e.g. `nodemon`

```
$ npm i -g nodemon
```

Run with supervisor, e.g. `nodemon`

```
$ nodemon -w path_to_your_module tokio-rest -m path_to_your_module
```

# License

  MIT
