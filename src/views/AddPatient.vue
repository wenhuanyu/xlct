<template>
    <div id="AddPatient" class="content">
        <div class="box">
            <el-form ref="form" :rules="rules" :model="formData" label-width="160px">
                <div class="form" v-show="pageIndex==1" style="display: flex ">
                    <div style="width: 50%">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="formData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="formData.gender">
                                <el-radio :label="0" name="0">男</el-radio>
                                <el-radio :label="1" name="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="户口类型" prop="hukou">
                            <el-radio-group v-model="formData.hukou">
                                <el-radio :label="1" name="1">农村户口</el-radio>
                                <el-radio :label="2" name="2">城市户口</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="出生日期" prop="birth">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="formData.birth"
                                            @change="birthday" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="formData.age" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="入院时间">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                            v-model="formData.in_time"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="病历号" prop="medical_num">
                            <el-input v-model="formData.medical_num"></el-input>
                        </el-form-item>
                        <el-form-item label="医保号" prop="medical_insurance_num">
                            <el-input v-model="formData.medical_insurance_num"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone">
                            <el-input
                                v-model="formData.phone"
                                @input="
                                    formData.phone=formData.phone.replace(
                                        /[^\d]/g,
                                        ''
                                    )"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="idcard">
                            <el-input
                                v-model="formData.idcard"
                                @input="
                                    formData.idcard=formData.idcard.replace(
                                        /[^\X0-9]/g,
                                        ''
                                    )"
                            ></el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 50%">
                        <el-form-item label="民族"  prop="nation_id">
                            <el-select v-model="formData.nation_id" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in nationalList" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="患者来源" prop="source">
                            <div style="display: flex;width: 100%;">
                                <el-select v-model="department_name" placeholder="请选择" @change="getRole($event)">
                                    <el-option v-for="item in stateArr" :key="item.id" :label="item.name"
                                               :value="item.name"></el-option>
                                </el-select>
                                <el-select :disabled="disabled" v-model="formData.source" placeholder="请选择" style="margin-left: 10px">
                                    <el-option v-for="(item,index) in select2" :key="item.id" :label="item.name"
                                               :value="item.name"></el-option>
                                </el-select>
                            </div>
                        </el-form-item>

                        <el-form-item label="婚姻状态" prop="marriage_id">
                            <el-select v-model="formData.marriage_id" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in maritalStatusArr" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="学历信息" prop="education_id">
                            <el-select v-model="formData.education_id" placeholder="请选择" style="width: 100%;">
                                <el-option v-for="item in educationInformationArr" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业信息" prop="occupation_id">
                            <el-select v-model="formData.occupation_id" placeholder="请选择" style="width: 100%;"
                                       >
                                <el-option v-for="item in careerInformationArr" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
                <div class="form" v-show="pageIndex==2">
                    <p class="tip"><i class="el-icon-warning"></i>以下为出具综合报告必填项请认真填写</p>
                    <div class="form-box">
                        <el-form label-width="160px">
                            <el-form-item label="出生地">
                                <el-input v-model="formData.birthplace"></el-input>
                            </el-form-item>
                            <el-form-item label="现居住地">
                                <el-input v-model="formData.residence"></el-input>
                            </el-form-item>
                            <el-form-item label="病史">
                                <template v-for="(item,key) in formData.medical_history">
                                    <div style="position: relative;">
                                        <el-input class="add-input" v-model="formData.medical_history[key]"></el-input>
                                        <div class="add-btn" v-if="key== 0" @click="addItem('medical_history')">+</div>
                                        <div class="add-btn" v-else @click="reduceItem('medical_history',key)">-</div>
                                    </div>

                                </template>
                            </el-form-item>
                        </el-form>
                        <el-form>
                            <el-form-item label-width="270px" label="精神病史及药物滥用史">
                                <template v-for="(item,key) in formData.drug_history">
                                    <div style="position: relative;">
                                        <el-input class="add-input" v-model="formData.drug_history[key]"></el-input>
                                        <div class="add-btn" v-if="key== 0" @click="addItem('drug_history')">+
                                        </div>
                                        <div class="add-btn" v-else @click="reduceItem('drug_history',key)">-</div>
                                    </div>
                                </template>
                            </el-form-item>
                            <el-form-item label-width="270px" label="目前服用药物">
                                <template v-for="(item,key) in formData.take_medicine">
                                    <div style="position: relative;">
                                        <el-input class="add-input" v-model="formData.take_medicine[key]"></el-input>
                                        <div class="add-btn" v-if="key== 0" @click="addItem('take_medicine')">+
                                        </div>
                                        <div class="add-btn" v-else @click="reduceItem('take_medicine',key)">-</div>
                                    </div>
                                </template>
                            </el-form-item>
                            <el-form-item label-width="270px" label="社会心理学/教育史/执业史">
                                <template v-for="(item,key) in formData.edu_history">
                                    <div style="position: relative;">
                                        <el-input class="add-input" v-model="formData.edu_history[key]"></el-input>
                                        <div class="add-btn" v-if="key== 0" @click="addItem('edu_history')">+
                                        </div>
                                        <div class="add-btn" v-else @click="reduceItem('edu_history',key)">-</div>
                                    </div>
                                </template>
                            </el-form-item>
                            <el-form-item label-width="270px" label="目前居住环境及每日行动轨迹">
                                <el-input class="add-input" v-model="formData.live_environment"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>
            </el-form>
            <div class="margin-top box-nowrap footer">
                <el-button round class="cancel" @click="$router.go(-1)">取消</el-button>
                <el-button type="primary" round @click="pageChange('prev')" v-if="page_One" style="background-color: #7A40F2;border-color:#7A40F2 ">上一页</el-button>
                <el-button type="primary" round @click="pageChange('next')" v-if="page_two" style="background-color: #7A40F2;border-color:#7A40F2 ">下一页</el-button>
                <el-button round class="save" @click="submit">{{ $route.query.id ? '保存' : '添加' }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddPatient",
    data() {
        return {
            readonly: true,
            stateArr: [],
            maritalStatusArr: [],
            educationInformationArr: [],
            careerInformationArr: [],
            pageIndex: 1,
            formData: {
                age: '',
                in_time: '',
                medical_history: [''],
                drug_history: [''],
                take_medicine: [''],
                edu_history: [''],
                marriage_id: '',
                education_id: '',
                occupation_id: '',
                source:'',
                nation_id:'',
                idcard:'',
            },
            department_name:'',
            backup: {},
            zhixiSelect: [],
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }],
                gender: [{
                    required: true,
                    message: '请选择性别'
                }],
                // nation_id: [{
                //     required: true,
                //     message: '请选择民族'
                // }],
                hukou:[
                    {required:true,message:'请选择户口类型'}
                ],
                medical_num: [{
                    required: true,
                    message: '请输入病历号'
                }],
                medical_insurance_num: [{
                    required: true,
                    message: '请输入医保号'
                }],
                birth: [{
                    required: true,
                    message: '请选择出生日期'
                }],
                phone: [{
                    pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                    message: "请输入正确的手机号码",
                    trigger: "blur"
                }],
                idcard: [{
                    // required: true,
                    pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    message: '请输入正确的身份证号'
                }],
                source: [{
                    required: true,
                    message: '请输入患者来源'
                }],
                // marriage_id: [{
                //     required: true,
                //     message: '请输入婚姻状态'
                // }],
                education_id: [{
                    required: true,
                    message: '请输入学历信息'
                }],
                // occupation_id: [{
                //     required: true,
                //     message: '请输入职业信息'
                // }],
            },
            wardList: [],
            page_two: true,
            page_One: false,
            select2:[],
            disabled:true,
            nationalList:[],
        };
    },
    computed: {},
    watch: {},
    async mounted() {
        await this.getWard();
        if (this.$route.query.id) {
            this.getInfo()
        }
        sessionStorage.setItem("detail", true);
    },
    methods: {
        //患者来源选择
        getRole (prov) {
            this.select2= []
            for (var val of this.stateArr) {
                if (prov===val.name) {
                    this.select2 = val.child
                }
            }
            this.disabled = false;
            this.formData.source = ''
        },
        //添加输入框 +
        addItem(name) {
            this.formData[name].push('')
        },
        //删除输入框 -
        reduceItem(name, key) {
            this.formData[name].splice(key, 1)
        },
        //上一页 下一页
        pageChange(type) {
            if (type === 'prev') {
                this.pageIndex--;
                this.pageIndex = this.pageIndex <= 1 ? 1 : this.pageIndex;
            } else {
                this.pageIndex++;
                this.pageIndex = this.pageIndex >= 2 ? 2 : this.pageIndex;
            }

            if (this.pageIndex === 1) {
                this.page_two = true
                this.page_One = false
            } else {
                this.page_two = false
                this.page_One = true
            }
        },
        submit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    let formData = {
                        ...this.formData
                    };
                    if (!this.$route.query.id) {
                        //添加
                        console.log(formData)
                        this.$axios.post('api/patient/add', this.$qs.stringify(formData)).then(res => {
                            if (res.data.code === 1) {
                                this.$router.go(-1)
                            }
                        })
                    } else {
                        //编辑
                        console.log(this.formData)
                        let form = {
                            id: formData.id,
                            name: formData.name
                        };
                        for (let backupKey in this.backup) {
                            if (typeof this.backup[backupKey] == 'object') {
                                form[backupKey] = this.formData[backupKey];
                            } else if (this.backup[backupKey] !== this.formData[backupKey]) {
                                form[backupKey] = this.formData[backupKey];
                            }
                        }
                        this.$axios.post('api/patient/edit', this.$qs.stringify(form)).then(res => {
                            console.log('form', form)
                            if (res.data.code === 1) {
                                this.$router.go(-1)
                            }
                        })
                    }
                }
            });
        },
        getInfo() {
            this.$axios.post('api/patient/info', {
                id: this.$route.query.id
            }).then(res => {
                var data = res.data.data
                // var list = {'medical_history':'','drug_history':'','take_medicine':'','edu_history':''};
                // for (const key in data) {
                // if(key in list ){
                //         data[key] = ['']
                // }
                // }
                this.formData = data
                this.department_name = data.department_name
                this.disabled = false
                for (var val of this.stateArr) {
                    if (this.department_name===val.name) {
                        this.select2 = val.child
                    }
                }
                if(this.formData.marriage_id == 0) {
                    this.formData.marriage_id = ''
                }
                if(this.formData.education_id == 0) {
                    this.formData.education_id = ''
                }
                if(this.formData.occupation_id == 0) {
                    this.formData.occupation_id = ''
                }
                if(this.formData.nation_id == 0) {
                    this.formData.nation_id = ''
                }
                this.backup = {
                    ...data
                };
            })
        },
        //接口 数据婚姻 学历信息  职业  患者来源等
        async getWard() {
            await this.$axios.post('api/district/nation').then(res => {
                this.nationalList = res.data.data;

            })
            await this.$axios.post('api/district/index', {type: 1}).then(res => {
                this.stateArr = res.data.data;

            })
            await this.$axios.post('api/common/marriage').then(res => {
                this.maritalStatusArr = res.data.data;
            })
            await this.$axios.post('api/common/education').then(res => {
                this.educationInformationArr = res.data.data;
            })
            await this.$axios.post('api/common/occupation').then(res => {
                this.careerInformationArr = res.data.data;
            })
        },
        birthday(e) {
            this.formData.age = this.getAge(e.split('-'))[0];
            if (this.formData.age < 0) {
                this.formData.age = 0
            }
        },
        getAge(birthday) {
            // 新建日期对象
            let date = new Date()
            // 今天日期，数组，同 birthday
            let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
            // 分别计算年月日差值
            let age = today.map((value, index) => {
                return value - birthday[index]
            })
            // 当天数为负数时，月减 1，天数加上月总天数
            if (age[2] < 0) {
                // 简单获取上个月总天数的方法，不会错
                let lastMonth = new Date(today[0], today[1], 0)
                age[1]--
                age[2] += lastMonth.getDate()
            }
            // 当月数为负数时，年减 1，月数加上 12
            if (age[1] < 0) {
                age[0   ]--
                age[1] += 12
            }
            return age
        }
    },
}
</script>

