const paths = require('./paths');
const { merge } = require('webpack-merge');
const isProd = ['prod'].includes(process.env.BUILD_ENV);
const configName = `./webpack.${isProd ? 'prod' : 'dev'}.js`;
const webpackExtension_Config = require(`./${configName}`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const webpackConfig = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
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
          'css-loader',
          'less-loader',
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
      name: 'appname', // 应用名称 唯一
      library: { type: 'var', name: 'appname' }, // UMD标准导出，和name保持一致即可。
      filename: 'remoteEntry.js', // 暴露出去的chunkname
      exposes: {},
      shared: {
        react: {
          singleton: true, // only a single version of the shared module is allowed
          eager: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
      },
    }),
  ],
};

module.exports = merge(
  webpackConfig,
  webpackExtension_Config({
    ...process.env,
  }),
);
