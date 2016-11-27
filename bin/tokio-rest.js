#!/usr/bin/env node

'use strict';
const RET_CODE_ERROR = 1;
const RET_CODE_SUCCESS = 0;
const argv = require('yargs')
    .usage('Usage: $0')
    .demand(0, ['module'])
    // Function
    .string('module')
    .alias('m', 'module')
    .coerce('module', (arg) => {
        return require('path').resolve(arg);
    })
    .describe('module', 'Path to module')
    // Port
    .number('port')
    .default('port', 8080)
    .alias('p', 'port')
    // Interface
    .string('ifc')
    .default('ifc', '0.0.0.0')
    .alias('i', 'ifc')
    // Backlog queue
    .number('backlog')
    .default('backlog', 1024)
    .describe('backlog', 'Maximum number of requests queued to the listen socket')
    // Route
    .string('route')
    .default('route', '/')
    // Body parsing
    .boolean('nobodyparse')
    .describe('nobodyparse', 'Disable HTTP body parsing')
    .string('maxbodysize')
    .default('maxbodysize', '64kb')
    .describe('maxbodysize', 'Maximum body length in bytes. Eg: 128b, 64Kb, 1M')
    // Load shedding
    .boolean('noloadshed')
    .describe('noloadshed', 'Disable event loop delay load shedding')
    // Is this a production deploy?
    .boolean('production')
    .describe('production', 'Disable development checks')
    // Others
    .epilog('copyright Jorge Silva, 2016')
    .version(function version() {
        return require('../package.json').version;
    })
    .showHelpOnFail(false, 'Specify --help for available options')
    .help('help')
    .argv;

/**
 * Set NODE_ENV
 * @important Run this *before* importing modules
 */
process.env.NODE_ENV = argv.production ? 'production' : 'development';

const Promise = require('bluebird');
const Container = require('tokio-core').Container;
const server = require('../src');
const container = new Container(require(argv.module));
const opts = {
    port: argv.port,
    ifc: argv.ifc,
    backlog: argv.backlog,
    route: argv.route,
    parseBody: !argv.nobodyparse,
    maxBodySize: argv.maxbodysize,
    loadShed: !argv.noloadshed
};

function _cleanup(signal = RET_CODE_SUCCESS) {
    return container.destroy()
        .then(process.exit.bind(process, signal))
        .catch(function (e) {
            console.error(e);
            process.exit(RET_CODE_ERROR);
        });
}

container.init(5000)
    .then(function installSignalHandlers() {
        // Politely destroy the context
        // LSB killproc() typically waits 3 seconds before actually KILL'ing the process
        process.once('SIGTERM', _cleanup);
        // CTRL+C
        process.once('SIGINT', _cleanup);
    })
    .then(() => {
        // start servicing
        return server(container, opts);
    })
    .then(_cleanup)
    .catch((err) => {
        console.error(err.stack);
        return _cleanup(RET_CODE_ERROR);
    });