<template>
  <el-dialog
    v-model="props.show"
    title="添加书籍"
    width="30%"
    :before-close="close">
    <!-- 书名，价格，作者，出版日期，分类 -->
    <el-form :model="addForm">
      <el-form-item label="书名" label-width="25%">
        <el-col :offset="2" :span="13">
          <el-input placeholder="请输入书名" v-model="addForm.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="价格(元)" label-width="25%">
        <el-col :offset="2" :span="13">
          <el-input-number v-model="addForm.price" :min="0" controls-position="right" class="number-input"/>
        </el-col>
      </el-form-item>
      <el-form-item label="作者" label-width="25%">
        <el-col :offset="2" :span="13">
          <el-input placeholder="请输入作者" v-model="addForm.author" />
        </el-col>
      </el-form-item>
      <el-form-item label="出版日期" label-width="25%">
        <el-col :span="13" :offset="2">
          <el-date-picker
          type="date"
          placeholder="请选择日期"    
          style="width: 100%"     
          v-model="addForm.publishDate"
          value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="分类" label-width="25%">
        <el-col :offset="2" :span="13">
          <el-input placeholder="不同的分类用逗号隔开" v-model="addForm.classify" />
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="submit">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>