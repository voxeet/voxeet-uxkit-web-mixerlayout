const package = require("./package.json");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

try {
  require("os").networkInterfaces();
} catch (e) {
  require("os").networkInterfaces = () => ({});
}

module.exports = {
  entry: ["./src/app/index.js"],
  devServer: {
    port: 8081,
    https: true,
    disableHostCheck: true,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: "babel-loader",
        exclude: /node_modules/,
        include: path.resolve(__dirname),
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        use: "url-loader?limit=65000&name=images/[name].[ext]",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(package.version),
    }),
    new CopyWebpackPlugin({
      patterns:[
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/dvwc_impl.wasm", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-dvwc-worker.js", noErrorOnMissing: true },
       { from: "./node_modules/@voxeet/voxeet-web-sdk/dist/voxeet-worklet.js", noErrorOnMissing: true },
     ]
    }),
  ],
};
