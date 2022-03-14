<template>
  <el-container :direction="vertical" class="container">
    <el-header class="header">
      <!-- Header content -->
      <img src="/logo.jpg" alt="">
      <h1>图书管理系统后台</h1>
    </el-header>
    
    <el-main class="main">
      <!-- Main content -->
      <!-- 表单主体 -->
      <el-form class="form" :model="form" ref="form" :rules="rules" size="normal">
        <!-- 标签 -->
        <el-tabs stretch v-model="activeName" class="tabs">
          <!-- 登录 -->
          <el-tab-pane label="登录" name="first" class="login">
            <el-form-item class="account">
              <el-input v-model="form" placeholder="账号" :prefix-icon="Avatar">
              </el-input>
            </el-form-item>
            <el-form-item class="password">
              <el-input v-model="form" placeholder="密码" :prefix-icon="Lock"></el-input>
              
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <a href="">忘记密码</a>
            </el-form-item>
          </el-tab-pane>
          <!-- 注册 -->
          <el-tab-pane label="注册" name="second" class="register">
            <el-form-item class="account">
              <el-input v-model="form" placeholder="账号" :prefix-icon="Avatar"></el-input>
            </el-form-item>
            <el-form-item class="password">
              <el-input v-model="form" placeholder="密码" :prefix-icon="Lock"></el-input>
            </el-form-item>
            <el-form-item class="password">
              <el-input v-model="form" placeholder="邀请码" :prefix-icon="Message"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">注册</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        
      </el-form>
      
    </el-main>
  </el-container>
  
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>