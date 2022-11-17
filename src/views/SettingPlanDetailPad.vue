<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <el-form class="search-bar">
                <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
            </el-form>
        </div>
        <div class="content_body">
            <div class="top_edit">
                <p class="edit">修改PAD量表方案</p>
            </div>
            <div class="row">
                <el-form ref="form" :rules="rules" :model="form" label-width="90px" class="form_con">
                    <!--方案名称-->
                    <el-form-item label="方案名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入方案名称" class="item1"></el-input>
                    </el-form-item>
                    <!--方案内容-->
                    <el-form-item label="方案内容">
                        <el-transfer class="box-nowrap item2"
                                     style="text-align: left;"
                                     v-model="value"
                                     :filterable="true"
                                     :left-default-checked="[]"
                                     :right-default-checked="[49]"
                                     :titles="['全部内容', '已选择内容']"
                                     :button-texts="['', '']"
                                     :format="{
                                        noChecked: '${total}',
                                        hasChecked: '${checked}/${total}'
                                     }"
                                     @change="handleChange"
                                     :data="data"
                                     filter-placeholder="关键词搜索">
                        </el-transfer>
                    </el-form-item>
                </el-form>
            </div>
            <!--按钮-->
            <div class="margin-top-80 box-nowrap bottom_btn">
                <span style="position: absolute;right: 10%">
                    <el-button type="warning" round @click="$router.go(-1)">取消</el-button>
                    <el-button type="primary" round @click="onSubmit('form')">保存</el-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingPlanDetailPad",
    data() {
        return {
            num: 1,
            data: [],
            value: [],
            form: {
                name: '',
                ids: []
            },
            test_paper_ids: '',
            rules: {
                name: [
                    {required: true, message: '请填写方案名称', trigger: 'blur'}
                ],

            },
            rightChecked: [49, 66],
            submitUrl: 'api/pad/add2',
            id: 0,
            idData: [],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            // 难易级别
            value1: '',
            //滑块设置数值
            valueNum: 0,
            //前静息期
            valuePrev: '',
            //后静息期
            valueNext: '',
            type:''
        }
    },
    mounted() {
        this.onPaper()
        this.id = this.$route.query.id;
        this.type = this.$route.query.type;
        if (this.$route.query.id) {
            this.submitUrl = 'api/pad/edit2'
            this.onDetail();
        }
        console.log(this.$route)
        sessionStorage.setItem("detail", true);
    },
    methods: {
        handleChange(value, direction, movedKeys) {
            console.log(value);
        },
        backPage() {
            this.$router.go(-1);
        },
        async onPaper() {
            await this.$axios.post('api/pad/getPaper', this.$qs.stringify({test_paper_ids: ''})).then(res => {
                if (res.data.code === 1) {
                    let list = res.data.data.all
                    const data = [];
                    const idData = [];
                    list.map(item => {
                        data.push({
                            label: item.name,
                            key: item.id,
                        })
                        idData[item.id] = {'value': item.id, 'name': item.name}
                    })
                    this.idData = idData;
                    this.data = data;

                }

            })
        },
        async onDetail() {
            await this.$axios.post('api/pad/info', this.$qs.stringify({id: this.id})).then(res => {
                if (res.data.code === 1) {
                    this.form.id = this.id
                    let data = res.data.data;
                    this.value = data.test_paper_ids.split(',').map(id => {
                        return +id;
                    })
                    for (const key in this.form) {
                        this.form[key] = data[key];
                    }
                }
            })
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.ids = this.value.map(item => {
                        console.log(this.idData[item])
                        return this.idData[item]
                    })

                    console.log(this.form.ids)
                    this.$axios.post(this.submitUrl, this.$qs.stringify(this.form)).then(res => {
                        if (res.data.code === 1) {
                            this.backPage()
                        }
                    })
                } else {
                    return false;
                }
            });

        },
    },
}
</script>

<style scoped lang="scss">
.el-button.is-round {
    width: 150px;
    height: 50px;
}

.el-button + .el-button {
    margin-left: 50px;
}

.content_body .el-form {
    min-width: 400px;
}

::v-deep .el-transfer-panel {
    width: 50%;
    padding-bottom: 20px;
}
::v-deep .el-form-item__label {
    text-align: left;
}

::v-deep .row .el-form-item {
    font-weight: 600;
    color: #333333;
    font-size: 16px;

}

::v-deep .el-transfer-panel__body {
    //height:100%;
    height: 30vh;
}

