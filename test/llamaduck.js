
var llamaduck = require('../lib/llamaduck');
var path = require('path');
var util = require('util');

var fixture = function (fixture) {
    return path.resolve(path.join('./test/fixtures', fixture));
};

exports['test basic parsing'] =  function (beforeExit, assert) {
    llamaduck.get_ast(fixture('process.js'),
                      function (ast) {
                          assert.ok(ast[1].length >= 5);
                      });
};

exports['test process check'] = function (beforeExit, assert) {
    llamaduck.get_ast(fixture('process.js'),
                      function (ast) {
                          var warnings = llamaduck.check_process(ast);

                          console.log(warnings);

                          assert.eql(warnings.length, 5);
                      });
};

exports['test RegExp check'] = function (beforeExit, assert) {
    llamaduck.get_ast(fixture('RegExp.js'),
                      function (ast) {
                          var warnings = llamaduck.check_regexp(ast);

                          console.log(warnings);

                          assert.eql(warnings.length, 1);
                      });
};
