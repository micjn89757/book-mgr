<template>
  <el-dialog
    v-model="props.show"
    title="添加用户"
    width="30%"
    :before-close="close">
    <!-- 账号， 密码， 角色 -->
    <el-form :rules="rules" ref="ruleFormRef" :model="addForm">
      <el-form-item label="账号" prop="account" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input placeholder="请输入账号" v-model="addForm.account" />
        </el-col>
      </el-form-item>

      <el-form-item label="密码" prop="password" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input type="password" placeholder="请输入密码" v-model="addForm.password" />
        </el-col>
      </el-form-item>

      <el-form-item label="角色" prop="character" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-select v-model="addForm.character" class="m-2" placeholder="请选择角色">
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
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>