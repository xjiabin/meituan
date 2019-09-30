import Vue from 'vue';
import Vuex from 'vuex';
import geo from './modules/geo';
import home from './modules/home';
import { getLocation, getMenu, getHotPlace } from '@/api/api';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    modules: {
        geo, // 地理位置模块
        home, // 首页模块
    },
    actions: {
        // 当我们想将服务端的一些数据传到客户端时，可以在状态树中指定了 nuxtServerInit 方法，这个方法是灰常好用的。
        // app：由于此时没有dom对象，无法拿到vue的this实例, 但我们能拿到app
        async nuxtServerInit({ commit }, { req, app }) {
            try {
                const { province, city } = await getLocation();
                // console.log(province, city);
                commit('geo/setPositon', { city, province });

                const { code, menu } = await getMenu();
                // console.log(menu);
                commit('home/setMenu', code === 0 ? menu : []);

                const { result } = await getHotPlace({
                    city: app.store.state.geo.position.city.replace('市', '')
                });
                // console.log(result);
                commit('home/setHotPlace', result);

            } catch (e) {
                console.log(e.toString());
            }
        }
    }
});

export default store;
