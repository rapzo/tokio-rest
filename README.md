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