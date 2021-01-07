const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appIndexJs: resolveApp('src/index.js'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('src/index.html'),
  appSrc: resolveApp('src'),
};
