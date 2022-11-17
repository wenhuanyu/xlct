<template>
	<div class="content">
		<div class="content_top">
			<div class="content_top_left">
				<a v-if="add && check('添加')" @click="$emit('add')">
					<img src="../assets/images/top_add.png" alt="">
				</a>
				<router-link v-else-if="addHref  && check('添加')" :to="addHref">
					<img src="../assets/images/top_add.png" alt="">
				</router-link>
				<a v-if="deleteUrl && check('删除')" @click="deleteBtn" class="all_del" href="javascript:;">
					<img src="../assets/images/top_del.png" alt="">
				</a>
				<a v-if="refresh" @click="onRefresh" class="reload" href="javascript:;">
					<img src="../assets/images/top_reload.png" alt="">
				</a>
				<a class="report" href="javascript:;" @click="contrast" v-if="con">生成对比报告</a>
                <a class="report" href="javascript:;" @click="importAnswerClick" v-if="importAnswer">导入答案</a>
                <a class="report" href="javascript:;" @click="exportAnswerClick" v-if="exportAnswer">导出答案</a>

				<!--                <a v-if="report" class="report" href="javascript:">生成对比报告</a>-->
			</div>
			<el-form class="search-bar" ref="form" :inline="true" :model="form" style="display: flex;">
				<template v-if="customSearch.length>0">
					<el-form-item v-for="(item,index) in customSearch" :key="item + index" :prop="item.prop">
						<el-input v-model="form[item.prop]" :placeholder="item.placeholder" clearable>
						</el-input>
					</el-form-item>
				</template>
				<el-select v-if="state_title" v-model="form.status" placeholder="全部" class="state_title">
					<el-option v-for="item in state_title_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
                <el-autocomplete
                    style="margin-top: 1px; margin-right: 15px;"
                    v-if="scale_title"
                    class="inline-input"
                    v-model="state2"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入量表名称"
                    :trigger-on-focus="false"
                    @select="handleSelect"
                >
                </el-autocomplete>
				<el-form-item v-if="form.keyword || form.keyword == ''" prop="keyword">
					<el-input v-model="form.keyword" placeholder="输入关键词" clearable></el-input>
				</el-form-item>

				<div class="date-search">
					<el-col :span="11">
						<el-form-item v-if="searchTime" prop="start_time">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.start_time"
								style="width: 100%;"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col class="line" :span="1" v-if="searchTime">-</el-col>
					<el-col :span="11">
						<el-form-item v-if="searchTime" prop="end_time">
							<el-date-picker type="date" placeholder="选择日期" v-model="form.end_time" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</div>
				<el-form-item v-if="searchBtn">
					<el-button type="primary" @click="onSubmit">搜索</el-button>
				</el-form-item>
				<el-form-item v-if="back">
					<el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left" style="color: #333333!important;">
						{{ back.text ? back.text : '返回上一页' }}
					</el-button>
				</el-form-item>
			</el-form>

		</div>
		<el-table
            v-loading="loading"
            style="width: 100%"
            class=""
            stripe
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
			@selection-change="handleSelectionChange"
        >
			<el-table-column
                v-if="tableCheckbox"
                center
                type="selection"
                align="center"
                width="100"
            >
			</el-table-column>
			<el-table-column v-for="item in tableTitle" :key="item.name" :prop="item.value" :label="item.name"
				:width="item.width" :align="item.align || 'left'  " :formatter="item.formatter">
			</el-table-column>
			<el-table-column v-if="setting" :label="operation" width="300" align="left">
				<template slot-scope="scope">
					<!-- <div style="display: inline-block;min-width: 100px;" v-if="operationLeft"> -->
						<template v-if="operationLeft" >
							<el-button v-if="InfoHref && (isAssess == false || (isAssess == true && scope.row.status==3 && scope.row.type !==2))"
								@click="handleClick(scope.row)" type="text" size="small">
								<template v-if="info.text">{{ info.text }}</template>
								<template v-else-if="info.icon">
									<img src="../assets/images/look.png">
								</template>
								<template v-else>
									<img src="../assets/images/baobiao.png">
								</template>
							</el-button>
							<template v-if="userSelectTerminal">
								<span v-for="userI in userSelectTerminal" :key="userI.user.id"
									v-if="userI.user.id == scope.row.id">
									{{ userI.terminal.nickname }}
								</span>
							</template>
							<el-button v-if="(edit && scope.row.hospital_id !==0) && check('编辑') " @click="$emit('edit', scope.row)" type="text"
								size="small">
								<img src="../assets/images/bianji.png" alt="">
							</el-button>
							<el-button v-else-if="(detailHref && scope.row.hospital_id !==0) && check('编辑')" @click="handleDetail(scope.row)" type="text"
								size="small">
								<img src="../assets/images/bianji.png">
							</el-button>
							<template v-if="isAssess">
								<el-button v-if="scope.row.status == 0 || scope.row.status == 2"
									@click="handleStart(scope.row)" type="text" size="small">
									<img src="../assets/images/play.png">
								</el-button>
								<el-button v-if="scope.row.status == 1" @click="handleStop(scope.row)" type="text"
									size="small">
									<img src="../assets/images/pause.png">
								</el-button>
								<el-button v-if="scope.row.status == 1 || scope.row.status == 2"
									@click="handleEnd(scope.row)" type="text" size="small">
									<img src="../assets/images/zanting.png">
								</el-button>
							</template>
							<el-button
								v-if="(deleteUrl && scope.row.hospital_id !==0 ) && check('删除') && (isAssess== false || (isAssess == true && scope.row.status!=3))"
								@click="handleDel(scope.row)" type="text" size="small">
								<img src="../assets/images/del.png">
							</el-button>
                            <el-button v-if="scope.row.hospital_id ==0" type="text" size="small">
                                <div style="width: 22px; height: 22px"></div>
                            </el-button>
						</template>
					<!-- </div> -->
