const webpack = require('webpack');
const path = require('path');
const outPath = path.join(__dirname, '../dist');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // context: sourcePath,
  // entry: {
  //   'build/': './index.tsx'
  // },
  output: {
    publicPath: '/', //<--- index.html source file path
    path: outPath,
    filename: 'build/[contenthash].js',
    chunkFilename: 'build/[name].[contenthash].js'
  },
  // resolve: {
  //   // Add '.ts' and '.tsx' as resolvable extensions.
  //   extensions: [".js", ".ts", ".tsx"],
  //   // Fix webpack's default behavior to not load packages with jsnext:main module
  //   // (jsnext:main directs not usually distributable es6 format, but es6 sources)
  //   mainFields: ['module', 'browser', 'main'],
  //   alias: {
  //     app: path.resolve(__dirname, '../src/app/')
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            include: /node_modules/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: false
                }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  sourceMap: false,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: [
                    require('postcss-import')({ addDependencyTo: webpack }),
                    require('postcss-url')(),
                    require('postcss-preset-env')({
                      /* use stage 2 features (defaults) */
                      stage: 2
                    }),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({
                      disabled: true
                    })
                  ]
                }
              }
            ]
          },
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { 
        test: /\.(a?png|svg)$/, 
        // use: 'url-loader?limit=10000',
        loaders: [{
          loader: 'url-loader?limit=10000',
          options: {
            outputPath: 'build/'
          }
        }]
      },
      {
        test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
        // use: 'file-loader',
        loaders: [{
          loader: 'file-loader',
          options: {
            outputPath: 'build/',
          }
        }]

      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: 'build/vendor.[contenthash].js',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'build/[hash].css',
    }),
    // new HtmlWebpackPlugin({
    //   template: 'assets/index.html',
    //   minify: {
    //     minifyJS: true,
    //     minifyCSS: true,
    //     removeComments: true,
    //     useShortDoctype: true,
    //     collapseWhitespace: true,
    //     collapseInlineTagWhitespace: true
    //   },
    //   append: {
    //     head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
    //   }
    //   // meta: {
    //   //   title: 'Kristoffer Robin Canlas',
    //   //   description: package.description,
    //   //   keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
    //   // }
    // }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async'
    // }),
  ].filter(Boolean),
  // // https://webpack.js.org/configuration/devtool/
  // devtool: 'build/hidden-source-map',
  // node: {
  //   // workaround for webpack-dev-server issue
  //   // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
  //   fs: 'empty',
  //   net: 'empty'
  // }
};