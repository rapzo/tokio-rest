'use strict';

const koa = require('koa');
const uuid = require('uuid').v4;
const Promise = require('bluebird');
const toobusy = require('toobusy-js');
const match = require('koa-path-match')();
const bodyParser = require('koa-bodyparser');

module.exports = function serve(container, opts) {

    return new Promise((resolve, reject) => {
        const app = koa();
        const logger = container.logger();

        // Error handler
        app.on('error', function(err) {
            if (process.env.NODE_ENV != 'production') {
                logger.error(err);
            }
        });
        logger.debug('Installed error handler');

        // Load shedding
        if (opts.loadShed) {
            app.use(function *(next) {
                if (toobusy()) {
                    this.status = 503;
                } else {
                    yield next;
                } 
            });
            logger.debug('Installed load shed');
        }

        if (opts.parseBody) {
            app.use(bodyParser({
                enableTypes: ['json', 'form', 'text'],
                encode: 'utf-8',
                jsonLimit: opts.maxBodySize,
                formLimit: opts.maxBodySize,
                textLimit: opts.maxBodySize,
                strict: true
            }));
            logger.debug('Installed body parser');
        }

        // TODO: Request logger
        /*app.use(function *(next){
            var start = new Date;
            yield next;
            var ms = new Date - start;
            console.log('%s %s - %s', this.method, this.url, ms);
        });*/

        // API middleware
        app.use(match(opts.route, function *() {
            const ctx = {
                $cid: uuid(),
                // Not suitable for JSON.stringify
                $requestContext: {
                    // {Object} - Request headers
                    headers: this.request.header,
                    // {see https://www.npmjs.com/package/cookies} - Lazy loaded cookies
                    cookies: this.cookies,
                    // {Object} - URL params
                    params: this.params,
                    // {Object} - Query parameters
                    query: this.query,
                    // {Object} - Parsed body content
                    body: this.request.body
                },
                // Koa request wrapper
                $req: this.request,
                // Koa response wrapper
                $res: this.response
            };

            try {
                // Fulfill request
                let result = yield container.execute(ctx);

                // Result may have been set inside the program by using $res.body
                if (this.body === undefined) {
                    this.body = result;
                }
            } catch (err) {
                console.error(err);
                this.status = 500;
            } 
        }));
        logger.debug(`Installed API route in "${opts.route}"`);
        
        // TODO: spin up the health socket

        // Spin up the servicing socket
        app.listen(opts.port, opts.ifc, opts.backlog)
            .on('listening', () => {
                logger.info(`Up & running at http://${opts.ifc}:${opts.port}/`);
            })
            .on('error', () => {
                // TODO: server.close()
                reject();
            });
    });
};