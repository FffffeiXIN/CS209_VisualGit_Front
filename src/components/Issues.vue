<template>
  <div>
    <div>
      <el-row :gutter="20" class="row1">
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%; height: 100%; background: antiquewhite;" >
            <div slot="header" class="clearfix">
              <span>Total Number of Issues</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ total }}</div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%;">
            <div slot="header" class="clearfix">
              <span>Opened Issues</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ open }}</div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%;">
            <div slot="header" class="clearfix">
              <span>Closed Issues</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ close }}</div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="row2">
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%; height: 100%; background: antiquewhite;" >
            <div slot="header" class="clearfix">
              <span>Average</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ total }}</div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%;">
            <div slot="header" class="clearfix">
              <span>Difference of extreme values</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ average }}</div>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card shadow="hover" style="width: 100%;">
            <div slot="header" class="clearfix">
              <span>variance</span>
            </div>
            <div style="font-size: 18px;text-align: center;">{{ difference }}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="btn">
      <el-button type="primary" @click="drawBar()" style="max-height: 50px;margin-top: 200px" plain  >时间分布</el-button>
      <div id="main" style="width: 600px;height:400px;"></div>
    </div>
<!--    <char></char>-->
  </div>
</template>

<script>
// import char from '@/components/char'
// import bar from '@/components/bar'
import axios from 'axios'

export default {
  name: 'Issues',
  // components: { char },
  data () {
    return {
      total: 4,
      close: 1,
      open: 3,
      difference: 7,
      average: 9,
      variance: 10,
      barxData: [],
      baryData: []
    }
  },
  methods: {
    getData () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/Developers'
      }).then(response => {
        // 须补充
        // this.total = response.data.data.
        // this.close = response.data.data.
        // this.open = response.data.data.
        // this.difference = response.data.data.
        // this.average = response.data.data.
        // this.variance = response.data.data.
        // this.barxData = response.data.data.
        // this.baryData = response.data.data.
      })
    },
    drawBar () {
      console.log('draw')
      axios({
        method: 'GET',
        url: 'http://localhost:8080/Developers?repo=' + this.$route.query.repo
      }).then(response => {
        // 须补充
        // this.barxData = response.data.data.
        // this.baryData = response.data.data.
      })
      this.barxData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      this.baryData = [120, 200, 150, 80, 70, 110, 130]
      setTimeout(() => {
        this.echartsInit() // 初始化品质异常单饼图
      }, 100)
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
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
.row1{
  margin-top: 30px;
  margin-bottom: 30px;
}
.btn{
  display: inline-flex;
  text-align: left;
  justify-content: center;
}
</style>
