var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = require('./base');
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = _.merge({
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8000',
    'webpack/hot/only-dev-server',
    './src/js/main'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    }),
    new BowerWebpackPlugin({
      excludes: /.*\.less/,
      searchResolveModulesDirectories: false
    })
  ]
}, baseConfig);

config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: path.join(__dirname, '/../src')
});

module.exports = config;
