'use strict';

const myProgram = {
    /**
     * Configure the container
     * @sync
     * @param {Container} container
     */
    $configure(container) {
        container.addPlugin('satisfies', function () {
            return function () {
                return Math.floor(Math.random()*10) % 2;
            }
        });

        container.addPlugin('responseA', {
            create: {
                module: function () {
                    /**
                     * @param {String} $cid - The request correlation Id
                     */
                    return function ($cid) {
                        return `Response A - ${$cid}`;
                    }
                }
            }
        });

        container.addPlugin('responseB', {
            create: {
                module: function () {
                    /**
                     * @param {String} $cid - The request correlation Id
                     * @param {Object} $requestContext - The request data
                     */
                    return function ($cid, $requestContext) {
                        return `[${$cid}] Response B - ${JSON.stringify($requestContext)}`;
                    }
                }
            }
        });
    },

    /**
     * Distribute different responses.
     * @return {String}
     */
    $do(satisfies, responseA, responseB) {
        if (satisfies()) {
            return responseA;
        }
        return responseB;
    }
};

module.exports = function myProgramFactory() {
  return myProgram;
};