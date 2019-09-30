<template>
    <div class="m-iselect">
        <span class="name">按省份选择:</span>
        <el-select v-model="pvalue" placeholder="省份">
            <el-option
                v-for="item in provinces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <el-select v-model="cvalue" placeholder="城市" :disabled="!pvalue">
            <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <span class="name">直接搜索：</span>
        <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"
        />
    </div>
</template>

<script>
import { getProvince, getCityById, getCities } from "@/api/api";
import _ from 'lodash';

export default {
    data() {
        return {
            provinces: [],
            pvalue: "",
            city: [], // 某个省份下的城市
            cvalue: "",
            input: "",
            cities: [], // 全国所有城市
        };
    },
    async created() {
        try {
            let { code, province, msg } = await getProvince();
            if (code === 0) {
                this.provinces = province.map(item => ({
                    value: item.id,
                    label: item.name
                }));
            } else this.$message(msg);
        } catch (e) {
            this.$message.error(e.toString());
        }
    },
    watch: {
        async pvalue(newPvalue) {
            try {
                let { code, city, msg } = await getCityById(newPvalue);
                if (code === 0) {
                    this.city = city.map(item => ({
                        value: item.id,
                        label: item.name
                    }));
                    this.cvalue = '';
                }
                else this.$message(msg);
            } catch (e) {
                this.$message.error(e.toString());
            }
        }
    },
    methods: {
        async getCities() {
            try {
                let { code, city, msg } = await getCities();
                if (code === 0)
                    this.cities = city.map(item => ({ value: item.name }));
                else this.$message(msg);
            } catch (e) {
                this.$message.error(e.toString())
            }
        },
        querySearchAsync: _.debounce(async function(queryString, cb) {
            if (this.cities.length) {
                cb(this.cities.filter(item => item.value.indexOf(queryString) > -1));
            } else {
                this.getCities();
            }
        }, 200),
        handleSelect(item) {
            console.log(item);
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>
