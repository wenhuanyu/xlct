<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {}
    },
    mounted() {
        if(window.location.hash.match('ReportPage')) {
        } else {
            this.$axios.post('/api/setting/auth').then(res => {
                if (res.data && res.data.data.length) {
                    this.$store.commit('setAuth', res.data.data)
                }
            })

        }

    }
}
</script>
<style lang="scss">
@import "./assets/css/common";
@import "./assets/css/main";
</style>
