const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (config) {
  return {
    mode: 'development',
    devtool: false,
    plugins: [new CleanWebpackPlugin()],
  };
};
