const axios = require('../utils/axios');
const KEY = 'a2f1a558a892fa9e82e502541446b46e';
const BASEURL = 'https://restapi.amap.com/v3/ip';
/**
 * 根据用户输入的IP地址，能够快速的帮用户定位IP的所在位置。
 * @param {*} ip ip地址 若用户不填写IP，则取客户http之中的请求来进行定位
 */
const getLocationByIP = (ip) => {
    let url = `${BASEURL}?key=${KEY}`

    return axios.get(url).then(res => {
        let data = res.data;
        if (data.status == '1') {
            return data;
        } else {
            return data.info;
        }
    })
}

module.exports = getLocationByIP
