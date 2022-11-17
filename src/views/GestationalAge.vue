<template>
    <div>
        <div class="button-wrap">
            <el-button type="primary" v-print="'#print'" icon="el-icon-printer">打印</el-button>
            <el-button type="warning" icon="el-icon-arrow-left" @click="$router.go(-1)">返回上一页</el-button>
        </div>
        <div class="gestationalAge-content">
            <div class="gestationalAge-content_con" ref="print" id="print">
                <div class="table-name">
                    <p>孕周报告</p>
                </div>
                <div class="table_content">
                    <div class="table_content_header">
                        <p>孕周</p>
                        <p>{{weekInfo_list.title}}</p>
                    </div>
                    <div class="table_content_text" v-html="weekInfo_list.content">
<!--                        <div class="table_content_text-name">-->
<!--                            <p>辅导方案</p>-->
<!--                        </div>-->
<!--                        <p class="table_content_text-con"><span></span>让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次。让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次</p>-->
<!--                        <p class="table_content_text-con"><span></span>让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次。让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次</p>-->
<!--                        <p class="table_content_text-con"><span></span>让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次。让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次</p>-->
                    </div>
<!--                    <div class="table_content_footer">-->
<!--                        <div class="table_content_text-name">-->
<!--                            <p>注意事项</p>-->
<!--                        </div>-->
<!--                        <p class="table_content_text-con" style="padding-left: 0;" v-html="weekInfo_list.content"></p>-->
<!--                        <p class="table_content_text-con" style="padding-left: 0;">让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次。让宝宝仰面躺着，家长拿着彩球或其他彩色物品，先从正上面给宝宝看，待宝宝视线注意时，慢慢向左下方移动观察宝宝视觉注视情况 然后反向移动彩球重复上述操作，每天练习4-5次</p>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GestationalAge",
    data() {
        return {
            dialogReport      : false,
            weekInfo_list:'',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.onWeekInfo()
    },
    methods: {
        onWeekInfo(){
            this.$axios.post('api/common/week_info', {id : this.$route.query.id}).then(res => {
                if (res.data.code === 1) {
                    this.weekInfo_list = res.data.data
                }
            })
        }
    },
}
</script>
<style>

</style>

<style scoped lang="scss">

.button-wrap {
    display: flex;
    justify-content: flex-end;
}

.gestationalAge-content {
    margin-top: 15px;
    background-color: #fff;
    border-radius: 5px;
    //height: calc(100vh - 205px);
    height: 79vh;
    overflow: scroll;
}

.gestationalAge-content_con {
    width: 977px;
    margin: 0 auto;
    background: #FFFFFF;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 59px 0 44px 0;
    font-size: 16px;
    color: #333333;
}

.table-name p {
    font-size: 24px;
    font-weight: bold;
}

.edit-btn.active {
    display: block;
}

.edit-btn {
    color: #ff6b6b;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none;
    }
}
.edit-btn img{
    margin-right: 5px;
}

.table_content {
    border: 1px solid #E6E6E6;
}

.table_content_header {
    height: 54px;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    align-items: center;
}

.table_content_header p {
    margin-left: 30px;
    font-size: 16px;
    color: #333333;
}

.table_content_text {
    padding: 25px;
    //border-bottom: 1px solid #E6E6E6;
    //display: flex;
    //flex-direction: column;
    //align-items: center;
}
.table_content_text-name{
    text-align: center;
}
.table_content_text-name p{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}
.table_content_text-con{
    position: relative;
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    padding-left: 20px;
    margin-top: 20px;
}
.table_content_text-con span{
    position: absolute;
    top: 7px;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #F5605A;
}
.table_content_footer{
    padding: 25px;
}
</style>
