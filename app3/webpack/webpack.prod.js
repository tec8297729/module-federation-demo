const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (config) {
  return {
    mode: 'development', // production
    devtool: false,
    plugins: [new CleanWebpackPlugin()],
  };
};
