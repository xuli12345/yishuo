<template>
  <div class="labelRecommend">
    <div class="marginBottom30 flex clear">
      <div>
        <label for="labelName">标签名称</label>
        <Input id="labelName" v-model="labelName" placeholder="查询标签名称"></Input>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :loading="loading" :columns="labelRecommendColum" :data="labelRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 编辑声音推荐 -->
    <template>
      <Modal v-model="editModel" title="标签编辑">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel">标签名称：</label>
            <Input v-model="edit_label_name" disabled></Input>
          </p>
          <p class="popupShow">
            <label class="showLabel" for="sortOrder">序号：</label>
            <InputNumber id="sortOrder" v-model="sort_order" :min="0" :precision="0"></InputNumber>
          </p>
        </div>
        <div slot="footer">
          <Button @click="cancelEdit" class="borderNone">取消</Button>
          <Button type="success" @click="confirmEdit">确认</Button>
        </div>
      </Modal>
    </template>
    <!-- 删除弹窗 -->
    <template>
      <Modal v-model="deleteModal" title="删除标签推荐">
        <div class="alignCenter">
          <p>确认删除该标签推荐？</p>
        </div>
        <div slot="footer">
          <Button @click="cancelDelete" class="borderNone">取消</Button>
          <Button type="error" @click="confirmDelete">删除</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
	import { labelRecommendCtrl } from "view_js/recommend_manage/label_recommend";
	export default {
	  mixins: [labelRecommendCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>