<template>
  <!-- 书籍信息详情页 -->
  <div class="book-detail">
    <el-card class="book-detail-up">
      <template #header>
        <div class="detail-header">
          <h2>书籍名字</h2>
          <div class="button">
            <el-button type="primary" @click="showUpdateModal = true" v-only-admin  plain>编辑</el-button>
            <el-button type="danger" @click="remove" v-only-admin  plain>删除</el-button>
          </div>
        </div>
        <update v-model:show="showUpdateModal" :book="detailInfo" @update="updateCurBook" />
      </template>
  
      <div class="detail-body">
        <el-row :gutter="20">
          <el-col :span="8">
            <section class="title">出版日期</section>
            <section class="content">{{detailInfo.publishDate}}</section>
          </el-col>
          <el-col :span="8">
            <section class="title">作者</section>
            <section class="content">{{detailInfo.author}}</section>
          </el-col>
          <el-col :span="8">
            <section class="title">库存</section>
            <section class="content">{{detailInfo.count}}</section>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <section class="title">价格</section>
            <section class="content">{{detailInfo.price}}元</section>
          </el-col>
          <el-col :span="8">
            <section class="title">折扣</section>
            <section class="content">10%</section>
          </el-col>
          <el-col :span="8">
            <section class="title">创建时间</section>
            <section class="content">{{ bookCreateTime }}</section>
          </el-col>
        </el-row>
      </div>   
    </el-card>

    <!-- 书籍出入库日志显示 -->
    <el-card class="book-detail-down">
      <template #header>
        <div class="detail-header">
          <h2>出入库日志</h2>
          <div>
            <el-link @click="logFilter(1)" type="primary">入库记录</el-link>
            <el-link @click="logFilter(2)" type="primary">出库记录</el-link>
          </div>
        </div>
      </template>
  
      <div class="body">
        <el-table :data="log" border style="width: 50%">
          <el-table-column prop="num" label="Count"/>
          <el-table-column label="CreateDate">
            <template v-slot="scope">
              {{moment(log[scope.$index].meta.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
        </el-table>

        <el-pagination 
        background 
        layout="prev, pager, next" 
        :pager-count="5"
        :page-size="6"
        v-model:total="logTotal"
        v-model:current-page="logCurPage"
        @current-change="handleCurrentChange"/>
      </div>   
    </el-card>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import "./index.scss"
</style>