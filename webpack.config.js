const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('styles.css');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './src/index.js',
        './src/less/styles.less'
    ],

    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node-modules/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: extractLESS.extract(['css-loader', 'less-loader'])
            },
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'dist/index.html'
        }),
        extractLESS,
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        port: 8083
    },

    devtool: 'source-map'
};