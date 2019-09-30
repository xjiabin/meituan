<template>
    <div class="page-register">
        <article class="header">
            <header>
                <a href="/" class="site-logo"></a>
                <span class="login">
                    <em class="bold">已有账号？</em>
                    <a href="/login">
                        <el-button type="primary" size="small">登录</el-button>
                    </a>
                </span>
            </header>
        </article>

        <section>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                    <!-- <v-code :username="ruleForm.name" :email="ruleForm.email" /> -->
                    <el-button @click="sendMsg" size="mini" round :disabled="lock">{{ text }}</el-button>
                    <span class="status">{{ statusMsg }}</span>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input v-model="ruleForm.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="cpwd">
                    <el-input v-model="ruleForm.cpwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="retister">同意以下协议并注册</el-button>
                    <div class="error">{{ error }}</div>
                </el-form-item>
                <el-form-item>
                    <a
                        class="f1"
                        href="http://www.meituan.com/about/terms"
                        target="_blank"
                    >《美团网用户协议》</a>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import { verift, signup } from '@/api/api'
import CryptoJS from 'crypto-js'

export default {
    layout: "blank",
    data() {
        return {
            ruleForm: {
                name: '',
                email: '',
                code: '',
                pwd: '',
                cpwd: ''
            },
            rules: {
                name: [{
                    required: true,
                    type: 'string',
                    message: '请输入昵称',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    type: 'email',
                    message: '请输入邮箱',
                    trigger: 'blur'
                }],
                pwd: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                cpwd: [{
                    required: true,
                    message: '请输入确认密码',
                    trigger: 'blur'
                }, {
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback((new Error('请再次输入密码')))
                        } else if (value !== this.ruleForm.pwd) {
                            callback((new Error('两次输入密码不一样')))
                        } else {
                            callback()
                        }
                    },
                    trigger: 'blur'
                }],
            },
            statusMsg: '',
            error: '',

            defaultText: '发送验证码',
            text: '',
            lock: false, // 锁定按钮
            cutdown: 5
        };
    },
    created () {
        this.text = this.defaultText;
    },
    methods: {
        async sendMsg() {
            let namePass, emailPass;
            this.$refs.ruleForm.validateField('name', valid => {
                namePass = valid;
            });
            this.$refs.ruleForm.validateField('email', valid => {
                emailPass = valid;
            });

            if (namePass || emailPass) return false;

            let _data = {
                username: encodeURIComponent(this.ruleForm.name),
                email: this.ruleForm.email
            }

            try {
                let res = await verift(_data);
                // console.log(res);
                if (res && res.code == 0) {
                    this.$message({message: res.msg, type: 'success'});

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
                } else {
                    this.$message.error(res.msg);
                }
            } catch (e) {
                this.$message.error(e.toString());
            }
        },
        retister() {
            // 全局表单校验
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let _data = {
                        username: encodeURIComponent(this.ruleForm.name),
                        password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
                        email: this.ruleForm.email,
                        code: this.ruleForm.code
                    }
                    try {
                        let res = await signup(_data);
                        // console.log(res);
                        if (res && res.code == 0) {
                            this.$message({message: res.msg, type: 'success'});
                            location.href = '/login'
                        } else {
                            this.$message.error(res.msg);
                            this.error = res.msg;
                        }
                    } catch (e) {
                        this.error = e.toString();
                        this.$message.error(e.toString());
                    }
                    setTimeout(() => {
                        this.error = ''
                    }, 2000);
                }
            });
        }
    },
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/register/index.scss";
</style>
