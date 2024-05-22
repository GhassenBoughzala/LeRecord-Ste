/* eslint-disable no-unused-vars */
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.js";
export const module = {
  rules: [
    {
      test: /\.(js)$/,
      use: "babel-loader",
    },
    {
      test: /\.css$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { importLoaders: 1 } },
        "postcss-loader",
      ],
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "src/index.html",
  }),
];
