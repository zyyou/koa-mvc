'use strict';
const router = require('koa-router')();
const controller = require('../../lib/controller');

controller.init(router, module);


controller.viewGET('/text', 'text11aaaaaa');

controller.viewGET('/', {
  title: 'ttt text11 controller',
  content: 'ttt text11 content'
});

module.exports = router