<style scoped lang="scss">
.tip {
    padding-left: 100px;
    line-height: 48px;
    color: #7A40F2;
    background: #FFF3F3;
    margin-bottom: 20px;
}

.footer {
    display: flex;
    justify-content: flex-end;
}

.content {
    padding: 0 35px;
    background-color: #FFF;
}


.form {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*justify-content: space-between;*/
    width: 100%;
}

.form-box {
    justify-content: space-between;
    display: flex;

    ::v-deep .el-form {
        width: 40%;
    }

}

::v-deep .el-form-item {
    /*width: 40%;*/
}

.cancel {
    height: 50px;
    width: 150px;
    text-align: center;
    border-radius: 50px;
    color: #FFF;
    font-size: 20px;
    background: #39CBE9;
    box-shadow: 4px 7px 10px 0px rgba(245, 96, 90, 20%);
}

.save {
    height: 50px;
    width: 150px;
    text-align: center;
    border-radius: 50px;
    color: #FFF;
    font-size: 20px;
    background: #7A40F2;
    box-shadow: 4px 7px 10px 0px rgba(243, 147, 53, 20%);
}

::v-deep .el-select .el-input__inner:focus {
    border-color: #7A40F2;
}

::v-deep .el-select .el-input.is-focus .el-input__inner {
    border-color: #7A40F2;
}

