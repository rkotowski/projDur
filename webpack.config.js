var path = require('path');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

// TODO: optymalizacja buildu modułów webpacka
//noinspection JSUnresolvedVariable
module.exports = {
    devtoll: debug ? 'cheap-source-map' : null,
    entry: path.resolve(__dirname + '/main.js'),
    output: {
        path: debug ? __dirname : __dirname + '/public/assets/js/prodBundle/',
        filename: 'index.js'
    },
    devServer: !debug ? [] : {
        inline: true,
        port: 3333
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-es2015-destructuring", "transform-object-rest-spread", "transform-decorators-legacy"]
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        root: path.resolve(__dirname, 'node_modules')
    },
    resolveLoader: {
        modulesDirectories: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    plugins: debug ? [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl|en-gb/)
    ] : [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pl|en-gb/)
    ]
};