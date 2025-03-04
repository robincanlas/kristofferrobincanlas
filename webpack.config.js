const webpack = require('webpack');
const path = require('path');
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env, option) => {
  const isProduction = option.mode === 'production';
  console.log(
    `
		####### ##         ##       #####  ##   ##
		##      ##        ####     ##      ##   ##
		#####   ##       ##  ##     ####   ####### ` + option.mode + `
		##      ##      ########       ##  ##   ##
		##      ###### ##      ##  #####   ##   ##
		`
  );

  return {
    mode: option.mode,
    devServer: {
      hot: true
    },
    context: sourcePath,
    entry: {
      'build/': './index.tsx'
    },
    output: {
      // publicPath: '/', //<--- output path if using nodejs
      publicPath: isProduction ? '/build/' : '/', //<--- output path for github
      path: outPath,
      filename: isProduction ? '[contenthash].js' : '[hash].js',
      chunkFilename: isProduction ? '[name].[contenthash].js' : '[name].[hash].js',
      clean: true // to replace clean-webpack-plugin
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".js", ".ts", ".tsx"],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // (jsnext:main directs not usually distributable es6 format, but es6 sources)
      mainFields: ['module', 'browser', 'main'],
      alias: {
        app: path.resolve(__dirname, 'src/app/')
      }
    },
    module: {
      rules: [
        // .ts, .tsx
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [!isProduction && {
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
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    sourceMap: !isProduction,
                    importLoaders: 1,
                    modules: {
                      localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
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
                        disabled: isProduction
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
              outputPath: isProduction ? 'build/' : ''
            }
          }]
        },
        {
          test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
          // use: 'file-loader',
          loaders: [{
            loader: 'file-loader',
            options: {
              outputPath: isProduction ? 'build/' : '',
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
            // filename: isProduction ? 'build/[name].js' : '[name].js'
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            filename: isProduction ? 'build/vendor.[contenthash].js' : 'vendor.[hash].js',
            priority: -10
          }
        }
      },
      runtimeChunk: true
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: option.mode,
        DEBUG: false
      }),
      new MiniCssExtractPlugin({
        filename: 'build/[hash].css',
        disable: !isProduction
      }),
      new HtmlWebpackPlugin({
        template: 'assets/index.html',
        minify: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true
        },
        append: {
          head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
        }
        // meta: {
        //   title: 'Kristoffer Robin Canlas',
        //   description: package.description,
        //   keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
        // }
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async'
      }),
      !isProduction && new ReactRefreshWebpackPlugin()
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
    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? 'build/hidden-source-map' : 'cheap-module-eval-source-map',
    node: {
      // workaround for webpack-dev-server issue
      // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
      fs: 'empty',
      net: 'empty'
    }
  }
};