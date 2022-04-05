<template>
  <el-dialog
    v-model="props.show"
    title="修改书籍"
    width="30%"
    :before-close="close">
    <!-- 书名，价格，作者，出版日期，分类 -->
    <el-form :model="editForm">
      <el-form-item label="书名" prop="name" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input placeholder="请输入书名" v-model="editForm.name" />
        </el-col>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input-number v-model="editForm.price" :min="0" controls-position="right" class="number-input"/>
        </el-col>
      </el-form-item>
      <el-form-item label="作者" prop="author" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input placeholder="请输入作者" v-model="editForm.author" />
        </el-col>
      </el-form-item>
      <el-form-item label="出版日期" prop="publishDate" label-width="25%">
        <el-col :span="14" :offset="0">
          <el-date-picker
          type="date"
          placeholder="请选择日期"    
          style="width: 100%"     
          v-model="editForm.publishDate"
          value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="分类" prop="classify" label-width="25%">
        <el-col :offset="0" :span="14">
          <el-input placeholder="不同的分类用逗号隔开" v-model="editForm.classify" />
        </el-col>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">关闭</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>