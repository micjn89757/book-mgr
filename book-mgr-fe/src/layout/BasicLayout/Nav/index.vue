<template>
    <el-menu
        :default-active="router.path"
        router="true"
        class="nav-menu"
        @open="1"
      >
      <el-menu-item :index="item.index" v-for="item in items"  v-only-admin="item.onlyAdmin" >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{item.title}}</span>
      </el-menu-item>

      <el-sub-menu :index="item.index" v-for="item in subitems">
        <template #title>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-only-admin="i.onlyAdmin" :index="i.index" v-for="i in item.children">
          <el-icon><component :is="i.icon" /></el-icon>
          <span>{{i.title}}</span>
        </el-menu-item>
      </el-sub-menu>

    </el-menu>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
  
  