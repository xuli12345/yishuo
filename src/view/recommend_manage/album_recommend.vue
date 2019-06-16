<template>
  <div class="albumRecommend">
    <div class="marginBottom30 flex clear">
      <div>
        <label for="albumId">专辑ID</label>
        <Input id="albumId" v-model="albumId" placeholder="查询专辑ID"></Input>
      </div>
      <div>
        <label for="albumName">专辑名称</label>
        <Input id="albumName" v-model="albumName" placeholder="查询专辑名称"></Input>
      </div>
      <Button type="primary" icon="ios-search" @click="searchData">查询</Button>
    </div>
    <Table stripe border :loading="loading" :columns="albumRecommendColum" :data="albumRecommendList"></Table>
    <Page class="paging" :total="totalCount" :page-size="pageSize" show-total show-elevator @on-change="pageChange"></Page>
    <!-- 弹窗 -->
    <!-- 编辑声音推荐 -->
    <template>
      <Modal v-model="editModel" title="专辑编辑">
        <div class="alignCenter">
          <p class="popupShow">
            <label class="showLabel">专辑ID：</label>
            <Input v-model="edit_albumId" disabled></Input>
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
      <Modal v-model="deleteModal" title="删除专辑推荐">
        <div class="alignCenter">
          <p>确认删除该专辑推荐？</p>
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
	import { albumRecommendCtrl } from "view_js/recommend_manage/album_recommend";
	export default {
	  mixins: [albumRecommendCtrl]
	};
</script>

<style lang="sass" rel="stylesheet/sass">
	@import "static/sass/base"
	@import "static/sass/popup"
</style>