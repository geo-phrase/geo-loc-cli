#!/usr/bin/env node

console.log('hello world');

const args = process.argv.splice(process.execArgv.length + 2);

console.log('args: ', args);
