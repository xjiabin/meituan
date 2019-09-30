<template>
    <div class="m-menu">
        <dl class="nav" @mouseleave="onNavMouseLeave">
            <dt>全部分类</dt>
            <dd v-for="(item, index) in menu" :key="index" @mouseenter="onNavMouseEnter(item.type)">
                <i :class="item.type" />{{ item.name }}<span class="arrow" />
            </dd>
        </dl>
        <div class="detail" v-if="kind" @mouseenter="onDetMouseEnter" @mouseleave="onDetMouseLeave">
            <div v-for="(item, index) in curDetail.child" :key="index">
                <h4>{{ item.title }}</h4>
                <span v-for="v in item.child" :key="v">{{ v }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                kind: '', // 鼠标hover时候的类型
            }
        },
        computed: {
            ...mapState('home', {
                menu: state => state.menu
            }),
            curDetail() {
                return this.menu.filter(item => item.type === this.kind)[0];
            }
        },
        methods: {
            onNavMouseLeave() {
                this._timer = setTimeout(() => {
                    this.kind = '';
                }, 150);
            },
            onNavMouseEnter(_type) {
                this.kind = _type;
            },
            onDetMouseEnter() {
                clearTimeout(this._timer);
            },
            onDetMouseLeave() {
                this.kind = '';
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
