const mongoose = require('mongoose');
const connect = require('../connect');
const meituanDB = connect.openDB();

const poiSchema = new mongoose.Schema({
    name: String, // 店铺/景点名
    province: String, // 所在省份
    city: String, // 所在城市
    county: String, // 所在城市
    areaCode: String, // 地区编码
    tel: String, // 电话
    area: String, // 地段
    addr: String, // 地址
    type: String, // 类型
    module: String, // 子分类
    longtide: Number, // 经度
    latitude: Number, // 维度
});

module.exports = meituanDB.model('poi', poiSchema);
