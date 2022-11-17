<template>
    <div class="content" v-if="isFinished">
        <div v-if="xianshi1">
            <div class="content_top">
                <div></div>
                <div>
                    <el-button type="primary" @click="printPreview" icon="el-icon-reading" style="background-color: #7A40F2; border-color: #7A40F2;">
                        打印预览
                    </el-button>
                    <el-button type="primary" v-print="printObj" icon="el-icon-printer" style="background-color: #7A40F2; border-color: #7A40F2;">
                        打印
                    </el-button>
                    <el-button type="warning" @click="dialogPrint = true" icon="el-icon-s-tools" style="background-color: #39CBE9; border-color: #39CBE9;">
                        打印设置
                    </el-button>
                    <el-button class="pink" style="color: #333333!important;" plain @click="$router.go(-1)" icon="el-icon-arrow-left">
                        返回主页面
                    </el-button>
                </div>
            </div>
            <div class="content_body" ref="contentBody">
                <div class="print-html" ref="print" id="print">
                    <div class="title">
                        <img :src="infoData.hospital_info && infoData.hospital_info.logo">
                        <div>
                            <p>{{ infoData.hospital_info && infoData.hospital_info.hospital_name }}</p>
                            <span>{{ infoData.hospital_info && infoData.hospital_info.second_name }}</span>
                        </div>
                    </div>
                    <div class="table-name">
                        <p style="font-size: 28px;">{{ infoData.test_paper_name }}</p>
                        <span class="edit-btn print-none  print-none_" @click="xiu" style="display: block">修改报告</span>
                    </div>
                    <div class="print-body">
                        <div class="first ">
                            <div class="first-group">
                                <div class="row">
                                    <span>姓名</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.name }}</p>
                                </div>
                                <div class="row">
                                    <span>病历号</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.medical_num }}</p>
                                </div>
                                <div class="row">
                                    <span>入院时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.in_time }}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>性别</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.gender == 1 ? '女' : '男' }}</p>
                                </div>
                                <div class="row">
                                    <span>医保号</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.medical_insurance_num }}</p>
                                </div>
                                <div class="row">
                                    <span>测评时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.exam_time }}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>年龄</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.age }}</p>
                                </div>
                                <div class="row">
                                    <span>患者来源</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.source }}</p>
                                </div>
                                <div class="row">
                                    <span>完成时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.complete_time }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="print-row" v-if="infoData.calc_name === 'MMPICT'? '' : printShow" >
                            <div class="title"></div>
                            <div class="charts-wrap" ref="chart" :class="printData[0].value ? '' : 'print-none'"></div>
                            <div class="charts-16pf" ref="pf16" v-if="infoData && infoData.calc_name === '16PF'">
                                <table>
                                    <thead>
                                    <th>人格因素</th>
                                    <th>标准分</th>
                                    <th>低分特征</th>
                                    <th width="400"></th>
                                    <th>高分特征</th>
                                    </thead>
                                    <tfoot>
                                    <tr>
                                        <td colspan="3"></td>
                                        <td class="no-padding">
                                            <div class="flex">
                                                <div class="flex-grow1 width-0"><i></i><span>0</span></div>
                                                <div class="flex-grow1 width-0"><i></i></div>
                                                <div class="flex-grow1 width-0"><i></i><span>2</span></div>
                                                <div class="flex-grow1 width-0"><i></i></div>
                                                <div class="flex-grow1 width-0"><i></i><span>4</span></div>
                                                <div class="flex-grow1 width-0"><i></i><span>标准</span></div>
                                                <div class="flex-grow1 width-0"><i></i><span>6</span></div>
                                                <div class="flex-grow1 width-0"><i></i></div>
                                                <div class="flex-grow1 width-0"><i></i><span>8</span></div>
                                                <div class="flex-grow1 width-0"><i></i></div>
                                                <div class="flex-grow1 width-0"><i></i><span>10</span></div>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>

                                    </tfoot>
                                    <tbody>
                                    <tr v-for="(socre, index) in infoData.extend.socre">
                                        <td align="center">{{ infoData.extend.title[index] }}</td>
                                        <td align="center" style="color: #7A40F2"><strong>{{ socre }}</strong></td>
                                        <td>{{ infoData.extend.low[index] }}</td>
                                        <td class="no-padding">
                                            <div class="flex">
                                                <div class="flex-grow1 width-0" :class="socre === 0 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 1 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 2 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 3 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 4 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0 line" :class="socre === 5 ? 'active': ''">
                                                    <i></i></div>
                                                <div class="flex-grow1 width-0" :class="socre === 6 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 7 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 8 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 9 ? 'active': ''"><i></i>
                                                </div>
                                                <div class="flex-grow1 width-0" :class="socre === 10 ? 'active': ''"><i></i>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ infoData.extend.high[index] }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!--111-->
                        <template v-if="infoData.calc_name !== 'MMPICT'">
                            <div class="print-row" :class="printData[2].value ? '' : 'print-none'"
                                 v-if="infoData.calc_name === 'SCL90'">
                                <div class="title">SCL-90因子原始分和T分</div>
                                <el-table header-row-class-name="scl90-table-header" stripe :data="infoData.extend.table1">
                                    <el-table-column prop="name" label="因子类别"></el-table-column>
                                    <el-table-column prop="origin_score" label="原始分" align="center"
                                                     width="150"></el-table-column>
                                    <el-table-column prop="avg_score" label="均分" align="center"
                                                     width="150"></el-table-column>
                                    <el-table-column prop="refer_to" label="参考诊断" align="center"
                                                     width="150"></el-table-column>
                                    <el-table-column prop="diff" label="正常范围值" align="center" width="150"></el-table-column>
                                </el-table>
                                <el-table header-row-class-name="scl90-table-header" stripe :data="infoData.extend.table2">
                                    <el-table-column prop="name" label="量表总分" align="left"></el-table-column>
                                    <el-table-column prop="origin_score" label="原始分" align="center"
                                                     width="150"></el-table-column>
                                    <el-table-column prop="avg_score" label="均分" align="center"
                                                     width="150"></el-table-column>
                                    <el-table-column prop="diff" label="正常范围值" align="center" width="150"></el-table-column>
                                </el-table>
                            </div>

                            <div class="print-row" :class="printData[2].value ? '' : 'print-none'" v-else>
                                <div class="title">检测结果</div>
                                <div style="margin: 20px 0" v-if="Leisure" class="jiance">
                                    <p style="margin-top: 5px;" v-if="infoData.calc_name !== 'UKU' && infoData.calc_name !=='TESS' && infoData.calc_name !=='FAQ' ">答案详情 :</p>
                                    <p style="margin-top: 5px;" v-if="infoData.calc_name == 'FAQ'">不适用答案详情 :</p>
                                    <p v-for="item in infoData.answer_detail" :key="index">
                                        <span>{{ item.question_title }}</span>
