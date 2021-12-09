const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "cheap-eval-source-map",
  entry: "./docs/entry.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      atomize: path.join(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
    patterns: [
      { from: Path.resolve('./modules/web/static/'), to: './assets' },
      { from: Path.resolve('./modules/web/static/favicon.ico'), to: './' }
 /*   new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
 */   
  ],
  devServer: {
    contentBase: "docs/"
  }
};
