const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') },
        { from: path.resolve(__dirname, 'src/style.css'), to: path.resolve(__dirname, 'dist/') },
      ]
    })
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
}
