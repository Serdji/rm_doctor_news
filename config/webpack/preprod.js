'use strict';

var webpack = require('webpack');

module.exports = function(_path) {
  return {
    context: _path,
    devtool: 'cheap-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: false
      })
    ]
  };
};
