const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./index.html"),
    filename: "./index.html"
});
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    optimization: {
        splitChunks: {
            // include all types of chunks
            chunks: 'all'
        }
    },

    output: {
        publicPath: "/",
    },
    
    // Enable sourcemaps for debugging webpack's output.
    devtool: "inline-source-map",
    
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline:true,
    },

    entry: [
        'react-hot-loader/patch',
        './src/index',
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {

        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.s?css$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                }
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new Dotenv(),
    ]
};
