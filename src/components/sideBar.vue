<template>
    <div class="menu">
        <router-link to="/">
            <img :src="require('../assets/images/index.png')" alt="">
            <p>首页</p>
        </router-link>
        <router-link v-for="(item ,index) in menuList" :key="item.name" :to="item.path"
                     :active-class="getActive({...item},index)"
                     v-if="$store.state.mainMenus.includes(item.name)"
                     :class="$route.meta.parent === item.path ? 'active' : ''" @click.native="changeMenu(item)">
            <img :src="item.img" alt="">
            <p>{{ item.name }}</p>
            <img src="../assets/images/right_icon.png" alt="" v-if="!item.not_right">
        </router-link>
    </div>
</template>

<script>
export default {
    name: "sideBar",
    data() {
        return {
            menuList: [
                {path: '/TermMonitor', name: '终端监控', img: require('../assets/images/jiankong.png')},
                {path: '/PatientManagement', name: '患者管理', img: require('../assets/images/huanzhe.png')},
                {path: '/Assess', name: '评估测试', img: require('../assets/images/pinggu.png')},
                // {path: '/Emotion', name: '训练治疗', img: require('../assets/images/qingxu.png')},
                {path: '/DataAnalysis', name: '数据分析', img: require('../assets/images/fenxi.png')},
                {path: '/ReportCenter', name: '报告中心', img: require('../assets/images/baogao.png')},
                {path: '/SystemSetting', name: '系统设置', img: require('../assets/images/shezhi.png')},
            ]
        };
    },
    computed: {},
    watch: {},
    mounted() {
    },
    methods: {
        changeMenu(item) {
            this.$store.commit('setCmenu', item.name)
        },
        getActive({path, name}, item) {
            if (this.$route.path === path) {
                this.$store.commit('setCmenu', name)
            }
            return 'active'
        }
    },
}
</script>

<style scoped>
.menu {
    box-sizing: border-box;
    min-width: 290px;
    height: 100%;
    background: linear-gradient(162deg, #7A40F2 0%, #7A40F2 100%);
    border-radius: 10px 10px 10px 10px;
    background-size: 100%;
    margin-right: 20px;
}

.menu a {
    position: relative;
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    color: #FFF;
    font-size: 16px;
    padding-left: 20px;
}

.menu a.active {
    background: linear-gradient(-87deg, #672FDB 0%, #672FDB 99%);
}

.menu a img:first-child {
    width: 25px;
    margin-right: 30px;
}

.menu a img:last-child {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 35px;
}
</style>