<!--                                        <span style="display: inline-block;width: 50px"></span>-->
                                        <span>{{ item.answer_title }}</span>
                                         <span @dblclick="current=item;dialogText=item.desc;dialogIpt = true;">{{
                                            item.desc
                                            }}</span>
                                    </p>
                                </div>
                                <p style="margin-top: 5px;" v-if="infoData.yinzi_lst[0].other">答案详情 :</p>
                                <div class="check-result " v-for="item in infoData.yinzi_lst" :key="item.name">
                                    <div>
                                        <div style="width: 100%;">{{ item.name }}</div>
                                        <div style="width: 100%;" v-if="item.other">{{item.other}}</div>
                                    </div>
                                    <div >{{ item.title + item.score }}</div>
                                    <div @dblclick="current=item;dialogText=item.desc;dialogIpt = true;">{{
                                            item.desc
                                        }}</div>
                                </div>
                                <div class="flex check_jiance" v-if="infoData.extend.relation">
                                    <span style="font-size: 22px;width: 155px; text-align: right;">与药物的关系：</span>
                                    <div v-for="item in infoData.extend.relation">
                                        <el-checkbox>{{item}}</el-checkbox>
                                    </div>
                                </div>
                                <div class="flex check_jiance" v-if="infoData.extend.method">
                                    <span style="font-size: 22px;width: 155px;text-align: right;">处理措施：</span>
                                    <div>
                                        <div v-for="item in infoData.extend.method" style="margin-bottom: 10px;">
                                            <el-checkbox>{{item}}</el-checkbox>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="print-row" :class="printData[2].value ? '' : 'print-none'"
                                 v-if="infoData.calc_name === 'SCL90'">
                                <div class="title">分析结果</div>
                                <div class="report-text-content">
                                    <div v-for="item in infoData.extend.analysis" v-html="item"></div>
                                </div>
                            </div>

                            <div class="print-row" :class="printData[3].value ? '' : 'print-none'" v-if="infoData.resting_period == 1">
                                <div class="table-name">
                                    <p>生理指标</p>
                                </div>
                                <div class="physical-signs-wrap">
                                    <div class="physical-signs" v-for="item in physiologyList">
                                        <div style="width: 30%"><span style="width: 150px;">{{ item.name }}</span> {{ item.score }}</div>
                                        <div style="width: 40%; color: #666666;font-size: 16px;margin-right: 5px;">{{item.desc}}</div>
                                        <div style="width: 30%"><span>{{ item.title }}</span> {{ item.title_value }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="print-row" :class="printData[5].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>提示或建议</p>
                                    <span class="edit-btn" v-if="showEdit"
                                          @click="getProposal({title:'提示建议',type:2,field:'suggestion'})"><i
                                        class="el-icon-edit"></i> 点击此处修改</span>
                                </div>
                                <!-- <textarea ref="test_four"  style="height: 0;" class="report-text-content"  v-html="suggestion"></textarea> -->
                                <!--                        <div v-html="infoData.suggestion" class="report-text-content"></div>-->
																<div v-html="suggestion" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-row" :class="printData[4].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>量表说明</p>
                                    <span class="edit-btn" v-if="showEdit"
                                          @click="getProposal({title:'量表说明',type:1,field:'test_paper_explain'})"><i
                                        class="el-icon-edit"></i>点击此处修改</span>
                                </div>
                                <!-- <textarea ref="test_five" style="height: 0;" class="report-text-content"  v-html="test_paper_explain"></textarea> -->
                                <!-- <div v-html="infoData.test_paper_explain" class="report-text-content"></div> -->
                                <div v-html="test_paper_explain" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-row" :class="printData[6].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>医生建议</p>
                                    <span class="edit-btn" v-if="showEdit"
                                          @click="getProposal({title:'医生建议',type:5,field:'doctor_proposal'})"><i
                                        class="el-icon-edit"></i>点击此处修改</span>
                                </div>
																<!-- <textarea ref="test_one"  class="report-text-content"  v-html="doctor_proposal" style="height: 0"></textarea> -->
                                <!--                        <div v-html="infoData.doctor_proposal" class="report-text-content"></div>-->
																<div v-html="doctor_proposal" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-last-row">
                                <div class="group">
                                    <span>操作员：</span>
                                    <p>{{ infoData.user_img === "" ? infoData.user : '' }}</p>
                                    <p><img style="height: 55px" :src="infoData.user_img"></p>
                                </div>
                                <div class="group">
                                    <span>检测时间：</span>
                                    <p></p>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="infoData.calc_name === 'MMPICT'">
                            <div style="display:flex; align-items: center;justify-content: space-around;margin-top: 20px;padding-bottom: 20px;border-bottom: 1px solid #e6e6e6">
                                <div style="text-align: center;font-size: 18px;font-weight:bold;color: #333333">
                                    <p>***本测验适于对小学以上文化程度的人群做心理健康、心***</p>
                                    <p>***身疾病、职业、教育、婚姻、和司法等领域的心理测试***</p>
                                    <p>***系统的计分、解释和分类都是根据中国常模标准和系列***</p>
                                    <p>***研究成果进行。使用都必须是专业的心理学、精神病学***</p>
                                    <p>***或医学工作者。报告首页经解释后可以交给被试本人。***</p>
                                    <p>***本报告仅是对被试心理状态的一种假设，不应该仅仅据***</p>
                                    <p>***此做出任何决定，应与被试的其它信息进行综合分析。***</p>
                                    <p>***本报告不对任何决定负责！应为被试的报告内容保密！***</p>
                                    <p>***全部心理检查报告***</p>
                                </div>
                            </div>
                            <div class="print-row" :class="printData_[2].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>检查总体印象</p>
                                </div>
                                <div class="physical-signs-wrap" v-for="(item,index) in impressionList">
                                    <div class="physical-signs_item">{{index+1}}、{{item}}</div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[3].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI 基 本 量 表 分</p>
                                </div>
                                <div style="border: 1px dashed #c4c4c4;"></div>

                                <div class="scale">
                                    <el-table :key="timeStamp"
                                              style="width: 100%"
                                              :data="mmptData"
                                              header-cell-class-name="head-row">
                                        <el-table-column prop="col1">
                                            <template slot="header">
                                                <div type="ho" style="margin-left: 48px;
                                            padding-bottom: .2em;
                                            color: black" class="head-cell">
                                                    分 <span style="width: 2em"></span> 数
                                                </div>
                                            </template>
                                            <template slot-scope="scope">
                                                <div class="table-left">
                                                    <div v-for="text in scope.row.col1.split(' ')">
                                                        <div v-if="text !== '中国常模不做K校正的T分'">{{ text }}</div>
                                                        <div v-else class="overline">中国常模不做K校正的T分</div>
                                                    </div>
                                                </div>
                                            </template>
                                        </el-table-column>

                                        <el-table-column width="55px">
                                            <template slot="header">
                                                <div style="width: 100%;
                                            color: #333;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: space-between;
                                            padding-bottom: 1.8em;
                                            height: 100%">
                                                    <div>量</div>
                                                    <div>表</div>
                                                </div>
                                            </template>

                                        </el-table-column>

                                        <el-table-column width="55px" v-for="(item,index) in thead"
                                                         align="center"
                                                         :key="'col'+index"
                                                         :prop="item.t2">
                                            <template slot="header">
                                                <div type="ver">
                                                    <div class="tone">
                                                        <div v-for="t1 in item.t1.split(' ')">{{ t1 }}</div>
                                                    </div>
                                                    <div class="ttwo">{{ item.t2 }}</div>
                                                </div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                                <div class="table-count">
                                    <div>矛盾题: {{ this.infoData.detail.base.contraction }} 对</div>
                                    <div>答'是'的比例: {{ this.infoData.detail.base.true_percent }}</div>
                                    <div>答'否'的比例: {{ this.infoData.detail.base.false_percent }}</div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[4].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>T 分 顺 序 表</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="display: flex;justify-content: center;margin: 0 auto;">
                                        <div class="score" style="margin-right: 80px;">
                                            <div v-for="item in infoData.detail.t_sort.before" :key="item.name" class="item">
                                                <div>{{ item.factor }}</div>
                                                <div>{{ item.value }}</div>
                                            </div>
                                        </div>
                                        <div class="score">
                                            <div v-for="item in infoData.detail.t_sort.after" :key="item.name" class="item">
                                                <div>{{ item.factor }}</div>
                                                <div>{{ item.value }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            :key="'table2'+timeStamp"
                                            border
                                            :data="table2Data"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell2"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="因子量表"
                                                prop="factor">

                                            </el-table-column>
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"/>
                                            <el-table-column
                                                label="低分特征"
                                                prop="low"/>
                                            <el-table-column
                                                label="slot"
                                                width="330"
                                                prop="t_score">
                                                <template slot="header">
                                                    <div class="table2-head" v-for="num in [0,20,40,60,80,100]">
                                                        <div> {{ num }}</div>
                                                    </div>
                                                </template>
                                                <template slot-scope="scope">
                                                    <t-score class="tscore"
                                                             :echarts="comEcharts(scope)"
                                                             :score="scope.row.t_score"
                                                             :id="`tscore${scope.$index}`"/>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                label="高分特征"
                                                prop="height"/>

                                        </el-table>
                                    </div>
                                    <div class="table-two">
                                        <el-table :data="comDanger"
                                                  :header-cell-style="{fontSize:'28px',color:'#333'}"
                                                  border>
                                            <el-table-column
                                                prop="title"
                                                align="center"
                                                width="200px"
                                                label="">
                                                <template slot-scope="scope">
                                                    <div v-if="scope.row.last" style="color:#fff">
                                                        {{ scope.row.title }}
                                                    </div>
                                                    <div v-else :title="scope.row.desc">
                                                        {{ scope.row.title }}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="score"
                                                align="center"
                                                label="危 险 行 为 预 测"
                                            >
                                                <template slot-scope="scope">
                                                    <div class="table-three">
                                                        <t-score :table="3" :id="'table3'+scope.$index" :first="true"
                                                                 class="tscore" v-if="scope.row.first">
                                                        </t-score>
                                                        <t-score :table="3" :id="'table3'+scope.$index" :last="true"
                                                                 :score="scope.row.score" class="tscore"
                                                                 v-else-if="scope.row.last">
                                                        </t-score>
                                                        <t-score :table="3" :tick="scope.$index === 3"
                                                                 :id="'table3'+scope.$index" :score="scope.row.score"
                                                                 class="tscore" v-else>
                                                            {{ scope.row.score }}
                                                        </t-score>

                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[5].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI两点峰型：{{two_point.title}}</p>
                                </div>
                                <div class="physical-signs-wrap">
                                    <p class="physical-signs_item">{{two_point.content}}</p>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[6].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI常用的附加量表</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="additionalList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="150"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[7].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI临床因子量表</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="clinicalList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="160"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                                <div style="font-size: 18px;text-align: center;padding-top: 10px;">
                                    <p>***临床子量表应配合临床基本量表使用***</p>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[8].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI适应不良量表</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="maladjustmentList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[9].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI信度和效度量表</p>
                                </div>
                                <div class="MMPICT-ii" style="width: 90%; margin: 0 auto;">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="credit_validityList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[10].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI内容量表</p>
                                </div>
                                <div class="MMPICT-ii" style="width: 90%; margin: 0 auto;">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="contentList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[11].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI预测性检验</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="predictabilityList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[12].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>MMPI性功能与性体验量表</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="sexual_functionList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell3"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="cn_name"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label=""
                                                prop="en_name"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="T分"
                                                prop="t_score"
                                                width="70"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="proposal"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <div class="print-row" :class="printData_[13].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>***心理症状提示***</p>
                                </div>
                                <div class="physical-signs-wrap">
                                    <div class="physical-signs_item" v-for="(item,index) in psychologyList">
                                        <div class="psychology_title">{{index+1}}、{{item.factor_name}}:</div>
                                        <div class="psychology_name">
                                            <p v-for="item_ in item.list">{{ item_ }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="print-row" :class="printData_[14].value ? '' : 'print-none'">
                                <div class="charts-wrap" ref="chart"></div>
                            </div>
                            <div class="print-row" :class="printData_[15].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>个性逐项分析</p>
                                </div>
                                <div class="physical-signs-wrap" v-for="(item,index) in char_infoList">
                                    <p class="physical-signs_item">{{index+1}}、{{item}}</p>
                                </div>
                            </div>
                            <div class="print-row" :class="printData_[16].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>个性综合分析</p>
                                </div>
                                <div class="physical-signs-wrap" v-for="(item,index) in personality_analysisList">
                                    <p class="physical-signs_item">{{index+1}}、{{item}}</p>
                                </div>
                            </div>
                            <div class="MMPICT print-row" :class="printData_[17].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>辅助诊断意见（仅供临床参考）</p>
                                </div>
                                <div class="MMPICT-ii">
                                    <div style="padding-right: 2px" class="table-one">
                                        <el-table
                                            border
                                            :data="auxiliaryList"
                                            :header-row-style="{color:'#333333',fontSize:'16px'}"
                                            :header-cell-class-name="comCell4"
                                            :cell-class-name="comScoreClass"
                                            :header-row-class-name="'table-two-header-row'"
                                            style="width:100%">
                                            <el-table-column
                                                label="量表"
                                                prop="title"
                                                width="140"
                                            >
                                            </el-table-column>
                                            <el-table-column
                                                label="分值"
                                                prop="score"
                                                width="120"
                                            />
                                            <el-table-column
                                                label="量表结果解释"
                                                prop="result"
                                            />

                                        </el-table>
                                    </div>
                                </div>
                                <div style="font-size: 18px;text-align: center;padding-top: 10px;">
                                    <p>***请结合临床做出最后判断***</p>
                                </div>
                            </div>
                            <div class="print-last-row">
                                <div class="group">
                                    <span>操作员：</span>
                                    <p>{{ infoData.user_img === "" ? infoData.user : '' }}</p>
                                    <p><img style="height: 55px" :src="infoData.user_img"></p>
                                </div>
                                <div class="group">
                                    <span>检测时间：</span>
                                    <p></p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>
                </div>
            </div>
            <el-dialog class="new-dialog" title="打印设置" :visible.sync="dialogPrint">
                <el-form style="max-height: 550px;">
                    <el-form-item label="打印项" label-width="130px">
                        <el-checkbox-group v-model="printForm">
                            <el-checkbox v-if="infoData.calc_name !== 'MMPICT' " v-for="item in printData" :key="item.id" :label="item.id">
                                {{ item.name }}
                            </el-checkbox>
                            <el-checkbox v-if="infoData.calc_name === 'MMPICT'" v-for="item in printData_" :key="item.id" :label="item.id">
                                {{ item.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="打印大小" label-width="130px">
                        <el-radio-group v-model="printPageSize">
                            <el-radio label="1" style="display: block">A4</el-radio>
                            <div class="space-10"></div>
                            <el-radio label="2" style="display: block">A5</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="修改设置" label-width="130px">
                        <el-radio-group v-model="displayBlock">
                            <el-radio label="2" @change="changeRadio($event)">否</el-radio>
                            <el-radio label="1" @change="changeRadio($event)">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPrint = false" style="margin-right: 10px">取 消</el-button>
                    <el-button type="primary" @click="printSet">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog class="new-dialog text-dialog" :visible.sync="dialogIpt" width="30%" :close-on-click-modal="false"
                       :show-close="false">
                <div style="width: 100%;">
                    <div class="text-content">
                        <textarea v-model="dialogText" rows="10"></textarea>
                    </div>
                    <div class="button-wrap">
                        <el-button type="primary" @click="textConfirm">确 定</el-button>
                        <el-button @click="dialogIpt = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog class="new-dialog text-dialog" :title="modifyTitle.title" :visible.sync="dialogProposal" width="40%"
                       :close-on-click-modal="false"
                       :show-close="false">
                <div style="width: 100%;">
                    <div class="proposal-text">
                        <span>历史模板</span>
                        <el-select style="width: 80%;" v-model="doctorProposal" @change="templateText = $event;"
                                   :popper-append-to-body="false" popper-class="popper-class">
                            <el-option v-for="(item,index) in doctorProposalList" :key="item.id" :label="item.content"
                                       :value="item.content">
                            </el-option>

                        </el-select>
                    </div>
                    <div class="proposal-text">
                        <span>{{ modifyTitle.title }}</span>
                        <textarea v-model="templateText" rows="10"></textarea>
                    </div>
                    <div class="button-wrap">
                        <el-button type="primary" @click="proposalConfirm">确 定</el-button>
                        <el-button @click="dialogProposal = false" style="border: 1px solid #CDCDCD !important;">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
            <el-dialog class="new-dialog text-dialog" title="修改报告" :visible.sync="dialogReport" width="50%"
                       :close-on-click-modal="false"
                       :show-close="false">
                <div style="width: 75%;">
                    <el-form label-width="120px" style=" max-height: unset;">
                        <el-form-item label="姓名">
                            <el-input v-model="xiugai.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="xiugai.gender">
                                <el-radio :label="0" name="0">男</el-radio>
                                <el-radio :label="1" name="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="xiugai.age"></el-input>
                        </el-form-item>
                        <el-form-item label="入院时间">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                            v-model="xiugai.in_time"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="测评时间">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd"
                                            v-model="xiugai.exam_time"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="病历号">
                            <el-input v-model="xiugai.medical_num"></el-input>
                        </el-form-item>
                        <el-form-item label="医保号">
                            <el-input v-model="xiugai.medical_insurance_num"></el-input>
                        </el-form-item>
                        <el-form-item label="患者来源">
                            <el-select v-model="xiugai.source" style="width: 100%;">
                                <el-option v-for="item in wardList" :label="item.name" :key="item.id"
                                           :value="item.name"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="完成时间">
                            <el-input v-model="xiugai.complete_time"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="button-wrap">
                        <el-button type="primary" @click="xiuqueding">确 定</el-button>
                        <el-button @click="xiuquxiao" style="border: 1px solid #CDCDCDCDCDCD !important;">取 消</el-button>
                    </div>
                </div>
            </el-dialog>

            <el-dialog :visible.sync="dialogPreview">
                <template slot="title">
                    <div style="display: flex;justify-content: space-between;">
                        <span>打印预览</span>
                        <el-button type="primary" style="margin-right: 30px;" size="mini" v-print="printObj"
                                   icon="el-icon-printer">
                            打印
                        </el-button>
                    </div>
                </template>

                <div class="page-A4">
                    <img :src="previewImg" alt="" v-if="previewImg" class="previewImg">
                </div>
            </el-dialog>
        </div>

        <div v-if="xianshi2">
            <el-dialog class="new-dialog text-dialog" :visible.sync="dialogChuan" modal-append-to-body=true  :before-close="handleClose" width="20%">
                <div>
                    <div><img style="margin:0 auto; display: block; " src="../assets/images/kulian.png"></div>
                    <div style="margin-top: 20px; font-size: 24px; color: #333333; line-height: 31px; ">{{zhi}}</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import $ from 'jquery'
import Tscore from '/src/components/Tscore'

export default {
    name: "AssessDetail",
    data() {
        return {
            printObj: {
                id: "print",//要打印的id名 无#号
                popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
                extraHead:'&nbsp;',//头部文字 默认空
            },
            xiugai:[],
            xianshi1:false,
            xianshi2:false,
            dialogChuan:false,
            impressionList:{},
            additionalList:[],
            clinicalList:[],
            maladjustmentList:[],
            credit_validityList:[],
            contentList:[],
            predictabilityList:[],
            sexual_functionList:[],
            psychologyList:[],
            char_infoList:[],
            personality_analysisList:[],
            auxiliaryList:[],
            stateFlag: false,
            tscoreMap: {},
            timeStamp: '',
            score: [],
            table2Seq: ['D', 'Hs', 'Pt', 'Pd', 'Si', 'Pa', 'Sc', 'Mf', 'Ma', 'F', 'K', 'L'],
            tableOne: {},
            mmpt: {
                props: ['origin_score', 'k_score', 'cn_score', 'cn_k_score', 'usa_k_score'],
                baseTitle: [
                    {t1: '疑问 分'},
                    {t1: '说谎 分'},
                    {t1: '诈病 分'},
                    {t1: '校正 分'},
                    {t1: '疑病 症'},
                    {t1: '抑郁 症'},
                    {t1: '癔 症'},
                    {t1: '精神病态'},
                    {t1: '男女子气'},
                    {t1: '偏执 狂'},
                    {t1: '精神衰弱'},
                    {t1: '精神分裂'},
                    {t1: '轻躁狂症'},
                    {t1: '社会内向'},
                ],
                tableTwo: {}
            },
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            district: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '检测结果打印', value: false},
                {id: '4', name: '生物指标打印', value: false},
                {id: '5', name: '量表说明打印', value: false},
                {id: '6', name: '提示或建议打印', value: false},
                {id: '7', name: '医生建议', value: false},
            ],
            printData_: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '检查总体印象打印', value: false},
                {id: '4', name: 'MMPI基本量表分打印', value: false},
                {id: '5', name: 'T分顺序表打印', value: false},
                {id: '6', name: 'MMPI两点峰型打印', value: false},
                {id: '7', name: 'MMPI常用的附加量表打印', value: false},
                {id: '8', name: 'MMPI临床因子量表打印', value: false},
                {id: '9', name: 'MMPI适应不良量表打印', value: false},
                {id: '10', name: 'MMPI信度和效度量表打印', value: false},
                {id: '11', name: 'MMPI内容量表打印', value: false},
                {id: '12', name: 'MMPI预测性检验打印', value: false},
                {id: '13', name: 'MMPI性功能与性体验量表打印', value: false},
                {id: '14', name: '心理症状提示打印', value: false},
                {id: '15', name: '是否打印图片', value: false},
                {id: '16', name: '个性逐项分析打印', value: false},
                {id: '17', name: '个性综合分析打印', value: false},
                {id: '18', name: '辅助诊断意见（仅供临床参考）打印', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogIpt: false,
            dialogText: '',
            doctorAdvised: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            dialogProposal_:false,
            options: [],
            week_id:'',
            doctorProposalList: [],
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            printPageSize: '',
            displayBlock: '2',
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: {title: '医生建议', type: 5, field: 'doctor_proposal'},
            templateText: '',
            showEdit: false,
            Leisure: false,
            LeisureList: [],
            calcName: '',
            printShow: true,
            printASKQX: false,
            physiologyList: [],
            doctor_proposal:'',
            suggestion:'',
            test_paper_explain:'',
            textArea:'',
            height:'',
            scrollHeight:'',
            zhi:'',
            two_point:''
        }
    },
    components: {
        't-score': Tscore
    },
    computed: {
        comDanger: function () {
            let arr = []
            if (this.infoData.detail) {
                const danger = this.infoData.detail.danger
                let first = {
                    title: '预测内容',
                    first: true
                }
                let last = {
                    title: 'sss',
                    last: true
                }
                arr = [first, ...danger, last]

            }
            return arr
        },
        comEcharts: function () {
            return function (scope) {
                // console.log('scope',scope)
            }
        },
        table2Data: function () {
            let list = []

            if (this.infoData.detail && this.infoData.detail.factor) {
                let factorData = this.infoData.detail.factor
                // console.log('factor', factorData)
                Object.keys(factorData).map(item => {
                    let {factor, height, low, t_score} = factorData[item]
                    list.push({factor, height, low, t_score})
                })
                this.timeStamp = new Date().getMilliseconds()
                return list
            }
        },
        comNum: function () {
            return (item) => {
                if (this.score.length === 0) return
                return this.score.filter(s => {
                    return s.name === item
                })[0].num
            }
        },
        penl: function () {
            return [null, this.infoData.result[2], this.infoData.result[0], this.infoData.result[1], this.infoData.result[3], null]
        },
        thead: function () {
            return this.mmpt.baseTitle
        },
        mmptData: function () {
            let tmp = []
            const t2arr = ['Q', 'L', 'F', 'K', 'Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si']

            const col1 = ['原 始 分', 'K 校 正 分', '中国常模不做K校正的T分', '中国常模 做K校正的T分', '美国常模 做K校正的T分']

            this.mmpt.props.map((prop, indexout) => {

                let obj = {}
                this.mmpt.baseTitle.map((item, index) => {
                    let t2 = t2arr[index]
                    let tempobj = this.mmpt.baseList[index]
                    obj[t2] = tempobj[prop]
                })
                obj['col1'] = col1[indexout]
                tmp.push(obj)
            })
            this.timeStamp = new Date().getMilliseconds()
            return tmp
        }

    },
    watch:{
        'doctor_proposal':function(nv,ov) {
            if (nv === ov) {
                return
            }
            this.doctor_proposal = nv
            if(this.doctor_proposal) {
                this.changeHeight()
            }
        },
        'suggestion':  function (nv,ov) {
            if (nv === ov) {
                return
            }
            this.suggestion = nv
            if(this.suggestion) {
                this.changeHeight__()
            }

        },
        'test_paper_explain':function (nv,ov) {
            if (nv === ov) {
                return
            }
            this.test_paper_explain = nv
            if(this.test_paper_explain) {
                this.changeHeight_()
            }

        }
    },
    async mounted() {
        this.$vLoading.show();
        this.detailForm.uid = this.$store.state.user.userInfo.uid
        this.detailForm.exam_id = this.$route.query.liangbiao_id
        this.detailForm.test_paper_id = this.$route.query.id
        this.detailForm.patient_id = this.$route.query.patient_id
        await this.getInfo();
        if (this.calcName === 'MMPICT') {
            await this.getPrinter_();
        } else {
            await this.getPrinter();
        }
        this.isFinished = true;
        await this.getWard();
        this.$vLoading.hide();
        this.setChart(this.infoData.title, this.infoData.result);
    },

    methods: {
        xiu() {
            this.dialogReport = true
            this.xiugai = JSON.parse(JSON.stringify(this.infoData.patient_info));
        },
        xiuqueding() {
            this.infoData.patient_info = JSON.parse(JSON.stringify(this.xiugai))
            this.dialogReport = false

        },
        xiuquxiao() {
            this.dialogReport = false
        },
        comCell2(info) {
            //let head = {background: '#F6F6F6'}
            //console.log('table', info)
            if (info.rowIndex === 0 && info.columnIndex === 3) {
                return 'table-two-cell-slot'
            }
            if (info.rowIndex === 0) {
                return 'table-two-cell-one'
            }
        },
        comCell3(info){
            if (info.rowIndex === 0 && info.columnIndex === 3) {
                return 'table-three-cell-slot'
            }
            if (info.rowIndex === 0) {
                return 'table-two-cell-one'
            }
        },
        comCell4(info){
            if (info.rowIndex === 0 && info.columnIndex === 2) {
                return 'table-three-cell-slot'
            }
            if (info.rowIndex === 0) {
                return 'table-two-cell-one'
            }
        },
        comScoreClass(info) {
            if (info.columnIndex === 3) {
                return 'tscore-col'
            }
        },
        // async delete_(id,index){
        //     await this.$axios.post('api/template/delete',{id:id}).then(res => {
        //         // console.log(res.data.info)
        //     });
        //     this.doctorProposalList.splice(index, 1)
        //     this.templateText=''
        //     this.doctorProposal=''
        //     console.log(id)
        //     console.log(index)
        //     console.log(this.doctorProposalList)
        // },
        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/setting/printer_set_info', {
                type: 1
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
            });
            if (this.displayBlock == 1) {
                this.showEdit = true
            } else if (this.displayBlock == 2) {
                this.showEdit = false
            }
        },
        async getPrinter_() {
            await this.$axios.post('api/setting/printer_set_info', {
                type: 8
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData_.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
            });
            if (this.displayBlock == 1) {
                this.showEdit = true
            } else if (this.displayBlock == 2) {
                this.showEdit = false
            }
        },

        /**
         * 获取报告数据
         */
        async getInfo() {
            await this.$axios.post('api/exam/report', this.$qs.stringify(this.detailForm)).then(res => {
                if (res.data.code === 1) {

                    this.xianshi1 = true
                    this.xianshi2 = false
                    this.infoData  = res.data.data;
                    // console.log('this.infoData',this.infoData)
                    this.test_paper_explain = this.infoData.test_paper_explain
                    this.suggestion = this.infoData.suggestion
                    this.LeisureList = res.data.data.answer_detail
                    this.calcName = res.data.data.calc_name
                    this.physiologyList = res.data.data.physiology
                    this.doctor_proposal = this.infoData.doctor_proposal
                    this.test_paper_explain = this.infoData.test_paper_explain
                    if(res.data.data.calc_name === 'MMPICT'){
                        this.physiologyList = res.data.data.physiology
                        this.impressionList = res.data.data.detail.impression
                        this.additionalList = res.data.data.detail.additional
                        this.clinicalList = res.data.data.detail.clinical
                        this.maladjustmentList = res.data.data.detail.maladjustment
                        this.credit_validityList = res.data.data.detail.credit_validity
                        this.contentList = res.data.data.detail.content
                        this.predictabilityList = res.data.data.detail.predictability
                        this.sexual_functionList = res.data.data.detail.sexual_function
                        this.psychologyList = res.data.data.detail.psychology
                        this.char_infoList = res.data.data.detail.char_info
                        this.personality_analysisList = res.data.data.detail.personality_analysis
                        this.auxiliaryList = res.data.data.detail.auxiliary
                        this.two_point = res.data.data.detail.two_point
                    }

                    this.initMmpt(this.infoData)
                }
                if (res.data.code === 400) {
                    this.xianshi1 = false
                    this.xianshi2 = true
                    this.zhi = res.data.info
                    this.dialogChuan = true;

                }
                try {
                    this.Leisure = this.LeisureList.length !== 0;
                } catch (e) {
                }
            });
            this.stateFlag = true
        },
        handleClose() {
            this.$router.go(-1)
        },

        /* initTscore() {
             let that = this
             var refs = this.$refs
             this.$nextTick(() => {
                 console.log('refs', this.$refs)
                 for (let key in this.$refs) {
                     if (key.startsWith('tscore')) {
                         this.$refs[key].clientWidth = '100px'
                         this.$refs[key].clientHeight = '100px'

                         this.tscoreMap[key] = this.$echarts.init(this.$refs[key])
                         let option = {
                             grid:{
                                 width:100,
                                 height:100
                             },
                             xAxis: {
                                 type: 'category',
                                 data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                             },
                             yAxis: {
                                 type: 'value'
                             },
                             series: [{
                                 data: [150, 230, 224, 218, 135, 147, 260],
                                 type: 'line'
                             }]
                         };
                         this.tscoreMap[key].setOption(option)
                     }
                 }
             })
             //that.tscoreArr.push(that.$echarts.init(that.$refs[`tscore${$index}`]))
         },*/

        initMmpt(info) {
            try {
                // console.log('init mmpt',info)
                let list = info.detail.base.list
                this.mmpt.baseList = list
                this.timeStamp = new Date().getMilliseconds()
            }catch (e){

            }
        },


        /**
         * 设置打印参数
         */
        async printSet() {
            if (this.calcName !== 'MMPICT') {
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                await this.$axios.post('api/setting/printer_set', {
                    item: this.printForm,
                    paper: this.printPageSize,
                    edit: this.displayBlock,
                    type: 1
                }).then(res => {
                    this.dialogPrint = false
                    this.getPrinter()
                })
            } else {
                this.printData_.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                await this.$axios.post('api/setting/printer_set', {
                    item: this.printForm,
                    paper: this.printPageSize,
                    edit: this.displayBlock,
                    type: 8
                }).then(res => {
                    this.dialogPrint = false
                    this.getPrinter_()
                })
            }
        },


        /**
         * 显示编辑
         */
        changeRadio(e) {
            // console.log("~ e", e)
            // if(e == 1){
            //     this.showEdit = true
            //     console.log("~ this.showEdit", this.showEdit)
            // }else if(e == 2){
            //     this.showEdit = false
            //     console.log("~ this.showEdit", this.showEdit)
            // }
        },


        /**
         * 图表展示
         */
        setChart(column, data) {
            if (this.infoData.calc_name === '16PF') {
                clearInterval(this.pf16Timer);
                this.pf16Timer = setInterval(() => {
                    if (!this.$refs.pf16) {
                        return;
                    }

                    clearInterval(this.pf16Timer);
                    let $body = $(this.$refs.pf16);
                    let that = this;
                    let $list = $body.find('.active i');

                    $(window).on('resize', () => {
                        $('.charts-16pf-line').remove();

                        $list.each(function (index) {
                            let $next = $list.eq(index + 1);
                            if ($next.length > 0) {
                                $body.append(that.drawLine($(this), $next));
                            }
                        });
                    }).trigger('resize');
                });
                return;
            }

            let chart = this.$echarts.init(this.$refs.chart);
            let options = {
                grid: {
                    left: '10%',
                    bottom: '25%'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b}：{c}",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                }
            };

            switch (this.infoData.calc_name) {
                case 'SCL90':  // 折线图
                    options = $.extend({}, options, {
                        xAxis: {
                            type: 'category',
                            data: this.infoData.title,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 1000,
                                    color: '#000000',
                                    fontSize: 12
                                },
                                interval: 0,//坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
                                rotate: -25, //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
                            },
                        },
                        yAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 1000,
                                    color: '#000000',
                                    fontSize: 14
                                },
                            },
                        },
                        series: [
                            {
                                data: this.infoData.result,
                                type: 'line'
                            }
                        ]
                    });
                    break;

                case 'ASKQX': // 艾森克情绪
                    let ranges = [
                        {
                            left: [0, 21],
                            right: [22, 10000000]
                        },
                        {
                            left: [0, 22],
                            right: [23, 10000000]
                        },
                        {
                            left: [16, 10000000],
                            right: [0, 15]
                        },
                        {
                            left: [11, 10000000],
                            right: [0, 10]
                        },
                        {
                            left: [0, 20],
                            right: [21, 10000000]
                        },
                        {
                            left: [6, 10000000],
                            right: [0, 5]
                        },
                        {
                            left: [8, 10000000],
                            right: [0, 7]
                        }
                    ];

                    let sourceList = this.infoData.extend.socre || [];
                    let leftNames = this.infoData.extend.left;
                    let rightNames = this.infoData.extend.right;
                    let names = [];
                    let sources = [];
                    for (let i = 0; i < sourceList.length; i++) {
                        let range = ranges[i];
                        let source = sourceList[i];
                        let leftMin = range.left[0];
                        let leftMax = range.left[1];
                        let rightMin = range.right[0];
                        let rightMax = range.right[1];

                        if (source >= leftMin && source <= leftMax) {
                            names.push(leftNames[i] + `(${source})`);
                            sources.push(-(source));
                        } else {
                            names.push(rightNames[i] + `(${source})`);
                            sources.push(source);
                        }
                    }

                    options = $.extend({}, options, {
                        tooltip: null,
                        grid: {
                            left: '10%',
                            bottom: '10%'
                        },
                        xAxis: {
                            type: 'value',
                            position: 'top',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed'
                                }
                            },
                            axisLabel: {show: false}
                        },
                        yAxis: {
                            type: 'category',
                            axisLine: {show: false},
                            axisLabel: {show: false},
                            axisTick: {show: false},
                            splitLine: {show: false},
                            data: names
                        },
                        series: [
                            {
                                name: '生活费',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    show: true,
                                    formatter: '{b}'
                                },
                                data: sources
                            }
                        ]
                    });
                    break;

                case 'EPQ': {
                    options = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        dataset: [{
                            source: [[10, 20]]
                        }],
                        grid: [
                            {
                                left: '50',
                                width: '300',
                                height: '300'
                            },
                            {
                                right: '50',
                                width: '300',
                                height: '300'
                            }],
                        visualMap: [{
                            show: false,
                            type: 'continuous',
                            min: 0,
                            max: 100,
                            color: ['#B293FB', '#F5605A']
                        },],
                        xAxis: [
                            {
                                type: 'category',
                                data: ['', 'P', 'E', 'N', 'L', ''],
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false
                                },
                                boundaryGap: false,
                                splitLine: {
                                    show: true,
                                },
                            },
                            {
                                gridIndex: 1,
                                name: 'E量表',
                                nameLocation: 'start',
                                min: 0,
                                max: 100,
                                offset: -150,
                                interval: 100,
                                axisLabel: {
                                    //margin:158
                                    interval: 100,
                                    color: '#000'
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#CDCDCD'
                                    },
                                },

                                splitLine: {
                                    show: false
                                },
                            },],
                        yAxis: [
                            {
                                type: 'value',
                                gridIndex: 0,
                                min: 0,
                                max: 100,
                                interval: 10,
                                splitLine: {
                                    show: false
                                },
                            },
                            {
                                gridIndex: 0,
                                min: 0,
                                max: 100,
                                interval: 10,
                                splitLine: {
                                    show: false
                                },
                            },
                            {
                                gridIndex: 1,
                                name: 'N量表',
                                nameLocation: 'start',
                                min: 0,
                                max: 100,
                                axisTick: {
                                    inside: true,
                                    interval: 10
                                },
                                axisLabel: {
                                    //margin:158
                                    interval: 100,
                                    color: '#000'
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: '#CDCDCD',
                                        type: 'dashed'
                                    },
                                },

                                offset: -150,
                                interval: 'auto',
                                splitLine: {
                                    show: false
                                },
                            },
                        ],

                        series: [
                            {
                                data: this.penl,
                                type: 'line',
                                markLine: {
                                    symbol: 'none',
                                    label: {
                                        show: false
                                    },
                                    lineStyle: {
                                        color: '#CDCDCD'
                                    },
                                    data: [
                                        {
                                            yAxis: 100,
                                            lineStyle: {
                                                type: 'solid'
                                            },
                                        },
                                        {
                                            yAxis: 0,
                                            lineStyle: {
                                                type: 'solid'
                                            },
                                        },
                                        {
                                            yAxis: 60,

                                            lineStyle: {
                                                type: 'dashed'
                                            },
                                        },
                                        {
                                            yAxis: 55,

                                            lineStyle: {
                                                type: 'solid'
                                            },
                                        },
                                        {
                                            yAxis: 50,

                                            lineStyle: {
                                                type: 'solid'
                                            },
                                        },
                                        {
                                            yAxis: 45,

                                            lineStyle: {
                                                type: 'solid'
                                            },
                                        },
                                        {
                                            yAxis: 40,

                                            lineStyle: {
                                                type: 'dashed'
                                            },
                                        },
                                    ]
                                }
                            },
                            {
                                type: 'scatter',
                                xAxisIndex: 1,
                                yAxisIndex: 2,
                                lineStyle: {
                                    color: '#CDCDCD'
                                },
                                symbolSize: 15,
                                data: [[this.infoData.result[0], this.infoData.result[1]]],
                                markLine: {
                                    symbol: 'none',
                                    label: {
                                        show: false
                                    },
                                    lineStyle: {
                                        color: '#CDCDCD',
                                        type: 'solid'
                                    },
                                    data: [
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [0, 30]
                                            },
                                            {
                                                coord: [30, 30]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [0, 40]
                                            },
                                            {
                                                coord: [40, 40]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [0, 60]
                                            },
                                            {
                                                coord: [40, 60]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [0, 70]
                                            },
                                            {
                                                coord: [30, 70]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [70, 30]
                                            },
                                            {
                                                coord: [100, 30]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [60, 40]
                                            },
                                            {
                                                coord: [100, 40]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [60, 60]
                                            },
                                            {
                                                coord: [100, 60]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [70, 70]
                                            },
                                            {
                                                coord: [100, 70]
                                            }
                                        ],
                                        /*x y*/
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [30, 0],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [30, 30]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [40, 0],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [40, 40]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [60, 0],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [60, 40]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [70, 0],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [70, 30]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [30, 70],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [30, 100]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [40, 60],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [40, 100]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [60, 60],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [60, 100]
                                            }
                                        ],
                                        [
                                            {
                                                name: '两个坐标之间的标线',
                                                coord: [70, 70],
                                                lineStyle: {
                                                    color: '#CDCDCD',
                                                    type: 'dashed'
                                                }
                                            },
                                            {
                                                coord: [70, 100]
                                            }
                                        ],
                                    ]
                                },
                                markPoint: {
                                    symbol: 'rect',
                                    itemStyle: {
                                        color: '#fff'
                                    },
                                    label: {
                                        show: true,
                                    },
                                    data: [
                                        {
                                            name: 'a',
                                            value: '内向,稳定',
                                            xAxis: 10,
                                            yAxis: 15
                                        },
                                        {
                                            name: 'b',
                                            value: '内向,不稳',
                                            xAxis: 10,
                                            yAxis: 85
                                        },
                                        {
                                            name: 'c',
                                            value: '外向,不稳',
                                            xAxis: 90,
                                            yAxis: 85
                                        },
                                        {
                                            name: 'd',
                                            value: '外向,稳定',
                                            xAxis: 90,
                                            yAxis: 14
                                        }
                                    ]
                                }
                            }
                        ],
                        /*graphic:{
                            type:'group',
                            width:300,
                            height:300,
                            right:50,
                            children:[
                                {
                                    left:200,
                                    type:'line',
                                    shape:{
                                        x1:0,
                                        y1:0,
                                        x2:30,
                                        y2:0
                                    },
                                    style:{
                                        stroke:'#000'
                                    }
                                }
                            ]
                        }*/
                    }
                }
                    break

                case 'MMPICT': {
                    // console.log('case MMPICT')
                    const value = this.infoData.detail.base_analyse
                    let leftarr = value.prev
                    let rightarr = value.left
                    let left = {}
                    let right = {}
                    leftarr.forEach(item => {
                        left[item.factor] = item.value
                    })
                    rightarr.forEach(item => {
                        right[item.factor] = item.value
                    })

                    let data = []
                    let all_ = []
                    let all = ['Q', 'L', 'F', 'K', '', 'Hs', 'D', 'Hy', 'Pd', 'Mf', 'Pa', 'Pt', 'Sc', 'Ma', 'Si']
                    all.forEach((item, index) => {
                        if (index < 4) {
                            all_.push(all[index]+ '\n' + left[item])
                            data.push(left[item])
                        } else {
                            all_.push(all[index]+ '\n' +right[item])
                            data.push(right[item])
                        }
                    })
                    data[0] = ''
                    all_[4] = ''
                    let count = 0
                    all.map((item, index) => {
                        if (index !== 4) {
                            this.score.push({name: all[index], num: data[index]})
                            this.mmpt.baseTitle[count++].t2 = all[index]
                        }
                    })
                    this.timeStamp = new Date().getMilliseconds()


                    options = {
                        title:{
                            subtext: "MMPI基本量表剖析图",
                            left: "center",
                            textStyle: {
                                fontSize: 30
                            },
                            subtextStyle: {
                                fontSize: 28,
                                color: 'rgba(27, 25, 25, 1)',
                                fontWeight: "bold",
                            },
                            show: true
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        visualMap: [{
                            show: false,
                            type: 'continuous',
                            min: 0,
                            max: 100,
                            color: ['#B293FB', '#F5605A']
                        },],
                        xAxis: {
                            type: 'category',
                            axisTick: {
                                show: false
                            },

                            data: all_,
                        },
                        yAxis: {
                            type: 'value',
                            min: 0,
                            max: 120,
                            interval: 10,
                            splitLine: {
                                show: false
                            },
                        },
                        series: [{
                            data: data,
                            type: 'line',
                            markLine: {
                                symbol: 'none',
                                label: {
                                    show: false
                                },
                                lineStyle: {
                                    color: '#CDCDCD'
                                },
                                data: [
                                    {
                                        yAxis: 40,
                                        lineStyle: {
                                            type: 'solid'
                                        },
                                    },
                                    {
                                        yAxis: 60,
                                        lineStyle: {
                                            type: 'solid'
                                        },
                                    },
                                    {
                                        yAxis: 120,
                                        lineStyle: {
                                            type: 'solid'
                                        },
                                    },
                                    {
                                        xAxis: '',
                                        lineStyle: {
                                            type: 'solid'
                                        },
                                    }
                                ]
                            }
                        }]
                    }
                }
                    break

                default:  // 默认图
                    options = $.extend({}, options, {
                        xAxis: {
                            type: 'category',
                            data: this.infoData.title,
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 1000,
                                    color: '#000000',
                                    fontSize: 13,
                                },
                                margin:15,
                                interval: 0,//坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
                                rotate: -45, //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
                                formatter:function(params) {
                                    var newParamsName = ""; // 最终拼接成的字符串
                                    var paramsNameNumber = params.length; // 实际标签的个数
                                    var provideNumber = 9; // 每行能显示的字的个数
                                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                                    /**
                                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                     */
                                    // 条件等同于rowNumber>1
                                    if (paramsNameNumber > provideNumber) {
                                        /** 循环每一行,p表示行 */
                                        for (var p = 0; p < rowNumber; p++) {
                                            var tempStr = ""; // 表示每一次截取的字符串
                                            var start = p * provideNumber; // 开始截取的位置
                                            var end = start + provideNumber; // 结束截取的位置
                                            // 此处特殊处理最后一行的索引值
                                            if (p == rowNumber - 1) {
                                                // 最后一次不换行
                                                tempStr = params.substring(start, paramsNameNumber);
                                            } else {
                                                // 每一次拼接字符串并换行
                                                tempStr = params.substring(start, end) + "\n";
                                            }
                                            newParamsName += tempStr; // 最终拼成的字符串
                                        }

                                    } else {
                                        // 将旧标签的值赋给新标签
                                        newParamsName = params;
                                    }
                                    //将最终的字符串返回
                                    return newParamsName
                                }
                            },

                        },
                        yAxis: {
                            axisLabel: {
                                textStyle: {
                                    fontWeight: 1000,
                                    color: '#000000',
                                    fontSize: 14
                                },
                            },
                        },
                        series: [
                            {
                                name: 'a',
                                tooltip: {
                                    show: false
                                },
                                type: 'bar',
                                barWidth: 25,
                                itemStyle: {
                                    normal: {
                                        color: (params) => {
                                            return this.infoData.color[params.dataIndex];
                                        }
                                    }
                                },
                                data: this.infoData.result,
                                barGap: 0
                            }, {
                                type: 'bar',
                                barWidth: 9,
                                itemStyle: {
                                    normal: {
                                        color: (params) => {
                                            return this.infoData.color[params.dataIndex];
                                        }
                                    }
                                },
                                barGap: 0,
                                data: this.infoData.result
                            },
                            {
                                name: 'b',
                                tooltip: {
                                    show: false
                                },
                                type: 'pictorialBar',
                                itemStyle: {
                                    borderWidth: 1,
                                    normal: {
                                        borderColor: (params) => {
                                            return this.infoData.color[params.dataIndex];
                                        },
                                        color: (params) => {
                                            return this.infoData.color[params.dataIndex];
                                        }
                                    }
                                },
                                symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                                symbolSize: ['36', '9'],
                                symbolOffset: ['0', '-4'],
                                symbolRotate: 0,
                                symbolPosition: 'end',
                                data: this.infoData.result,
                                z: 3
                            }
                        ]
                    });
            }
            chart.setOption(options);
            chart.resize({height: 400});

            window.addEventListener('resize', () => {
                chart.resize();
            })
        },

        /**
         * 打印设置确定按钮
         */
        textConfirm() {
            // console.log('this.current',this.current);
            if (this.current.desc) {
                this.current.desc = this.dialogText;
            } else if (this.currentMethod === 'test_paper_explain') {
                this.current.test_paper_explain = this.dialogText;
            } else if (this.currentMethod === 'suggestion') {
                this.current.suggestion = this.dialogText;
            }
            this.dialogIpt = false;
            this.dialogText = '';
        },

        //点击 点击此处修改
        async getProposal({title, type, field}) {
            // console.log(type)
            this.modifyTitle = {title, type, field}
            this.doctorProposal = this.infoData[field];
            this.templateText = this.infoData[field];
            if(type == 3){
                this.dialogProposal_ = true;
                this.$axios.post('api/common/week_lst').then(res => {
                    if (res.data.code === 1) {
                        this.options = res.data.data
                    }
                })
                return;
            }
            await this.$axios.post('api/template/lst', {
                test_paper_id: this.$route.query.id,
                type: type
            },).then(res => {
                this.doctorProposalList = res.data.data;
            });
            this.dialogProposal = true;

        },
        onWeekInfo(e){
            this.week_id = e
        },
        async proposalConfirm_(){
            this.dialogProposal_ = false
            this.$axios.post('api/common/week_info', {id : this.week_id}).then(res => {
                if (res.data.code === 1) {
                    this.yunzhouzhidao = res.data.data.content
                }
            })
            // console.log(this.yunzhouzhidao)
        },

        //历史模板确定按钮
        async proposalConfirm() {
            if (!this.templateText) {
                return;
            }
            let list = this.doctorProposalList.map(item => item.content);
            // console.log('this.$route.query',this.$route.query)
            if (list.indexOf(this.templateText) === -1) {
                await this.$axios.post('api/template/add', {
                    test_paper_id: this.$route.query.id,
                    content: this.templateText,
                    type: this.modifyTitle.type,
                    patient_id:this.$route.query.patient_id,
                    exam_id:this.detailForm.exam_id
                })
            }
            this.dialogProposal = false;
            this.infoData[this.modifyTitle.field] = this.templateText;
            if (this.modifyTitle.type == 5) {
                this.doctor_proposal = this.infoData[this.modifyTitle.field]
            }
            if (this.modifyTitle.type == 2) {
                this.suggestion = this.infoData[this.modifyTitle.field]
            }
            if (this.modifyTitle.type == 1) {
                this.test_paper_explain = this.infoData[this.modifyTitle.field]
            }
            this.templateText = '';
        },
        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                if (_this.modifyTitle.type == 4) {
                    var textArea = _this.$refs.test_two
                }
                if (_this.modifyTitle.type == 5) {
                    var textArea = _this.$refs.test_one
                }
                let scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                let height = textArea.offsetHeight // 屏幕上显示的高度
                if (height <= scrollHeight) {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                }else {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                }
            })
        },
        changeHeight_ () {
            let _this = this
            this.$nextTick(() => {
                setTimeout(() => {
                    _this.textArea = _this.$refs.test_five
                    let scrollHeight = _this.textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                    let height = _this.textArea.offsetHeight // 屏幕上显示的高度
                    if (height <= scrollHeight) {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                        _this.textArea.style.height = _this.textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                    }else {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    }
                },1000)

            })
        },
        changeHeight__ () {
            let _this = this
            this.$nextTick(() => {
                setTimeout(() => {
                    _this.textArea = _this.$refs.test_four
                    let scrollHeight = _this.textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                    let height = _this.textArea.offsetHeight // 屏幕上显示的高度
                    if (height <= scrollHeight) {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                        _this.textArea.style.height = _this.textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                    }else {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    }
                },1000)

            })
        },
        async getWard() {
            await this.$axios.post('api/district/index').then(res => {
                this.wardList = res.data.data;
            })
        },


        /**
         * 打印预览
         */
        printPreview() {
            let $printNone = $('.print-none').hide();
            let dialog = this.$loading('请稍后...');
            html2canvas(this.$refs.print,{
                allowTaint: true,
                useCORS: true
            }).then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';
                let a = document.createElement('a');
                a.style.display = 'none';
                document.body.removeChild(dom);
                this.previewImg = URL.createObjectURL(this.dataURLToBlob(dom.toDataURL('image/png')));
                this.dialogPreview = true;
                $printNone.hide();
                dialog.close();
                $('.print-none_').show();
            });

        },


        /**
         * data转URLBlob
         * @param data
         * @returns {Blob}
         */
        dataURLToBlob(data) {
            let arr = data.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },


        /**
         * 实现两个元素中心点的连线
         * @author 渀波儿灞 2021-02-20
         * @param  {Object} startObj  jquery对象，起点元素
         * @param  {Object} endObj    jquery对象，终点元素
         * @return {String}           返回连线的dom
         */
        drawLine(startObj, endObj) {
            const yStart = startObj.position().top + startObj.height() / 2;
            const xStart = startObj.position().left + startObj.width() / 2;
            const yEnd = endObj.position().top + endObj.height() / 2;
            const xEnd = endObj.position().left + endObj.width() / 2;

            //用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
            const lx = xEnd - xStart;
            const ly = yEnd - yStart;

            //计算连线长度
            const length = Math.sqrt(lx * lx + ly * ly);
            //弧度值转换为角度值
            const c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

            //连线中心坐标
            const midX = (xEnd + xStart) / 2;
            const midY = (yEnd + yStart) / 2;
            const deg = c <= -90 ? (360 + c) : c;  //负角转换为正角

            return `<div class='charts-16pf-line' style='top:${midY}px;left:${midX - length / 2}px;width:${length}px;transform:rotate(${deg}deg);'></div>`
        }
    },

}
</script>
<style media="print">
    @page{
        size :auto;
        margin: 25px;
    }
