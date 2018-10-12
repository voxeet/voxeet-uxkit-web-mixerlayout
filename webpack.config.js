const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

try {
  require('os').networkInterfaces()
} catch (e) {
  require('os').networkInterfaces = () => ({})
}

module.exports = {
  entry: [
    './src/app/index.js',
  ],
  devServer: {
    port: 8080,
    https: true,
    disableHostCheck: true,
    host: '0.0.0.0',
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }, {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }, {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=65000&name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `""`
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
