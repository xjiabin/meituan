const Router = require('koa-router');
const Redis = require('koa-redis'); // 存储每个用户的登录 状态/验证 信息
const nodeMailer = require('nodemailer'); // 用自己的邮箱账号发送邮件给别人
const Passport = require('../../utils/passport');
const axios = require('../../utils/axios');
const { assets } = require('../../utils/utils');

const config = require('../../config');
const { User } = require('../../models/index');

let Email = config;
let version = config.version;

const router = new Router({
    prefix: '/users'
});
const Store = new Redis().client;

/**
 * 注册
 */
router.post('/signup', async (ctx, next) => {
    try {
        const {
            username,
            password,
            email,
            code
        } = ctx.request.body;
        assets(username, 'username null');
        assets(password, 'password null');
        assets(email, 'email null');
        assets(code, 'code null');

        // 校验验证码
        if (code) {
            // 从redis中获取该用户的验证码( nodeMail在发送验证码的时候会将验证码存在redis中)
            const saveCode = await Store.hget(`nodemail:${username}`, 'code');
            // 获取过期时间
            const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
            if (code === saveCode) {
                // 判断是否过期
                if (new Date().getTime() - saveExpire > 0) {
                    ctx.body = {
                        code: -1,
                        msg: '验证码已过期'
                    }
                    return false;
                }
            } else {
                ctx.body = {
                    code: -1,
                    msg: '验证码错误'
                }
                return false;
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写验证码'
            }
        }

        // 用户是否存在
        let user = await User.find({ username });
        if (user.length) {
            ctx.body = {
                code: -1,
                msg: '用户名存在'
            }
            return;
        }

        // 创建用户
        let newUser = await User.create({
            username,
            password,
            email
        });
        if (newUser) {
            try {
                // 成功，登录
                let res = await axios.post(`/api/${version}/users/signin`, {
                    username,
                    password
                });
                if (res.data && res.data.code === 0) {
                    ctx.body = {
                        code: 0,
                        msg: '注册成功',
                        user: res.data.user
                    }
                } else {
                    ctx.body = {
                        code: -1,
                        msg: 'error',
                    }
                }
            } catch (e) {
                ctx.body = {
                    code: -1,
                    msg: e.toString()
                }
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '注册失败'
            }
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 认证登录
 */
router.post('/signin', async (ctx, next) => {
    // Passport.authenticate('策略', ...)
    return Passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
            return;
        }

        if (user) {
            ctx.body = {
                code: 0,
                msg: '登录成功',
                user
            }
            return ctx.login(user)
        } else {
            ctx.body = {
                code: 1,
                msg: info
            }
        }

    })(ctx, next);
});

/**
 * 邮件验证
 */
router.post('/verift', async (ctx, next) => {
    try {
        const { username, email } = ctx.request.body;
        assets(username, 'username null');
        assets(email, 'email null');

        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');

        // 频率限制 1分钟1次
        if (saveExpire && new Date().getTime() - saveExpire < 0) {
            ctx.body = {
                code: -1,
                msg: '请求过于频繁，1分钟内1次'
            }
            return false;
        }

        // 邮件
        let transporter = nodeMailer.createTransport({
            host: Email.smtp.host,
            port: Email.smtp.port,
            secure: false,
            auth: {
                user: Email.smtp.user,
                pass: Email.smtp.pass
            }
        });
        let ko = {
            code: Email.smtp.code(),
            expire: Email.smtp.expire(),
            email: email,
            user: username
        }
        let mailOptions = {
            from: `"认证邮件" <${Email.smtp.user}>`,
            to: ko.email,
            subject: '《高仿美团全栈实战》注册码',
            html: `您在《高仿美团全栈实战》注册，邀请码是${ko.code}`
        }
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) return console.log(err);
            Store.hmset(
                `nodemail:${ko.user}`,
                'code', ko.code,
                'expire', ko.expire
            );
        });
        ctx.body = {
            code: 0,
            msg: '验证码已发送，有效期为1分钟，请及时验证'
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 退出登录
 */
router.get('/exit', async (ctx, next) => {
    await ctx.logout();
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
});

/**
 * 获取用户信息
 */
router.get('/getUser', async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        const { username, email } = ctx.session.passport.user;
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
});

module.exports = router;
