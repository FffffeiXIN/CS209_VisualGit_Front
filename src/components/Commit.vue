<template>
  <div class="graph">
    <div class="btn">
      <el-button type="primary" @click="show" style="max-height: 50px;margin-top: 200px;" plain>
        show
      </el-button>
      <div id="main1" style="width: 100%;height:600px;margin-top: 30px"></div>
      <!--    </div>-->
      <!--    <div class="btn">-->
      <!--      <el-button type="primary" @click="drawchar0()" style="max-height: 50px;margin-top: 200px;" plain>-->
      <!--        month时间分布-->
      <!--      </el-button>-->
      <!--      <div id="main2" style="width: 100%;height:400px;"></div>-->
      <!--    </div>-->
      <!--    <div class="btn">-->
      <!--      <el-button type="primary" @click="drawChar()" style="max-height: 50px;margin-top: 200px;" plain>-->
      <!--        Day-->
      <!--      </el-button>-->
      <!--      <div id="main3" style="width: 100%;height:600px;"></div>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Commit',
  data () {
    return {
      barxData1: [],
      baryData1: [],
      charxData0: [],
      charyData0: [],
      charxData: [],
      charyData: [],
      charxData2: [],
      charyData2: []
    }
  },
  mounted () {
  },
  methods: {
    show () {
      console.log(this.$route.query.type)
      if (this.$route.query.type === 'Hour') {
        this.drawBar1()
      } else if (this.$route.query.type === 'Month') {
        this.drawchar0()
      } else if (this.$route.query.type === 'Day') {
        this.drawChar()
      } else {
        this.drawchar2()
      }
    },
    drawBar1 () {
      console.log('draw')
      axios({
        method: 'GET',
        url: 'http://localhost:8080/repository/analyseCommitByHour?id=' + this.$route.query.repo
      }).then(response => {
        // 须补充
        this.barxData1 = response.data.data.month
        this.baryData1 = response.data.data.number
        // this.barxData = response.data.data.
        // this.baryData = response.data.data.
      })
      // this.barxData1 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      // this.baryData1 = [120, 200, 150, 80, 70, 110, 130]
      // setTimeout(() => {
      //   this.echartsInit1() // 初始化品质异常单饼图
      // }, 100)
      this.echartsInit1()
    },
    echartsInit1 () {
      console.log('aaa')
      // 柱形图
      // 因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main1')).setOption({
        xAxis: {
          type: 'category',
          data: this.barxData1
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.baryData1,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      })
    },

    drawchar0 () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/repository/analyseCommitByMonth?id=' + this.$route.query.repo
      }).then(response => {
        // 须补充
        let tmp = response.data.data
        this.charxData0 = []
        this.charyData0 = []
        let cnt = 0
        for (let key in tmp) {
          cnt++
          console.log(key + ' ' + tmp[key])
          // console.log(tmp[key])
          if (cnt % 14 === 0 || key === '200902') {
            this.charxData0.push(key.substring(0, 4) + '-' + key.substring(4, 6))
          } else {
            this.charxData0.push(' ')
          }
          this.charyData0.push(tmp[key])
        }
      })
      this.echartsInit2()
    },
    echartsInit2 () {
      this.$echarts.init(document.getElementById('main1')).setOption({
        // color: ['#271A3F', '#238D99'],
        title: {
          text: ''
        },
        tooltip: { // 提示框
          trigger: 'axis',
        },
        legend: {//图例的类型
          icon: 'roundRect',//图例icon图标
          data: [
            {
              name: 'commit数量',
              textStyle: {
                color: '#F8815F',
                fontSize: 20
              }

              // }, {
              //   name: '本周',
              //   textStyle: {
              //     color: '#F8815F',
              //     fontSize: 20
              //   }
            }
          ]
        },
        grid: {
          left: '3%',
          right:
            '4%',
          bottom: '3%',
          top:
            '17%',
          color:
            '#000000',
          containLabel: true //grid区域是否包含坐标轴的刻度标签
        },
        xAxis: {
          type: 'category', //坐标轴类型。
          boundaryGap: false, //坐标轴两边留白策略

          //修改一下data的绑定
          data: this.charxData0,
          axisLabel: {//坐标轴刻度标签的相关设置
            show: true,
            interval: 0,
            textStyle:
              {
                color: '#F8815F',
                fontSize: 20
              },
          },
          axisLine: {//坐标轴轴线相关设置
            show: true, lineStyle: {
              color: '#FA653B'
            }
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { //x轴的坐标文字
            show: true,
            textStyle:
              {
                fontSize: 20,
                color:
                  '#F8815F' //文字的颜色
              },
          },
          // max: 210,//最大值100
          axisLine:
            {//坐标轴轴线相关设置
              show: true,
              lineStyle:
                {
                  color: '#FA653B'
                }
            },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          },
          splitLine: {  //坐标在grid区域的分割线
            lineStyle: { //设置分割线的样式(图表横线颜色)
              color: ['#F0679B']
            }
          }
        },
        series: [
          {
            name: 'commit数量',
            type: 'line',
            data: this.charyData0,
            lineStyle: {
              color: '#271A3F' //线的颜色
            }
          }
          // {
          //   name: '本周',
          //   type: 'line',
          //   data: [10, 20, 30, 40, 10, 20, 30],
          //   lineStyle: {
          //     color: '#238D99' //线的颜色
          //   }
          // }
        ]
      })
      // window.addEventListener('resize', function () {
      //   myChart.resize()
      // })
    },
    drawChar () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/repository/analyseCommitByDay?id=' + this.$route.query.repo
      }).then(response => {
        // 须补充
        let tmp = response.data.data
        this.charxData = []
        this.charyData = []
        for (let key in tmp) {
          console.log(key + ' ' + tmp[key])
          // console.log(tmp[key])
          this.charxData.push(key.substring(0, 4) + '-' + key.substring(4, 6) + '-' + key.substring(6, 8))
          this.charyData.push(tmp[key])
        }
      })
      this.echartsInit3()
    },
    echartsInit3 () {
      this.$echarts.init(document.getElementById('main1')).setOption({
        // color: ['#271A3F', '#238D99'],
        title: {
          text: ''
        },
        tooltip: { // 提示框
          trigger: 'axis',
        },
        legend: {//图例的类型
          icon: 'roundRect',//图例icon图标
          data: [
            {
              name: 'commit数量',
              textStyle: {
                color: '#F8815F',
                fontSize: 20
              }

              // }, {
              //   name: '本周',
              //   textStyle: {
              //     color: '#F8815F',
              //     fontSize: 20
              //   }
            }
          ]
        },
        grid: {
          left: '3%',
          right:
            '4%',
          bottom: '3%',
          top:
            '17%',
          color:
            '#000000',
          containLabel: true //grid区域是否包含坐标轴的刻度标签
        },
        xAxis: {
          type: 'category', //坐标轴类型。
          boundaryGap: false, //坐标轴两边留白策略

          //修改一下data的绑定
          data: this.charxData,
          axisLabel: {//坐标轴刻度标签的相关设置
            show: false,
            interval: 0,
            textStyle:
              {
                color: '#F8815F',
                fontSize: 20
              },
          },
          axisLine: {//坐标轴轴线相关设置
            show: true, lineStyle: {
              color: '#FA653B'
            }
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { //x轴的坐标文字
            show: true,
            textStyle:
              {
                fontSize: 20,
                color:
                  '#F8815F' //文字的颜色
              },
          },
          // max: 80,//最大值100
          axisLine:
            {//坐标轴轴线相关设置
              show: true,
              lineStyle:
                {
                  color: '#FA653B'
                }
            },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          },
          splitLine: {  //坐标在grid区域的分割线
            lineStyle: { //设置分割线的样式(图表横线颜色)
              color: ['#F0679B']
            }
          }
        },
        series: [
          {
            name: 'commit数量',
            type: 'line',
            data: this.charyData,
            lineStyle: {
              color: '#271A3F' //线的颜色
            }
          }
          // {
          //   name: '本周',
          //   type: 'line',
          //   data: [10, 20, 30, 40, 10, 20, 30],
          //   lineStyle: {
          //     color: '#238D99' //线的颜色
          //   }
          // }
        ]
      })
      // window.addEventListener('resize', function () {
      //   myChart.resize()
      // })
    },
    drawchar2 () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/repository/analyseCommitByYear?id=' + this.$route.query.repo
      }).then(response => {
        // 须补充
        let tmp = response.data.data
        this.charxData2 = []
        this.charyData2 = []
        for (let key in tmp) {
          console.log(key + ' ' + tmp[key])
          // console.log(tmp[key])
          this.charxData2.push(key)
          this.charyData2.push(tmp[key])
        }
      })
      this.echartsInit4()
    },
    echartsInit4 () {
      this.$echarts.init(document.getElementById('main1')).setOption({
        // color: ['#271A3F', '#238D99'],
        title: {
          text: ''
        },
        tooltip: { // 提示框
          trigger: 'axis',
        },
        legend: {//图例的类型
          icon: 'roundRect',//图例icon图标
          data: [
            {
              name: 'commit数量',
              textStyle: {
                color: '#F8815F',
                fontSize: 20
              }

              // }, {
              //   name: '本周',
              //   textStyle: {
              //     color: '#F8815F',
              //     fontSize: 20
              //   }
            }
          ]
        },
        grid: {
          left: '3%',
          right:
            '4%',
          bottom: '3%',
          top:
            '17%',
          color:
            '#000000',
          containLabel: true //grid区域是否包含坐标轴的刻度标签
        },
        xAxis: {
          type: 'category', //坐标轴类型。
          boundaryGap: false, //坐标轴两边留白策略

          //修改一下data的绑定
          data: this.charxData2,
          axisLabel: {//坐标轴刻度标签的相关设置
            show: true,
            interval: 0,
            textStyle:
              {
                color: '#F8815F',
                fontSize: 20
              },
          },
          axisLine: {//坐标轴轴线相关设置
            show: true, lineStyle: {
              color: '#FA653B'
            }
          },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: { //x轴的坐标文字
            show: true,
            textStyle:
              {
                fontSize: 20,
                color:
                  '#F8815F' //文字的颜色
              },
          },
          // max: 800,//最大值100
          axisLine:
            {//坐标轴轴线相关设置
              show: true,
              lineStyle:
                {
                  color: '#FA653B'
                }
            },
          axisTick: { //坐标轴刻度相关设置。
            show: false
          },
          splitLine: {  //坐标在grid区域的分割线
            lineStyle: { //设置分割线的样式(图表横线颜色)
              color: ['#F0679B']
            }
          }
        },
        series: [
          {
            name: 'commit数量',
            type: 'line',
            data: this.charyData2,
            lineStyle: {
              color: '#271A3F' //线的颜色
            }
          }
          // {
          //   name: '本周',
          //   type: 'line',
          //   data: [10, 20, 30, 40, 10, 20, 30],
          //   lineStyle: {
          //     color: '#238D99' //线的颜色
          //   }
          // }
        ]
      })
      // window.addEventListener('resize', function () {
      //   myChart.resize()
      // })
    }
  }
}
</script>

<style scoped>

</style>
