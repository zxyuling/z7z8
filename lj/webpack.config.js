const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const myplugin = require('./plugin');
module.exports = {
  entry: {
  	index:'./webpackdemo.js',
  },
  // devtool:'eval-source-map',
  mode:'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: ''
  },
  // optimization: {
  //    runtimeChunk: 'single',
  //    splitChunks: {
  //      chunks: 'all',
  //      minSize:0,
  //      minChunks:2,
  //    }
  //  },
  devServer: {
	  contentBase: './dist'
	},
  module:{
  	rules:[
	    {
	        test: /\.js$/,
	         exclude: /node_modules/, 
	         //loader: "./loader.js"
           use:["babel-loader"]
	    },
      {
          test: /\.vue$/,
           exclude: /node_modules/, 
           // loader: "./loader.js",
           use:["./loader.js"]
      },
	    {
	        test: /\.css$/,
	        exclude: /node_modules/, 
	        use: [
	            'style-loader',
	            'css-loader'
	        ]
	    },
	    {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
	],
  },
  plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
        filename: 'index.html',
        template: 'index.html',
      }),
      new myplugin({a:1})
    ],
};