</style>
<style scoped lang="scss">
::v-deep{
    .el-radio-group {
        margin-left: 20px;
    }
}
::v-deep {
    .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #7A40F2;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-checkbox__inner:hover {
        border-color: #7A40F2;
    }
    .el-radio__input.is-checked + .el-radio__label {
        color: #7A40F2;
    }
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button--primary {
        border-color: #7A40F2;
        background-color: #7A40F2;
    }
    .el-button [class*=el-icon-] + span {

    }

}
.psychology_title{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}
.psychology_name{
    font-size: 18px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    p{
        width: 45%;
        margin-top: 7px;
    }
}
.check_jiance {
    font-size: 22px !important;
    margin-bottom:20px;
    ::v-deep .el-checkbox__label {
        font-size: 22px !important;
        color: #333333!important;
        font-weight: 600;
    }
}
.pull_left {
    display: inline-block;
    width: 95%;
    overflow: hidden;
}

::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 20px;
}
::v-deep .el-table {
    font-size: 16px;
}
::v-deep .el-dialog {
    //width: 35%;
}

.dialog-footer {
    .el-button {
        border-radius: 25px;
        width: 150px;
    }
}

.el-form-item {
    margin-bottom: 10px;
}

.el-form-item:last-child {
    margin-bottom: 0;
}

