'use strict';

/**
 * @sync
 */
function HelloWorld() {
    // Do what you will here, scope, etc...
}

/**
 * Configure the container
 * @sync
 * @param {Container} container
 */
HelloWorld.prototype.$configure = function(container) {
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
 * Run immediately after container is ready and before servicing starts.
 * Useful for setup code.
 * @async
 * @di
 */
HelloWorld.prototype.$setup = function() {
    // noop
}

/**
 * @async
 * @param {Container} container
 */
HelloWorld.prototype.$teardown = function(container) {
    // Cleanup work
}

/**
 * Run before each service request
 * @async
 * @di
 */
HelloWorld.prototype.$require = function($cid) {
    //console.log('preconditions');
}

/**
 * Run after each service request
 * @async
 * @di
 */
HelloWorld.prototype.$ensure = function($cid) {
    //console.log('postconditions');
}

/**
 * Servicing fn
 * @async
 * @di
 */
HelloWorld.prototype.$do = function(satisfies, responseA, responseB) {
    if (satisfies()) {
        return responseA;
    }
    return responseB;
}

module.exports = function helloWorldFactory() {
    return new HelloWorld();
};