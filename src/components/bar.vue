<template>
  <div id="main" style="width: 600px;height:400px;"></div>
</template>

<script>
export default {
  name: 'bar',
  methods: {
    echartsInit () {
      console.log('aaa')
      // 柱形图
      // 因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main')).setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
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
    setTimeout(() => {
      this.echartsInit()
    }, 800)
  }
}
</script>

<style scoped>

</style>
