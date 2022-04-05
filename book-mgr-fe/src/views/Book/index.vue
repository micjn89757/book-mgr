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
        :icon="Search" type="primary"/>
      </div>   
      <el-button class="add-button" :icon="Plus" type="primary" @click="show = true" plain>添加书籍</el-button>
    </div>
    <!-- 添加书籍弹框组件 -->
    <add-one v-model:show="show" />
    <!-- 修改书籍弹框组件 -->
    <update v-model:show="showUpdateModal" :book="curEditBook" @update="updateCurBook" />

    <!--  表格会把list与下面字段相匹配的字段（prop）显示 -->
    <el-table class="table" border="true" :data="list">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="price" label="Price"/>
      <el-table-column prop="author" label="Author"/>
      <el-table-column prop="publishDate" label="PublishDate"/>
      <el-table-column prop="classify" label="Classify">
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

      <el-table-column prop="count" label="Count">
        <template v-slot="scope">
          <el-link type="primary" disabled style="margin-right: 5px">库存:{{ list[scope.$index].count }}</el-link>

          <el-link @click="inCount(list[scope.$index])" type="primary" style="margin-right: 5px">入库</el-link>

          <el-link @click="outCount(list[scope.$index])" type="primary">出库</el-link>
        </template>
      </el-table-column>

      <el-table-column prop="actions" label="Actions">
        <template v-slot="scope">
          <el-link type="primary" @click="update(list[scope.$index])" style="margin-right: 5px;">修改</el-link>
          <el-link @click="remove(list[scope.$index])" type="primary">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <!-- 入库 -->
    <el-dialog v-model="inCountShow" title="入库数量" width="30%">
      <el-col :offset="7" :span="15">
        <el-input-number v-model="count.in" :min="0" controls-position="right" />
      </el-col>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="inClose">关闭</el-button>
          <el-button type="primary" @click="submitCount">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 出库 -->
    <el-dialog v-model="outCountShow" title="出库数量" width="30%">
      <el-col :offset="7" :span="15">
        <el-input-number v-model="count.out" :min="0" controls-position="right" />
      </el-col>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="outClose">关闭</el-button>
          <el-button type="primary" @click="submitCount">提交</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 分页 -->
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