import axios from 'axios';
import config from '@/package.json';

const url = 
    process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:3000' :
    'http://meituan.xjiabin.cn',

    version = `v${config.version}`,
    base = `${url}/api/${version}`;

// ========== users ==========
// 验证
export const verift = params => axios.post(`${base}/users/verift`, params).then(res => res.data);
// 注册
export const signup = params => axios.post(`${base}/users/signup`, params).then(res => res.data);
// 登录
export const signin = params => axios.post(`${base}/users/signin`, params).then(res => res.data);
// 获取用户信息
export const getUser = () => axios.get(`${base}/users/getUser`).then(res => res.data);
// 退出
export const exit = () => axios.get(`${base}/users/exit`).then(res => res.data);

// ========== geo ==========
// 获取位置信息
export const getLocation = () => axios.get(`${base}/geo/getLocation`).then(res => res.data);
// 获取省份
export const getProvince = () => axios.get(`${base}/geo/province`).then(res => res.data);
// 根据城市id获取对应城市
export const getCityById = params => axios.get(`${base}/geo/province/${params}`).then(res => res.data);
// 获取城市
export const getCities = () => axios.get(`${base}/geo/city`).then(res => res.data);
// 获取热门城市
export const getHotCity = () => axios.get(`${base}/geo/hotCity`).then(res => res.data);

// 获取热门搜索
export const getHotPlace = params => axios.get(`${base}/search/hotPlace`, { params }).then(res => res.data);
// 获取搜索列表
export const getSearchList = params => axios.get(`${base}/search/top`, { params }).then(res => res.data);
// 根据关键字获取推荐列表
export const resultsByKeywords = params => axios.get(`${base}/search/resultsByKeywords`, { params }).then(res => res.data);
// 根据关键字获取产品详情
export const getProducts = params => axios.get(`${base}/search/products`, { params }).then(res => res.data);

// 获取菜单menu
export const getMenu = () => axios.get(`${base}/geo/menu`).then(res => res.data);
// 根据城市获取区域/分类
export const getCrumbs = params => axios.get(`${base}/categroy/crumbs`, { params }).then(res => res.data);

// 创建购物车
export const createCart = params => axios.post(`${base}/cart/create`, params).then(res => res.data);
// 获取购物车
export const getCart = params => axios.post(`${base}/cart/getCart`, params).then(res => res.data);
