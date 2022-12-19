<template>
  <div>
    <h1>There are totally {{ this.releases.length }} releases.</h1>
    <div class="block" style="margin-top: 20px">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="(item,index) in this.releases" :key="index"
                          :title="'Release '+index+' has '+item.length+' commit(s)'">
          <div class="content" v-for="(commit,idx) in item" :key="idx">
            <el-divider></el-divider>
            <h4>{{ commit.message }}</h4>
            {{ commit.commiter }} 提交于 {{ commit.time }}
            <br>
            {{commit.link}}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Releases',
  data () {
    return {
      activeNames: ['1'],
      releases: [
        // release 0
        [{
          commiter: 'lsm',
          time: '1：11',
          message: 'java是最好的语言',
          link: 'release.com'
        },
        {
          commiter: '02',
          time: '2：22',
          message: '22',
          link: '222'
        }],
        [{
          commiter: '03',
          time: '3：33',
          message: '33',
          link: '333'
        }]
      ]
      // commit: {
      //   time: '',
      //   message: '',
      //   link: ''
      // }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    getRelease () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/getRelease?repo=' + this.$route.query.repo
      }).then(response => {
        // this.releases = response.data.data
      })
    }
  },
  mounted () {
    this.getRelease()
  }
}
</script>

<style scoped>
.block {
  width: 50%;
}

h4 {
  margin-top: 0px;
  height: 0px;
}

.content {
  margin: -10px;
}
.el-divider{
}
</style>
