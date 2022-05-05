/*
 * @Author: zqzhan
 * @Date: 2022-05-05 22:49:15
 * @LastEditors: zqzhan
 * @LastEditTime: 2022-05-05 23:07:40
 * @Description: 
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (config) {
  return {
    mode: 'development', // production
    devtool: false,
    plugins: [new CleanWebpackPlugin()],
  };
};
