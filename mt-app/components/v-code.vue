<template>
    <el-button @click="sendMsg" size="mini" round :disabled="lock">{{ text }}</el-button>
</template>

<script>
    import utils from '@/assets/js/utils';
    import axios from 'axios';

    export default {
        props: ['username', 'email'],
        data() {
            return {
                defaultText: '发送验证码',
                text: '',
                lock: false, // 锁定按钮
                cutdown: 5
            }
        },
        created () {
            this.text = this.defaultText;
        },
        methods: {
            sendMsg() {
                if (!this.username) return this.$message.error('请输入用户名');
                if (!utils.isEmail(this.email)) return this.$message.error('请输入邮箱');

                this.lock = true;
                let t = this.cutdown;
                this.timer = setInterval(() => {
                    this.text = `${this.defaultText}(${t}s)`;
                    if (t-- < 0) {
                        clearInterval(this.timer);
                        this.lock = false;
                        this.text = this.defaultText;
                    }
                }, 1000);
            }
        },
    }
</script>

<style scoped>

</style>