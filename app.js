const util = require('util');
const Koa = require('koa');
const app = new Koa();
const render = require('koa-ejs');
const path = require('path');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const userAgent = require('koa-useragent');

const hylog = require('./lib/log')('app');
const controller = require('./lib/controller');
const routeconfig = require('./routes.js');


// 全局异常捕获
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  hylog.fError('server error\r\n\terr:' + util.inspect(err) + '\r\n\tctx:' + util.inspect(ctx));
});

// error handler
onerror(app);

//布局及视图配置
render(app, {
  //必须设置root目录，否则报错
  root: path.join(__dirname, '/views'),
  viewExt: 'ejs',
  cache: false,
  //debug: true
});

// middlewares
//洋葱模型，第一个use用于全局检查，拦截所有请求，可用于权限校验
app.use(async (ctx,next)=>{
  //console.log('is httpsync req:', ctx.req.headers['httpsync'] ? true : false)
  await next();
  ctx.res.setHeader('is_koa_mvc_res',true);
})

//koa中间件
//用于输出控制台KOA请求日志，生产环境可注释掉
app.use(logger());
app.use(userAgent);
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));
app.use(json());
//指定静态文件目录，否则不能静态访问
app.use(require('koa-static')(__dirname + '/public'));

// 注册路由
app.use(routeconfig());

module.exports = app;
