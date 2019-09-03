import webpack from "webpack";
// import fs from "fs";
import StyleLintPlugin from "stylelint-webpack-plugin";
import ImageMinPlugin from "imagemin-webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';


const DIR = __dirname,
    DIR_SRC = `${DIR}/src/`,
    DIR_DIST = `${DIR}/dist/`,
    JS_INDEX = `${DIR_SRC}index.jsx`,
    HTML_INDEX = `${DIR}/index.html`;

console.log(typeof(DIR_DIST));

const globalVisibility = [

];

const externals = {

};

export default {
    entry: JS_INDEX,
    output: {
        filename: "[name].min.js",
        path: DIR_DIST.toString(),
        // publicPath: "dist"
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    externals: externals,
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: "dist/cache",
                parallel: true,
                sourceMap: true,
                extractComments: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name() {
                                // if (process.env.NODE_ENV === 'development') {
                                //     return '[path][name].[ext]';
                                // }

                                return 'fonts/[hash].[ext]';
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name() {
                            return "img/[hash].[ext]";
                        }
                    }
                },
                    {
                        loader: ImageMinPlugin.loader,
                        options: {
                            bail: false,
                            cache: true,
                            imageminOptions: {
                                plugins: ["gifsicle"]
                            }
                        }
                    }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: HTML_INDEX,
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',

        }),
        new webpack.ProvidePlugin(globalVisibility),

        // new StyleLintPlugin({
        //     context: DIR_SRC,
        //     files: /\.(css|scss)$/,
        //     fix: true,
        //     configFile: `${DIR}/.stylelintrc`,
        //
        // }),

        new ImageMinPlugin({
            bail: false, // Ignore errors on corrupted images
            cache: true,
            imageminOptions: {
                plugins: ["gifsicle"]
            },
        })
    ]
    // devServer: {
    //   overlay: true
    // }
};
