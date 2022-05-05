<template>
  <el-row  class="resetPassword">
    <el-col :offset="6" :span="12">
      <el-card class="resetPassword-card">
        <template #header>
          <div class="header">
            <h3>用户管理</h3>
          </div>
        </template>
  
        <div class="body">
          <el-table
            v-loading="loading"
            :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            :data="list" border style="width: 100%">
            <el-table-column prop="account" label="账户"/>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="danger" @click="onReset(list[scope.$index], 2)" style="margin-right: 8px;" plain>
                  重置密码
                </el-button>
                <el-button type="primary" @click="onReset(list[scope.$index], 3)" plain>
                  忽略
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty description="no Data" />
            </template>
          </el-table>
  
          <el-pagination 
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
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  @import "./index.scss"
</style>

<script src="./index.js"></script>