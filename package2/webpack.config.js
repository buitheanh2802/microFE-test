const Webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModifySourcePlugin } = require('modify-source-webpack-plugin');
const path = require('path');


module.exports = (env, args) => {
    // console.log(process.env.NODE_ENV);
    return {
        entry: {
            index: {
                import: path.resolve(process.cwd(), './src/index.js'),
                library: {
                    type: 'module'
                }
            }
        },
        output: {
            path: path.resolve(process.cwd(), './build'),
            publicPath: 'auto',
            filename: 'assets/js/[name].[contenthash:6].bundle.js'
        },
        plugins: [
            // new Webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                minify: false,
                inject: 'body',
                template: path.resolve(process.cwd(), './src/index.html'),
                scriptLoading: 'module'
            }),
            new MyCustomHooksPlugins(),
            new CleanWebpackPlugin({

            }),
            new ModifySourcePlugin({
                rules: [{
                    test: module => {
                        console.log(module.source().source());
                    }
                }]
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
        },
        stats: 'errors-only',
        performance: {

        }
    }
}

class MyCustomHooksPlugins {
    apply(compiler) {
        // compiler.hooks.environment.tap('MyCustomHooksPlugins',(params) => {
        //     console.log(params);
        // })
        // compiler.hooks.afterEnvironment.tap('MyCustomHooksPlugins',(params) => {
        //     console.log(params);
        // })
        // compiler.hooks.entryOption.tap('MyCustomHooksPlugins',(context,entry) => {
        //     console.log(context);
        //     console.log(entry);
        // })
        // compiler.hooks.normalModuleFactory.tap('hello-world', factory => {
        //     factory.hooks.parser.for('javascript/auto').tap('hello-world', parser => {
        //          parser.hooks.export.tap('hello-world', (node) => {
        //             console.log(node);
        //         //    const { module: { rawRequest } } = parser.state;
        //            // ..
        //          });
        //     });
        // });
        // compiler.hooks.compilation.tap('MyCustomHooksPlugins', (compilation) => {
        //     // console.log(compilation.hooks.optimizeDependencies.tap);
        //     compilation.hooks.recordModules
        //     .tap('MyCustomHooksPlugins', (modules) => {
        //         console.log(modules);
        //         // console.log(recordModules);
        //     });
        //     // compilation.hooks.buildModule.tap(
        //     //     'SourceMapDevToolModuleOptionsPlugin',
        //     //     (module) => {
        //     //         console.log(module);
        //     //         // module.useSourceMap = true;
        //     //     }
        //     // );
        // })
    }
}