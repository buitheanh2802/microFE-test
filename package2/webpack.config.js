const Webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModifySourcePlugin } = require("modify-source-webpack-plugin");
const deps = require('./package.json').dependencies
const path = require("path");



module.exports = (env, args) => {
  // console.log(process.env.NODE_ENV);
  const current_work_directory = process.cwd();
  const isDevMode = args.mode === 'development';
  // console.log(current_work_directory);
  return {
    entry: path.resolve(process.cwd(), "./src/index.js"),
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/i,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react'
              ]
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    output: {
      // path: path.resolve(process.cwd(), "./build"),
      publicPath: "auto",
      // filename: "assets/js/[name].[contenthash:6].bundle.js",
      // chunkFilename: "assets/js/chunks/[name].chunks.js"
    },
    plugins: [
      new Webpack.ProgressPlugin(),
      new Webpack.container.ModuleFederationPlugin({
        name: 'package2',
        remotes: {
          app2: "app3@http://localhost:3002/remoteEntry.js",
        },
        shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "./public/index.html"),
      }),
      //   new MyCustomHooksPlugins(),
      !isDevMode && new CleanWebpackPlugin({}),
      // new ModifySourcePlugin({
      //     rules: [{
      //         test: module => {
      //             console.log(module.source().source());
      //         }
      //     }]
      // })
    ],
    // externals: {
    //   lodash : `module /dependencies/lodash`
    // },
    optimization: {
      minimize: isDevMode ? false : true,
    },
    experiments: {
      // outputModule: true,
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
      // static: [{
      //   directory: path.resolve(process.cwd(),'./node_modules'),
      //   publicPath: '/dependencies'
      // }]
    },
    stats: "errors-only",
    performance: {},
    resolve: {
      extensions: ['.jsx','.js','.mjs']
    },
    mode: args.mode
  };
};

/*

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = () => {
  return {
    entry: {
      index: "./src/index.js"
    },
    mode: "development",
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3000,
    },
    output: {
      publicPath: "auto",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "package2",
        remotes: {
          app2: "app3@http://localhost:3002/remoteEntry.js",
        },
        shared: { react: { singleton: true }, "react-dom": { singleton: true } },
      }),
      new ExternalTemplateRemotesPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    resolve: {
      extensions: ['.jsx', '.js']
    }
  }
};


*/
