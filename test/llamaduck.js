
var parser = require('uglify-js').parser;
var fs = require('fs');

exports['test basic parsing'] =  function (beforeExit, assert) {
    fs.readFile('./test/llamaduck.js', function (err, data) {
        if (err) throw err;
        console.log(parser.parse(data+""));
    });
};
