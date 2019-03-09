'use strict';

/**
 * 公共消息对象
 *
 * @param {Boolean} hasErr 是否有错误 
 * @param {String} msg 要返回的消息
 * @param {JSON} data 要返回的数据
 * @param {Number} code 要返回的消息代码
 */
module.exports = (hasErr, msg, data, code) => {
    hasErr = hasErr ? true : false;
    msg = msg || '未知';
    data = data || {};
    code = code || 0;
    return { hasErr: hasErr, message: msg, data: data, code: code };
}
