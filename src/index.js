'use strict';

const koa = require('koa');
const Promise = require('bluebird');
const uuid = require('uuid').v4;
const toobusy = require('toobusy-js');
const pathMatch = require('koa-path-match')

module.exports = function serve(container, opts) {

    return new Promise((resolve, reject) => {
        const app = koa();
        const match = pathMatch();
        const bodyParser = require('koa-bodyparser');

        // Error handler
        app.on('error', function(err) {
            if (process.env.NODE_ENV != 'production') {
                console.error(err);
            }
        });

        if (opts.parseBody) {
            app.use(bodyParser({
                enableTypes: ['json', 'form', 'text'],
                encode: 'utf-8',
                jsonLimit: opts.maxBodySize,
                formLimit: opts.maxBodySize,
                textLimit: opts.maxBodySize,
                strict: true
            }));
        }

        // logger
        /*app.use(function *(next){
            var start = new Date;
            yield next;
            var ms = new Date - start;
            console.log('%s %s - %s', this.method, this.url, ms);
        });*/

        // Load shedding
        if (opts.loadShed) {
            app.use(function *(next) {
                if (toobusy()) {
                    this.status = 503;
                } else {
                    yield next;
                } 
            });
        }

        // response
        app.use(match(opts.route, function *() {
            const ctx = {
                $cid: uuid(),
                $requestContext: {
                    headers: this.request.header,
                    params: this.params,
                    query: this.query,
                    body: this.request.body
                },
                $req: this.request,
                $res: this.response
            };            

            try {
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
        
        // TODO: spin up the health socket

        // Spin up the servicing socket
        app.listen(opts.port, opts.ifc, opts.backlog)
            .on('error', () => {
                // TODO: server.close()
                reject();
            });
    });
};