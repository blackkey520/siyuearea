const path = require('path');
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
exports.validate = {
  enable: true,
  package: "egg-validate"
};
exports.mysql = {
  enable: true,
  package: "egg-mysql"
};
exports.cors = {
  enable: true,
  package: "egg-cors"
};
exports.tcpsocket = {
  enable: true,
  path: path.join(__dirname, '../app/lib/plugin/egg-tcpsocket'),
};