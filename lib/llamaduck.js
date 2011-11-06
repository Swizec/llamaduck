
var parser = require('uglify-js').parser;
var fs = require('fs');
var _ = require('underscore');

function get_ast(path, callback) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) throw err;

        callback(parser.parse(data));
    });
}

function check_process(ast) {
    var warnings = [];

    console.log(ast);

    console.log("");

    if (ast[0] === 'dot') {
        if (ast[1].join('_') === 'name_process') {
            if (ast[2] === 'ENV') {
                warnings.push("Using process.ENV -> process.env");
            }
            if (ast[2] === 'ARGV') {
                warnings.push("Using process.ARGV -> process.argv");
            }
        }
    }else{
        warnings.push(ast[1].map(function (ast) {
            return check_process(ast[1]);
        }));
    }

   /* if (ast[1]) {
        warnings.join(ast[1].map(function (ast) {
            if (ast[0] === 'process') {
                console.log('PROCESS');
            }else{
                return check_process(ast[1], warnings);
            }
        }));
    }*/

    return _.flatten(warnings);
}

exports.get_ast = get_ast;
exports.check_process = check_process;

exports.quack = function () {
    // the main function

    // Outline:
    // get ast of file
    // walk through and apply checks
    // checks collected from: https://github.com/joyent/node/wiki/API-changes-between-v0.4-and-v0.6
}
