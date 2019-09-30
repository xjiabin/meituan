const Router = require('koa-router');
const axios = require('../../utils/axios');
const md5 = require('crypto-js')['MD5'];
const { Order, Cart } = require('../../models/index');
const { assets } = require('../../utils/utils');

let router = new Router({ prefix: '/order' });

router.post('/createOrder', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: '未登录'
        }
        return;
    }
    try {
        let { id, price, count } = ctx.body.body;
        assets(id, 'id null');
        assets(price, 'price null');
        assets(count, 'count null');

        let time = new Date();
        let orderID = md5(Math.random() * 1000 + time).toString();

        let findCart = await Cart.findOne({ cartNo: id });
        let order = new Order({
            id: orderID,
            total: price * count,
            count,
            time,
            user: ctx.session.passport.user,
            name: findCart.detail[0].name,
            imgs: findCart.detail[0].imgs,
            status: 0 // 待付款
        });
        let result = order.save();
        if (result) {
            await findCart.remove();
            ctx.body = {
                code: 0,
                id: orderID
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'fail'
            }
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

router.post('/getOrders', async ctx => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            list: [],
            msg: '未登录'
        }
        return;
    }
    try {
        let result = await Order.find();
        if (result) {
            ctx.body = {
                code: -1,
                list: result
            }
        } else {
            ctx.body = {
                code: -1,
                list: []
            }
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
})

module.exports = router;