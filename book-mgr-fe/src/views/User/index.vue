<template>
  <!-- 用户管理 -->
  <div class="user">
    <el-card class="user-card">
      <template #header>
        <div class="header">
          <h2>用户管理</h2>
          <div style="display: flex;">
            <el-button type="primary" @click="showAddModal = true" style="margin-right: 5px;" plain>添加用户</el-button>
            <el-upload
              action="http://localhost:3000/upload/file/"
              :headers="headers"
              :on-change="onUploadChange"
              :file-list="fileList"
            >
              <el-button type="primary" @click="upload" plain>上传Excel添加</el-button>
              <template #tip>               
              </template>
            </el-upload>
          </div>
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

      <!-- !编辑角色弹框 -->
      <el-dialog
        v-model="showEditCharacterModal"
        title="修改角色"
        width="30%"
        :before-close="editClose">
        <el-form :rules="rules" ref="ruleFormRef" :model="editCharForm">
          <el-form-item label="角色" prop="character" label-width="25%">
            <el-col :offset="0" :span="14">
              <el-select v-model="editCharForm.character" class="m-2" placeholder="请选择角色">
                <el-option
                  v-for="item in characterInfo"
                  :key="item._id"
                  :label="item.title"
                  :value="item._id"
                />
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
        
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editClose">关闭</el-button>
            <el-button type="primary" @click="editCharSubmit(ruleFormRef)">提交</el-button>
          </span>
        </template>
      </el-dialog>
  
      <div class="body">
        <el-table :data="list" border style="width: 100%">
          <el-table-column prop="account" label="账户"/>
          <el-table-column label="是否有邀请码">
            <template v-slot="scope">
              {{list[scope.$index].hasCode ? "有" : "无"}}
            </template>
          </el-table-column>
          <el-table-column label="角色">
            <template v-slot="scope">
              <el-link type="primary" :icon="Edit" @click="onEdit(list[scope.$index])" style="margin-bottom: 2px;">
              </el-link>
              {{getCharacterInfoById(list[scope.$index].character).title}}
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template v-slot="scope">
              {{moment(list[scope.$index].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
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