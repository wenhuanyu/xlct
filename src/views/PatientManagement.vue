<template>
  <div>
    <Table :page-footer="true"
           add-href="/AddPatient"
           :deleteUrl="'api/patient/delete'"
           detail-href="AddPatient"
           @remove="removeBtn"
           :search-url="url"
           :tableTitle="tableTitle"
           @delinfo="delinfoChange"
           ref="table"
    />

      <el-dialog :visible.sync="qrDialog" :modal="false" width="22vw" top="25vh" :close-on-click-modal="false">
          <div class="dialog-body">
              <div class="dialog-text" style="text-align: center">
                  <img src="../assets/images/tishi.png" style="width: 80px;height: 80px">
                  <h2 style="margin-top: 10px;margin-bottom: 10px;">提示</h2>
<!--                  <div style="margin-top: 5px;" v-for="(item,index) in delinfoList" >-->
<!--                      <h3>{{ item.name }}{{item.text}}，是否继续删除?</h3>-->
<!--                  </div>-->
                  <div style="margin-top: 5px;margin-bottom: 30px" >
                      <h3>{{ delinfoList }}，是否继续删除?</h3>
                  </div>
                  <div slot="footer">
                      <el-button type="warning" style="background: #ffffff;border: 1px solid #CDCDCD;color: #333333;box-shadow:none;" round @click="qrDialog = false">取消
                      </el-button>
                      <el-button type="primary" round @click="buttonSubmit">继续删除</el-button>
                  </div>
              </div>
          </div>

      </el-dialog>
  </div>
</template>

<script>
import Table from "../components/Table";


export default {
  name: "PatientManagement",
  components: {Table},
  data() {
    return {
      tableTitle: [
        {
          name: '编号',
          value: 'num'
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
              name: '民族',
              value: 'nation_name'
          },
          {
              name: '部门',
              value: 'department_name'
          },
        {
          name: '患者来源',
          value: 'source'
        },
        {
          name: '入院时间',
          value: 'in_time_text',
          width: '180',
        }],
        qrDialog: false,
        url: 'api/patient/index',
        delinfoList:[],
        delid:"",
    };
  },
  computed: {},
  watch: {},
  methods: {

      // Refresh() {
      //     this.$refs.table.onRefresh()
      // },
      delinfoChange(res,id) {
          this.qrDialog = true;
          this.delinfoList = res.data.name
          this.delid = id
      },
      buttonSubmit() {
          this.$axios.post('api/patient/delete', this.$qs.stringify({
              id: this.delid,
              type:1
          })).then(res => {
              this.$refs.table.onRefresh()
              this.qrDialog = false;
          })
      },
    add() {
    },
    removeBtn(ids) {
      console.log(ids)
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
    padding: 20px;
}
::v-deep .el-dialog {
    border-radius: 5px;
}
</style>
