'use strict';
const mvcrouter = require('koa-mvcrouter');

//index controller中建议只写此action
mvcrouter.viewGET('/', function (ctx) {
  return {
    title: 'Hello Koa 2! index/index' + ctx._appConfig.title
  };
});

//该action会被test/替代
mvcrouter.viewGET('/test', function (ctx) {
  console.log('----- index/test被执行 ------')
  return {
    title: 'index  test',
    //content: 'index  test'
  };
});

module.exports = mvcrouter;
