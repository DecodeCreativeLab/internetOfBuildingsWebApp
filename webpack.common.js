
module.exports = {
    entry: {
        index: './src/index.js',
        landingPage: './src/landingPage.js',
    },
    plugins: [
       
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            // attrs: [":src"]
                        }
                    }
                ]
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images"
                    }
                }

            },
           
        ]
    }
};