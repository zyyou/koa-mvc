'use strict';
const mvcrouter = require('koa-mvcrouter');

mvcrouter.viewGET('/text', 'text11aaaaaa');

mvcrouter.viewGET('/', async (ctx) => {
  return {
    title: 'ttt text11 controller',
    content: 'ttt text11 content'
  }
});

mvcrouter.viewGET('/test', async (ctx) => {
  return {
    title: 'ttt text11 test controller',
    content: 'ttt text11 test content'
  }
});

module.exports = mvcrouter
