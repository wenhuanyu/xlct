<template>
  <div class="main-box">
    <Table :tableTitle="tableTitle"
           :searchTime="false"
           operation="打印报告"
           :searchUrl="url"
           :back="{}"
           :form="form"
           :operation-list="operationList"
           :operation-left="false"
           @operation-click="edit"
           :tableCheckbox="false"
    >
    </Table>
  </div>

</template>

<script>
import Table from '../components/Table';

export default {
  name: "InfoAssess",
  components: {
    Table
  },
  data() {
    return {
      tableTitle: [
        {
          name: '编号',
          value: 'num',
          width: 180,
            align:'center'
        },
        {
          name: '量表名称',
          value: 'name',

        },
        {
          name: '时长',
          value: 'use_time',
          width: 160
        },
        // {
        //   name: '得分',
        //   value: 'total_score',
        //   width: 180
        // },
      ],

      form: {
          'keyword': '',
          'id': 0,
      },
      url: 'api/exam/table_lst',
      tableData: [],
      operationList: [{img: 'look.png', method: '1'}]
    };
  },
  computed: {},
  watch: {},
  mounted() {
      console.log('this.$route.query',this.$route.query)
    this.form.id = this.$route.query.id
      if(this.$route.query.type) {
          this.form.type = this.$route.query.type
      }
      console.log('this.form.id',this.form.id)
      sessionStorage.setItem("detail", true);
  },
  methods: {
    edit(val){
        console.log('val',val)
        if(val.type == 1) {
            this.$router.push({
                name: 'AssessDetailTeam',
                query: {
                    'liangbiao_id': this.form.id,
                    'id': val.id,
                    'patient_id':this.$route.query.patient_id
                }
            })
        } else {
            this.$router.push({
                name: 'AssessDetail',
                query: {
                    'liangbiao_id': this.form.id,
                    'id': val.id,
                    'patient_id':this.$route.query.patient_id
                }
            })
        }

    }
  },
}
</script>

<style scoped>

</style>
