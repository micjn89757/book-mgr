<template>
  <el-card class="book-list">
    <template #header>
      <div class="list-header">
        <h2>图书列表</h2>
      </div>
    </template>

    <div class="body">
      <div class="search">
        <el-input v-model="input" placeholder="请输入书名" class="input" />
        <el-button class="button" :icon="Search" type="primary"/>
      </div>   
      <el-button class="add-button" :icon="Plus" type="primary"  plain>  添加书籍
      </el-button>
    </div>

    <el-table class="table" border="true" :data="tableData">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="age" label="Age"/>
    </el-table>

    <el-pagination class="pagination" background layout="prev, pager, next" :total="100" />
  </el-card>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>