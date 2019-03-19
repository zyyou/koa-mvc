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
const koajwt = require('koa-jwt');
const escapeHtml = require('escape-html');

const hylog = require('./lib/log')('app');
const controller = require('./lib/controller');
const message = require('./lib/message');
const jwtRefresh = require('./lib/middlewares/jwt-refresh');
const routeconfig = require('./routes.js');

const appConfig = require('./config/appconfig');


// 全局异常捕获
app.on('error', (err, ctx) => {
  //console.error('server error', err);
  hylog.fError('server error\r\n\terr:' + JSON.stringify(err) + '\r\n\tctx:' + JSON.stringify(ctx));
});

// error handler
onerror(app, {
  all: (err, ctx) => {
    switch (ctx.accepts('json', 'html')) {
      case 'json':
        console.log('json  err');
        ctx.body = JSON.stringify(message.build(true, err.message, {}, err.status));
        break;
      default:
        console.log('html  err');
        let template = path.join(__dirname, 'views', 'error.html');
        template = require('fs').readFileSync(template, 'utf8');
        let body = template.replace('{{status}}', escapeHtml(err.status))
          .replace('{{stack}}', escapeHtml(err.stack))
          .replace('{{message}}', escapeHtml(err.message));
        ctx.body = body;
        ctx.type = 'html';
        break;
    }
  }
});


// middlewares
//洋葱模型，第一个use用于全局检查，拦截所有请求，可用于权限校验，unless按http method、扩展名、路径忽略验证，支持正则
app.use(koajwt({
  secret: appConfig.tokenKey
}).unless({
  method: [],
  ext: ['.ico', '.css', '.js', '.png', '.jpg'],
  path: ['/',
    /\/index/, /\/test/, /\/ttt/, /\/jwttest\/login/]
}));

app.use(jwtRefresh);


//布局及视图配置
render(app, {
  //必须设置root目录，否则报错
  root: path.join(__dirname, '/views'),
  viewExt: 'ejs',
  cache: false,
  //debug: true
});

app.use(async (ctx, next) => {
  //console.log('is httpsync req:', ctx.req.headers['httpsync'] ? true : false);
  ctx._appConfig = appConfig;

  await next();

  ctx.res.setHeader('is_koa_mvc_res', true);
});

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
