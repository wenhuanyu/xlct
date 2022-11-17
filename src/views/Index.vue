<template>
    <div id="index">
        <img class="logo" src="../assets/images/logo2.png" alt="">
        <div class="con">
            <div class="index-content">
                <router-link v-for="(item,index) in line.slice(0,3)"
                             :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                    <div class="bbb">
                        <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>
                        <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                        <img :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
                    </div>
                </router-link>
            </div>
            <div class="index-content content1">
                <router-link v-for="(item,index) in line.slice(3,6)"
                             :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                    <div class="bbb">
                        <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.name" class="aaa"></div>
                        <!--                    <div :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" v-html="item.introduce" class="ccc"></div>-->
                        <img :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="" >
                    </div>
                </router-link>
            </div>
        </div>

        <div class="all_right">
            <el-popover
                placement="top"
                width="160"
                v-model="logoutShow">
                <p>确定退出登录？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="logoutShow = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <button slot="reference" class="all_right_top">
                    <img src="../assets/images/user_red.png" alt="">
                    <p>退出登录</p>
                </button>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            logoutShow: false,
            line: [
                {
                    img: require("@/assets/images/index_icon6.png"),
                    name: '终端监控',
                    // introduce:'系统终端不同状态监控',
                    to: '/TermMonitor'
                },
                {
                    img: require('@/assets/images/index_icon1.png'),
                    name: '患者管理',
                    // introduce:'患者信息管理',
                    to: 'PatientManagement'
                },


                {
                    img: require("@/assets/images/index_icon2.png"),
                    name: '评估测试',
                    // introduce:'多种题型测试',
                    to: '/Assess'
                },

                //line 2

                {
                    img: require("@/assets/images/index_icon9.png"),
                    name: '数据分析',
                    // introduce:'多种题型测试',
                    to: '/DataAnalysis'
                },
                {
                    img: require("@/assets/images/index_icon5.png"),
                    name: '报告中心',
                    // introduce:'报告随时查看',
                    to: '/ReportCenter'
                },
                {
                    img: require("@/assets/images/index_icon8.png"),
                    name: '系统设置',
                    // introduce:'管理员系统配置',
                    to: '/SystemSetting'
                },

            ]
        };
    },
    computed: {
        check: function () {
            return (name) => {
                // console.log('name',name)
                return this.$store.state.mainMenus.includes(name) ? 'all' : 'none'
            }
        }
    },
    watch: {
        /*'$store.state.mainMenus':(newVal)=>{
            console.log('mainMenus change',newVal)
        }*/
    },
    async mounted() {
        // console.log('用户类型', sessionStorage.getItem('usertype'))

        if (sessionStorage.getItem('usertype') !== 'center') {
            this.$router.push('/TerminalLogin')
        }
        if (!sessionStorage.getItem('usertype')) {
            this.$router.push('/Login')
        }
        this.getRules().then()
    },
    methods: {
        logout() {
            this.$store.commit('setUserInfo', {data: '', status: false});
            this.$router.push('/Login');
        },
        getRules() {
            let rule = new Promise((resolve, reject) => {
                //获取权限列表
                this.$store.dispatch('GetAuth')
            })
            return rule
        }
    },
}
</script>

<style scoped lang="scss">
button {
    border: none;
}

.aaa {
    height: 33px!important;
    z-index: 100;
    position: absolute;
    bottom: 10%;
    left: 38%;
    font-size: 24px;
    font-weight: 400;
    color: #FFFFFF;
}
//.ccc {
//    z-index: 100;
//    position: absolute;
//    top: 48%;
//    left: 38%;
//    height: 17px;
//    font-size: 16px;
//    font-weight: 400;
//    color: #FFFFFF;
//    line-height: 17px;
//}
#index {
    width: 100%;
    height: 100vh;
    background: url('../assets/images/loginBG.png') no-repeat;
    background-size: 100% 100%;
}

.logo {
    display: block;
    //height: 90px;
    position: absolute;
    top: 8vh;
    left: 8%;
}
.con {
    width: 65%;
    position: fixed;
    top:25vh;
    left: 18%;
}
.index-content {
    width: 100%;
    height: 320px;
    display: flex;
    justify-content: space-between;
}

.content1 {
    margin-top: 20px;
}

.content1 a {
    margin-right: 20px !important;
}
.bbb {
    width: 423px;
    position: relative;
}
.index-content .img {
    display: block;
    width: 100%;
    height: 330px;
    transition: .3s all ease-in-out;
}

.index-content a {
    margin-right: 20px;
    //width: 30%;
    //height: 22%;
}

.all_right_top p::after {
    border-top: 8px solid #672FDB;
}
::v-deep .el-button--primary {
    background-color: #672FDB;
}
::v-deep .el-button--text {
    color: #672FDB;
}
.disabled {
    filter: grayscale(100%);
}
</style>
