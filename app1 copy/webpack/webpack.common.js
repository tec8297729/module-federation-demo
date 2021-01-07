const paths = require("./paths");
const { merge } = require("webpack-merge");
const isProd = ["prod"].includes(process.env.BUILD_ENV);
const configName = `./webpack.${isProd ? "prod" : "dev"}.js`;
const webpackExtension_Config = require(`./${configName}`);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("../../app3/webpack/node_modules/webpack/lib/container/ModuleFederationPlugin");

const webpackConfig = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(c|le)ss?$/,
        include: [paths.appSrc],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ModuleFederationPlugin({
      name: "appname", // 应用名称 唯一
      library: { type: "var", name: "appname" }, // UMD标准导出，和name保持一致即可。
      filename: "remoteEntry.js", // 暴露出去的chunkname
      exposes: {},
      shared: ["react", "react-dom"], // 与app1共享的依赖，如果app1中有，则会优先使用app1中的依赖。(注：被app1引用)时候会按照app1的/package.json中的版本要求来加载
    }),
  ],
};

module.exports = merge(
  webpackConfig,
  webpackExtension_Config({
    ...process.env,
  })
);
