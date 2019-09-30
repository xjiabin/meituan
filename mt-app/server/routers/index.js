const Router = require('koa-router');
const UserRouter = require('./models/users');
const GeoRouter = require('./models/geo');
const SearchRouter = require('./models/search');
const CategroyRouter = require('./models/categroy');
const CartRouter = require('./models/cart');
const config = require('../config');

const router = new Router({
    prefix: `/api/${config.version}`
});

router.use(UserRouter.routes(), UserRouter.allowedMethods())
router.use(GeoRouter.routes(), GeoRouter.allowedMethods())
router.use(SearchRouter.routes(), SearchRouter.allowedMethods())
router.use(CategroyRouter.routes(), CategroyRouter.allowedMethods())
router.use(CartRouter.routes(), CartRouter.allowedMethods())

module.exports = router;
