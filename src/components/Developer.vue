<template>
  <div>
    <el-card shadow="hover" style="width: 100%;">
      <div slot="header" class="clearfix">
        <h1>There are totally {{ cnt }} developers</h1>
      </div>
    </el-card>
    <div class="btn" style="margin-top: 20px">
      <el-button type="primary" @click="drawBar()" style="max-height: 50px;margin-top: 100px" plain>Percentage
      </el-button>
      <div id="mychart" style="width: 700px;height:800px;"></div>
    </div>

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
      }],
      pindata: []
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
        let cnt = 0
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].rank = i + 1
          cnt += this.tableData[i].submission
        }
        this.pindata = []
        let now_cnt = 0
        for (let i = 0; i < this.tableData.length / 11; i++) {
          now_cnt += this.tableData[i].submission
          let tmp = { name: this.tableData[i].name, value: this.tableData[i].submission }
          this.pindata.push(tmp)
        }
        let rest_cnt = cnt - now_cnt
        this.pindata.push({ name: 'Others', value: rest_cnt })
        console.log(this.tableData)
        console.log(this.pindata)
      })
    },
    drawBar () {
      console.log('draw')
      this.initEcharts()
      // axios({
      //   method: 'GET',
      //   url: 'http://localhost:8080/repository/openissue?repos=' + this.$route.query.repo
      // }).then(response => {
      //   // 须补充
      //   // this.barxData = response.data.data.
      //   // this.baryData = response.data.data.
      // })
      // this.barxData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      // this.baryData = [120, 200, 150, 80, 70, 110, 130]
      // setTimeout(() => {
      //   this.echartsInit() // 初始化品质异常单饼图
      // }, 100)
    },
    initEcharts () {
      // 饼图
      const option = {
        legend: {
          // 图例
          data: this.pieName,
          right: '3%',
          top: '0%',
          orient: 'vertical'
        },
        title: {
          // 设置饼图标题，位置设为顶部居中
          text: 'Developer Contribution',
          top: '0%',
          left: 'center'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              formatter: '{b} :{d}%' // b代表名称，c代表对应值，d代表百分比
            },
            radius: '60%', //饼图半径
            data: this.pindata
          }
        ]
      }
      console.log(this.seriesData)
      let optionFree = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            data: this.seriesData,
            type: 'line',
            smooth: true
          }
        ]
      }
      this.myChart = this.$echarts.init(document.getElementById('mychart'))
      this.myChart.setOption(option)
    },
    echartsInit () {
      console.log('aaa')
      // 柱形图
      // 因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({
        xAxis: {
          type: 'category',
          data: this.barxData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.baryData,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
