const paths = require('./paths');

module.exports = function (config) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: paths.appSrc,
      disableHostCheck: true,
      historyApiFallback: true,
      compress: true,
      open: false,
      port: config.PROT || 8999,
      hot: true,
    },
  };
};
