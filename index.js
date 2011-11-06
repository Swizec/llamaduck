#!/usr/bin/env node

var llamaduck = require('./lib/llamaduck');

var filepath = process.argv.pop();

llamaduck.quack(filepath);
