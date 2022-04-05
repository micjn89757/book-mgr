<template>
  <!-- 用户管理 -->
  <div class="user">
    <el-card class="user-card">
      <template #header>
        <div class="header">
          <h2>用户管理</h2>
          <el-button type="primary" @click="showAddModal = true" plain>添加用户</el-button>
        </div>
      </template>

      <div class="search">
        <el-input v-model="keyword" placeholder="请输入账户" clearable @clear="back" class="input" />
        <el-button class="button" @click="onSearch"  
        :icon="Search" type="primary"/>
      </div>  

      <add-one 
        v-model:show="showAddModal"
        @getList="getUser"/>
  
      <div class="body">
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="account" label="Account"/>
          <el-table-column prop="num" label="IsInvited"/>
          <el-table-column prop="num" label="Access"/>
          <el-table-column label="CreateDate">
            <template v-slot="scope">
              {{moment(list[scope.$index].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="Actions">
            <template v-slot="scope">
              <el-link type="primary" @click="resetPassword(list[scope.$index])" style="margin-right: 5px;">重置密码</el-link>
              <el-link type="primary"  @click="remove(list[scope.$index])">删除</el-link>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination 
        background 
        layout="prev, pager, next" 
        :pager-count="5"
        :page-size="10"
        v-model:total="total"
        v-model:current-page="curPage"
        @current-change="handleCurrentChange"
        v-if="isSearch"/>
      </div>   
    </el-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>