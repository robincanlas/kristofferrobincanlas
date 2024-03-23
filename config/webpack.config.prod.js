const webpack = require('webpack');
const path = require('path');
const outPath = path.join(__dirname, '../dist');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  output: {
    publicPath: '/', //<--- index.html source file path
    path: outPath,
    filename: 'build/[contenthash].js',
    chunkFilename: 'build/[name].[contenthash].js'
  },
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
                options: {
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
                      require('postcss-browser-reporter')({
                        disabled: true
                      })
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

  ].filter(Boolean)
};