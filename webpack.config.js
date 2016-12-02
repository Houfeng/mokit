const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin("css/bundle.css");

process.env.NODE_ENV = process.env.NODE_ENV || 'prod';

const configs = {
  entry: {
    mokit: `./lib/index.js`
  },
  output: {
    path: './dist/',
    filename: '[name].js'
  },
  devtool: process.env.NODE_ENV != 'prod' ? 'source-map' : null,
  module: {
    loaders: [
      {
        test: /\.js\?*.*$/,
        loader: "babel"
      },
      {
        test: /\.json\?*.*$/,
        loader: "json",
      },
      {
        test: /\.html\?*.*$/,
        loader: 'raw'
      },
      {
        test: /\.(png|jpg|gif)\?*.*$/,
        loader: 'url?limit=8192&name=img/[hash].[ext]'
      },
      {
        test: /\.(eot|woff|woff2|webfont|ttf|svg)\?*.*$/,
        loader: 'url?limit=8192&name=font/[hash].[ext]'
      },
      {
        test: /\.less\?*.*$/,
        loader: extractCSS.extract("css!less", {
          publicPath: '../'
        })
      },
      {
        test: /\.css\?*.*$/,
        loader: extractCSS.extract("css", {
          publicPath: '../'
        })
      }
    ]
  },
  plugins: []
};

if (process.env.NODE_ENV == 'prod') {
  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = configs;