::v-deep .el-checkbox {
    padding-left: 20px;
    width: 98%;
}

.content_body {
    padding: 25px;
    overflow-y: auto;
    @media print {
        overflow: visible;
        height: unset;
    }
}

.remark {
    color: #999999;
    font-size: 16px;
    margin: 0;
    text-align: center;

}


.print-html {
    max-width: 1100px;
    margin: 0 auto;

    .print-none {
        display: none;
    }

    .edit-btn.active {
        display: block;
    }

    @media print {
        table td,
        table th {
            border: 1px #000000 solid;
        }
    }
}

.print-html > .title {
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.print-html > .title img {
    width: auto;
    height: 75px;
    // border-radius: 50%;
    margin-right: 15px;
}

.print-html > .title p {
    font-size: 38px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 16px;
    color: #333333;
}

.table-name p {
    font-size: 26px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #7A40F2;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none !important;
    }
}

.print-body {
    border: 1px solid #e6e6e6;
    border-bottom: none;
}

.print-body .first {
    display: flex;
}

.print-body .first > .first-group {
    flex: 1;
    padding: 10px 25px;
    border-right: 1px solid #e6e6e6;
    @media print {
        padding: 10px 0;
    }
}

.print-body .row {

    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333333;
    padding-left: 25px;
    margin-bottom: 5px;
}

