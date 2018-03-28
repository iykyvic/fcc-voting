require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { env: { NODE_ENV, HOST_NAME, FACEBOOK_APP_ID } } = process;
const isDevMode = NODE_ENV === 'development';
exports.webpack = webpack;
const config = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'client/index.jsx'),
  module: {
    rules: [
      {
        exclude: [/node_modules/, /dist/, /server/],
        include: path.join(__dirname, 'client'),
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s*css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg|gif|ico)$/,
        use: 'url-loader'
      }
    ]
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
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(`${HOST_NAME}/api/v1/`),
      HOST_NAME: JSON.stringify(`${HOST_NAME}`),
      FACEBOOK_APP_ID: JSON.stringify(FACEBOOK_APP_ID)
    }),
    new HtmlWebpackPlugin(),
  ],
  resolve: { extensions: ['.js', '.jsx'] }
};

if (isDevMode) {
  config.entry = [
    config.entry,
    'webpack-hot-middleware/client?reload=true'
  ]
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
