const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = (env,args) => {
    // console.log(process.env.NODE_ENV);
    return {    
        entry: {
            index: {
                import: path.resolve(process.cwd(),'./src/index.js'),
                library: {
                    type: 'module'
                }
            }
        },
        output:{
            path: path.resolve(process.cwd(),'./build'),
            publicPath: 'auto',
            filename: 'assets/js/[name].[hash:6].bundle.js'
        },
        plugins: [
            new Webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                minify: false,
                inject: 'body',
                template: path.resolve(process.cwd(),'./src/index.html'),
                scriptLoading: 'module'
            }),
            new CleanWebpackPlugin({
                
            })
        ],
        externals: {
            'lodash': 'lodash'
        },
        optimization: {
            minimize: false
        },
        experiments: {
            outputModule: true,
            topLevelAwait: true
        },
        devServer: {
            port: 3000,
            hot: true,
            host: '0.0.0.0',
            allowedHosts: 'all'
        }
    }
}