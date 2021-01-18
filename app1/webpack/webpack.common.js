const paths = require('./paths');
const { merge } = require('webpack-merge');
const isProd = ['prod'].includes(process.env.BUILD_ENV);
const configName = `./webpack.${isProd ? 'prod' : 'dev'}.js`;
const webpackExtension_Config = require(`./${configName}`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../package.json').dependencies;

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
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[contenthash:8]',
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new ModuleFederationPlugin({
      name: 'appname', // 应用名称 唯一
      remotes: {
        app2: 'app2@http://localhost:8882/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true, // 只允许共享模块的单一版本
          eager: true, // 即时依赖
          // requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
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
