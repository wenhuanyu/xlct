<template>
    <div>
        <el-dialog :visible="false" title="请选择一个设备连接">
            <el-row>
                <el-col :span="16">
                    <el-select class="display-block" v-model="device" placeholder="请选择设备">
                        <el-option v-for="item in deviceList" :value="item.path"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <div class="padding-15 no-padding-bottom no-padding-top no-padding-right">
                        <el-button type="primary" class="display-block" @click="scanDevice" :loading="isScan">刷新</el-button>
                    </div>
                </el-col>
            </el-row>
            <div class="space-15"></div>
            <el-row>
                <el-button type="primary" class="display-block" @click="connectDevice" :disabled="this.device === ''">连接设备</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name : 'bluetooth',
    props: {},
    data() {
        return {
            deviceList : [],
            device     : '',
            isScan     : false,
            noConnect  : false,
            isUninstall: false,
        };
    },
    watch: {},

    mounted() {
    },

    destroyed() {
        this.unListener();
    },

    methods: {
        /**
         * 初始化
         */
        init: function () {
            if (!window.electronApi) {
                this.$message.error({
                    dangerouslyUseHTMLString: true,
                    message                 : '连接蓝牙设备请在客户端中打开',
                });
                this.$emit('onError');
                return;
            }

            let dataTimer    = null;
            this.noConnect   = true;
            this.isUninstall = false;
            this.unListener();
            window.electronApi.on('connectCom.callback', (event, res) => {
                // 连接失败
                if (!res.status) {
                    console.warn('连接失败: ' + (res.error || '未知错误'));
                    this.closeDevice();
                    this.$emit('onError');
                    this.noConnect = true;
                    return;
                }

                // 连接中断
                if (res.action === 'disconnect') {
                    console.warn('发生错误: 设备已中断连接');
                    this.closeDevice();
                    this.$emit('onError');
                    this.noConnect = true;
                    return;
                }

                // 已连接
                if (res.action === 'open') {
                    console.warn('设备已连接成功');
                    this.clear();
                    this.hideLoading();
                    this.$emit('onConnected');
                    this.noConnect = false;
                    this.openTimer = setTimeout(() => {
                        console.warn('发生错误: 连接后无数据');
                        this.closeDevice();
                    }, 5 * 1000);
                    return;
                }

                clearTimeout(this.openTimer);

                // 15秒之内无法收到数据则认为连接中断
                clearTimeout(this.dataTimer);
                this.dataTimer = setTimeout(() => {
                    console.warn('发生错误: 设备长时间无数据');
                    this.closeDevice();
                    this.$emit('onError');
                    this.noConnect = true;
                }, 10 * 1000);


                // 解析数据
                if (res.data) {
                    this.clear();
                    let data  = Buffer.from(res.data).toString('hex');
                    let match = data.match(/(aaaa2002.*?2323)/ig);
                    if (match && match.length > 0 && match[0].length === 100) {
                        let bigData = match[0];
                        if (this.hex2int(bigData.substring(8).substring(0, 2)) === 0) {
                            let parseData = [];
                            for (let i = 0; i < bigData.length; i += 2) {
                                parseData.push(this.hex2int(bigData.substring(i, i + 2)));
                            }

                            this.$emit('onReceive', bigData, parseData);
                            return;
                        }

                        this.$emit('onInstability');
                    } else {
                        this.$emit('onNoData');
                    }
                }
            });

            // 扫描设备
            this.scanDevice();
        },


        /**
         * 扫描蓝牙设备
         */
        scanDevice() {
            this.isScan = true;
            window.electronApi.once('getComList.callback', (event, res) => {
                this.isScan = false;

                if (!res.status) {
                    console.warn('设备查找失败: ' + (res.error || '未知错误'));
                    this.connectDevice();
                    return;
                }

                this.device     = '';
                this.deviceList = res.list;
                this.connectDevice();
            });
            window.electronApi.send('getComList');
        },

        /**
         * 连接设备
         */
        connectDevice() {
            this.hideLoading();
            this.showLoading('正在连接设备...');

            if (this.deviceList.length === 0) {
                console.warn('没有设备，刷新');
                this.scanTimer = setTimeout(() => {
                    this.scanDevice();
                }, 2000);
                return;
            }

            let info = this.deviceList.shift();
            console.warn('正在连接: ' + info.path);
            window.electronApi.send('connectCom', {
                name: info.path
            });
        },

        /**
         * 清理计时器
         */
        clear() {
            clearTimeout(this.reconnectTimer);
            clearTimeout(this.scanTimer);
        },

        /**
         * 关闭设备
         */
        closeDevice(noConnect) {
            if (!window.electronApi || this.isUninstall) {
                return;
            }

            window.electronApi.send('closeCom');
            this.clear();

            console.log('准备进入重连', noConnect);

            if (!noConnect) {
                this.reconnectTimer = setTimeout(() => {
                    this.connectDevice();
                }, 2000);
            } else {
                clearTimeout(this.dataTimer);
                this.isUninstall = true;
            }
        },

        /**
         * 显示loading
         */
        showLoading(message) {
            this.pending = this.$loading({
                lock      : true,
                text      : message || '正在连接设备...',
                background: 'rgba(0,0,0,.8)'
            });
        },

        /**
         * 隐藏loading
         */
        hideLoading() {
            if (this.pending) {
                this.pending.close();
                this.pending = null;
            }
        },

        /**
         * 显示对话框
         */
        show() {
            this.noConnect = true;
        },

        /**
         * 隐藏对话框
         */
        hide() {
            this.noConnect = false;
        },

        /**
         * 16进制转10进制数字
         * @param hex
         * @returns {any}
         */
        hex2int(hex) {
            let len = hex.length, a = new Array(len), code;
            for (let i = 0; i < len; i++) {
                code = hex.charCodeAt(i);
                if (48 <= code && code < 58) {
                    code -= 48;
                } else {
                    code = (code & 0xdf) - 65 + 10;
                }
                a[i] = code;
            }

            return a.reduce(function (acc, c) {
                acc = 16 * acc + c;
                return acc;
            }, 0);
        },

        /**
         * 卸载监听
         */
        unListener(noConnect) {
            if (!window.electronApi) {
                return;
            }

            this.closeDevice(noConnect);
            window.electronApi.removeAllListeners('connectCom.callback');
            window.electronApi.removeAllListeners('getComList.callback');
            console.log('监听卸载完成');
        },

        destroy() {
            console.log('销毁');
            this.hideLoading();
            this.unListener(true);
        }
    }
};
</script>

<style scoped lang="scss">

</style>