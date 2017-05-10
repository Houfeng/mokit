const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin("css/bundle.css");

const NODE_ENV = process.env.NODE_ENV || 'prod';
console.log('NODE_ENV:', NODE_ENV);

const configs = {
  entry: {
    mokit: `./src/entry.js`
  },
  output: {
    path: './dist/',
    filename: '[name]' + (NODE_ENV == 'prod' ? '.min' : '') + '.js'
  },
  devtool: NODE_ENV != 'prod' ? 'source-map' : null,
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

if (NODE_ENV == 'prod') {
  configs.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}



module.exports = configs;