const { Webpack, Compilation } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModifySourcePlugin } = require("modify-source-webpack-plugin");
const path = require("path");

module.exports = (env, args) => {
  // console.log(process.env.NODE_ENV);
  const current_work_directory = process.cwd();
  // console.log(current_work_directory);
  return {
    entry: {
      index: {
        import: path.resolve(process.cwd(), "./src/index.js"),
        library: {
          type: "module",
        },
      },
    },
    output: {
      path: path.resolve(process.cwd(), "./build"),
      publicPath: "auto",
      filename: "assets/js/[name].[contenthash:6].bundle.js",
    },
    plugins: [
      // new Webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        minify: false,
        inject: "body",
        template: path.resolve(process.cwd(), "./src/index.html"),
        scriptLoading: "module",

      }),
      //   new MyCustomHooksPlugins(),
      new CleanWebpackPlugin({}),
      // new ModifySourcePlugin({
      //     rules: [{
      //         test: module => {
      //             console.log(module.source().source());
      //         }
      //     }]
      // })
    ],
    externals: {
      lodash : `module /dependencies/lodash`
    },
    optimization: {
      minimize: false,
    },
    experiments: {
      outputModule: true,
      topLevelAwait: true,
    },
    devServer: {
      port: 3000,
      hot: true,
      host: "0.0.0.0",
      allowedHosts: "all",
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      },
      static: [{
        directory: path.resolve(process.cwd(),'./node_modules'),
        publicPath: '/dependencies'
      }]
    },
    stats: "errors-only",
    performance: {},
  };
};
