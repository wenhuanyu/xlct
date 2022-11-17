<template>
    <div class="layout">
        <top-bar  v-if="$route.name !== 'ReportPage'"/>

        <div class="container">
            <slide-bar
                v-if="$route.name !== 'AssessDetail' && $route.name !== 'AssessStatistics' &&
                 $route.name !== 'BreathingDetail' && $route.name !== 'BreathingDetailContrast' &&
                  $route.name !== 'EmotionDetail' && $route.name !== 'AssessDetailContrast' &&
                  $route.name !== 'EmotionDetailContrast' && $route.name !== 'GestationalAge'&&
                   $route.name !== 'ReportPage'&& $route.name !== 'messagePage'&&
                    $route.name !== 'AssessDetailTeam'"
            />
            <div class="content">
                <router-view :key="key"/>
            </div>
        </div>

    </div>
</template>

<script>
import slideBar from '../components/sideBar'
import topBar from "../components/topBar";

export default {
    name: "Layout",
    components: {slideBar, topBar},
    data() {
        return {};
    },
    computed: {
        key() {
            return this.$route.path + Math.random();
        }
    },
    watch: {
        '$route.path':function (){
            //获取权限列表
            this.$store.dispatch('GetAuth')
        }
    },
    methods: {},
    mounted() {
    },
}
</script>

<style scoped>
.layout {
    width: 100vw;
    height: 100vh;
    background: #F2F2F2;
}

.container {
    margin: 15px 25px;
    height: calc(100vh - 150px);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.content {
    width: 100%;
    height: 100%;
    /*background-color: #fff;*/
    border-radius: 5px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
