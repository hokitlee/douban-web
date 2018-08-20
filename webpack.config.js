const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
    entry: {
        app: path.join(__dirname, 'static/js/app.js')
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, './dist')
    },
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 80,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
            //         "css-loader",
            //         "style-loader"
            //     ]
            // }
        ]
    }, plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'static/index.html',
            // hash: true,
            // chunks:["index"]
        }),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        // new ExtractTextPlugin({
        //     filename: "bundle.css",
        //     disable: false,
        //     allChunks: true
        // }),
        new webpack.HotModuleReplacementPlugin()
    ]
}