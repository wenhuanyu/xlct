<template>
    <div class="content_body">
        <div class="assess-left-wrap">
            <div class="assess-left">
                <div class="title">系统说明</div>
                <el-tree
                        :data="list"
                        :props="defaultProps"
                        accordion
                        node-key="id"
                        :current-node-key="10"

                        :default-expanded-keys="defaultValue"
                        :default-checked-keys="[10]"
                        @node-click="handleNodeClick">
                </el-tree>

            </div>
            <div class="assess-right">
                <div v-for="item in contentList" :key="item.title">
                    <div class="title">{{item.title}}</div>
                    <div class="text" v-html="item.content"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name     : "SettingExplain",
        data() {
            return {
                url          : 'api/patient/index',
                activeId     : '',
                list         : [],
                defaultProps : {
                    children : 'sub_list',
                    label    : 'name'
                },
                defaultValue : [],
                currentKey : '',
                contentList: ''
            };
        },
        computed : {},
        watch: {

        },
        mounted() {
            this.getCate()
        },
        methods  : {
            setTerminal(e) {
                console.log(e)
                this.terminalShow = true;
            },
            async getCate() {
                await this.$axios.post('api/help/cate_lst').then(res => {
                    if (res.data.code === 1) {
                        this.list = res.data.data
                    }
                    this.defaultValue = [this.list[0].id]
                    this.currentKey = this.list[0]['sub_list'][0].id
                    this.changeExplain()

                })
            },
            handleNodeClick(data) {
                if('pid' in data){
                    this.currentKey = data['sub_list'][0].id
                }else{
                    this.currentKey = data.id;
                }
                this.changeExplain()
            },
            async changeExplain() {
                await this.$axios.post('api/help/content', this.$qs.stringify({cate_id:this.currentKey})).then(res => {
                    if (res.data.code === 1) {
                        this.contentList = res.data.data
                        console.log(res, this.contentList )
                    }
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .assess-left {
        margin-right: 50px;
    }

    .assess-left .title {
        height: 65px;
        line-height: 65px;
        border-bottom: 1px solid #E9E9E9;
        font-size: 16px;
        color: #333;
        font-weight: bold;
        padding-left: 25px;
    }

    .assess-right {
        overflow-y: scroll;
        max-height: 95%;
        flex: 1;
        color: #252525;
        margin-top: 45px;
    }

    ::v-deep .el-tree {
        width: 70%;
        margin: 0 auto;
    }

    ::v-deep .el-tree,
    ::v-deep .el-tree-node__content {
        cursor: pointer;
        font-size: 16px;
        color: #333;
        height: 55px;
        background-color: inherit;

    }

    ::v-deep .el-tree > .el-tree-node:focus > .el-tree-node__content {
        background-color: inherit;
        color: #333;
    }

    ::v-deep .el-tree-node:focus > .el-tree-node__content {
        color: #39CBE9;
        background-color: inherit;
    }
   .assess-right .title{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .text{
        font-size: 16px;
        line-height: 1.8;
    }
</style>
