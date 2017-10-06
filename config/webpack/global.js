'use strict';

// Depends
var path        = require('path');
var webpack     = require('webpack');
var Manifest    = require('manifest-revision-webpack-plugin');
var SvgStore    = require('webpack-svgstore-plugin');
var TextPlugin  = require('extract-text-webpack-plugin');
var jsonPresent = require('./helpers/json-presenter');

var rootAssetPath = './app/webpack';
var manifestIgnorePaths = [
  '/stylesheets', '/javascript', '/logos', '/svg', '/svgs', '/icons', '.DS_Store'
];

function appName() {
  if (process.env.NODE_ENV === 'developmentFront') return 'front';
  if (process.env.NODE_ENV === 'productionFront') return 'front';
  if (process.env.NODE_ENV === 'developmentMobile') return 'mobile';
  if (process.env.NODE_ENV === 'productionMobile') return 'mobile';
}

/**
 * Global webpack config
 * @param  {[type]} _path [description]
 * @return {[type]}       [description]
 */
module.exports = [function(_path) {
  return {
    entry: {
      ramblertopline: path.join(_path, 'app/webpack/javascripts', 'ramblertopline.js')
    },

    output: {
      path: path.join(_path, 'public', 'assets', appName()),
      filename: '[chunkhash].[name].js',
      publicPath: '/assets/' + appName() + '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|autoprefixer|d3)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: 'es2015'
            }
          }]
        },
        {
          test: /\.jade$/,
          use: ['jade-loader']
        },
        {
          test: /\.(ttf|eot|otf|woff|woff2)$/i,
          use: ['file-loader']
        },
        {
          test: /\.styl$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg)$/i,
          use: [{
            loader: 'file-loader',
            options: {
              context: rootAssetPath + '&name=[path][hash].[name].[ext]'
            }
          }]
        }
      ],
      noParse: /\.DS_Store/,
    },
    resolve: {
      modules: ['vendor/webpack', 'node_modules'],
      extensions: ['.js', '.styl']
    },
    plugins: [
      new Manifest(path.join(_path + '/config', 'manifest.ramblertopline.json'), {
        rootAssetPath: rootAssetPath,
        ignorePaths: manifestIgnorePaths,
        format: jsonPresent
      }),
    ]
  };
}, function(_path) {
  // define local variables
  var dependencies  = Object.keys(require(_path + '/package').dependencies);

  // return object
  return {

    // entry points
    entry: {
      //ramblertopline: path.join(_path, 'app/webpack/javascripts', 'ramblertopline.js'),
      application: ['babel-polyfill', path.join(_path, 'app/webpack/javascripts', appName(), 'application.js')],
      vendors: dependencies
    },

    // output system
    output: {
      path: path.join(_path, 'public', 'assets', '' + appName() + ''),
      filename: '[chunkhash].[name].js',
      chunkFilename: '[chunkhash].[hash].[id].js',
      publicPath: '/assets/' + appName() + '/'
    },

    // resolves modules
    resolve: {
      extensions: ['.js', '.styl'],
      modules: ['vendor/webpack', 'node_modules'],
      alias: {
        _app: path.join(_path, 'app', 'webpack'),
        _js: path.join(_path, 'app', 'webpack', 'javascripts'),
        _stylesheets: path.join(_path, 'app', 'webpack', 'stylesheets'),
        _templates: path.join(_path, 'app', 'webpack', 'templates'),
        _images: path.join(_path, 'app', 'webpack', 'images')
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|autoprefixer|d3)/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: 'es2015'
            }
          }]
        },
        {
          test: /\.styl$/i,
          use: TextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  browsers: ['last 5 versions'],
                  sourceMap: true
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true
                }
              }
            ],
            publicPath: '/assets/' + appName() + '/'
          })
        },
        {
          test: /\.css$/i,
          use: TextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
            publicPath: '/assets/' + appName() + '/'
          }),
        },
        {
          test: /\.(png|ico|jpg|jpeg|gif|svg)$/i,
          use: [{
            loader: 'file-loader',
            options: {
              context: rootAssetPath + '&name=[path][hash].[name].[ext]'
            },
          }]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader',
          ]
        }
      ],
      noParse: /\.DS_Store/,
    },

    // load plugins
    plugins: [

      new webpack.ProvidePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),


      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: '[hash].vendors.js'
      }),

      new TextPlugin({
        filename: '[chunkhash].[name].css',
        disable: false,
        allChunks: true
      }),
      new SvgStore({
        prefix: 'icon-'
      }),
      new Manifest(path.join(_path + '/config', 'manifest.' + appName() + '.json'), {
        rootAssetPath: rootAssetPath,
        ignorePaths: manifestIgnorePaths,
        format: jsonPresent
      }),

    ],
  };
}];
