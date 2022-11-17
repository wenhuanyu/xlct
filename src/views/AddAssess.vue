<template>
  <div style="display: flex;background-color:#FFF;height: 100%;">
    <div class="assess-left-wrap">
      <div class="assess-left">
        <div class="patient">
          <span>患者：</span>
          <div>
            <template v-if="infoForm.length > 0">
              <div class="info-item" v-for="(item,key) in infoForm" :key="key">
                <span class="pink">{{ item.user.name }}</span>
                <span class="pink">{{ item.terminal.nickname }}</span>
                <i @click="deleteInfo(key)" class="el-icon-circle-close"></i>
              </div>
            </template>
            <p v-else>请选择</p>
          </div>
        </div>
        <div v-if="page==1" class="patient">
          <span>量表：</span>
          <div>
            <template v-if="papeForm.length > 0">
              <div class="info-item" v-for="(item,key) in papeForm" :key="key">
                <span class="pink">{{ item.name }}</span>
                <i @click="deletePape(item.id,key)" class="el-icon-circle-close"></i>
              </div>
            </template>
            <p v-else>请选择</p>
          </div>

        </div>
      </div>
    </div>
    <Table v-if="page == 0" ref="list" class="assess-right" :page-footer="true" :custom-search="searchList"
           operation="设置终端" :edit="true"
           :table-checkbox="false"
           @edit="setTerminal"
           @bottomClick="buttonClick"
           :search-url="url"
           :bottom-button="bottomButton"
           :tableTitle="tableTitle"
           :userSelectTerminal="infoForm"
           :addAssess="true"/>
    <div v-if="page==1" class="content assess-right">
      <div class="content_top">
        <el-row class="demo-autocomplete">
          <el-col>
            <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="关键词搜索"
                :trigger-on-focus="false"
                @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
      </div>
      <div class="content_body">
        <el-tree
            :indent="16"
            :data="papeList"
            show-checkbox
            ref="tree"
            node-key="id"
            @check-change="handleCheckChange"
            :props="defaultProps">
        </el-tree>
      </div>
      <div class="bottom_bottom">
        <div>
          <div style="min-height: 40px;display: flex;align-items: center;">
            <el-checkbox v-model="needMusic" style="margin-right: 20px;">静息期</el-checkbox>
            <template v-if="needMusic">
              <span>选择音乐：</span>
              <el-select v-model="music" placeholder="请选择">
                <el-option
                    v-for="item in musicList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </template>
          </div>
          <div class="time-select">
            <span>选择时间：</span>
            <el-radio-group v-model="limit_time_radio" @change="changeRadio">
              <el-radio :label="30">3分</el-radio>
              <el-radio :label="20">5分</el-radio>
            </el-radio-group>
            <div class="input-suffix">
              其他
              <el-input class="inline-input" v-model="limit_time_input" @change="changeTime"></el-input>
              分钟
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" round @click="buttonClick('prev')">上一步</el-button>
          <el-button type="primary" round @click="buttonSubmit">完成</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="选择终端" :visible.sync="terminalShow" :modal="false" :close-on-click-modal="false" width="1097px">
      <div class="terminal-list-wrap">
        <div class="terminal-list">
          <div class="terminal-item" v-for="item in terminalList"
               :key="item.name" v-if="item.run_status == 1" @click="hanldClickTerminal(item)"
               :class="terminalClass(item.run_status) ">
            <img class="active" v-if="item.id == curindex" src="../assets/images/dui_green.png">
            <div></div>
            <p>{{ item.nickname }}</p>
            <span>{{ terminalStatus(item.run_status) }}</span>
          </div>
        </div>
      </div>
      <div class="dialog-button">
        <el-button type="primary" @click="selectTerminal">确定</el-button>
        <el-button type="info" plain @click="closeDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from "../components/Table";

