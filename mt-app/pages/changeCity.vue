<template>
    <div class="page-changeCity">
        <el-row>
            <el-col :span="24">
                <i-selecte />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <hot />
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <categroy />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import iSelecte from '@/components/changeCity/iselect.vue';
import hot from '@/components/changeCity/hot.vue';
import categroy from '@/components/changeCity/categroy.vue';

export default {
    components: {
        iSelecte, hot,
        categroy
    },
};
</script>

<style lang="scss">
</style>
