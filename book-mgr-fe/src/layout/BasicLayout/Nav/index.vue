<template>
    <el-menu
        default-active="book"
        router="true"
        class="nav-menu"
      >
      <el-menu-item index="1">
        <el-icon><icon-menu /></el-icon>
        <span>概览</span>
      </el-menu-item>
        
      <el-menu-item index="book">
        <el-icon><icon-menu /></el-icon>
        <span>图书管理</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>日志列表</span>
      </el-menu-item>
    </el-menu>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
  
  