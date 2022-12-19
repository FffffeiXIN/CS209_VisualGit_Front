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
      </el-aside>

      <el-main>
        <el-menu
          :default-active="1"
          router mode='horizontal'
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item index="1" :route="{path: '/Developers', query: {repo: this.chosen_repo_url}}"
                        @click="toDevelopers()"> Developers
          </el-menu-item>
          <el-menu-item index="2" :route="{path: '/Issues', query: {repo: this.chosen_repo_url}}"> Issues</el-menu-item>
          <el-menu-item index="3" :route="{path: '/Releases', query: {repo: this.chosen_repo_url}}"> Releases
          </el-menu-item>
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
      this.chosen_repo = index.name
      this.chosen_repo_url = index.id
      // console.log(this.chosen_repo)
    },
    getRepo () {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/getAllRepo'
      }).then(response => {
        this.repo_cnt = response.data.data.repo_count
        this.info = response.data.data.repos
      })
    },
    toDevelopers () {
      this.$router.push({ path: '/Developers', query: { repo: this.chosen_repo_url } })
    }
  },
  data () {
    return {
      repo_cnt: 2,
      repo_info: [{
        name: 'msgpack-c',
        id: 'https://api.github.com/repos/msgpack/msgpack-c'
      }, {
        name: 'python-fire',
        id: 'https://api.github.com/repos/google/python-fire'
      }],
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