::v-deep .el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus {
    border-color: #7A40F2;
}

::v-deep .el-form-item__error {
    color: #7A40F2;
}

::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #7A40F2;
}

::v-deep .el-radio__input.is-checked .el-radio__inner {
    background: #7A40F2;
    border-color: #7A40F2;
}

::v-deep .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap>.el-form-item__label:before {
    color: #7A40F2;
}

::v-deep .el-date-table td.current:not(.disabled) span {
    background: #7A40F2;
}

::v-deep .el-form-item__label {
    font-size: 18px;
}

::v-deep .el-radio__label {
    font-size: 18px;
}

.box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 40px;
}

::v-deep .el-form-item__content {
    width: 30%;
    min-width: 300px;
}

::v-deep .el-form--inline {
    display: flex;
    justify-content: space-between;

}

::v-deep .el-form--inline .el-form-item {
    width: 50%;
}

::v-deep .el-form--inline .el-input__inner {
    width: 300px;
}

::v-deep .add-input .el-input__inner {
    width: 230px;
    display: inline-block;
}

.add-input {
    margin-bottom: 10px;
}

::v-deep .el-form-item {
    position: relative;
}

.add-btn {
    width: 40px;
    height: 40px;
    background: #F2F2F2;
    border-radius: 2px;
    border: 1px solid #D2D2D2;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
}

.drop-down {}
</style>
