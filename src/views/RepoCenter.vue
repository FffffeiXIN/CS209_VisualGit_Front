<template>
  <div>
    <el-container>
        <el-header>CS209 Final Project Demonstration</el-header>
      <el-container>
        <el-main>
          <div v-for="repo in courses" :key="repo.repoID" style="margin: 20px">
            <el-descriptions title="Repo Information" border>
              <template #extra>
                <el-button type="primary" @click="jumpToRepoDetail(repo.repoID)">仓库详情</el-button>
              </template>
              <el-descriptions-item label="ID">{{ repo.repoID }}</el-descriptions-item>
              <el-descriptions-item label="Name">{{ repo.repoID }}</el-descriptions-item>
              <el-descriptions-item label="Teacher">{{ repo.repoID }}</el-descriptions-item>
              <el-descriptions-item label="Type">{{ repo.repoID }}</el-descriptions-item>
              <el-descriptions-item label="Credit">{{ repo.repoID }}</el-descriptions-item>
              <el-descriptions-item label="Description">{{ repo.repoID }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";
export default {
  name: 'RepoCenter',
  components: {},
  data () {
    return {
      repos: []
    }
  },
  methods: {
    jumpToRepoDetail (repoID) {

    },
    getAllRepos () {
      // if (this.duplicate === true) {
      //   this.duplicate = false
      //   return
      // }

      this.repos = []
      // this.duplicate = true

      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getRepos'
      }).then(response => {
        console.log(response.data.message)
        let responseData = response.data.data.rs
        responseData.forEach((data) => {
          let repo = {
            courseID: data.id,
            courseName: data.name,
            courseDepartment: data.department,
            courseType: data.course_type,
            courseCredit: data.credit,
            courseStatus: data.status,
            courseFees: data.fees,
            courseDescription: data.info
          }
          this.courses.push(course)
        })
      })
    },
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #92BCDAED;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  font-family: "Helvetica Neue";
}
</style>