::v-deep {
    [class^=el-icon-], [class*=" el-icon-"] {
        color: #7A40F2;
    }
    .el-button [class*=el-icon-] + span {
        color: #7A40F2;
    }
    .el-button--primary {
        background: #7A40F2;
        border-color: #7A40F2;
    }
    .el-button--warning {
        background: #39CBE9;
        border-color: #39CBE9;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #7A40F2;
        border-color: #7A40F2;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #7A40F2;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background: #7A40F2;
        border-color: #7A40F2;
    }
    .el-form-item__error {
        color: #7A40F2;
    }
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus {
        border-color: #7A40F2;
    }
    .el-form-item__label {
        text-align: left;
        vertical-align: middle;
        float: left;
        font-size: 16px;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: 600;
        font-weight: 600;
        color: #333;
    }

    .content_body {
        padding: 30px 50px 25px 50px;
        display: flex;
        height: 100vh;
        flex-direction: column;

        .top_edit {
            height: 60px;
            color: #333333;
            font-size: 18px;
            font-weight: 600;
            width: 100%;
            padding-bottom: 22px;
        }

        .row {
            flex: 1;
            border-top: 1px solid #E6E6E6;
            padding-top: 29px;

            .item1, .el-input {
                width: 498px;
            }

            .item2 .el-transfer-panel {
                width: 498px;
            }

            .el-transfer-panel .el-transfer-panel__header {
                background: #fff;
            }

            .el-transfer-panel__list.is-filterable {
                //height: 275px;
                height: 25vh;
                overflow: auto;
                margin-right: 5px;
            }

            .el-transfer-panel__filter {
                width: 468px;

                .el-input__inner {
                    border-radius: 2px;
                }
            }

            .el-transfer__buttons {
                display: inline-block;
                padding: 0 40px;
                .el-button--primary {
                    display: block;
                    width: 78px;
                    height: 40px;
                    background-image: url("../assets/images/left_arr.png");
                }

                .el-transfer__button:last-child {
                    margin-left: 0;
                    transform: rotate(180deg);
                }


            }

            .el-icon-arrow-left, .el-icon-arrow-right {
                display: none;
            }

            .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
                content: '';
            }

            .slider_con {
                width: 100%;
                display: flex;
                flex: 3;

                .slider_left {
                    margin-right: 35px;

                    .input_num, .el-input {
                        width: 155px;
                    }

                    .el-input__inner {
                        width: 155px;
                    }

                    .slider_el {
                        width: 256px;
                        float: left;
                        display: inline-block
                    }

                    .slider_p {
                        display: inline-block;
                        margin-left: 15px;
                    }

                    .el-slider__runway {
                        width: 256px;
                        height: 20px;
                        background: #FFE6E5;
                        border-radius: 25px;
                        border: 1px solid #7A40F2;
                    }

                    .el-slider__bar {
                        height: 20px;
                        background: linear-gradient(180deg, #7A40F2 0%, #7A40F2 100%);
                        border-radius: 25px;
                    }

                    .el-slider__button-wrapper {
                        top: -9px;
                    }

                    .el-slider__button-wrapper .el-slider__button {
                        width: 28px;
                        height: 28px;
                        background: linear-gradient(180deg, #7A40F2 0%, #7A40F2 100%);
                        border: 1px solid #7A40F2;
                    }

                    .el-slider__runway {
                        margin: 10px 0;
                    }

                    .el-icon-arrow-left, .el-icon-arrow-right {
                        display: none;
                    }
                }

                .slider_left:last-child {
                    margin-right: 30px;
                }

                .slider_right {
                    .input_num, .el-input {
                        width: 155px;
                    }

                    .el-input__inner {
                        width: 155px;
                    }
                }

                .slider_left .slider_p, .slider_right .slider_p {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                    line-height: 40px;
                    vertical-align: middle;
                }

                .select_prev .el-input--suffix {
                    width: 230px !important;
                }

                .select_min .el-input--suffix {
                    width: 100px !important;
                }

                .line {
                    //width: 14px;
                    height: 1px;
                    color: #CDCDCD;
                    margin: 0 6px;
                }
            }
        }

        .bottom_btn {
            height: 60px;
            position: relative;
            right: 0;

            .el-form-item__content {
                .el-button {
                    float: right;
                }

                .el-button:first-child {
                    margin-left: 25px;
                }
            }
        }
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar {
        display: block;
        width: 4px;
        height: 1px;
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #D8D8D8;;
    }

    //.el-transfer-panel__list.is-filterable::-webkit-scrollbar-track {
    //    /*滚动条里面轨道*/
    //    background: #F7F7F7;
    //    border-radius: 10px;
    //}
}
</style>
