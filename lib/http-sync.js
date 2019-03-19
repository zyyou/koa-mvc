'use strict';

var debug = require('debug')('http-sync');
const util = require('util');
const nurl = require('url');
const queryString = require('querystring');
const message = require('./message');
const log = require('./log')('HttpSync');

/**
 * 同步HTTP请求
 *
 */
function HttpSync() {
}

/**
 * 发起请求，自识别http或https
 *
 * @param {URL} opts URL对象.
 * @param {JSON} data
 * @returns
 */
HttpSync.prototype.request = function (opts, data) {
  opts.headers = opts.headers || {};
  opts.headers.httpsync = true;
  opts.timeout = opts.timeout || 10 * 1000;

  if (data) {
    data = opts.isJson ? JSON.stringify(data) : queryString.stringify(data);
    opts.headers['Content-Length'] = Buffer.byteLength(data);
  }
  debug('request opts=%j \t\t param=%s', opts, data);

  let http = opts.protocol == 'https:' ? require('https') : require('http');
  return new Promise((resolve, reject) => {
    let req = http.request(opts, (res) => {
      let resData = '', resStr = '';
      res.on('data', (dt) => {
        resStr += dt;
      });
      res.on('end', () => {
        resData = resStr.startsWith('{') ? JSON.parse(resStr) : resStr;

        debug('request res=%s', resStr);

        resolve(message.build(false, 'ok', resData, message.code.ok));
      });
    });
    req.on(('error'), (e) => {
      log.fError('请求异常', e.message, opts, e);
      reject(message.build(true, '请求异常 ' + e.message, {}, message.code.sysErr));
    });
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

/**
 * 发送GET请求
 *
 * @param {String} url
 * @param {JSON} reqHeaders 请求头信息
 * @returns
 */
HttpSync.prototype.get = function (url, reqHeaders) {
  let opts = nurl.parse(url);
  opts.method = 'GET';
  opts.headers = reqHeaders || {};
  return this.request(opts);
}

/**
 * 发送POST JSON 请求
 *
 * @param {String} url
 * @param {JSON} data
 * @param {JSON} reqHeaders 请求头信息
 * @returns
 */
HttpSync.prototype.postJSON = function (url, data, reqHeaders) {
  let opts = nurl.parse(url);
  opts.method = 'POST';
  opts.isJson = true;
  opts.headers = reqHeaders || {};
  opts.headers['Content-Type'] = 'application/json';
  return this.request(opts, data);
}

/**
 * 发送PUT JSON 请求
 *
 * @param {String} url
 * @param {JSON} data
 * @param {JSON} reqHeaders 请求头信息
 * @returns
 */
HttpSync.prototype.putJSON = function (url, data, reqHeaders) {
  let opts = nurl.parse(url);
  opts.method = 'PUT';
  opts.isJson = true;
  opts.headers = reqHeaders || {};
  opts.headers['Content-Type'] = 'application/json';
  return this.request(opts, data);
}

/**
 * 发送PUT JSON 请求
 *
 * @param {String} url
 * @param {JSON} data
 * @param {JSON} reqHeaders 请求头信息
 * @returns
 */
HttpSync.prototype.deleteJSON = function (url, data, reqHeaders) {
  let opts = nurl.parse(url);
  opts.method = 'DELETE';
  opts.isJson = true;
  opts.headers = reqHeaders || {};
  opts.headers['Content-Type'] = 'application/json';
  return this.request(opts, data);
}

module.exports = new HttpSync();
