<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input
                        placeholder="搜索商家或地点"
                        v-model="search"
                        @focus="focus"
                        @blur="blur"
                        @input="input" />
                    <el-button type="primary"><i class="el-icon-search"></i></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item, idx) in hotPlace" :key="idx">
                            <a :href="'/products?keyword=' + item.name">{{ item.name }}</a>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearch">
                        <dd v-for="(item, idx) in searchList" :key="idx">
                            <a :href="'/products?keyword=' + item.name">{{ item.name }}</a>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a
                        v-for="(item, idx) in hotPlace" :key="idx"
                        :href="'/products?keyword=' + item.name"
                    >{{ item.name }}</a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"/><p class="txt">随时退</p></li>
                    <li><i class="single"/><p class="txt">不满意免单</p></li>
                    <li><i class="overdue"/><p class="txt">过期退</p></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import _ from 'lodash';
    import { getSearchList } from '@/api/api';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                isFocus: false,
                search: '', // 搜索关键字
                // hotPlace: ['火锅', '火锅'], // 热门搜索列表
                searchList: [], // 搜索列表
            }
        },
        computed: {
            ...mapState('home', {
                hotPlace: state => state.hotPlace.slice(0, 4)
            }),
            isHotPlace() {
                return this.isFocus && !this.search;
            },
            isSearch() {
                return this.isFocus && this.search;
            }
        },
        methods: {
            focus() {
                this.isFocus = true;
            },
            blur() {
                setTimeout(() => {
                    this.isFocus = false;
                }, 200);
            },
            input: _.debounce(async function() {
                try {
                    if (!this.search) return;
                    let city = this.$store.state.geo.position.city.replace('市', '');
                    this.searchList = [];

                    let res = await getSearchList({
                        input: this.search,
                        city
                    });
                    if (res.code == 0) {
                        this.searchList = res.top.slice(0, 10);
                    } else {
                        this.$message.error(res.msg);
                    }
                } catch (e) {
                    this.$message.error(e.toString());
                }
            }, 300)
        },
    }
</script>

<style lang="scss">
</style>
