module.exports = {
    tokenKey: 'jwt_token_key_123456', //jwt token key
    tokenExpires: '30s', //jwt token 有效期
    port: 3001,
    title: 'koa mvc 模板',
    author: 'zyy',
    //用于登录鉴权的smtp服务器 auth-smtp
    auth_smtp: {
        host: 'mail.***.com',
        port: 25
    }
}