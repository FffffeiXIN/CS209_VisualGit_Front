<template>
  <el-container>
    <el-header>CS209 Final Project Demonstration</el-header>
    <el-container>
      <el-aside width="280px">
        <div style="margin-bottom:0px">
          <h1>目前选中查询仓库：{{ this.chosen_repo }}</h1>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-coin"></i>
              <span>Repo</span>
            </template>
            <el-menu-item v-for="index in this.repo_info" :key="index" @click="choose_repo(index)">
              {{ index.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <el-button type="warning" @click="configure()" style="margin-top: 20px">确认</el-button>
      </el-aside>

      <el-main>
        <el-menu
          :default-active="1"
          router mode='horizontal'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1" :route="{path: '/Developers', query: {repo: this.chosen_repo_url}}"> Developers</el-menu-item>
          <el-menu-item index="2" :route="{path: '/Issues', query: {repo: this.chosen_repo_url}}"> Issues</el-menu-item>
          <el-menu-item index="3" :route="{path: '/Releases', query: {repo: this.chosen_repo_url}}"> Releases</el-menu-item>
          <el-submenu index="4">
            <template slot="title">Commits</template>
            <el-menu-item index="4-3" :route="{path: '/AnalyseCommit', query: {type:'Hour', repo: this.chosen_repo_url}}">Analyse by Hour</el-menu-item>
            <el-menu-item index="4-1" :route="{path: '/AnalyseCommit', query: {type:'Day', repo: this.chosen_repo_url}}">Analyse by Day</el-menu-item>
            <el-menu-item index="4-2" :route="{path: '/AnalyseCommit', query: {type:'Month', repo: this.chosen_repo_url}}">Analyse by Month</el-menu-item>
            <el-menu-item index="4-3" :route="{path: '/AnalyseCommit', query: {type:'Year', repo: this.chosen_repo_url}}">Analyse by Year</el-menu-item>
          </el-submenu>
        </el-menu>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<style>
.el-header, .el-footer {
  background-color: rgba(239, 176, 149, 0.98);
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  font-family: "Helvetica Neue";
}

.el-aside {
  /*background-color: #D3DCE6;*/
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 50px;
}

body > .el-container {
  margin-bottom: 50px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
import axios from 'axios'

export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    choose_repo (index) {
      // console.log(index)
      this.temp_choose = index
      // console.log(this.chosen_repo)
    },
    getRepo () {
      console.log(this.repo_info)
      console.log(this.repo_cnt)
      axios({
        method: 'GET',
        url: 'http://localhost:8080/repository/getAllRepo'
      }).then(response => {
        let tmp = response.data.data.repository
        this.repo_cnt = tmp.length
        this.repo_info = []
        for (let i = 0; i < tmp.length; i++) {
          this.repo_info.push(tmp[i])
        }
      })
      console.log(this.repo_info)
      console.log(this.repo_cnt)
    },
    configure () {
      this.chosen_repo = this.temp_choose.name
      this.chosen_repo_url = this.temp_choose.id
      this.$router.push('/')
    }
    // toDevelopers () {
    //   this.$router.push({ path: '/Developers', query: { repo: this.chosen_repo_url } })
    // }
  },
  data () {
    return {
      repo_cnt: 0,
      repo_info: [],
      temp_choose: [],
      chosen_repo: '',
      chosen_repo_url: '',
      activeName: 'first',
      tabPosition: 'top'
    }
  },
  mounted () {
    this.getRepo()
  }
  // components: { char }
}
</script>
