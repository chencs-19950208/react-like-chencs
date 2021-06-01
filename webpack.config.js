const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './packages/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'react-like',
      filename: 'index.html',
      template: './public/index.html',
    })
  ]
};