var path = require("path");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = (env, arg) => {
  config = {
    entry: ["./src/index.js"],
    output: {
      filename: "bundle.min.js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    devServer: {
      port: 3000,
      static: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    optimization: {
      minimizer: [new UglifyJSPlugin()],
    },
  };
  if (arg.mode === "development") {
    config.devtool = "source-map";
  }
  return config;
};
