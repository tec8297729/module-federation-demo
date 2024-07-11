const paths = require('./paths');

module.exports = function (config) {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: paths.appSrc,
      allowedHosts: ['.host.com', 'host2.com'],
      historyApiFallback: true,
      compress: true,
      open: false,
      port: config.PROT || 8999,
      hot: true,
    },
  };
};
