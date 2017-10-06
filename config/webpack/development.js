'use strict';

var webpack = require('webpack');

module.exports = function(_path) {
  return {
    context: _path,
    devtool: 'eval',
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
        }
      ]
    },
    devServer: {
      port: 8090,
      contentBase: _path + '/app/assets',
      disableHostCheck: true,
      proxy: {
        '*': 'http://localhost:3000'
      }
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      })
    ]
  };
};
