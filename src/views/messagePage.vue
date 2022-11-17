<template>
    <div class="content">
        <div class="content_top">
            <h3>消息列表</h3>
            <el-form class="search-bar" ref="form" :inline="true" :model="form" style="display: flex;">
                <el-form-item  prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left" style="color: #333333!important;">
                        返回
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content_center_wu" v-if="list.length==0">暂无数据</div>
        <div class="content_center" v-else>
            <div v-for="(item,index) in list" :key="index" class="content_center_box">
                <div class="content_center_box_left">
                    <img src="../assets/images/lingdang.png">
                </div>
                <div class="content_center_box_right">
                    <div>
                        <div>{{item.title}}</div>
                        <div>{{item.add_time}}</div>
                    </div>
                    <div>{{item.text}}</div>
                    <a :href="item.url" @click="handleExport(item)">
                        <img src="../assets/images/xiazai.png" >
                        {{item.btn}}
                    </a>
                </div>
            </div>
        </div>
        <div class="bottom_bottom">
            <div class="page_total_wrap">
                <div class="page_total">
                    <span class="total-count">共{{ searchData.total_count }}项</span>
                    <span class="total-tip">
                        当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项</span>
                </div>
                <div class="page_button" v-if="bottomButton.length > 0">
                    <el-button type="primary" round v-for="item in bottomButton" :key="item.text"
                               @click="$emit('bottomClick',item.method)">
                        {{ item.text }}
                    </el-button>
                </div>
            </div>
            <el-pagination :current-page.sync="form.page"
                           :pager-count="9"
                           :page-size="5"
                           :hide-on-single-page="true"
                           :total="searchData.total_count"
                           layout="prev, pager, next, jumper"
                           @current-change="handleCurrentChange" background>
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    name: "messagePage",
    data() {
        return {
            form: {
                keyword: '',
                page: 1,
                limit: 5,
            },
            bottomButton: [],
            searchData: [],
            list:[]
        };
    },
    computed: {},
    watch: {},
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.listInterface()
        this.getLastPage()
    },
    methods: {
        async handleExport(res) {
            await this.$axios.post('api/zip/zip_read', this.$qs.stringify(
                {
                    id:res.id
                }
            )).then(res => {
                //消息接口
                this.$store.dispatch('GetXiao')
            })
        },
        getLastPage() {
            if(sessionStorage.getItem('detail_')) {
                this.form.page = sessionStorage.getItem("currentPage_")
                this.handleCurrentChange(sessionStorage.getItem("currentPage_")-0||1)
                sessionStorage.removeItem("detail_")
            } else {
                this.form.page = 1
                this.handleCurrentChange(1)
            }
        },
        handleCurrentChange(val) {
            if (this.form.page) {
                this.form.page = val;
                setTimeout(() =>{
                    if(sessionStorage.getItem('detail_')) {
                    } else {
                        sessionStorage.setItem('currentPage_', val)
                    }
                },1000)
            }
            this.listInterface()
        },
        async listInterface() {
            await this.$axios.post('api/zip/zip_list', this.$qs.stringify(this.form)).then(res => {
                this.searchData = res.data.data;
                this.list = res.data.data.list
                this.list.map((item,index) => {
                    item.url = 'http://'+item.url
                })
            })
        },
        onSubmit() {
            this.listInterface()
        },
        // 返回上一页
        backPage() {
            this.$router.go(-1);
        },

    },
}
</script>

<style scoped lang="scss">
.content_center_wu {
    width: 977px;
    height: 600px;
    background: #F7F7F7;
    margin: 0 auto;
    line-height: 100px;
    text-align: center;
    color: #cccccc;
}
.content_center {
    width: 977px;
    height: 700px;
    margin: 0 auto;
    overflow: scroll;
}
.content_center_box {
    width: 977px;
    padding: 25px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px 0px rgba(222,222,222,0.5000);
    margin-bottom: 10px;
    display: flex;
}
.content_center_box_left img {
    width: 45px;
    height: 45px;
    margin-right: 15px;
}
.content_center_box_right {
    width: 878px;
}
.content_center_box_right >div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.content_center_box_right div:nth-child(1) div:nth-child(1){
    font-size: 20px;
    font-weight: 500;
    color: #333333;
}
.content_center_box_right div:nth-child(1) div:nth-child(2){
    font-size: 16px;
    font-weight: 400;
    color: #999999;
}
.content_center_box_right >div:nth-child(2){
    font-size: 16px;
    font-weight: 400;
    color: #CDCDCD;
    margin-top: 10px;
}
.content_center_box_right a{
    font-size: 16px;
    font-weight: 400;
    color: #39CBE9;
    float: right;
}
.content_center_box_right >div:nth-child(3) img {
    width: 18px;
    height: 16px;
    margin-right: 8px;
}
::v-deep .el-form-item {
    margin-bottom: 0;
}
.content_top {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 977px;
    margin: 0 auto;
}
.bottom_bottom {
    width: 977px;
    margin: 0 auto;
    padding: 30px 45px;
}


.bottom_bottom .page_total_wrap {
    //margin-bottom: 11px;
    display: flex;
    justify-content: space-between;
}
.bottom_bottom .total-count {
    background: #F2ECFC;
    color: #7A40F2;
    font-size: 14px;
    border-radius: 50px;
    text-align: center;
    margin-right: 15px;
    padding: 6px 14px;

}

.bottom_bottom .total-tip {
    font-size: 14px;
    color: #444444;
}

.bottom_bottom .el-pagination {
    display: flex;
    justify-content: center;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled) {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
    font-weight: 400;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #7A40F2;
}

::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #F2ECFC;
    border: 1px solid #7A40F2;
    color: #7A40F2 !important;
}

::v-deep .el-pagination.is-background .btn-prev {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
}
::v-deep .el-pagination.is-background .btn-next {
    border: 1px solid #CCCCCC;
    background-color: #fff;
    color: #333;
}
</style>