export default {
  components: {Table},
  name: "AddAssess",
  data() {
    return {
      tableTitle: [
        {
          name: '编号',
          value: 'id'
        },
        {
          name: '姓名',
          value: 'name'
        },
        {
          name: '性别',
          value: 'gender',
          formatter: (row) => {
            if (row.gender == 0) {
              return '男';
            } else {
              return '女';
            }
          }
        },
        {
          name: '年龄',
          value: 'age'
        },
        {
          name: '病历号',
          value: 'medical_num',
        },
        {
          name: '医保号',
          value: 'medical_insurance_num'
        },
        {
          name: '患者来源',
          value: 'district_id_text'
        },
        {
          name: '入院时间',
          value: 'in_time_text',
          width: '180',
        },
      ],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      form: {
        'patient_ids': [],
        'terminal_ids': [],
        'test_paper_ids': [],
        'limit_time': 0,
      },
      curindex: 0,
      curInfo: {},
      userInfo: {},
      url: 'api/patient/index',
      searchList: [
        {prop: 'medical_num', placeholder: '病历号搜索'}
      ],
      terminalShow: false,
      terminalList: [],
      terminalListId: [],
      bottomButton: [
        {
          method: 'next',
          text: '下一步'
        },
      ],
      infoForm: [],
      papeForm: [],
      page: 0,
      papeList: [],
      papeFormId: [],
      state1: '',
      selectPape: [],
      limit_time_radio: 0,
      limit_time_input: '',
      music: '',
      needMusic: false,
      musicList: []
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.getTerminal();
    this.getMusic();
  },
  methods: {
    handleCheckChange() {
      var papeForm = []
      this.$refs.tree.getCheckedNodes().map(item => {
        if ('child' in item == false) {
          papeForm.push(item);
        }
      })
      this.papeForm = papeForm
    },
    querySearch(queryString, cb) {
      var restaurants = [];
      for (const key in this.papeFormId) {
        var item = this.papeFormId[key];
        item.value = item.name
        restaurants.push(item)
      }
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(val) {
      this.state1 = '';
      if ('chirld' in val == true) {
        return;
      }
      var isSet = true;
      this.papeForm.map(item => {
        if (item.id == val.id) {
          isSet = false;
          return;
        }
      })
      if (isSet == true) {
        this.papeForm.push(val)
        this.$forceUpdate()
      }
    },
    deleteInfo(key) {
      this.infoForm.splice(key, 1)
    },
    deletePape(id, key) {
      this.papeForm.splice(key, 1)
      var list = [];
      this.$refs.tree.getCheckedNodes(true).map(item => {
        if (item.id != id) {
          list.push(item)
        }
      })
      this.$refs.tree.setCheckedNodes(list);
    },
    hanldClickTerminal(item) {
      var isSelect = false;
      this.infoForm.map(infoI => {
        if (infoI.terminal.id == item.id) {
          isSelect = true
          return;
        }
      })
      if (isSelect) {
        this.$message({
          type: 'info',
          message: '终端已被选'
        })
        return;
      }
      this.curindex = item.id;
      this.curInfo = item
    },
    closeDialog() {
      this.terminalShow = false;
      this.curindex = 0;
      this.userInfo = {};
      this.curInfo = {};
    },
    selectTerminal() {
      if (this.curindex == 0) {
        this.$message({
          type: 'info',
          message: '请选择终端'
        })
        return;
      }

      this.infoForm.push({'user': this.userInfo, 'terminal': this.curInfo});
      this.closeDialog()
    },
    setTerminal(e) {
      this.userInfo = e;
      this.getTerminal();
      this.terminalShow = true;
    },
    getTerminal() {
      this.$axios.post('api/term/lst').then(res => {
        if (res.data.code === 1) {
          var terminalListId = {};
          this.terminalList = res.data.data.map(item => {
            terminalListId[item.id] = item;
            return item;
          })
          this.terminalListId = terminalListId

        }
      })
    },
    async getPolicy() {
      this.papeForm = []
      this.papeList = []
      this.papeFormId = []
      await this.$axios.post('api/policy/lst').then(res => {
        if (res.data.code === 1) {
          this.papeList = res.data.data.map(item => {
            item.child = item.names
            return item;
          })
        }
        this.getPape()
      })
    },
    async getPape() {
      await this.$axios.post('api/common/tableLst').then(res => {
        if (res.data.code === 1) {
          var papeFormId = {};
          this.papeList = this.papeList.concat(res.data.data.map(item => {
            item.child.map(i => {
              papeFormId[i.id] = i
            });
            return item
          }))
          this.papeFormId = papeFormId

        }
      })
    },
    terminalStatus(status) {
      if (status === 0) {
        return '离线'
      } else if (status === 1) {
        return '在线'
      } else if (status === 2) {
        return '占用'
      } else if (status === 3) {
        return '异常'
      }
    },
    terminalClass(status) {
      if (status === 0) {
        return 'offline';
      } else if (status === 1) {
        return 'online';
      } else {
        return 'busy';
      }
    },
    buttonClick(e) {
      if (e == 'next') {
        if (this.infoForm.length == 0) {
          this.$message({
            message: '请选择患者',
            type: 'info'
          })
          return;
        }
        this.page = 1;
        this.getPolicy()
      } else if (e == 'prev') {
        this.papeForm = []
        this.page = 0;
      }
    },
    changeRadio() {
      this.limit_time_input = '';
      this.form.limit_time = this.limit_time_radio
    },
    changeTime() {
      this.limit_time_radio = '';
      this.form.limit_time = this.limit_time_input
    },
    async getMusic() {
      await this.$axios.post('api/common/music_lst',).then(res => {
        if (res.data.code == 1) {
          this.musicList = res.data.data;
        }
      })
    },
    async buttonSubmit() {
      var patient_ids = [];
      var terminal_ids = [];
      var test_paper_ids = [];
      this.infoForm.map(item => {
        patient_ids.push(item.user.id)
        terminal_ids.push(item.terminal.id)
      })
      this.papeForm.map(item => {
        test_paper_ids.push(item.id)
      })
      this.form.patient_ids = patient_ids.join(',')
      this.form.terminal_ids = terminal_ids.join(',')
      this.form.test_paper_ids = test_paper_ids.join(',');
      this.form.music_id = this.needMusic ? this.music : '';
      console.log(this.form)
      await this.$axios.post('api/exam/add', this.$qs.stringify(this.form)).then(res => {
        if (res.data.code == 1) {
          this.$router.push('Assess')
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
.terminal-list-wrap {
  padding: 35px;
  border: 2px solid #FEE7E6;

}

.terminal-list {
  width: 100%;
  height: 521px;
  display: grid;
  grid-template-columns: repeat(6, 130px);
  grid-row-gap: 46px;
  grid-column-gap: 40px;
  overflow: visible;

  .terminal-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: 3px 3px 3px 3px;
    height: 128px;
    position: relative;

    > p {
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      line-height: 30px;
    }

    > div {
      width: 39px;
      height: 49px;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .active {
      position: absolute;
      right: -18px;
      top: -18px;
    }
  }
}


.online {
  border-color: #F5605A;
  color: #F5605A;

  > div {
    background-image: url(../assets/images/zd_icon_red.png);
  }
}

.offline {
  border-color: #7184B0;
  color: #7184B0;

  > div {
    background-image: url(../assets/images/zd_icon_blue.png);
  }
}

.busy {
  border-color: #FE9834;
  color: #FE9834;

  > div {
    background-image: url(../assets/images/zd_icon_orange.png);
  }
}

::v-deep .el-dialog__title {
  font-weight: bold;
}

::v-deep .el-dialog__body {
  padding-top: 10px;

}

.assess-left {
  padding: 50px 15px 0;
}

.patient {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 15px;

  > span {
    font-size: 16px;
    color: #252525;
  }

  > div {
    overflow-y: auto;
  }

  > div > p {
    color: #BCBCBC;
    font-size: 16px;
  }

  .info-item {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;

    > span {
      font-size: 16px;
      font-weight: bold;
      margin-right: 15px;
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }


  i {
    color: #AFAFAF;
    font-size: 18px;
    cursor: pointer;
  }
}

.dialog-button {
  padding-top: 20px;
  display: flex;
  justify-content: center;

  > button {
    width: 100px;
  }
}


.assess-right {
  padding: 10px 50px;
  min-width: 800px;
  overflow-y: auto;

  > .content_body {
    overflow: auto;
  }

  ::v-deep .el-tree {
    width: 100%;
    border: 1px solid #E5E5E5;
  }

  ::v-deep .el-checkbox {
    margin-left: 24px;
  }

  ::v-deep .el-tree-node__content {
    height: 55px;
  }

  ::v-deep .el-tree-node__label {

    font-size: 16px;
  }

  ::v-deep .el-tree-node:nth-child(odd) {
    background-color: #F4F4F4;
  }

  ::v-deep .el-tree-node__expand-icon {
    position: absolute;
    right: 10px;
  }

  .bottom_bottom {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    .time-select {
      display: flex;
      align-items: flex-end;
    }
  }

  .input-suffix {
    margin-left: 20px;
    display: flex;
    width: 150px;
    white-space: nowrap;
    align-items: flex-end;

    ::v-deep .el-input__inner {
      border-top: none;
      border-left: none;
      border-right: none;
      line-height: 20px;
      height: 20px;
      text-align: center;
    }
  }
}
</style>
