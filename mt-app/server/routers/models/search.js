const Router = require('koa-router');
const { Poi } = require('../../models/index');
const { assets } = require('../../utils/utils');
const axios = require('axios');

const router = new Router({
    prefix: '/search'
});

/**
 * 根据输入的搜索关键字与当前所在城市，获取搜索推荐列表
 */
router.get('/top', async (ctx) => {
    try {
        // let { input, city } = ctx.query;
        // assets(input, 'input null');
        // assets(city, 'city null');

        // let result = await Poi.find({
        //     name: new RegExp(input),
        //     city: city
        // });

        // ctx.body = {
        //     code: 0,
        //     top: result.map(item => {
        //         return { name: item.name, type: item.type }
        //     }),
        //     type: result.length ? result[0].type : ''
        // }
        let { status, data: {
            top
        } } = await axios.get(`http://cp-tools.cn/search/top`, {
            params: {
                input: ctx.query.input,
                city: ctx.query.city,
                // sign
            }
        })
        ctx.body = {
            top: status === 200
                ? top
                : []
        }

    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

router.get('/hotPlace', async (ctx) => {
    try {
        // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
        // let result = await Poi.find({
        //     city,
        //     type: ctx.query.type || '景点'
        // }).limit(10)

        // ctx.body = {
        //     code: 0,
        //     result: result.map(item => {
        //         return {
        //             name: item.name,
        //             type: item.type
        //         }
        //     })
        // }
        let city = ctx.store
            ? ctx.store.geo.position.city
            : ctx.query.city
        let { status, data: {
            result
        } } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
            params: {
                city
            }
        })
        ctx.body = {
            result: status === 200
                ? result
                : []
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            result: []
        }
    }
});

router.get('/resultsByKeywords', async (ctx) => {
    const { city, keyword } = ctx.query;
    let {
        status,
        data: {
            count,
            pois
        }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
        params: {
            city,
            keyword
        }
    })
    ctx.body = {
        count: status === 200 ? count : 0,
        pois: status === 200
            ? pois
            : []
    }
});

router.get('/products', async (ctx) => {
    let keyword = ctx.query.keyword || '旅游'
    let city = ctx.query.city || '北京'
    let {
        status,
        data: {
            product,
            more
        }
    } = await axios.get('http://cp-tools.cn/search/products', {
        params: {
            keyword,
            city
        }
    })
    if (status === 200) {
        ctx.body = {
            product,
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    } else {
        ctx.body = {
            product: {},
            more: ctx.isAuthenticated() ? more : [],
            login: ctx.isAuthenticated()
        }
    }
});

module.exports = router;
