const API = require('./src/api/webpackAPI.js');
const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
    entry: {
        index: './src/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader']
        },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            },
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter'),
            //       // 不符合Eslint规则时只警告(默认运行出错)
            //       // emitWarning: !config.dev.showEslintErrorsInOverlay
            //       fix: true
            //     }
            // },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            '@': resolve(__dirname, './src'),
        }
    },
    devServer: {
        host: 'localhost',
        port: 9999,
        proxy: {
            // '/sso/': {
            //     target: API.SSO_URL+'/sso/',
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/sso': ''
            //     }
            // },
            // '/menu/': {
            //     target: API.MENU_URL,
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/menu': ''
            //     }
            // },
            '/platform/':{
                target:API.ROOT,
                changeOrigin: true,
                pathRewrite: {
                    '^/platform': ''
                }
            },

        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})
