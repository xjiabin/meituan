const Router = require('koa-router');
const axios = require('../../utils/axios');
const { Geo, Province, City, Pca } = require('../../models/index');
const { assets } = require('../../utils/utils');
const getLocationByIP = require('../../utils/getLocation');

let router = new Router({ prefix: '/geo' });

let Menu = Geo.menu;

/**
 * 地理位置
 */
router.get('/getLocation', async (ctx, next) => {
    try {
        let { province, city } = await getLocationByIP();

        ctx.body = { province, city };
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: `第三方服务异常${e.toString()}`
        }
    }
});

/**
 * 菜单
 */
router.get('/menu', async (ctx, next) => {
    // let { data: { menu } } = await axios.get('http://cp-tools.cn/geo/menu');

    try {
        const result = await Menu.findOne()

        ctx.body = {
            code: 0,
            menu: result.menu
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 省
 */
router.get('/province', async (ctx, next) => {
    try {
        let result = await Province.find();
        let province = result.map(item => {
            return {
                id: item.id,
                name: item.value
            }
        });

        ctx.body = {
            code: 0,
            province
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 根据编码（id）获取省份及其对应城市
 */
router.get('/province/:id', async (ctx) => {
    try {
        let id = ctx.params.id;
        assets(id, 'id null');

        let city = await City.findOne({ id });

        ctx.body = {
            code: 0,
            city: city.value.map(item => {
                return {
                    id: item.id,
                    province: item.province,
                    name: item.name
                }
            })
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 城市
 */
router.get('/city', async (ctx) => {
    try {
        let city = [];
        let result = await City.find();
        result.forEach(item => {
            city = city.concat(item.value);
        });

        ctx.body = {
            code: 0,
            city: city.map(item => {
                return {
                    id: item.id,
                    province: item.province,
                    name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
                        ? item.province
                        : item.name
                }
            })
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 热门城市
 */
router.get('/hotCity', async (ctx) => {
    let list = [
        '北京市',
        '上海市',
        '广州市',
        '深圳市',
        '天津市',
        '西安市',
        '杭州市',
        '南京市',
        '武汉市',
        '成都市'
    ]
    try {
        let result = await City.find()
        let nList = []
        result.forEach(item => {
            nList = nList.concat(item.value.filter(k => {
                return list.includes(k.name) || list.includes(k.province)
            }))
        })
        ctx.body = {
            code: 0,
            hots: nList
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
});

/**
 * 获取省市区数据
 */
router.get('/pcas', async (ctx) => {
    try {
        let result = await Pca.find();

        ctx.body = {
            code: 0,
            data: result
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            msg: e.toString()
        }
    }
})

/**
 * 保存省市区数据
 */
router.get('/save', async (ctx) => {
    return false;
    const _data = require('./address.json');
    let res = [];

    for (let pcode in _data) {
        let province = _data[pcode];
        let _tmp = {
            code: province.code,
            name: province.name,
            cities: []
        };

        let cities = province.cities;
        for (let ccode in cities) {
            let city = cities[ccode];

            let areas = city.districts;
            let _areaTmp = [];
            for (let acode in areas) {
                _areaTmp.push({
                    code: acode,
                    name: areas[acode],
                })
            }
            _tmp['cities'].push({
                code: city.code,
                name: city.name,
                areas: _areaTmp
            })
        }

        res.push(_tmp);
    }

    let result = await Pca.create(res);

    ctx.body = {
        code: 0,
        result
    }
})

module.exports = router;
