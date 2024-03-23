const webpack = require('webpack');
const path = require('path');
const sourcePath = path.join(__dirname, '../src');
const outPath = path.join(__dirname, '../dist');

// plugins
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/', //<--- output path for github
    path: outPath,
    filename: '[name].js',
    chunkFilename: '[name].[hash].js'
  },
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
                options: {
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
                  postcssOptions: {
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
              }
            ]
          },
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(jpe?g|svg|png|gif|bmp|mp3|mp4|ogg|wav|ico|eot|ttf|woff|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      }
    ]
  },
  optimization: {
    splitChunks: {
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
    new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    // host: '0.0.0.0',
    host: 'localhost',
    port: 8000,
    hot: true,
    // inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    devMiddleware: {
      stats: 'minimal'
    },
    client: {
      logging: 'warn'
    },
    static: sourcePath
  },
};