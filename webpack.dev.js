const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 9000,
        contentBase: './dist',
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /(node_modules | bower-components)/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'development'
        })
    ]
});
