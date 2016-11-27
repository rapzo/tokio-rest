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
                     */
                    return function ($cid) {
                        return `[${$cid}] Response B - Just a test`;
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