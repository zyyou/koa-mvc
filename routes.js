'use strict';
const compose = require('koa-compose');
const glob = require('glob');
const npath = require('path');


module.exports = () => {
  var routers = [];
  var indexFile;
  glob.sync(npath.resolve(__dirname, './controllers/', '**/*.js')).forEach(file => {
    if (file.endsWith('index.js')) {
      indexFile = file;
    } else {
      routers.push(require(file).routes());
      routers.push(require(file).allowedMethods());
    }
  });

  //index单独处理，否则URL必须带controller路径，index建议只写一个没有前缀的action，否则容易跟其他controller冲突
  if (indexFile) {
    let index = require(indexFile);
    routers.push(index.routes());
    routers.push(index.allowedMethods());
  }

  return compose(routers);
};

