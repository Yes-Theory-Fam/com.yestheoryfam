const merge = require('webpack-merge');
const config = require('./webpack.dev.js');

module.exports = merge(config, {
    // set webpack to production mode; minifies bundles and other smart stuff
    mode: "production",
    // remove devServer config even though it's not really relevant in production
    devServer: undefined,
    // use more efficient source map for production
    devtool: "source-map",
});
