const path = require("path");
const common = require("./webpack.common.js")
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: '[name].[hash:20].js', // Handle cache
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            inject: true,
            chunks: ['index'],
            filename: 'app.html'
        }),
        new HtmlWebpackPlugin({
            template: "./src/landingPageTemplate.html",
            inject: true,
            chunks: ['landingPage'],
            filename: 'index.html'
        }),
        new Dotenv({ // makes vars available to the application js code
            path: './.env',
            safe: true,
            allowEmptyValues: true,
        }),
        new CopyPlugin({
            patterns: [{
                from: "./src/videos/*.mp4",
                to({ context, absoluteFilename }) {
                  return Promise.resolve("./dist/videos/[name][ext]");
                },
              },
              {
                from: "./src/images/favicon/*.ico",
                to({ context, absoluteFilename }) {
                  return Promise.resolve("./dist/images/favicon/[name][ext]");
                },
              },
            ]
        }),
        // new WebpackCDNInject({
        //     head: ["https://apis.google.com/js/api.js"]
        //   })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: ['style-loader', //3. Inject styles into DOM
                    'css-loader', //2. Turns css into commonjs
                    'sass-loader' //1. Turns sass into css
                ],
            },
            // {
            //     test: /\.mp4$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10000,
            //                 mimetype: 'video/ mp4'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.node$/,
                loader: "node-loader",
            },
        ]
    },
    resolve: {

        modules: ['node_modules'],

        alias: {
            'node_modules': path.join(__dirname, 'node_modules')
        },

    },
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        contentBase: './dist',
        compress: true,
        port: 9000,
    },
});