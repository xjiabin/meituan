<template>
    <div class="m-products-list">
        <dl>
            <dd
                v-for="item in nav"
                :key="item.name"
                :class="[ item.name,item.acitve ? 's-nav-active' : '' ]"
                @click="navSelect"
            >{{ item.txt }}</dd>
        </dl>
        <ul>
            <item v-for="(item, idx) in list" :key="idx" :meta="item" />
        </ul>
    </div>
</template>

<script>
import Item from './product'
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            nav: [
                {
                    name: "s-default",
                    txt: "智能排序",
                    acitve: true
                },
                {
                    name: "s-price",
                    txt: "价格最低",
                    active: false
                },
                {
                    name: "s-visit",
                    txt: "人气最高",
                    active: false
                },
                {
                    name: "s-comment",
                    txt: "评价最高",
                    active: false
                }
            ]
        };
    },
    methods: {
        navSelect() {}
    },
    components: {
        Item,
    },
};
</script>

<style lang="scss" scoped>
</style>