import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import fs from "fs";
import StyleLintPlugin from "stylelint-webpack-plugin";
import ImageMinPlugin from "imagemin-webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

// const entryMap = [];

const DIR = __dirname,
    DIR_SRC = `${DIR}/src/`,
    DIR_DIST = `dist/`;

// console.log(DIR);

// fs.readdirSync(DIR_JS)
//     .filter(file => {
//         return file.match(/.*\.js$/);
//     })
//     .forEach(f => {
//         entryMap.push(DIR_JS + f);
//     });
// console.log(entryMap);
export default {
    entry:  DIR_SRC + "index.js",
    // entry: entryMap,
    output: {
        filename: "[name].min.js",
        path: DIR_DIST,
    },

    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
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
                    }
                ]
            }
        ]
    },
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

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',

        }),
        new webpack.ProvidePlugin([

        ]),
        new StyleLintPlugin({
            context: DIR_SRC,
            files: /.css/,
            fix: true,
            configFile: `${DIR}/.stylelintrc`
        }),

        new ImageMinPlugin({
            bail: false, // Ignore errors on corrupted images
            cache: true,
            imageminOptions: {
                plugins: ["gifsicle"]
            },
        })
    ]
};
