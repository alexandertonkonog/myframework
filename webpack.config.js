const path = require('path');
const TerserPlugin  = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'build.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: [
                  // The `injectType`  option can be avoided because it is default behaviour
                  { loader: "style-loader", options: { injectType: "styleTag" } },
                  "css-loader",
                ],
            },
        ],  
    }  
};