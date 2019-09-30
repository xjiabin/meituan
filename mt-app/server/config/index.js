module.exports = {
    version: `v${process.env.npm_package_version}`,
    dbs1: 'mongodb://jiabin:123456@127.0.0.1:27017/meituan',
    dbs: {
        host: 'localhost',
        user: 'jiabin',
        password: '123456',
        db: "meituan",
        port: 27017
    },
    redis: {
        get host() {
            return '127.0.0.1'
        },
        get port() {
            return 6379
        }
    },
    smtp: {
        get host() {
            return 'smtp.qq.com'
        },
        get port() {
            return 587
        },
        get user() { // 发送邮箱的账号
            return '1060251714@qq.com'
        },
        get pass() { // 授权码
            return 'bkrdkyzemtygbejh'
        },
        get code () {
            return () => {
                return Math.random().toString(16).slice(2, 6).toUpperCase();
            }
        },
        get expire() {
            return () => {
                return new Date().getTime() + 1 * 60 * 1000;
            }
        }
    },
}
