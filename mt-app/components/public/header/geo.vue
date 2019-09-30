<template>
    <div class="m-geo">
        <i class="el-icon-location" />{{ $store.state.geo.position.city }}
        <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
        [ {{ $store.state.geo.position.province }} {{ $store.state.geo.position.city }} ]
    </div>
</template>

<script>
    export default {
        name: 'geolocation'
    }
</script>

<style lang="scss" scoped>

</style>
