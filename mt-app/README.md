# mt-app

## 服务端使用 `import` 方式引入文件

服务端文件默认是使用 `require` 引入文件的，但是文件其他地方都使用到了 es-2015 的写法，这就使得它看起来非常蹩脚。

可不可以将 `require` 方式引入的方式改为 `import` 方式引入呢？

答案是可以的，但是 `node.js` 默认是使用 node 的方式编译启动服务端脚本，并没有经过任何处理。

如果直接 `import Koa from 'koa'`，会导致编译的时候报错，说并不认识 import 这个指令

```shell
import Koa from 'koa'
       ^^^

SyntaxError: Unexpected identi
```

这是为什么呢？

我们启动服务端程序的时候，执行的命令是 `npm run dev`

也就是这样的，node并没有做任何处理
```json
"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server"
```

所以为了确保可以使用import方式导入文件，我们需要一些插件来处理它

- babel-preset-es2015

添加一个babel配置文件`.babelrc`

```json
{
    "presets": ["es2015"]
}
```

然后在启动命令中添加配置指令集

```json
"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node"
```

## 使用`passport  passport-local`做权限认证
> 服务端使用的是koa，所以使用`koa-passport`

登录的用户信息存储在服务器的session中，然后访问时从session中获取用户信息，如果没有获取到用户信息，则认为该请求非法，以上，集成passport之后，会全自动完成，无须人工干预。

passport配置文件

passport.js
```js
import passport from 'koa-passport'; // 权限认证中间件
import localStrategy from 'passport-local'; // 本地验证所用的策略
import UserModel from '../models/users';

// 用户名密码验证策略
passport.use(new localStrategy(
    
    /**
     * @param {*} username 用户名
     * @param {*} password 密码
     * @param {*} done 验证完成后的回调函数，由passport调用
     */
    async function (username, password, done) {
        // --------- 1 start ---------
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
        // --------- 1 end ---------
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

export default passport;

```

以上配置代码除了 `1` 区域代码是验证逻辑，其他为固定写法。

登录验证
```js

/**
 * 认证登录
 */
router.post('/signin', async (ctx, next) => {
    // Passport.authenticate('策略', ...)
    return Passport.authenticate('local', function(err, user, info, status) {
        // --------- 1 start ---------
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
        // --------- 1 end ---------
    })(ctx, next);
});
```

以上配置代码除了 `1` 区域代码是验证逻辑，其他为固定写法。


