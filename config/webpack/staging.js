'use strict';

var webpack = require('webpack');

module.exports = function(_path) {
  return {
    context: _path,
    devtool: 'eval',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: false
      })
    ]
  };
};
