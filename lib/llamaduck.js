
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

    if (ast[0] === 'dot') {
        if (ast[1].join('_') === 'name_process') {
            if (ast[2] === 'ENV') {
                warnings.push("Using process.ENV -> process.env");
            }
            if (ast[2] === 'ARGV') {
                warnings.push("Using process.ARGV -> process.argv");
            }
        }else if (ast[2] === 'vsize') {
            if (ast[1][0] === 'call') {
                if (ast[1][1][1].join('_') === 'name_process' &&
                    ast[1][1][2] === 'memoryUsage') {

                    warnings.push("process.memoryUsage().vsize was removed");
                }
            }
        }
    }else if (ast[0] === 'call') {
        if (ast[1][0] === 'dot' &&
            ast[1][1].join('_') === 'name_process' &&
            ast[1][2] === 'binding') {

            if (ast[2][0].join('_') === 'string_stdio') {
                warnings.push("process.binding('stdio') was removed");
            }
            if (ast[2][0].join('_') === 'string_net') {
                warnings.push("process.binding('net') was remoevd");
            }
        }
    }else{
        warnings.push(ast[1].map(function (ast) {
            return check_process(ast[1]);
        }));
    }

    return _.flatten(warnings);
}

function check_regexp(ast) {
    var warnings = [];

    return warnings;
}


exports.get_ast = get_ast;
exports.check_process = check_process;
exports.check_regexp = check_regexp;

exports.quack = function () {
    // the main function

    // Outline:
    // get ast of file
    // walk through and apply checks
    // checks collected from: https://github.com/joyent/node/wiki/API-changes-between-v0.4-and-v0.6
}
