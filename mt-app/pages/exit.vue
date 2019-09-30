<template>
    <div></div>
</template>

<script>
    import { exit } from '@/api/api'
    export default {
        async middleware() {
            try {
                let res = await exit();
                if (res.code == 0) {
                    location.href = '/'
                } else {
                    this.$message('操作失败')
                }
            } catch (e) {
                this.$message.error(e.toString())
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
