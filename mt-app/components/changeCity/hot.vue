<template>
    <div class="m-hcity">
        <dl>
            <dt>热门城市：</dt>
            <dd v-for="item in list" :key="item.id">
                {{ item.name === '市辖区' ? item.province : item.name }}
            </dd>
        </dl>
    </div>
</template>

<script>
import { getHotCity } from '@/api/api';

export default {
    data() {
        return {
            list: []
        }
    },
    async created () {
        try {
            let { code, hots, msg } = await getHotCity();
            if (code === 0) this.list = hots;
            else this.$message(msg);
        } catch (e) {
            this.$message.error(e.toString());
        }
    },
};
</script>

<style lang="scss">
@import '@/assets/css/changecity/hot.scss';
</style>