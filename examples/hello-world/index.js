'use strict';

const myProgram = {
  $do() {
    return 'Hello World!';
  }
};

module.exports = function myProgramFactory() {
  return myProgram;
};