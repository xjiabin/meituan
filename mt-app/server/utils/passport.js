const passport = require('koa-passport'); // 权限认证中间件
const localStrategy = require('passport-local'); // 本地验证所用的策略
const UserModel = require('../models/schema/users');
// const UserModel = userSchema.User;

// 用户名密码验证策略
passport.use(new localStrategy(
    
    /**
     * @param {*} username 用户名
     * @param {*} password 密码
     * @param {*} done 验证完成后的回调函数，由passport调用
     */
    async function (username, password, done) {
        let where = { username };

        let result = await UserModel.findOne(where);
        if (result != null) {
            if (result.password === password) {
                return done(null, result);
            } else {
                return done(null, false, '密码错误');
            }
        } else {
            return done(null, false, '用户不存在');
        }
    }
));

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function(user, done) {
    return done(null, user);
});

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser(function(user, done) {
    return done(null, user);
});

module.exports = passport;
