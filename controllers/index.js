'use strict';
const router = require('koa-router')();
const controller = require('../lib/controller');

controller.init(router, module);

//index controller中建议只写此action
controller.viewGET('/', function (ctx) {
  return {
    title: 'Hello Koa 2! index/index' + ctx._appConfig.title
  };
});

//该action会被test/替代
controller.viewGET('/test', function (ctx) {
  console.log('----- index/test被执行 ------')
  return {
    title: 'index  test',
    //content: 'index  test'
  };
});

module.exports = router
