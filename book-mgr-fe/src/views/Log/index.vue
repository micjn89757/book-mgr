<template>
  <div class="log">
    <el-card class="log-card">
      <template #header>
        <div class="header">
          <h2>{{simple ? "最近操作" : "操作日志"}}</h2>
        </div>
      </template>
  
      <div class="body">
        <el-table
          v-loading="loading"
          :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50"
          :data="list" border style="width: 100%">
          <el-table-column prop="user.account" label="用户"/>
          <el-table-column prop="action" label="访问信息"/>
          <el-table-column label="创建时间">
            <template v-slot="scope">
              {{moment(list[scope.$index].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column v-if="!simple" label="操作">
            <template v-slot="scope">
              <el-link type="primary"  @click="remove(list[scope.$index])">删除</el-link>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination 
        v-if="!simple"
        background 
        layout="prev, pager, next" 
        :pager-count="5"
        :page-size="8"
        v-model:total="total"
        v-model:current-page="curPage"
        @current-change="handleCurrentChange"
        />
      </div>   
    </el-card>
  </div>
</template>


<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index.scss"
</style>