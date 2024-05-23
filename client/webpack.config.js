// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
var webpack = require("webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].js",
    //assetModuleFilename: "media/[name][hash][ext][query]",
  },
  externals: {
    externals: {
      react: "react",
      "react-dom": "react-dom",
      "react-router-dom": "react-router-dom",
      "react-router": "react-router",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(pdf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(docx)$/,
        type: "asset/resource",
        generator: {
          filename: "docx/[name][ext]",
        },
      },
      {
        test: /\.(docx)$/,
        use: "raw-loader",
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-is": path.resolve(__dirname, "./node_modules/react-is"),
    },
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./public/images", to: "images" },
        { from: "./public/favicon.ico", to: "" },
        { from: "./public/manifest.json", to: "" },
        { from: "./public/robots.txt", to: "" },
        { from: "./public/sitemap.txt", to: "" },
      ],
    }),
    new DuplicatePackageCheckerPlugin(),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.jsx$|\.svg$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      context: () => true,
      target: "http://localhost:5500",
      changeOrigin: true,
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
