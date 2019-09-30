const userSchema = require('./schema/users');
const geoSchema = require('./schema/geo');
const provinceSchema = require('./schema/province');
const citySchema = require('./schema/city');
const pcaSchema = require('./schema/pca');
const poiSchema = require('./schema/poi');
const categroySchema = require('./schema/categroy');
const cartSchema = require('./schema/cart');
const orderSchema = require('./schema/order');

module.exports = {
    User: userSchema,
    Geo: geoSchema,
    Province: provinceSchema,
    City: citySchema,
    Pca: pcaSchema,
    Poi: poiSchema,
    Categroy: categroySchema,
    Cart: cartSchema,
    Order: orderSchema
}
