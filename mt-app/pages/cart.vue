<template>
    <el-col class="page-cart">
        <el-row>
            <el-col v-if="cart.length" :span="24" class="m-cart">
                <list :cart-data="cart" />
                <p>
                    应付金额：
                    <em class="money">￥{{ total }}</em>
                </p>
                <div class="post">
                    <el-button type="primary" @click="submit">提交订单</el-button>
                </div>
            </el-col>
            <el-col v-else :span="24" class="empty">购物车为空</el-col>
        </el-row>
    </el-col>
</template>

<script>
import List from "@/components/cart/list.vue";
import { getCart } from '@/api/api';

export default {
    data() {
        return {
            cart: []
        };
    },
    async asyncData(ctx) {
        try {
            let id = ctx.query.id;
            let { code, data: { name, price } } = await getCart({ id });

            if (code === 0 ) {
                return {
                    cart: [{
                        name,
                        price,
                        count: 1
                    }]
                }
            }

        } catch (e) {
            console.log(e.toString());
        }
    },
    computed: {
        total() {
            let total = 0;
            this.cart.forEach(item => {
                total += item.price * item.count;
            });
            return total;
        }
    },
    methods: {
        submit() {
            this.$message('该功能未实现, 敬请期待')
        }
    },
    components: {
        List
    }
};
</script>

<style lang="scss">
@import "@/assets/css/cart/index.scss";
</style>