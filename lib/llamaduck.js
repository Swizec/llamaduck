
var parser = require('uglify-js').parser;
var fs = require('fs');

function get_ast(path, callback) {
    fs.readFile(path, 'utf-8', function (err, data) {
        if (err) throw err;

        callback(parser.parse(data));
    });
}

exports.get_ast = get_ast;

exports.quack = function () {
        // the main function
}
