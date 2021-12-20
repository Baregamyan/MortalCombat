const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    arenas: path.resolve(__dirname, 'src/arenas.js'),
    screen: path.resolve(__dirname, 'src/screen.js'),
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
      filename: 'index.html',
      chunks: ['screen'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/arenas.html',
      filename: 'arenas.html',
      chunks: ['arenas'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') },
        { from: path.resolve(__dirname, 'src/arenas.css'), to: path.resolve(__dirname, 'dist/') },
        { from: path.resolve(__dirname, 'src/screen.css'), to: path.resolve(__dirname, 'dist/') },
      ]
    })
  ],
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
}
