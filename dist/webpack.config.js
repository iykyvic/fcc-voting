'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

var _process = process,
    _process$env = _process.env,
    NODE_ENV = _process$env.NODE_ENV,
    HOST_NAME = _process$env.HOST_NAME;

var isDevMode = NODE_ENV === 'development';

exports.webpack = webpack;
var config = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'client/index'),
  module: {
    rules: [{
      exclude: [/node_modules/, /dist/, /server/],
      include: path.join(__dirname, 'client'),
      test: /\.(js|jsx)$/,
      use: ['babel-loader']
    }, {
      test: /\.s*css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(jpg|png|svg|gif|ico)$/,
      use: 'url-loader'
    }]
  },
  node: {
    dns: 'empty',
    fs: 'empty',
    net: 'empty'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/client/'),
    publicPath: '/'
  },
  plugins: [new webpack.DefinePlugin({
    API_URL: (0, _stringify2.default)(HOST_NAME + '/api/v1/')
  }), new HtmlWebpackPlugin({
    filename: 'index.pug',
    template: path.resolve(__dirname, 'client/index.pug'),
    title: 'Hot Module Reload'
  }), new HtmlWebpackPugPlugin()],
  resolve: { extensions: ['.js', '.jsx'] }
};

if (isDevMode) {
  config.entry.push('webpack-hot-middleware/client?reload=true');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;