
var llamaduck = require('../lib/llamaduck');
var path = require('path');
var util = require('util');

exports['test basic parsing'] =  function (beforeExit, assert) {

    llamaduck.get_ast(path.resolve('./test/fixtures/process.js'),
                      function (ast) {
                          assert.ok(ast[1].length >= 5);
                      });
};
