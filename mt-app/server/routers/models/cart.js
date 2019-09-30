const Router = require('koa-router');
const md5 = require('crypto-js')['MD5'];
const { Cart } = require('../../models/index');
const { assets } = require('../../utils/utils');

let router = new Router({ prefix: '/cart' });

router.post('/create', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '未登录'
        }
        return;
    }

    try {
        let { id, detail } = ctx.request.body;
        assets(id, 'id null');
        assets(detail, 'detail null');

        let time = new Date();
        let cartNo = md5(Math.random() * 1000 + time).toString();

        let cart = new Cart({
            id,
            cartNo,
            time,
            user: ctx.session.passport.user,
            detail
        });
        let result = await cart.save();
        if (result) {
            ctx.body = {
                code: 0,
                msg: '',
                id: cartNo
            }
            return
        }
        ctx.body = {
            code: -1,
            msg: 'fail'
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

router.post('/getCart', async ctx => {
    try {
        let { id } = ctx.request.body;
        assets(id, 'id null');

        let result = await Cart.findOne({ cartNo: id });
        ctx.body = {
            code: 0,
            data: result ? result.detail[0]: {}
        }

    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
})

module.exports = router;
