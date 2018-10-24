module.exports = {
    entry: {
        index: './js/index',
    },
    output: {
        filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
    module: {
        loader: [{
            test: /\.js$/,
            loader: 'babel',
            excludes: 'node_modules',
        }]
    },
    mode: 'production',
}