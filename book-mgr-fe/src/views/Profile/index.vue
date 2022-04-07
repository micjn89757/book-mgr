<template>
  <el-row class="profile">
    <el-col :offset="6" :span="11">
      <el-card class="profile-card">
        <template #header>
          <div class="header">
            <h3>修改密码</h3>
          </div>
        </template>
  
        <el-row class="body">
          <el-col :span="15">
            <el-link type="primary" disabled>原始密码:</el-link>
            <el-input v-model="resetPasswordForm.oldPassword" clearable type="password"/>
          </el-col>
          <el-col :span="15">
            <el-link  type="primary" disabled>最新密码:</el-link>
            <el-input v-model="resetPasswordForm.newPassword" clearable type="password"/>
          </el-col>
          <el-col :span="15">
            <el-link  type="primary" disabled>确认密码:</el-link>
            <el-input v-model="resetPasswordForm.confirmNewPassword" clearable type="password"/>
          </el-col>

          <el-button type="primary" @click="resetPassword">确认修改</el-button>
        </el-row>   
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
  @import "./index.scss"
</style>

<script src="./index.js"></script>