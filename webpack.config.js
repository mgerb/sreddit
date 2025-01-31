var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Visualizer = require("webpack-visualizer-plugin");

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: ["babel-polyfill", "./src/js/routes.js"],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      { test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000&name=images/[hash].[ext]" },
      { test: /\.jpg$/, loader: "url-loader?limit=100000&name=images/[hash].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=images/[hash].[ext]"},
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"},
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"},
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]"},
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[hash].[ext]"},
      {
        test: require.resolve('wowjs/dist/wow.js'),
        loader: 'exports?this.WOW'
      }
    ]
  },
  postcss: function(){return [autoprefixer]},
  output: {
    path: __dirname + "/dist/",
    publicPath: "/dist/",
    filename: "client.min.js"
  },
  plugins: getPlugins(),
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    "moment": "moment"
  }
};

function getPlugins(){
  var plugins = [
      new HtmlWebpackPlugin({
      fileName: 'index.html',
      template: 'index.html',
      inject: 'body',
      hash: true
    }),
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new Visualizer({
      filename: "../stats.html"
    })
  ];
  if(!debug){
    plugins = plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false})
  ])}
  return plugins; 
}
