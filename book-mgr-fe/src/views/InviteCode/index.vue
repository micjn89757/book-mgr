<template>
  <el-row class="inviteCode">
    <el-col :offset="6" :span="12">
      <el-card class="inviteCode-card">
        <template #header>
          <div class="header">
            <h3>邀请码列表</h3>
          </div>
        </template>
  
        <div class="body">
          <!-- 搜索框 -->
          <div class="search" v-only-admin>
            <el-input-number v-model="count" :min="0" controls-position="right" placeholder="添加新邀请码" class="input" />
            <el-button  class="button" @click="onAdd"  
            :icon="Position" type="primary"/>
          </div>
          
          <el-table
            v-loading="loading"
            :element-loading-svg="svg"
            element-loading-svg-view-box="-10, -10, 50, 50"
            :data="list" border style="width: 100%">
            <el-table-column prop="code" label="账户"/>
            <el-table-column label="使用状态">
              <template v-slot="scope">
                <el-link disabled type="primary" plain>
                  {{list[scope.$index].user ? "已使用" : "未使用"}}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button v-only-admin type="danger" @click="remove(list[scope.$index])" plain>
                  删除
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