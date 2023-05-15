'use strict'
const path = require('path');

module.exports = {
    mode: 'developmnet',
    entry: './js/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/js'),
    },
    watch: true,
    devtool: 'source-map',
    module: {}
};