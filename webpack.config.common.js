const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const rootPath = path.resolve(__dirname, "./");
const srcPath = path.resolve(rootPath, "src");
const libPath = path.resolve(rootPath, "lib");

module.exports = {
  target: "node",
  entry: srcPath + "/index.ts",
  output: {
    path: libPath,
    filename: "qr-code-styling.js",
    library: "QRCodeStyling",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.ts$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: [nodeExternals()]
};
