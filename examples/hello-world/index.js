'use strict';

/**
 * @sync
 */
function HelloWorld() {
    // Do what you will here, scope, etc...
    this.version = '3.2';
}

/**
 * @async
 * @param {Container} container
 */
HelloWorld.prototype.$onInit = function(container) {
    // Configure the container
    //container.log('$onInit');
    container.addPlugin('a', {
        create: {
            args: [{ $ref: 'b' }],
            module: function cenas(b) {
                //console.log('a create>', b)
                return {
                    init: function() {
                        //console.log('a init>');
                    },
                    ready: function() {
                        //console.log('a ready>');
                    },
                    destroy: function() {
                        //console.log('a destroy>');
                    }
                };
            }
        },
        properties: {
            test: 'injected property'
        },
        init: 'init',
        ready: 'ready',
        destroy: 'destroy'
    });

    container.addPlugin('b', {
        create: {
            module: function pluginB() {
                //console.log('b create>');

                const service = function onService(cid) {
                    //console.log('b service>', cid);
                    return 2222;
                }

                service.init = function init() {
                    //console.log('b init>');
                };

                service.destroy = function destroy() {
                    //console.log('b destroy>');
                }

                return service;
            }
        },
        init: 'init',
        destroy: 'destroy'
    });
}

/**
 * @async
 * @param {Container} container
 */
HelloWorld.prototype.$onDestroy = function(container) {
    // Cleanup work
}

/**
 * @async
 * @di
 */
HelloWorld.prototype.$before = function(a) {
    // run immediately after container is ready and before servicing starts
    // useful for setup code
    //console.log('before>');
}

/**
 * @async
 * @di
 */
HelloWorld.prototype.$beforeEach = function(cid) {
    // run before each service request
    //console.time(cid);
}

/**
 * @async
 * @di
 */
HelloWorld.prototype.$afterEach = function(cid) {
    // run after each service request
    //console.timeEnd(cid);
}

/**
 * @async
 * @di
 */
HelloWorld.prototype.$run = function(cid, b, requestContext, $res) {
    // service component
    if (Math.floor(Math.random()*10) % 2) {
        return `ahahahah! ${cid} - ${b}`;
    } else {
        return 'Lucky!';
    }
}

module.exports = new HelloWorld();