<template>
    <div class>
        <dl class="m-categroy">
            <dt>按拼音首字母搜索：</dt>
            <dd v-for="item in list" :key="item">
                <a :href="'#city-' + item">{{ item }}</a>
            </dd>
        </dl>
        <dl v-for="item in block" :key="item.title" class="m-categroy-section">
            <dt :id="'city-' + item.title">{{ item.title }}</dt>
            <dd>
                <span v-for="c in item.city" :key="c">{{ c }}</span>
            </dd>
        </dl>
    </div>
</template>

<script>
import jspy from 'js-pinyin';
import { getCities } from '@/api/api';

export default {
    data() {
        return {
            list: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(""),
            block: [{
                title: 'A',
                city: [
                    '鞍山',
                    '鞍山',
                    '鞍山',
                    '鞍山'
                ]
            }]
        };
    },
    async created() {
        let blocks = [];
        try {
            let { code, city, msg } = await getCities();
            if (code !== 0) {
                this.$message(msg);
                return;
            }

            let p,
                c,
                d = {};

            city.forEach(item => {
                // 将汉字转换为拼音并截取首字母
                p = jspy.getFullChars(item.name).toLocaleUpperCase().slice(0, 1);
                // 获取字符编码
                c = p.charCodeAt(0);
                // A-Z: 65-90
                if (c > 64 && c < 91) {
                    if (!d[p]) d[p] = [];
                    // d.a=["阿拉善盟", "鞍山市", "安阳市", "安庆市"];
                    // d.b=["北京市", "保定市", "白山市", "白城市", "包头市" ...]
                    d[p].push(item.name);
                }
            });

            for (let [k, v] of Object.entries(d)) {
                blocks.push({
                    title: k,
                    city: v
                })
            }
            // 排序
            this.block = blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
        } catch (e) {
            this.$message.error(e.toString());
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";
</style>