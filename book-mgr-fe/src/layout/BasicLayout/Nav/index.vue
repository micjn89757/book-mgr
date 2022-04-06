<template>
    <el-menu
        default-active="/book"
        router="true"
        class="nav-menu"
      >
      <el-menu-item :index="item.index" v-for="item in menu"  v-only-admin="item.onlyAdmin" >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{item.title}}</span>
      </el-menu-item>

    </el-menu>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
  
  