<!--					<el-button v-if="statistics && scope.row.policy_id !== ''"-->
<!--						@click="handleJump(statisHref, scope.row)" type="text" size="small">-->
<!--						<img src="../assets/images/statistics.png" style="width: 22px;height: 22px">-->
<!--					</el-button>-->

					<!-- <div v-if="statistics_ && scope.row.policy_id === ''" style="display: inline-block; width: 30px">
					</div> -->

					<el-button @click="$emit('operation-click',scope.row,item.method)" type="text" size="small"
						v-for="(item,index) in operationList" :key="index">
						<img :src="require(`../assets/images/${item.img}`)"
							style="width: 22px;height: 22px;object-fit: contain">
					</el-button>

					<el-button v-if="qrcode && scope.row.qr_type == 1 " @click="$emit('qrcode',scope.row)" type="text"
						size="small">
						<img src="../assets/images/qrcode.png" style="width: 22px;height: 22px">
					</el-button>


				</template>
			</el-table-column>

		</el-table>

		<div class="bottom_bottom" v-if="pageFooter">
			<div class="page_total_wrap">
				<div class="page_total">
					<span class="total-count">共{{ searchData.total_count }}项</span>
					<span class="total-tip">
						当前显示{{ searchData.start_count }}到{{ searchData.end_count }}项，共{{ searchData.end_count }}项
					</span>
				</div>
				<div class="page_button" v-if="bottomButton.length > 0">
					<el-button type="primary" round v-for="item in bottomButton" :key="item.text"
						@click="$emit('bottomClick',item.method)">
						{{ item.text }}
					</el-button>
				</div>
			</div>
			<el-pagination @current-change="handleCurrentChange" :current-page.sync="form.page" :pager-count="9"
				layout="prev, pager, next, jumper" :hide-on-single-page="true" :total="searchData.total_count">
			</el-pagination>
			<div class="right-btn" v-if="rightBtn">
				<el-button @click="backPage">取消</el-button>
				<el-button @click="submitDetail">确认</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Table",
		props: {
			tableType: Number,
			tableTitle: Array,
			searchUrl: String,
			startUrl: String,
			endUrl: String,
			suspendUrl: String,
			deleteUrl: String,
			addHref: String,
			reportHref: String,
			InfoHref: String,
			detailHref: String,
			setting: {
				default: true,
				type: Boolean
			},
            importAnswer: {
                default: false,
                type: Boolean
            },
            exportAnswer: {
                default: false,
                type: Boolean
            },
			qrcode: {
				default: false,
				type: Boolean
			},
			report: {
				default: false,
				type: Boolean
			},
			rightBtn: {
				default: false,
				type: Boolean
			},
			statistics: {
				default: false,
				type: Boolean
			},
			statistics_: {
				default: false,
				type: Boolean
			},
			statisHref: String,
			operationList: Array,
			info: {
				default: () => {
					return {
						icon: false,
						jumpData: ['id']
					}
				},
				type: Object
			},
			state_title: {
				default: false,
				type: Boolean
			},
            scale_title:{
			    default:false,
                type:Boolean
            },
			isAssess: {
				default: false,
				type: Boolean
			},
			searchTime: {
				default: true,
				type: Boolean
			},
			refresh: {
				default: true,
				type: Boolean
			},
			tableCheckbox: {
				default: true,
				type: Boolean
			},
			InfoText: {
				type: String
			},
			userSelectTerminal: Array,
			add: Boolean,
			edit: Boolean,
			searchBtn: {
				default: true,
				type: Boolean
			},
			bottomButton: {
				default: () => {
					return []
				},
				type: Array
			},
			back: Object,
			operation: {
				default: '操作',
				type: String
			},
			form: {
				default: () => {
					return {
						keyword: '',
						start_time: '',
						end_time: '',
						page: 1,
						limit: 10,
						status: '',
                        test_paper_id:''
					}
				},
				type: Object
			},
			pageFooter: {
				default: false,
				type: Boolean
			},
            customSearch: {
				default: () => {
					return []
				},
				type: Array
			},
			operationLeft: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				searchData: [],
				tableData: [],
                loading: false,
				multipleSelection: [],
				multipleSelection1: [],
				multipleSelection2: [],
				multipleSelection3: [],
                multipleSelection4:[],
                multipleSelection5:[],
				state_title_list: [{
					id: 0,
					name: '未开始'
				}, {
					id: 1,
					name: '执行中'
				}, {
					id: 3,
					name: '已完成'
				}],
                scale_title_list:[],
				among_list: [],
				con: false,
                state2:'',
                lb:''
			};
		},
		computed: {},
		watch: {},
		mounted() {
            //获取权限列表
            this.$store.dispatch('GetAuth')
            //消息接口
            this.$store.dispatch('GetXiao')

			for (const key in this.form) {
				if (this.$route.query[key]) {
					this.form[key] = this.$route.query[key]
				}
			}
			if (this.$route.query.id) {
				this.form.id = this.$route.query.id
			}
			if (this.$route.query.patient_id) {
				this.form.patient_id = this.$route.query.patient_id
			}
			if (this.tableType == 1) {
				this.con = true
			}
            // if(sessionStorage.getItem('detail')) {
            //
            // } else {
            //     // this.onSubmit()
            // }
            this.liangbiao()
            this.getLastPage()
		},
		methods: {
		    //导入答案点击
            importAnswerClick() {
                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请先选择一条信息'
                    });
                    return;
                }
                if (this.multipleSelection.length > 1) {
                    this.$message({
                        type: 'info',
                        message: '只能选择一条数据'
                    });
                    return;
                }
                this.$axios.post('api/exam/index', this.$qs.stringify({
                    id: this.multipleSelection[0],
                })).then(res => {
                    let data = res.data.data.list[0]
                    if (data.status == 3) {
                        this.$message({
                            type: 'info',
                            message: '当前测评已完成'
                        });
                        return;
                    }
                    if (data.type == 1) {
                        this.$message({
                            type: 'info',
                            message: '当前测评为团体测评'
                        });
                        return;
                    }
                    if (data.name == '') {
                        this.$message({
                            type: 'info',
                            message: '当前测评为公共测评'
                        });
                        return;
                    }
                    this.$emit('importAnswerClick', this.multipleSelection)
                })
            },
            //导出答案点击
            exportAnswerClick() {
                if (this.multipleSelection.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请先选择一条信息'
                    });
                    return;
                }
                if (this.multipleSelection.length > 1) {
                    this.$message({
                        type: 'info',
                        message: '只能选择一条数据'
                    });
                    return;
                }
                this.$axios.post('api/exam/index', this.$qs.stringify({
                    id: this.multipleSelection[0],
                })).then(res => {
                    let data = res.data.data.list[0]
                    if (data.status == 0) {
                        this.$message({
                            type: 'info',
                            message: '当前测评未开始'
                        });
                        return;
                    }
                    if (data.type == 1) {
                        this.$message({
                            type: 'info',
                            message: '当前测评为团体测评'
                        });
                        return;
                    }
                    if (data.name == '') {
                        this.$message({
                            type: 'info',
                            message: '当前测评为公共测评'
                        });
                        return;
                    }
                    this.$emit('exportAnswerClick',this.multipleSelection,data)
                })

            },
            getLastPage() {
                if(sessionStorage.getItem('detail')) {
                    this.form.page = sessionStorage.getItem("currentPage")
                    this.handleCurrentChange(sessionStorage.getItem("currentPage")-0||1)
                    sessionStorage.removeItem("detail")
                } else {
                    this.form.page = 1
                    this.handleCurrentChange(1)
                }
            },
            querySearch(queryString,cb){  // 文本的值、回调函数
                // 也可以在这里请求接口获取与文本值匹配相同的数据列表
                let dataList = this.scale_title_list // 检索相同数据的列表
                // console.log('dataList',dataList)
                let result = queryString?dataList.filter(this.createFilter(queryString)):dataList
                cb(result) // 会在文本框下面出现检索匹配相同的数据列表
            },
            createFilter(queryString) {
                return (dataList) => {
                    return (
                        dataList.value
                            .toLowerCase()
                            .indexOf(queryString.toLowerCase()) >= 0
                    );
                };
            },
            handleSelect(item) {
                this.form.test_paper_id = item.id
                this.lb = item.id

            },
            async liangbiao() {
                await this.$axios.post('api/policy/getPaper', this.$qs.stringify({test_paper_ids: ''})).then(res => {
                    if (res.data.code === 1) {
                        let list = res.data.data.all
                        const data = [];
                        list.map(item => {
                            data.push({
                                value: item.name,
                                id: item.id,
                            })
                        })
                        this.scale_title_list = data
                    }
                })
            },
			//检测按钮权限
			check(_name) {
				let show = false
				if (['报告中心', '终端监控', '系统设置'].includes(this.$store.state.cmenu)) {
					return true
				}

				this.$store.state.auth.map(item => {
					if (item.name === this.$store.state.cmenu) {
						let child = item.child
						child.map(item2 => {
							if (_name === item2.name) {
								show = true
							}
						})
					}
				})
				return show
			},
			// 生成对比报告点击
			contrast() {
				if (this.tableType == 1) {
					if (this.multipleSelection.length <= 1) {
						this.$message({
							type: 'info',
							message: '至少选择两条信息'
						});
						return;
					}
					if (this.multipleSelection.length > 2) {
						this.$message({
							type: 'info',
							message: '只能选择两条数据'
						});
						return;
					}
                    if (this.lb =='') {
                        this.$message({
                            type: 'info',
                            message: '请先查询量表名称再生成对比报告'
                        });
                        return;
                    }
					if (this.multipleSelection.length == 2) {
					    // console.log('this.form.test_paper_id',this.form.test_paper_id)
						if (this.lb!=='') {
							this.$router.replace({
								name: "AssessDetailContrast",
								query: {
									ids: this.multipleSelection4,
									test: this.lb,
									time: this.multipleSelection2
								}
							})
							return;
						}
						return
					}
					return;
				}
			},
			async handleStart(val) {
				await this.$axios.post(this.startUrl, this.$qs.stringify({
					id: val.id
				})).then(res => {
                    this.loading = true
                    this.InterfaceList()
				})
			},
			async handleStop(val) {
				await this.$axios.post(this.suspendUrl, this.$qs.stringify({
					id: val.id
				})).then(res => {
                    this.loading = true
                    this.InterfaceList()
				})
			},
			async handleEnd(val) {
				await this.$axios.post(this.endUrl, this.$qs.stringify({
					id: val.id
				})).then(res => {
                    this.loading = true
                    this.InterfaceList()
				})
			},
			handleCurrentChange(val) {
                if (this.form.page) {
                    this.form.page = val;
                    setTimeout(() =>{
                        if(sessionStorage.getItem('detail')) {
                        } else {
                            sessionStorage.setItem('currentPage', val)
                        }
                    },1000)
                }
                setTimeout(() => {
                    this.loading = true
                    this.InterfaceList()
                },500)
			},
			// 搜索
			onSubmit() {
                this.form.page = 1
                this.InterfaceList()
			},
            InterfaceList() {
                console.log('this.form.id',this.form.id)
                if(this.tableType == 1 && this.form.id.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '当前患者没有测评'
                    });
                    this.loading = false
                    return;
                }
                this.$axios.post(this.searchUrl, this.$qs.stringify(
                    this.form
                    // this.form.start_time ? this.form.start_time = this.form.start_time.getFullYear() + '-' +(this.form.start_time.getMonth() + 1) + '-' + this.form.start_time.getDate() :this.form.start_time
                )).then(res => {
                    let data = res.data.data;
                    this.searchData = data;
                    this.tableData = data.list;
                    // console.log("~ this.tableData", this.tableData)
                    if (data.list == null) {
                        this.tableData = data;
                    }
                    setTimeout(() => {
                        this.loading = false
                    },2000)
                })
                this.form.status = ''
                this.form.test_paper_id = ''
            },
			// 删除接口
			delete(id) {
                if(this.tableType == 1) {
                    this.$axios.post(this.deleteUrl, this.$qs.stringify({
                        data: this.multipleSelection5
                    })).then(res => {
                        if(res.data.code == 1) {
                            this.$axios.post('api/exam/exam_list', this.$qs.stringify({
                                patient_id: res.data.data,
                            })).then(res => {
                                this.form.id = res.data.data
                            })
                        }
                        this.handleCurrentChange(1)
                    })
                } else {
                    this.$axios.post(this.deleteUrl, this.$qs.stringify({
                        id: id
                    })).then(res => {
                        if(res.data.data.name) {
                            this.$emit('delinfo',res.data,id)
                        } else {
                            this.handleCurrentChange(1)
                        }
                    })
                }
			},
			// 删除多条
			deleteBtn() {
				if (this.multipleSelection.length === 0) {
					this.$message({
						type: 'info',
						message: '请先选择一条信息'
					});
					return;
				}
				this.$confirm('是否选中删除该信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delete(this.multipleSelection.join(','));
				}).catch(() => {
					// this.$message({
					//     type    : 'info',
					//     message : '已取消删除'
					// });
				});
			},
			handleSelectionChange(val) {
				let ids = val.map(item => {
					return item.id
				})
				let dbid = val.map(item => {
					return item.test_paper_id
				})
				let sj = val.map(item => {
					return item.create_at
				})
				let sj1 = val.map(item => {
					return item.create_time
				})
                let cpid = val.map(item => {
                    return item.exam_id
                })
                let lbsc = []
                val.map(item => {
                    lbsc.push({exam_id:item.exam_id, test_paper_id:item.id})
                })
				this.multipleSelection = ids;
				this.multipleSelection1 = dbid;
				this.multipleSelection2 = sj;
				this.multipleSelection3 = sj1;
                this.multipleSelection4 = cpid;
                this.multipleSelection5 = lbsc
				this.among_list = ids
			},
			// 报表图标点击
			handleClick(val) {
				let query = {};
				for (const key in val) {
					if (key.indexOf(this.info.jumpData) > -1) {
						query[key] = val[key];
					}
				}
				this.$router.push({
					name: this.InfoHref,
					query: query
				})
			},
            //编辑按钮
			handleDetail(val) {
				this.$router.push({
					name: this.detailHref,
					query: {
						id: val.id
					}
				})
			},
			// 跳转
			handleJump(href, val) {
				this.$router.push({
					name: href,
					query: {
						id: val.id
					}
				})
			},
			// 删除单条数据
			handleDel(val) {
				this.$confirm('是否选中删除该信息', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delete(val.id);
				}).catch(() => {

				});
			},
			// 返回上一页
			backPage() {
                if(this.tableType == 1) {
                    this.$router.replace({name: "ReportCenter"})
                } else if (this.tableType == 2) {
                    this.$router.replace({name: "ReportCenterTeam"})
                } else if (this.tableType == 3) {
                    this.$router.replace({name: "ReportCenterPublic"})
                } else {
                    this.$router.go(-1);
                }

			},
			// 刷新
			onRefresh() {
                this.loading = true
				this.$refs.form.resetFields()
                this.form.page = 1
                this.InterfaceList()
			},
			submitDetail() {
				// console.log(this.among_list)
				if (this.among_list.length === 0) {
					this.$message({
						type: 'info',
						message: '请先选择一条信息'
					});
				} else {
					this.$router.push('/AddAmong')
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	::v-deep .el-button--primary {
        border-radius: 21px;
		background-color: #7A40F2 !important;
		border-color: #7A40F2 !important;
	}

	::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
		background-color: #7A40F2;
		border-color: #7A40F2;
	}

	::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #7A40F2;
		border-color: #7A40F2;
	}
    ::v-deep .el-button--text {
        color: #39CBE9;
    }
	.state_title {
		vertical-align: top;
		margin-right: 10px;
	}

	.content_top_left {
		display: flex;
	}

	.content_top_left a.report {
		width: 138px;
		line-height: 48px;
		text-align: center;
		color: #7A40F2;
		font-size: 18px;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 150px) !important;
	}

	.content_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	.content_top_left a {
		display: inline-block;
		width: 48px;
		height: 48px;
		margin-right: 15px;
		background: #FFF;
		cursor: pointer;
	}

	.content_top_left a img {
		display: block;
		margin: 10px auto 0;
	}

	.content_top_right {
		display: flex;
		align-items: center;
	}

	.content_top_right input {
		height: 45px;
		line-height: 45px;
		background: #FFF;
		font-size: 14px;
		padding-left: 10px;
	}

	.content_top_right input.search {
		width: 290px;
		margin-right: 10px;
	}

	.content_top_right input.time {
		color: #666;
		width: 190px;
		background: #FFF url(../assets/images/rili.png) no-repeat 95% center;
	}

	.content_top_right input::-webkit-input-placeholder {
		color: #999;
	}

	.content_top_right p {
		margin: 0 10px;
	}

	.content_top_right a {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #FFF;
		text-align: center;
		font-size: 18px;
		background: #FE9834;
		box-shadow: 4px 7px 10px 0px rgba(254, 152, 52, 0.2);
		border-radius: 50px;
		margin-left: 20px;
	}

	.content_bottom {
		background: #FFF;
		height: 850px;
	}


	.bottom_top .el-table {
		height: 580px;
		overflow-y: auto;
	}

	.bottom_top .el-table::before {
		height: 0;
	}

	.table_list {
		border-collapse: collapse;
		width: 100%;
		text-align: center;
	}

	.el-table {
		overflow-y: auto;
	}

	.table_list th {
		background: #FFF;
		font-size: 16px;
	}

	.table_list td {
		font-size: 14px;
	}

	.table_list tr {
		height: 55px;
	}

	.table_list tr:nth-child(odd) {
		background: #F4F4F4;
	}

	.table_list th,
	td {
		width: 157px;
	}

	td:last-child {
		height: 55px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding-left: 35%;
	}

	.table_list img {
		display: block;
		margin-right: 10px;
	}

	.table_list img:last-child {
		margin: 0;
	}


	.page_top {
		display: flex;
		align-items: center;
		margin-top: 20px;
		color: #444;
		font-size: 14px;
	}

	.page_top span {
		background: #F2ECFC;
		color: #7A40F2;
		font-size: 14px;
		border-radius: 50px;
		height: 25px;
		line-height: 25px;
		width: 85px;
		text-align: center;
		margin-right: 15px;
	}

	.page_box {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 15px;
	}

	.page_box a {
		width: 35px;
		height: 35px;
		border: 1px solid #CCCCCC;
		font-size: 16px;
		color: #444;
		text-align: center;
		line-height: 35px;
		margin-right: 5px;
	}

	.page_box a.active {
		background: #F2ECFC;
		color: #7A40F2;
		border: 1px solid #7A40F2;
	}

	.page_box p {
		margin: 0 20px;
		font-size: 16px;
		color: #555;
	}

	.page_box p input {
		width: 35px;
		height: 35px;
		border: 1px solid #CCCCCC;
		font-size: 16px;
		color: #555;
		text-align: center;
		line-height: 35px;
	}

	.page_box .sure {
		display: block;
		width: 110px;
		text-align: center;
		color: #FFF;
		font-size: 16px;
		margin-left: 25px;
		height: 35px;
		line-height: 35px;
		background: #7A40F2;
		box-shadow: 2px 3px 5px 0px rgba(245, 96, 90, 0.2);
		border-radius: 50px;
	}

	::v-deep .el-form-item {
		margin-bottom: 0;
	}

	.line {
		color: #CCC;
		font-size: 20px;
		text-align: center;
		line-height: 40px;
	}

	.bottom_bottom {
		padding: 30px 45px;
		background-color: #FFF;
	}


	.bottom_bottom .page_total_wrap {
		margin-bottom: 11px;
		display: flex;
		justify-content: space-between;
	}

	.page_button {}

	.page_total {
		display: flex;
		align-items: center;
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

	::v-deep .cell-class {
		text-align: center;
		font-size: 16px;
	}

	.date-search {
		display: inline-block;
	}

	.date-search ::v-deep .el-form-item {
		margin-right: 0;
	}

	::v-deep .el-table::before {
		height: 0;
	}

	.right-btn {
		float: right;

		.el-button {
			width: 149px;
			height: 50px;
			ont-size: 18px;
			color: #FFFFFF;
			border-radius: 25px;
		}

		.el-button:first-child {
			background: #F39334;
		}

		.el-button:last-child {
			background: #7A40F2;
		}
	}
</style>
