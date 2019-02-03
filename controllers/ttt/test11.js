'use strict';
const router = require('koa-router')();
const controller = require('../../lib/controller');

controller.init(router, module);


controller.viewGET('/text', 'text11aaaaaa');

controller.viewGET('/', async (ctx) => {
  return {
    title: 'ttt text11 controller',
    content: 'ttt text11 content'
  }
});

controller.viewGET('/test', async (ctx) => {
  return {
    title: 'ttt text11 test controller',
    content: 'ttt text11 test content'
  }
});

module.exports = router
