<template>
  <el-card class="book-list">
    <template #header>
      <div class="list-header">
        <h2>图书列表</h2>
      </div>
    </template>

    <div class="body">
      <div class="search">
        <el-input v-model="keyword" placeholder="请输入书名" clearable @clear="back" class="input" />
        <el-button class="button" @click="onSearch"  
        @keyup.enter.native="onSearch" :icon="Search" type="primary"/>
      </div>   
      <el-button class="add-button" :icon="Plus" type="primary" @click="show = true" plain>添加书籍</el-button>
    </div>
    <add-one v-model:show="show" />

    <!--  表格会把list与下面字段相匹配的字段（prop）显示 -->
    <el-table class="table" border="true" :data="list">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="price" label="price"/>
      <el-table-column prop="author" label="author"/>
      <el-table-column prop="publishDate" label="publishDate"/>
      <el-table-column prop="classify" label="classify">
          <template v-slot="scope">
            <!-- scope.index获取表格行索引 -->
            <el-tag
            class="tag"
            type= "success"
            disable-transitions
            v-for="item in list[scope.$index].classify"
            >{{ item }}</el-tag>
          </template>
      </el-table-column>

    </el-table>

    
    <el-pagination 
      class="pagination" 
      background 
      layout="prev, pager, next" 
      :pager-count="5"
      :page-size="10"
      v-model:total="total"
      v-model:current-page="currentPage"
      @current-change="handleCurrentChange"
      />

    
  </el-card>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>