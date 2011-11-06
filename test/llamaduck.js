
var llamaduck = require('../lib/llamaduck');
var path = require('path');
var util = require('util');

exports['test basic parsing'] =  function (beforeExit, assert) {
    llamaduck.get_ast(path.resolve('./test/fixtures/process.js'),
                      function (ast) {
                          assert.ok(ast[1].length >= 5);
                      });
};

exports['test process check'] = function (beforeExit, assert) {
    llamaduck.get_ast(path.resolve('./test/fixtures/process.js'),
                      function (ast) {
                          var warnings = llamaduck.check_process(ast);

                          console.log(warnings);

                          assert.eql(warnings.length, 5);
                      });
};
