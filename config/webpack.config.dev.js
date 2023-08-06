const webpack = require('webpack');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');
const outPath = path.join(__dirname, '../dist');

// plugins
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  // context: sourcePath,
  // entry: {
  //   'build/': './index.tsx'
  // },
  output: {
    publicPath: '/', //<--- output path for github
    path: outPath,
    filename: '[hash].js',
    chunkFilename: '[name].[hash].js'
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
      // .ts, .tsx
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            }
          },
          'ts-loader'
        ].filter(Boolean)
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
              'style-loader',
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[local]__[hash:base64:5]'
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
                    require('postcss-browser-reporter')()
                  ]
                }
              }
            ]
          },
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/, use: 'file-loader' }
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
          filename: 'vendor.[hash].js',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    // new CleanWebpackPlugin(),
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
    // }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async'
    // }),
    new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8000,
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning'
  },
};