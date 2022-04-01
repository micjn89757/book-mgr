<template>
  <el-container :direction="vertical" class="basic-layout">
    <el-header class="header">
      <!-- 头部导航 -->
      <el-row class="row" align="middle" justify="space-between">
        <el-col :span="6" class="left">
          <!-- Header content -->
          <img src="/logo.jpg" alt="logo">
          <h1>图书管理系统后台</h1>
        </el-col>
        <el-col :span="2" class="right">
          <el-link :icon="User" disabled class="user">用户</el-link>
          <el-link :underline="false" type="danger" class="exit">退出</el-link>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="content">
      <el-aside width="200px">
        <app-nav />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
  