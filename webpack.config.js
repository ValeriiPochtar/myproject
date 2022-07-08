const path = require('path');
const miniCss = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
       test:/\.(s*)css$/,
       use: [
          miniCss.loader,
          'css-loader',
          'sass-loader',
       ]
    }]
 },
 plugins: [
    new miniCss({
       filename: 'style.scss',
    }),
    new HTMLWebpackPlugin({
       template: "index.html"
})
 ]
};