.print-body .first > .first-group span {
    width: 80px;
    text-align-last: justify;
}

.print-body .first > .first-group p {
    margin-left: 15px;
    font-weight: bold;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #e6e6e6;
}

.print-row {
    padding: 20px;
    color: #333333;
    font-size: 28px;
    font-weight: bold;
}

.print-row .title {
    text-align: center;
    line-height: 50px;
    margin-bottom: 20px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
}

.print-row .table-name p {
    height: 30px;
    font-size: 28px;
    margin-bottom: 20px;
}

.print-row .table-name span {
    font-size: 14px;
}

.print-last-row {

    padding: 10px 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.print-last-row .group {
    flex: 1;
    display: flex;
    //line-height: 55px;
    font-size: 20px;
    align-items: center;
    height: 50px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}
.jiance {
    font-size: 22px;
    >p {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        >span {
            display: block;
        }
        span:nth-child(1) {
            width: 40%;
            padding-right: 50px;
        }

        span:nth-child(2) {
            width: 20%;
        }

        span:nth-child(3) {
            width: 40%;
        }
    }
}
.check-result {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > div {
        font-size: 22px;
    }

    div:nth-child(1) {
        width: 40%;
        padding-right: 50px;
    }

    div:nth-child(2) {
        width: 20%;
    }

    div:nth-child(3) {
        width: 40%;
    }
}

.text-dialog ::v-deep .el-dialog__header {
    padding: 0;
}

.text-content {
    border: 1px solid #e6e6e6;

    > textarea {
        width: 100%;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
        font-size: 18px;
    }
}

.button-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.proposal-text {
    display: flex;
    align-items: center;
    margin-top: 30px;
    position: relative;

    > span {
        margin-right: 20px;
    }

    > textarea {
        width: 80%;
        font-size: 18px;
        padding: 8px;
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 30em;
        top: unset !important;
        left: unset !important;
    }
}
.physical-signs_item{
    font-size: 22px;
    color: #333;
    margin: 10px 0;
    font-weight: 400;
}

.physical-signs {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #e6e6e6;

    > div {
        font-size: 22px;
        display: flex;
        > span {
            display: block;
            color: #333333;
            margin-right:2em;
        }
    }

    > div:first-child {
        color: #7A40F2;
    }
}

.physical-signs:last-child {
    border: none;
}

.page-A4 {
    img {
        width: 100%;
        height: auto;
    }
}

.scl90-analysis {
    > * {
        font-size: 18px;
        margin-bottom: 1em;
    }
}

.report-text-content {
    width: 100%;
    display: block;
    flex: 1;
    font-size: 22px;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif, "Microsoft YaHei";
}
.charts-16pf {
    position: relative;

    table {
        border-collapse: collapse;
        width: 100%;

        th, td {
            border: 1px #eeeeee solid;
            padding: 8px;
            font-size: 18px;
            font-weight: normal;
        }

        thead {
            background: #e5e5e5;
        }

        .flex {
            height: 40px;
        }

        .flex-grow1 {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;

            i {
                display: block;
                width: 4px;
                height: 4px;
                border-radius: 4px;
                position: relative;
                z-index: 2;
            }

            &.active {
                i {
                    background: #7A40F2;
                    box-shadow: 0 0 5px #7A40F2;
                }
            }
        }

        .line {
            &:before {
                content: " ";
                display: block;
                width: 0;
                border-right: 1px #e5e5e5 solid;
                height: 100%;
                margin-right: -2px;
                position: relative;
                z-index: 1;
            }
        }

        tfoot {
            td {
                border: 0;

                .flex-grow1 {
                    flex-direction: column;
                    justify-content: flex-start;

                    i {
                        width: 0;
                        height: 10px;
                        border-right: 1px #e5e5e5 solid;
                    }

                    span {
                        color: #999;
                    }
                }
            }
        }
    }
}


.MMPICT {

    .table-count {
        display: flex;
        padding-left: .5em;
        justify-content: space-between;
        padding-right: 140px;
        margin-top: 15px;
        margin-bottom: 20px;

        & > * {
            color: #333333;
            font-size: 16px;
        }
    }

    .scale {

        .thead {
            display: flex;

            .headl {
                margin-left: 46px;
                margin-right: 160px;
                width: 4em;
                text-align: justify;
                text-align-last: justify;
                background: #09DBDA;
            }

            .headr {
                flex: 1;
                background: #b293fb;
            }
        }

    }

    .MMPICT-ii {
        .score {
            display: flex;
            justify-content: center;
            margin-top: 23px;

            .item {
                margin-right: 24px;
                margin-bottom: 5px;
                font-size: 22px;
                font-weight: 500;
                color: #000000;
                line-height: 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                &:last-child {
                    margin-right: 0;
                }

            }
        }

        .table-two {
            width: 100%;
            margin-top: 30px;
        }
    }
}

</style>
<style>
.report-text-content p,
.report-text-content div {
    margin-bottom: 0.8em;
}

.scl90-table-header th {
    background: #e5e5e5;
    color: #000000;
}


.charts-16pf-line {
    position: absolute;
    background-image: linear-gradient(to right, #7A40F2, #b293fb);
    height: 1px;
    z-index: 1;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
    }
}


</style>

<style lang="scss">
.el-table th > .cell {
    line-height: 30px;
}
.tscore-col {
    * {
        overflow: visible !important;

        div {
            width: 100% !important;
            //padding-right: 10px !important;
        }
    }
}

/*.table-two-header-row{
    border: none;
}*/

.tscore {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;

    * {
        overflow: visible !important;
        width: 100%;
    }
}

.head-row {
    height: 120px;

    .cell {
        height: 100% !important;
        padding-top: 10px;
    }

    *[type="ho"] {
        height: 100%;
        display: flex;
        align-items: flex-end;
    }

    *[type="ver"] {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        line-height: 20px;

        .tone {
            color: #333333;
            font-size: 18px;
            height: 4em !important;
            overflow: hidden;

            writing-mode: vertical-lr;
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                height: fit-content;

                &:nth-child(1) {
                }
            }

        }

        .ttwo {
            margin-top: 5px;
        }
    }
}

.table-left {
    display: flex;
    width: 12em;
    justify-content: space-between;

    div {
        float: left;
    }
}

.overline {
    width: 12em;
    text-align-last: justify;
    text-align: justify;
}

.table-two-cell-one {
    background: #F6F6F6 !important;
    border-right: none !important;

    &:last-child {
        border-right: 1px solid #EBEEF5;
    }
}


.table-two-cell-slot {
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;


    .cell {
        margin-top: 12px;
        margin-bottom: -12px;
        display: flex !important;
        padding: 0 20px 0 0 !important;
        justify-content: space-between;
        overflow: visible !important;


        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}
.table-three-cell-slot{
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;
    text-align: center !important;


    .cell {

        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}


</style>
