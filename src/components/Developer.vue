<template>
  <div>
    <el-card shadow="hover" style="width: 100%;">
      <div slot="header" class="clearfix">
        <h1>There are totally {{ cnt }} developers</h1>
      </div>
    </el-card>

    <el-table
      :data="tableData"
      :header-cell-style="{background: 'rgba(153,214,239,0.93)', color: '#fff', fontSize: '17px', fontFamily: 'Helvetica Neue'}"
      stripe
      border
      style="width: 100%;" align="center">
      <el-table-column
        prop="rank"
        label="Rank"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="User id"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="submission"
        label="Commit times"
        width="180"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Developer',
  data () {
    return {
      cnt: 3,
      tableData: [{
        rank: 1,
        name: '王小虎',
        times: '1'
      }, {
        rank: 2,
        name: '王小虎',
        times: '2'
      }, {
        rank: 3,
        name: '王小虎',
        times: '3'
      }]
    }
  },
  mounted () {
    this.getDevelopers()
  },
  methods: {
    getDevelopers () {
      console.log('ddd')
      console.log(this.$route.query.repo)
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8080/repository/developer_quantity?id=' + this.$route.query.repo
      }).then(response => {
        console.log(response)
        this.cnt = response.data.data.quantity
        console.log(this.cnt)
      })
      axios({
        method: 'GET',
        url: 'http://127.0.0.1:8080/repository/developer_rank?id=' + this.$route.query.repo
      }).then(response => {
        console.log(response)
        this.tableData = response.data.data.rank_list
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].rank = i + 1
        }
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style scoped>

</style>
