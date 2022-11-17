<template>
  <div>
    <Table :page-footer="true"
           :search-url="url"
           @operation-click="operationClick"
           :isAssess="false"
           :operationLeft="false"
           :tableTitle="tableTitle" :operation-list="operationList"/>
  </div>
</template>

<script>
import Table from "../components/Table";

export default {
  name: "AmongRecords",
  components: {Table},
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
          name: '孕周',
          value: 'yunzhou',
        },
      ],
      url: 'api/patient/index',
      operationList: [{img: 'wanshan.png', method: '1'}, {img: 'yunzhoubaobiao.png', method: '2'}]
    };
  },
  computed: {},
  watch: {},
  methods: {
    operationClick(row, method) {
        if(method == 1){
            this.$router.push({name: 'AddAmong', query: {row: row}})
        }else{
            this.$router.push({name: 'AmongDetail', query: {row: row}})
        }
    }
  },
}
</script>

<style scoped>

</style>
