<template>
    <div>
        <div class="welcome" v-if="welcome" >
            <div class="bj"><img src="../../assets/images/t1.png"></div>
            <div class="wz">TD心理CT测评分析系统V5.5</div>
            <div class="flex hy" @click="tiaozhuan">
                <div class="hyjt"><img src="../../assets/images/t2.gif"></div>
            </div>
        </div>
        <div class="login" v-if="denglu">
            <div class="exit out">
                <img  src="../../assets/images/login_exit.png" alt="" @click="exit">
            </div>
            <img class="logo" src="../../assets/images/logo.png" alt="">
            <img style="margin-top: 150px;margin-left: 250px;" src="../../assets/images/d1.png">
            <div class="login-content">
                <p>终端登录</p>
                <form>
                    <div class="item">
                        <img src="../../assets/images/login_user.png" alt="">
                        <el-input v-model="username" type="text" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="item">
                        <img src="../../assets/images/login_pwd.png" alt="">
                        <el-input v-model="password" show-password type="password" placeholder="请输入密码"></el-input>
                    </div>
                    <div class="jizhu">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </div>
                    <el-button round class="login-btn" @click="login">登录</el-button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
var userAgent = navigator.userAgent.toLowerCase()
if(userAgent.indexOf('electron/')>-1) {
    console.log('桌面应用')
    var Store = window.require('electron-store')
    var storeName = new Store();
}else {
    console.log('浏览器')
}
    export default {
        name    : "TerminalLogin",
        data() {
            return {
                username: '',
                password: '',
                remember: false,
                welcome:true,
                denglu:false
            };
        },
        computed: {},
        watch   : {},
        methods : {
            tiaozhuan() {
                this.welcome = false
                this.denglu = true
            },
            exit() {
                this.$confirm('确定退出系统吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.window.close()
                }).catch(() => {
                });
            },
            async login() {
                // console.log('exec',await window.window.getPwd('ls'))
                if (!this.username) {
                    this.$message.error('请输入用户名');
                    return;
                }
                if (!this.password) {
                    this.$message.error('请输入密码');
                    return;
                }

                await this.$axios.post('term/index/login', {username: this.username, password: this.password})
                    .then(res => {
                        if (res.data.code === 1) {
                            this.$store.commit('setTerminalUserInfo', {
                                data    : res.data.data,
                                status  : true,
                                username: this.username,
                            });
                            this.$store.commit('setToken', res.data.data.token);
                            this.$router.push('/TerminalWait');
                            //session存储用户类型
                            sessionStorage.setItem('usertype','term')


                            var userAgent = navigator.userAgent.toLowerCase()
                            if(userAgent.indexOf('electron/')>-1) {
                                if (this.remember) {
                                    //记住密码
                                    storeName.set("xlctzdname",this.username);
                                    storeName.set("xlctzdpassword",this.password);
                                } else {
                                    storeName.delete('xlctzdname');
                                    storeName.delete('xlctzdpassword');
                                }
                            }else {
                                if (this.remember) {
                                    this.$store.commit('setTerminalAccount', {
                                        username: this.username,
                                        password: this.password
                                    });
                                } else {
                                    this.$store.commit('setTerminalAccount', '');
                                }
                            }
                        }
                    })
            }
        },

        mounted() {
            var userAgent = navigator.userAgent.toLowerCase()
            if(userAgent.indexOf('electron/')>-1) {
                if(storeName.has("xlctzdname")){
                    this.password = storeName.get('xlctzdpassword')
                    this.username = storeName.get('xlctzdname')
                    this.remember = true
                } else  {
                    this.remember = false
                }
            }else {
                if (this.$store.state.user.terminal.account) {
                    let useraccount = this.$store.state.user.terminal.account;
                    this.password   = useraccount.password;
                    this.username   = useraccount.username;
                    this.remember   = true;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.welcome {
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/tp.png') no-repeat center;
    background-size: cover;
    overflow: hidden;
    .bj {
        width: 232px;
        height: 232px;
        margin: 0 auto;
        margin-top: 23vh;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .wz {
        width: 1295px;
        height: 148px;
        font-size: 100px;
        font-weight: 800;
        color: #FFFFFF;
        line-height: 148px;
        margin: 0 auto;
    }
    .hy {
        margin-top: 22vh;
        cursor: pointer;
        float: right;
    }
    .hyjt {
        background: url('../../assets/images/t3.png') no-repeat center;
    }
}
    .login {
        width: 100vw;
        height: 100vh;
        background: url('../../assets/images/loginBG.png') no-repeat center;
        background-size: cover;
    }

    .logo {
        display: block;
        height: 132px;
        position: absolute;
        top: 20%;
        left: 18%;
    }

    .login-content {
        width: 380px;
        position: absolute;
        top: 55%;
        left: 34%;
        transform: translate(-50%, -56%);
    }

    .login-content p {
        color: #7A40F2;
        font-size: 36px;
        margin-bottom: 30px;
        text-align: center;
        font-weight: bold;
    }

    .login-content .item {
        display: flex;
        align-items: center;
        //background: #f2f2f2;
        border-radius: 8px;
        border: 1px solid #7A40F2;
        height: 55px;
        margin-bottom: 35px;
        padding: 0 20px;
    }

    .login-content .item img {
        width: 20px;
        height: 20px;
    }

    .login-content .item input {
        flex: 1;
        margin-left: 15px;
        font-size: 14px;
    }

    .login-content .item input::-webkit-input-placeholder {
        color: #999999;
    }

    .login-btn {
        display: block;
        background: #7A40F2;
        color: #ffffff;
        font-weight: bold;
        font-size: 14px;
        border-radius: 8px !important;
        width: 170px;
        height: 50px;
        margin: 0 auto;
    }

    .jizhu {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #989898;
        margin-bottom: 30px;
        margin-left: 30px;
    }

    .jizhu input {
        width: 14px;
        height: 14px;
        margin: 0 10px 0 0;
    }

    .exit {
        position: fixed;
        top: 8%;
        right: 8%;
        width: 76px;
        height: 76px;
        background: #FFFFFF;
        border-radius: 50%;
        cursor: pointer;
        img {
            display: block;
            width: 33px;
            height: 33px;
            margin: 28% auto;
        }
    }

    ::v-deep .el-input__inner {
        border: none;
        background-color: transparent;
    }
    ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #7A40F2;
    }
    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
        color: #7A40F2;
        background-color: #7A40F2;
        border-color: #7A40F2;
    }
</style>
