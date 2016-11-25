'use strict';

/**
 * @sync
 */
function HelloWorld() {
    // Do what you will here, scope, etc...
}

/**
 * Configure the container
 * @async
 * @param {Container} container
 */
HelloWorld.prototype.$onInit = function(container) {
    container.addPlugin('satisfies', function () {
        return function () {
            return Math.floor(Math.random()*10) % 2;
        }
    });

    container.addPlugin('responseA', {
        create: {
            module: function () {
                return function ($cid) {
                    return `Response A - ${$cid}`;
                }
            }
        }
    });

    container.addPlugin('responseB', {
        create: {
            module: function () {
                return function ($cid, $requestContext) {
                    return `[${$cid}] Response B - ${$requestContext}`;
                }
            }
        }
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
 * Run immediately after container is ready and before servicing starts.
 * Useful for setup code.
 * @async
 * @di
 */
HelloWorld.prototype.$before = function() {
    // noop
}

/**
 * Run before each service request
 * @async
 * @di
 */
HelloWorld.prototype.$beforeEach = function($cid) {
    console.time($cid);
}

/**
 * Run after each service request
 * @async
 * @di
 */
HelloWorld.prototype.$afterEach = function($cid) {
    console.timeEnd($cid);
}

/**
 * Servicing fn
 * @async
 * @di
 */
HelloWorld.prototype.$run = function(satisfies, responseA, responseB) {
    if (satisfies()) {
        return responseA;
    }
    return responseB;
}

module.exports = new HelloWorld();