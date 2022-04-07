<template>
  <div class="dashboard">
    <el-row :gutter="30" class="header">
      <el-col :span="5">
        <el-card>
          <h2>共{{baseInfo.total.book}}本</h2>
          <el-link disabled type="primary">书籍</el-link>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <h2>共{{baseInfo.total.user}}位</h2>
          <el-link disabled type="primary">用户</el-link>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <h2>共{{baseInfo.total.log}}条</h2>
          <el-link disabled type="primary">日志</el-link>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="5" class="main">
      <el-col :span="12">
        <book simple />
      </el-col>
      <el-col :span="12">
        <log simple />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  @import "./index.scss"
</style>

<script src="./index.js"></script>